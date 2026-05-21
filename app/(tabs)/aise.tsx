import React from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AISE_CONSEILS } from "@/src/data/content";
import colors from "@/constants/colors";

const C = colors.light;
const GREEN = "#1E2A25";
const GREEN_DARK = "#2E3D2F";

export default function AiseScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { paddingTop: topPad + 20 }]}>
          <Text style={styles.appName}>CANDAU</Text>
          <Text style={styles.title}>
            Être à l'aise,{"\n"}
            <Text style={styles.italic}>à son rythme</Text>
          </Text>
          <Text style={styles.sub}>
            Conseils pratiques pour apprivoiser{"\n"}ses émotions et gagner en
            sérénité
          </Text>
        </View>

        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>PAR OÙ COMMENCER</Text>
        </View>

        <View style={[styles.introCard, { backgroundColor: GREEN_DARK }]}>
          <Text style={styles.introCardTag}>ESSENTIEL</Text>
          <Text style={styles.introCardTitle}>Il n'y a pas de bonne vitesse</Text>
          <Text style={styles.introCardText}>
            Se sentir à l'aise est un chemin, pas un état fixe. Certains jours
            on avance, d'autres on recule — les deux font partie du processus.
          </Text>
        </View>

        <View style={styles.list}>
          {AISE_CONSEILS.map((c, i) => (
            <View key={i} style={styles.item}>
              <View style={styles.iconBox}>
                <Text style={styles.icon}>{c.emoji}</Text>
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{c.title}</Text>
                <Text style={styles.itemDesc}>{c.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.quote}>
          <Text style={styles.quoteText}>
            « Le confort ne précède pas le courage — il le suit. »
          </Text>
        </View>

        <View style={{ height: Platform.OS === "web" ? 118 : 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.warmWhite },
  header: {
    backgroundColor: GREEN,
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  appName: {
    fontSize: 11,
    fontWeight: "300",
    letterSpacing: 5,
    color: C.green,
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "300",
    color: C.cream,
    lineHeight: 38,
    marginBottom: 8,
  },
  italic: { color: C.green, fontStyle: "italic" },
  sub: {
    fontSize: 11,
    fontWeight: "300",
    color: "rgba(247,242,236,0.45)",
    lineHeight: 18,
  },
  sectionLabel: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionLabelText: { fontSize: 9, letterSpacing: 3, color: C.green },
  introCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
  },
  introCardTag: {
    fontSize: 9,
    letterSpacing: 2,
    color: C.green,
    marginBottom: 8,
  },
  introCardTitle: {
    fontSize: 18,
    fontWeight: "300",
    color: C.cream,
    lineHeight: 24,
    marginBottom: 8,
  },
  introCardText: {
    fontSize: 11,
    fontWeight: "300",
    color: "rgba(247,242,236,0.55)",
    lineHeight: 18,
  },
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
  iconBox: {
    width: 36,
    height: 36,
    backgroundColor: "#EBF4EC",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 17 },
  itemContent: { flex: 1 },
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
  quote: {
    margin: 20,
    backgroundColor: C.cream,
    borderRadius: 14,
    padding: 18,
    borderLeftWidth: 3,
    borderLeftColor: C.green,
  },
  quoteText: {
    fontSize: 15,
    fontStyle: "italic",
    color: C.mid,
    lineHeight: 24,
  },
});
