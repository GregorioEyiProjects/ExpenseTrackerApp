export type TransactionType = "income" | "expense";

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: "income" | "expense" | "both";
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  type: TransactionType;
  date: string; // ISO 8601: "2024-01-15T10:30:00.000Z"
}

export interface Summary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
