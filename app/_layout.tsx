import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack >
    <Stack.Screen name="index" options={{
      headerTitle: "Shipping Details",
      // headerTintColor: "#222",
      // headerStyle: { backgroundColor: "#bbb" }
    }} />
  </Stack>;
}
