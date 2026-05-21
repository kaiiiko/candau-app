import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TESTIMONIES, DAILY_PHRASES } from "@/src/data/content";
import { getDefisForDate, getTodayStr, DEFIS } from "@/src/data/defis";

const PURPLE = "#1E1625";
const DARK = "#160D1E";
const GOLD = "#C4A35A";
const CREAM = "#F7F2EC";
const MUTED = "rgba(247,242,236,0.45)";
const BORDER = "rgba(196,163,90,0.18)";

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return Math.abs(s) / 0x7fffffff;
  };
}

function getDailyPhrases(): string[] {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  const rand = seededRandom(seed);
  const shuffled = [...DAILY_PHRASES].sort(() => rand() - 0.5);
  return shuffled.slice(0, 3);
}

function getDailyTestimonies() {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate() +
    7777;
  const rand = seededRandom(seed);
  const shuffled = [...TESTIMONIES].sort(() => rand() - 0.5);
  return shuffled.slice(0, 3);
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const todayStr = getTodayStr();
  const defis = getDefisForDate(todayStr);
  const dailyPhrases = getDailyPhrases();
  const dailyTestimonies = getDailyTestimonies();

  const today = new Date();
  const dateLabel = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Hero ── */}
        <View style={[styles.hero, { paddingTop: topPad + 20 }]}>
          <Text style={styles.appName}>CANDAU</Text>
          <Text style={styles.date}>{dateLabel}</Text>
          <Text style={styles.heroTitle}>
            Osez{"\n"}
            <Text style={styles.heroItalic}>tout</Text>
            {"\n"}vous montrer
          </Text>
        </View>

        {/* ── Défis du jour ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>🔥 DÉFIS DU JOUR</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/defis")}>
              <Text style={styles.sectionLink}>Tous →</Text>
            </TouchableOpacity>
          </View>
          {defis.map((defi, index) => (
            <TouchableOpacity
              key={defi.id}
              style={[styles.defiCard, index < defis.length - 1 && { marginBottom: 10 }]}
              activeOpacity={0.88}
              onPress={() => router.push("/(tabs)/defis")}
            >
              <View style={styles.defiTop}>
                <View style={styles.defiTag}>
                  <Text style={styles.defiTagText}>{defi.emoji} {defi.cat.toUpperCase()}</Text>
                </View>
                <Text style={styles.defiPoints}>+{defi.points} pts</Text>
              </View>
              <Text style={styles.defiTitle}>{defi.title}</Text>
              <Text style={styles.defiDesc} numberOfLines={2}>
                {defi.desc}
              </Text>
              <View style={styles.defiFooter}>
                <Text style={styles.defiDuree}>{defi.duree}</Text>
                <View style={styles.defiArrow}>
                  <Text style={styles.defiArrowText}>Relever →</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Phrases du jour ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>💌 PHRASES DU JOUR</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/motivation")}>
              <Text style={styles.sectionLink}>Toutes →</Text>
            </TouchableOpacity>
          </View>
          {dailyPhrases.map((phrase, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.phraseCard, index < dailyPhrases.length - 1 && { marginBottom: 10 }]}
              activeOpacity={0.88}
              onPress={() => router.push("/(tabs)/motivation")}
            >
              <Text style={styles.phraseQuote}>❝</Text>
              <Text style={styles.phraseText}>{phrase}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Récits ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>💋 RÉCITS DU JOUR</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/testimonies")}>
              <Text style={styles.sectionLink}>Tous →</Text>
            </TouchableOpacity>
          </View>
          {dailyTestimonies.map((testimony, index) => (
            <TouchableOpacity
              key={testimony.id}
              style={[styles.testimonyCard, index < dailyTestimonies.length - 1 && { marginBottom: 10 }]}
              activeOpacity={0.88}
              onPress={() => router.push("/(tabs)/testimonies")}
            >
              <Text style={styles.testimonyQuote}>❝</Text>
              <Text style={styles.testimonyText} numberOfLines={4}>
                {testimony.text}
              </Text>
              <View style={styles.testimonyAuthor}>
                <View style={[styles.avatar, { backgroundColor: testimony.color }]}>
                  <Text style={styles.avatarText}>{testimony.initial}</Text>
                </View>
                <View>
                  <Text style={styles.testimonyName}>{testimony.name}</Text>
                  <Text style={styles.testimonyDetail}>{testimony.detail}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Quick links ── */}
        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => router.push("/(tabs)/conseils")}
            activeOpacity={0.85}
          >
            <Text style={styles.quickEmoji}>🌹</Text>
            <Text style={styles.quickLabel}>Conseils</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => router.push("/(tabs)/motivation")}
            activeOpacity={0.85}
          >
            <Text style={styles.quickEmoji}>💌</Text>
            <Text style={styles.quickLabel}>Pour moi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => router.push("/(tabs)/checklist")}
            activeOpacity={0.85}
          >
            <Text style={styles.quickEmoji}>✅</Text>
            <Text style={styles.quickLabel}>Checklist</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: Platform.OS === "web" ? 120 : 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: DARK },

  // Hero
  hero: {
    backgroundColor: PURPLE,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  appName: {
    fontSize: 11,
    fontWeight: "300",
    letterSpacing: 6,
    color: "rgba(196,163,90,0.7)",
    marginBottom: 4,
  },
  date: {
    fontSize: 10,
    fontWeight: "300",
    color: MUTED,
    letterSpacing: 0.5,
    marginBottom: 20,
    textTransform: "capitalize",
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: "300",
    color: CREAM,
    lineHeight: 48,
  },
  heroItalic: { color: GOLD, fontStyle: "italic" },

  // Section
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 2,
    color: "rgba(196,163,90,0.7)",
  },
  sectionLink: {
    fontSize: 11,
    color: GOLD,
    fontWeight: "400",
  },

  // Défi card
  defiCard: {
    backgroundColor: "#2A1A36",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(196,163,90,0.25)",
  },
  defiTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  defiTag: {
    backgroundColor: "rgba(196,163,90,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(196,163,90,0.2)",
  },
  defiTagText: { fontSize: 8, fontWeight: "600", letterSpacing: 1.2, color: GOLD },
  defiPoints: {
    fontSize: 12,
    fontWeight: "600",
    color: GOLD,
  },
  defiTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: CREAM,
    marginBottom: 6,
    lineHeight: 22,
  },
  defiDesc: {
    fontSize: 12,
    fontWeight: "300",
    color: MUTED,
    lineHeight: 18,
    marginBottom: 12,
  },
  defiFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 10,
  },
  defiDuree: { fontSize: 10, color: "rgba(196,163,90,0.5)", fontWeight: "300" },
  defiArrow: {
    backgroundColor: GOLD,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  defiArrowText: { fontSize: 10, fontWeight: "600", color: PURPLE },

  // Phrase card
  phraseCard: {
    backgroundColor: PURPLE,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },
  phraseQuote: {
    fontSize: 28,
    color: "rgba(196,163,90,0.25)",
    lineHeight: 22,
    marginBottom: 8,
  },
  phraseText: {
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "300",
    color: CREAM,
    lineHeight: 22,
  },

  // Testimony card
  testimonyCard: {
    backgroundColor: PURPLE,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },
  testimonyQuote: {
    fontSize: 24,
    color: GOLD,
    opacity: 0.35,
    lineHeight: 20,
    marginBottom: 10,
  },
  testimonyText: {
    fontSize: 13,
    fontStyle: "italic",
    fontWeight: "300",
    color: CREAM,
    lineHeight: 21,
    marginBottom: 14,
  },
  testimonyAuthor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 12, fontWeight: "300", color: "#fff" },
  testimonyName: { fontSize: 11, fontWeight: "400", color: CREAM },
  testimonyDetail: { fontSize: 10, fontWeight: "300", color: MUTED },

  // Quick links
  quickRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 10,
  },
  quickCard: {
    flex: 1,
    backgroundColor: PURPLE,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: BORDER,
  },
  quickEmoji: { fontSize: 22 },
  quickLabel: {
    fontSize: 10,
    fontWeight: "400",
    color: "rgba(247,242,236,0.6)",
    letterSpacing: 0.5,
  },
});
