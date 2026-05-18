import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Transaction } from "@/src/constants";
import { Colors } from "@/src/constants";
import { formatCurrency, formatDate } from "@/src/utils";
import { useTransactions } from "@/src/context/TransactionContext";

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const { deleteTransaction } = useTransactions();

  const handleDelete = () => {
    Alert.alert(
      "Eliminar transacción",
      `¿Eliminar "${transaction.description}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteTransaction(transaction.id),
        },
      ],
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={handleDelete}
      delayLongPress={400}
    >
      <View style={styles.left}>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text style={styles.date}>{formatDate(transaction.date)}</Text>
      </View>
      <Text
        style={[
          styles.amount,
          {
            color:
              transaction.type === "income" ? Colors.income : Colors.expense,
          },
        ]}
      >
        {transaction.type === "income" ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
  },
  left: {
    flex: 1,
    gap: 4,
  },
  description: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.text.primary,
  },
  date: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
});
