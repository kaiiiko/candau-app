import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View, useColorScheme } from "react-native";

function EmojiIcon({ emoji, active }: { emoji: string; active: boolean }) {
  return (
    <Text style={{ fontSize: 20, opacity: active ? 1 : 0.5 }}>{emoji}</Text>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#A0604A",
        tabBarInactiveTintColor: "#B0A09A",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#1A0F22",
          borderTopColor: "rgba(196,163,90,0.2)",
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 6,
          elevation: 0,
          ...(isWeb ? { height: 84 } : { height: 64 }),
        },
        tabBarLabelStyle: {
          fontSize: 8,
          fontWeight: "300" as const,
          letterSpacing: 0.3,
          color: "#C9A99A",
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView
              intensity={90}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View
              style={[StyleSheet.absoluteFill, { backgroundColor: "#1A0F22" }]}
            />
          ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarActiveTintColor: "#C4A35A",
          tabBarIcon: ({ focused }) => (
            <EmojiIcon emoji="👁️" active={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="testimonies"
        options={{
          title: "Récits",
          tabBarActiveTintColor: "#C4A35A",
          tabBarIcon: ({ focused }) => (
            <EmojiIcon emoji="💋" active={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="conseils"
        options={{
          title: "Conseils",
          tabBarActiveTintColor: "#C4A35A",
          tabBarIcon: ({ focused }) => (
            <EmojiIcon emoji="🌹" active={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="defis"
        options={{
          title: "Défis",
          tabBarActiveTintColor: "#C4A35A",
          tabBarIcon: ({ focused }) => (
            <EmojiIcon emoji="🔥" active={focused} />
          ),
        }}
      />
      <Tabs.Screen name="galerie" options={{ href: null }} />
      <Tabs.Screen
        name="motivation"
        options={{
          title: "Pour moi",
          tabBarActiveTintColor: "#C4A35A",
          tabBarIcon: ({ focused }) => (
            <EmojiIcon emoji="💌" active={focused} />
          ),
        }}
      />
      <Tabs.Screen name="checklist" options={{ href: null }} />
      <Tabs.Screen name="aise" options={{ href: null }} />
    </Tabs>
  );
}
