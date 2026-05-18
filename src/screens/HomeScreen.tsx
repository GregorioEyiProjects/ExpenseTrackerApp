import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactions } from "@/src/context/TransactionContext";
import { SummaryCard } from "@/src/components/SummaryCard";
import { Colors } from "@/src/constants";
import { formatCurrency, formatDate } from "@/src/utils";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { TransactionItem } from "@/src/components/TransactionItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text.primary,
    padding: 16,
    paddingBottom: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.secondary,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingBottom: 100,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
  },
  transactionLeft: {
    flex: 1,
    gap: 4,
  },
  transactionDescription: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.text.primary,
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  empty: {
    alignItems: "center",
    paddingTop: 60,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.text.secondary,
    fontWeight: "500",
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.text.light,
  },
  fab: {
    position: "absolute",
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "300",
  },
});

export default function HomeScreen() {
  const { transactions, summary, isLoading } = useTransactions();

  if (isLoading) {
    <View style={styles.centered}>
      <Text>Cargando...</Text>
    </View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Mis Finanzas</Text>
            <SummaryCard summary={summary} />
            <Text style={styles.sectionTitle}>Últimos movimientos</Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No hay transacciones todavía</Text>
            <Text style={styles.emptySubtext}>Pulsa + para añadir una</Text>
          </View>
        }
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        /* renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <Text style={styles.transactionDescription}>
                {item.description}
              </Text>
              <Text style={styles.transactionDate}>
                {formatDate(item.date)}
              </Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                {
                  color:
                    item.type === "income" ? Colors.income : Colors.expense,
                },
              ]}
            >
              {item.type === "income" ? "+" : "-"}
              {formatCurrency(item.amount)}
            </Text>
          </View>
        )} */
        contentContainerStyle={styles.listContent}
      ></FlatList>

      <TouchableOpacity style={styles.fab} onPress={() => router.push("/add")}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
