import React, { useState, useEffect } from "react";
import { View, Image, Alert, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useMyContextProvider, login } from '../src/MyContextControllerProvider'; 

const LoginScreen = ({navigation}) => {
    const [controller,dispatch] = useMyContextProvider();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {userLogin} = controller

    useEffect(() => {
        if (userLogin !== null) navigation.navigate('Home');
      }, [userLogin]);

    const handerLogin=()=>{
        login(dispatch,email,password)
    }

    return (

            <View style={styles.container}>
                <Image
                    source={require("../assets/logo.jpg")}
                    style={styles.logo}
                />
                <Text style={styles.title}>Login</Text>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={styles.input}
                />
                <Button
                    compact
                    onPress={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "Hide" : "Show"} Password
                </Button>
                
                <Button
                    mode="contained"
                    onPress={handerLogin}
                    style={styles.button}
                >
                    Login
                </Button>
                <Button
                    mode="outlined"
                    onPress={()=>navigation.navigate("Register")}
                    style={styles.button}
                >s
                    Don't have an account? Create one
                </Button>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f8ff", 
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 35,
        paddingBottom: 10,
        color: "#cccccc", 
    },
    input: {
        width: 300,
        marginBottom: 20,
        backgroundColor: "#ffffff", 
    },
    button: {
        width: 300,
        marginBottom: 10,
        backgroundColor: "#4682B4", 
    },
});

export default LoginScreen;
