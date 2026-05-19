import { Summary, Transaction } from "@/src/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "@expense_tracker_transactions";

// 1. La forma del contexto — qué datos y funciones expone
interface TransactionContextType {
  transactions: Transaction[];
  summary: Summary;
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => void;
  deleteTransaction: (id: string) => void;
  isLoading: boolean;
}

// 2. Crear el contexto con un valor por defecto undefined
const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

// 3. El Provider: el componente que envuelve la app y distribuye el estado
export function TransactionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos guardados al iniciar
  useEffect(() => {
    loadTransactions();
  }, []);

  // Guardar en AsyncStorage cada vez que cambian las transacciones
  useEffect(() => {
    if (!isLoading) {
      saveTransactions(transactions);
    }
  }, [transactions]);

  // Función para cargar  transacciones desde AsyncStorage
  const loadTransactions = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedData) {
        setTransactions(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para guardar transacciones en AsyncStorage
  const saveTransactions = async (transactions: Transaction[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error("Error saving transactions:", error);
    }
  };

  // Función para agregar una nueva transacción
  const addTransaction = (transaction: Omit<Transaction, "id" | "date">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  };

  // Función para eliminar una transacción por ID
  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Función para Calcular el resumen derivado de las transacciones
  const summary: Summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.totalIncome += transaction.amount;
      } else {
        acc.totalExpense += transaction.amount;
      }
      acc.balance = acc.totalIncome - acc.totalExpense;
      return acc;
    },
    { totalIncome: 0, totalExpense: 0, balance: 0 },
  );

  // 4. Renderizar el Provider con el valor del contexto
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        summary,
        addTransaction,
        deleteTransaction,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

// 4. Hook personalizado para consumir el contexto
export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions debe usarse dentro de TransactionProvider",
    );
  }
  return context;
};

/* 
1. App arranca
        ↓
2. useEffect llama a loadTransactions()
        ↓
3. AsyncStorage devuelve los datos guardados (o nada si es la primera vez)
        ↓
4. setTransactions() actualiza el estado
        ↓
5. React re-renderiza — todos los componentes ven los datos nuevos
        ↓
6. Usuario añade una transacción → addTransaction()
        ↓
7. setTransactions() añade la nueva al array
        ↓
8. El segundo useEffect detecta el cambio → saveTransactions()
        ↓
9. AsyncStorage guarda los datos actualizados
*/
