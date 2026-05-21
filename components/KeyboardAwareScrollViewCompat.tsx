import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, ScrollViewProps, StyleSheet } from "react-native";

type Props = ScrollViewProps & {
  children?: React.ReactNode;
};

export function KeyboardAwareScrollViewCompat({
  children,
  keyboardShouldPersistTaps = "handled",
  style,
  ...props
}: Props) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        style={[{ flex: 1 }, style]}
        {...props}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
