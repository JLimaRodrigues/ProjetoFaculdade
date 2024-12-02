import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import RootLayout from "./app/_layout";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <RootLayout></RootLayout>
    )
}