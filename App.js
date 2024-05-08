import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/Register";
import HomeScreen from "./Screens/HomeScreen";
import { MyContextControllerProvider } from "./src/MyContextControllerProvider";

const Stack = createStackNavigator();

const App = () => {
  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </MyContextControllerProvider>
  );
};

export default App;
