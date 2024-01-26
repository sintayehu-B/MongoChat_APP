import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants/styles";

const OutLineButton = ({ onPress, children }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutLineButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: colors.primaryGray500,
  },
  pressed: { opacity: 0.7 },
});
