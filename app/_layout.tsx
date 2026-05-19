import { TransactionProvider } from "@/src/context/TransactionContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TransactionProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TransactionProvider>
  );
}
