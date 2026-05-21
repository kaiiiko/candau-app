import React from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CONSEILS } from "@/src/data/content";
import colors from "@/constants/colors";

const C = colors.light;

export default function ConseilsScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { paddingTop: topPad + 20 }]}>
          <Text style={styles.appName}>CANDAU</Text>
          <Text style={styles.title}>
            Communication{"\n"}& consentement
          </Text>
        </View>

        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>LES FONDAMENTAUX</Text>
        </View>

        <View style={styles.list}>
          {CONSEILS.map((c) => (
            <View key={c.num} style={styles.item}>
              <View style={styles.numBox}>
                <Text style={styles.num}>{c.num}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.itemTitle}>{c.title}</Text>
                <Text style={styles.itemDesc}>{c.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: Platform.OS === "web" ? 118 : 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.warmWhite },
  header: {
    backgroundColor: C.deep,
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  appName: {
    fontSize: 11,
    fontWeight: "300",
    letterSpacing: 5,
    color: C.blush,
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "300",
    color: C.cream,
    lineHeight: 38,
  },
  sectionLabel: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionLabelText: { fontSize: 9, letterSpacing: 3, color: C.blush },
  list: { paddingHorizontal: 20, gap: 10 },
  item: {
    backgroundColor: C.white,
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    gap: 14,
    shadowColor: C.deep,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  numBox: {
    width: 32,
    height: 32,
    backgroundColor: C.cream,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  num: { fontSize: 16, fontStyle: "italic", color: C.blush },
  content: { flex: 1 },
  itemTitle: {
    fontSize: 13,
    fontWeight: "400",
    color: C.deep,
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 11,
    fontWeight: "300",
    color: C.mid,
    lineHeight: 18,
  },
});
