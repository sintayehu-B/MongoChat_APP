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

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const changeEmailHandler = (enteredText) => {
    setEmail(enteredText);
  };
  const changeNameHandler = (enteredText) => {
    setName(enteredText);
  };
  const changeImageHandler = (enteredText) => {
    setImage(enteredText);
  };
  const changePasswordHandler = (enteredText) => {
    setPassword(enteredText);
  };
  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView>
        <View style={styles.KeyboardViewContainer}>
          <Text style={styles.signInText}>Sign Up</Text>
        </View>
        <View style={styles.inputContainer}>
          {/* first name and last name */}
          <View>
            <Text style={styles.textLabel}>Name</Text>
            <TextInput
              value={name}
              onChangeText={changeNameHandler}
              style={[styles.textInput, { fontSize: name ? 17 : 18 }]}
              placeholderTextColor={"black"}
              placeholder="Enter your Name"
            />
          </View>
          {/* Email */}
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
          {/* Image */}
          <View>
            <Text style={styles.textLabel}>Image</Text>
            <TextInput
              value={image}
              onChangeText={changeImageHandler}
              style={[styles.textInput, { fontSize: image ? 17 : 18 }]}
              placeholderTextColor={"black"}
              placeholder="Image"
            />
          </View>
          {/* Password */}
          <View>
            <Text style={styles.textLabel}>Password</Text>
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={changePasswordHandler}
              style={[styles.textInput, { fontSize: password ? 17 : 18 }]}
              placeholderTextColor={"black"}
              placeholder="Password"
            />
          </View>
          <Button>Sign Up</Button>
          <OutLineButton onPress={() => navigation.navigate("Login")}>
            Already have an account? Login
          </OutLineButton>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
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
