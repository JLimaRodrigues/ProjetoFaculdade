import { Stack } from "expo-router";
import { Button } from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";

export default function Layout() {
    return (
        <AuthProvider>
            <AuthStack />
        </AuthProvider>
    );
}

const AuthStack = () => {
    const { authState, onLogout } = useAuth();

    return (
        <Stack>
            {authState?.authenticated ? (
                <Stack.Screen 
                    name="screens/Home" 
                    options={{
                        headerRight: () => <Button onPress={onLogout} title="Sign Out" />
                    }}
                />
            ) : (
                <Stack.Screen 
                    name="screens/Login"
                />
            )}
        </Stack>
    );
};
