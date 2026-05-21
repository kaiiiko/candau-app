import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ARTICLES } from "@/src/data/content";
import colors from "@/constants/colors";

const C = colors.light;

export default function ArticleScreen() {
  const { articleId } = useLocalSearchParams<{ articleId: string }>();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const article = ARTICLES.find((a) => a.id === articleId) ?? ARTICLES[0];

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { paddingTop: topPad + 16 }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <Text style={styles.backText}>← Retour</Text>
          </TouchableOpacity>
          <Text style={styles.tag}>{article.tag.toUpperCase()}</Text>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.meta}>{article.readTime} de lecture · 2026</Text>
        </View>

        <View style={styles.body}>
          {article.content.map((block, i) => {
            if (block.type === "intro") {
              return (
                <Text key={i} style={styles.intro}>
                  {block.text}
                </Text>
              );
            }
            if (block.type === "highlight") {
              return (
                <View key={i} style={styles.highlight}>
                  <Text style={styles.highlightText}>{block.text}</Text>
                </View>
              );
            }
            return (
              <Text key={i} style={styles.text}>
                {block.text}
              </Text>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
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
  back: { marginBottom: 20 },
  backText: { fontSize: 11, color: C.blush, letterSpacing: 0.5 },
  tag: {
    fontSize: 9,
    letterSpacing: 3,
    color: C.gold,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "300",
    color: C.cream,
    lineHeight: 36,
    marginBottom: 12,
  },
  meta: {
    fontSize: 10,
    color: "rgba(247,242,236,0.4)",
    fontWeight: "300",
  },
  body: { padding: 24 },
  intro: {
    fontSize: 17,
    fontStyle: "italic",
    color: C.mid,
    lineHeight: 28,
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: C.light,
  },
  text: {
    fontSize: 13,
    fontWeight: "300",
    color: "#4A3A34",
    lineHeight: 24,
    marginBottom: 16,
  },
  highlight: {
    backgroundColor: C.cream,
    borderLeftWidth: 3,
    borderLeftColor: C.blush,
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  highlightText: {
    fontSize: 15,
    fontStyle: "italic",
    color: C.mid,
    lineHeight: 24,
  },
});
