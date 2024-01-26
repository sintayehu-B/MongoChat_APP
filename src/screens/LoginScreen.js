import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../constants/styles";
import Button from "../components/customButtons/Button";
import OutLineButton from "../components/customButtons/OutLinedButton";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigation = navigation();
  const changeEmailHandler = (enteredText) => {
    setEmail(enteredText);
  };
  const changePasswordHandler = (enteredText) => {
    setPassword(enteredText);
  };
  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView>
        <View style={styles.KeyboardViewContainer}>
          <Text style={styles.signInText}>Sign In</Text>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.textLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={changeEmailHandler}
              style={[styles.textInput, { fontSize: email ? 17 : 18 }]}
              placeholderTextColor={"black"}
              placeholder="Enter your Email"
            />
          </View>
          <View>
            <Text style={styles.textLabel}>Password</Text>
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={changePasswordHandler}
              style={[styles.textInput, { fontSize: email ? 17 : 18 }]}
              placeholderTextColor={"black"}
              placeholder="Password"
            />
          </View>
          <Button>Login</Button>
          <OutLineButton onPress={() => navigation.navigate("Register")}>
            Don't have an account? Sign Up
          </OutLineButton>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 100,
    alignItems: "center",
    backgroundColor: "white",
  },
  KeyboardViewContainer: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  signInText: {
    color: colors.primaryTextColor,
    fontSize: 25,
    fontWeight: "600",
  },
  inputContainer: {
    marginTop: 50,
  },
  textInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
    padding: 10,
  },
  textLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primaryGrayColor,
  },
});
