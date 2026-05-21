import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollViewCompat as KeyboardAwareScrollView } from "@/components/KeyboardAwareScrollViewCompat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChecklistItem, DEFAULT_CHECKLIST } from "@/src/data/content";
import colors from "@/constants/colors";

const C = colors.light;
const INDIGO = "#1A1F2E";
const STORAGE_KEY = "@candau_checklist";

const CATS = [
  { key: "all", label: "Tout" },
  { key: "dialogue", label: "Dialogue" },
  { key: "solo", label: "Solo" },
  { key: "couple", label: "Couple" },
  { key: "confiance", label: "Confiance" },
  { key: "perso", label: "Mes étapes" },
];

const CAT_LABELS: Record<string, string> = {
  dialogue: "Dialogue",
  solo: "Solo",
  couple: "En couple",
  confiance: "Confiance",
  perso: "Mes étapes perso",
};

export default function ChecklistScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : 0;

  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSub, setNewSub] = useState("");
  const [newCat, setNewCat] = useState("perso");

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setItems(JSON.parse(saved));
        } else {
          setItems(DEFAULT_CHECKLIST);
        }
      } catch {
        setItems(DEFAULT_CHECKLIST);
      }
    })();
  }, []);

  const save = useCallback(async (newItems: ChecklistItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    } catch {}
  }, []);

  const toggleItem = (id: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setItems(updated);
    save(updated);
  };

  const deleteCustomItem = (id: string) => {
    Alert.alert("Supprimer", "Supprimer cette étape personnalisée ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          const updated = items.filter((i) => i.id !== id);
          setItems(updated);
          save(updated);
        },
      },
    ]);
  };

  const addCustomItem = () => {
    if (!newTitle.trim()) return;
    const newItem: ChecklistItem = {
      id: "custom_" + Date.now().toString() + Math.random().toString(36).substr(2, 5),
      cat: newCat,
      title: newTitle.trim(),
      sub: newSub.trim(),
      custom: true,
      done: false,
    };
    const updated = [...items, newItem];
    setItems(updated);
    save(updated);
    setNewTitle("");
    setNewSub("");
    setNewCat("perso");
    setModalVisible(false);
  };

  const isSearching = searchQuery.trim().length > 0;

  const filtered = useMemo(() => {
    let base = activeCat === "all" ? items : items.filter((i) => i.cat === activeCat);
    if (isSearching) {
      const q = searchQuery.toLowerCase();
      base = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.sub.toLowerCase().includes(q)
      );
    }
    return base;
  }, [items, activeCat, searchQuery, isSearching]);

  const done = items.filter((i) => i.done).length;
  const progress = items.length > 0 ? (done / items.length) * 100 : 0;

  const grouped: Record<string, ChecklistItem[]> = {};
  filtered.forEach((item) => {
    if (!grouped[item.cat]) grouped[item.cat] = [];
    grouped[item.cat].push(item);
  });

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { paddingTop: topPad + 20 }]}>
          <Text style={styles.appName}>CANDAU</Text>
          <Text style={styles.title}>
            Mes <Text style={styles.italic}>étapes</Text>
          </Text>
          <Text style={styles.sub}>
            Cochez ce que vous avez déjà franchi.{"\n"}Chaque étape compte.
          </Text>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>PROGRESSION</Text>
            <Text style={styles.progressCount}>
              {done} / {items.length}
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressBar, { width: `${progress}%` as any }]}
            />
          </View>
        </View>

        {/* Search bar */}
        <View style={styles.searchWrap}>
          <View style={styles.searchBox}>
            <Feather name="search" size={15} color={C.indigoAccent} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher une étape…"
              placeholderTextColor="rgba(107,81,71,0.4)"
              value={searchQuery}
              onChangeText={(t) => {
                setSearchQuery(t);
                if (t.trim()) setActiveCat("all");
              }}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
            {searchQuery.length > 0 && Platform.OS !== "ios" && (
              <TouchableOpacity
                onPress={() => setSearchQuery("")}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Feather name="x" size={14} color={C.mid} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.tabsScroll, isSearching && styles.tabsHidden]}
          contentContainerStyle={styles.tabs}
        >
          {CATS.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[styles.tab, activeCat === cat.key && styles.tabActive]}
              onPress={() => setActiveCat(cat.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeCat === cat.key && styles.tabTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.list}>
          {Object.entries(grouped).map(([cat, catItems]) => (
            <View key={cat}>
              {activeCat === "all" && (
                <Text style={styles.catLabel}>
                  {CAT_LABELS[cat] || cat}
                </Text>
              )}
              {catItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.item, item.done && styles.itemDone]}
                  activeOpacity={0.8}
                  onPress={() => toggleItem(item.id)}
                  onLongPress={() => item.custom && deleteCustomItem(item.id)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      item.done && styles.checkboxDone,
                    ]}
                  >
                    {item.done && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                  <View style={styles.itemText}>
                    <Text
                      style={[
                        styles.itemTitle,
                        item.done && styles.itemTitleDone,
                      ]}
                    >
                      {item.title}
                      {item.custom && (
                        <Text style={styles.customBadge}> ★</Text>
                      )}
                    </Text>
                    {!!item.sub && (
                      <Text style={styles.itemSub}>{item.sub}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          {filtered.length === 0 && (
            <View style={styles.empty}>
              {isSearching ? (
                <>
                  <Text style={styles.emptyText}>
                    Aucun résultat pour « {searchQuery} »
                  </Text>
                  <Text style={styles.emptyHint}>Essayez d'autres mots-clés</Text>
                </>
              ) : (
                <>
                  <Text style={styles.emptyText}>
                    Aucune étape dans cette catégorie.
                  </Text>
                  <Text style={styles.emptyHint}>Ajoutez la vôtre ↓</Text>
                </>
              )}
            </View>
          )}
        </View>

        <View style={{ height: Platform.OS === "web" ? 118 : 80 }} />
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 80 + (Platform.OS === "web" ? bottomPad : 0) }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBg}
            onPress={() => setModalVisible(false)}
          />
          <KeyboardAwareScrollView
            style={styles.modalSheet}
            bottomOffset={20}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Ajouter une étape</Text>

            <Text style={styles.inputLabel}>Titre *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex : Regarder un documentaire sur le sujet"
              placeholderTextColor="#C0B0A8"
              value={newTitle}
              onChangeText={setNewTitle}
              autoFocus
            />

            <Text style={styles.inputLabel}>Description (optionnel)</Text>
            <TextInput
              style={[styles.input, styles.inputMulti]}
              placeholder="Quelques mots pour décrire cette étape..."
              placeholderTextColor="#C0B0A8"
              value={newSub}
              onChangeText={setNewSub}
              multiline
              numberOfLines={2}
            />

            <Text style={styles.inputLabel}>Catégorie</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.catPicker}
            >
              {CATS.filter((c) => c.key !== "all").map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  style={[
                    styles.catChip,
                    newCat === cat.key && styles.catChipActive,
                  ]}
                  onPress={() => setNewCat(cat.key)}
                >
                  <Text
                    style={[
                      styles.catChipText,
                      newCat === cat.key && styles.catChipTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.addBtn,
                !newTitle.trim() && styles.addBtnDisabled,
              ]}
              onPress={addCustomItem}
              disabled={!newTitle.trim()}
            >
              <Text style={styles.addBtnText}>Ajouter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelBtnText}>Annuler</Text>
            </TouchableOpacity>
            <View style={{ height: insets.bottom + 20 }} />
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.warmWhite },
  header: {
    backgroundColor: INDIGO,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  appName: {
    fontSize: 11,
    fontWeight: "300",
    letterSpacing: 5,
    color: C.indigo,
    marginBottom: 12,
  },
  title: { fontSize: 30, fontWeight: "300", color: C.cream, marginBottom: 8 },
  italic: { color: C.indigo, fontStyle: "italic" },
  sub: {
    fontSize: 11,
    fontWeight: "300",
    color: "rgba(247,242,236,0.45)",
    lineHeight: 18,
    marginBottom: 18,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: "300",
    color: "rgba(247,242,236,0.4)",
    letterSpacing: 1,
  },
  progressCount: {
    fontSize: 10,
    fontWeight: "300",
    color: C.indigo,
    letterSpacing: 1,
  },
  progressTrack: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%" as any,
    backgroundColor: C.indigoAccent,
    borderRadius: 4,
  },
  searchWrap: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: C.warmWhite,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: C.light,
    gap: 8,
  },
  searchIcon: { marginRight: 2 },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: "300",
    color: C.deep,
    padding: 0,
  },
  tabsHidden: { display: "none" },
  tabsScroll: { flexGrow: 0 },
  tabs: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
    flexDirection: "row",
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.light,
  },
  tabActive: { backgroundColor: "#252D40", borderColor: "#252D40" },
  tabText: { fontSize: 11, fontWeight: "300", color: C.mid },
  tabTextActive: { color: C.cream },
  list: { paddingHorizontal: 20, gap: 8 },
  catLabel: {
    fontSize: 9,
    letterSpacing: 3,
    color: C.indigo,
    paddingTop: 12,
    paddingBottom: 4,
  },
  item: {
    backgroundColor: C.white,
    borderRadius: 13,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    borderWidth: 1.5,
    borderColor: "transparent",
    shadowColor: C.deep,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 2,
  },
  itemDone: {
    backgroundColor: "#F0F2FA",
    borderColor: C.indigo,
    opacity: 0.75,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#D0D5E8",
    backgroundColor: C.white,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxDone: {
    backgroundColor: C.indigoAccent,
    borderColor: C.indigoAccent,
  },
  checkmark: { fontSize: 13, color: C.white, fontWeight: "600" },
  itemText: { flex: 1 },
  itemTitle: {
    fontSize: 13,
    fontWeight: "400",
    color: C.deep,
    marginBottom: 3,
  },
  itemTitleDone: { color: "#7A85B0", textDecorationLine: "line-through" },
  itemSub: {
    fontSize: 10,
    fontWeight: "300",
    color: "#9A8880",
    lineHeight: 15,
  },
  customBadge: { color: C.gold, fontSize: 11 },
  empty: { alignItems: "center", paddingVertical: 40 },
  emptyText: { fontSize: 13, color: C.mid, marginBottom: 6 },
  emptyHint: { fontSize: 11, color: C.blush },
  fab: {
    position: "absolute",
    right: 24,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: C.indigoAccent,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.indigoAccent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabText: { fontSize: 28, color: C.white, lineHeight: 32 },
  modalOverlay: { flex: 1, justifyContent: "flex-end" },
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  modalSheet: {
    backgroundColor: C.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "80%",
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: C.light,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "400",
    color: C.deep,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: C.blush,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: C.light,
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    fontWeight: "300",
    color: C.deep,
    marginBottom: 16,
    backgroundColor: C.warmWhite,
  },
  inputMulti: { height: 70, textAlignVertical: "top" },
  catPicker: { flexGrow: 0, marginBottom: 20 },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.light,
    marginRight: 8,
  },
  catChipActive: {
    backgroundColor: "#252D40",
    borderColor: "#252D40",
  },
  catChipText: { fontSize: 11, fontWeight: "300", color: C.mid },
  catChipTextActive: { color: C.cream },
  addBtn: {
    backgroundColor: C.indigoAccent,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  addBtnDisabled: { opacity: 0.4 },
  addBtnText: {
    fontSize: 14,
    fontWeight: "400",
    color: C.white,
    letterSpacing: 0.5,
  },
  cancelBtn: { alignItems: "center", padding: 10 },
  cancelBtnText: { fontSize: 13, color: C.mid, fontWeight: "300" },
});
