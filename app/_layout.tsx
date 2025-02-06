import { Stack } from "expo-router";
import "./global.css";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(welcome)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(inner)" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
}
