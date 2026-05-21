import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TESTIMONIES } from "@/src/data/content";

const PURPLE = "#1E1625";
const DARK = "#160D1E";
const GOLD = "#C4A35A";
const CREAM = "#F7F2EC";
const MUTED = "rgba(247,242,236,0.45)";
const BORDER = "rgba(196,163,90,0.18)";

export default function TestimoniesScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: topPad + 20 }]}>
          <Text style={styles.appName}>CANDAU</Text>
          <Text style={styles.title}>
            Récits <Text style={styles.italic}>vrais</Text>
          </Text>
          <Text style={styles.sub}>
            Vécus de couples anonymes · histoires réelles
          </Text>
        </View>

        {/* Cards */}
        <View style={styles.list}>
          {TESTIMONIES.map((t, idx) => (
            <View key={t.id} style={styles.card}>
              {/* Number */}
              <View style={styles.numBadge}>
                <Text style={styles.numText}>{String(idx + 1).padStart(2, "0")}</Text>
              </View>

              {/* Quote */}
              <Text style={styles.quoteGlyph}>❝</Text>
              <Text style={styles.text}>{t.text}</Text>

              {/* Author */}
              <View style={styles.author}>
                <View style={[styles.avatar, { backgroundColor: t.color }]}>
                  <Text style={styles.avatarText}>{t.initial}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{t.name}</Text>
                  <Text style={styles.detail}>{t.detail}</Text>
                </View>
                <View style={styles.heartBadge}>
                  <Text style={{ fontSize: 14 }}>💋</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: Platform.OS === "web" ? 120 : 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: DARK },

  header: {
    backgroundColor: PURPLE,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  appName: {
    fontSize: 11,
    fontWeight: "300",
    letterSpacing: 6,
    color: "rgba(196,163,90,0.7)",
    marginBottom: 14,
  },
  title: {
    fontSize: 32,
    fontWeight: "300",
    color: CREAM,
    marginBottom: 8,
  },
  italic: { fontStyle: "italic", color: GOLD },
  sub: {
    fontSize: 11,
    fontWeight: "300",
    color: MUTED,
    letterSpacing: 0.3,
  },

  list: { padding: 16, gap: 14 },

  card: {
    backgroundColor: PURPLE,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: BORDER,
    position: "relative",
    overflow: "hidden",
  },

  numBadge: {
    position: "absolute",
    top: 18,
    right: 18,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(196,163,90,0.08)",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  numText: {
    fontSize: 10,
    fontWeight: "600",
    color: "rgba(196,163,90,0.5)",
    letterSpacing: 0.5,
  },

  quoteGlyph: {
    fontSize: 42,
    color: GOLD,
    opacity: 0.25,
    lineHeight: 36,
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "300",
    color: CREAM,
    lineHeight: 26,
    marginBottom: 20,
  },

  author: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 14, fontWeight: "300", color: "#fff" },
  name: { fontSize: 12, fontWeight: "500", color: CREAM },
  detail: { fontSize: 10, fontWeight: "300", color: MUTED, marginTop: 1 },
  heartBadge: {
    marginLeft: "auto" as any,
  },
});
