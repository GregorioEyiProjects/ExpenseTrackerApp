import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/constants";
import { Summary } from "@/src/constants";
import { formatCurrency } from "@/src/utils";

interface SummaryCardProps {
  summary: Summary;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: "center",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  item: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  itemLabel: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  itemAmount: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.balanceLabel}>Balance total</Text>
      <Text
        style={[
          styles.balanceAmount,
          { color: summary.balance >= 0 ? Colors.income : Colors.expense },
        ]}
      >
        {formatCurrency(summary.balance)}
      </Text>

      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.itemLabel}>💰 Ingresos</Text>
          <Text style={[styles.itemAmount, { color: Colors.income }]}>
            {formatCurrency(summary.totalIncome)}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.item}>
          <Text style={styles.itemLabel}>💸 Gastos</Text>
          <Text style={[styles.itemAmount, { color: Colors.expense }]}>
            {formatCurrency(summary.totalExpense)}
          </Text>
        </View>
      </View>
    </View>
  );
}
