import { View, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { onLogin, onRegister } = useAuth()

    useEffect(() => {
        const testCall = async () => {
            const result = await axios.get(`${API_URL}/users`)
        }
        testCall()
    }, [])

    const login = async () => {
        const result = await onLogin!(email, password)
        if(result && result.error){
            alert(result.msg)
        }
    }

    const register = async () => {
        const result = await onRegister!(email, password)
        if(result && result.error){
            alert(result.msg)
        } else {
            login()
        }
    }

    return (
        <View>
            <View>
                <TextInput placeholder="Email" onChangeText={(text: string) => setEmail(email)} value={email} />
                <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(text: string) => setPassword(password)} value={password} />
                <Button onPress={login} title="Sign in" />
                <Button onPress={register} title="Create Account" />
            </View>
        </View>
    )
}

export default Login;