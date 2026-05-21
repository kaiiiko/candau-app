import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Defi,
  Recompense,
  CAT_LABELS,
  CAT_COLORS,
  CAT_BG,
  DIFF_COLORS,
  DIFF_LABELS,
  RECOMPENSES,
  MISSIONS,
  TIER_COLORS,
  TIER_BG,
  TIER_LABELS,
  getDefisForDate,
  getTodayStr,
} from "@/src/data/defis";
import colors from "@/constants/colors";

const C = colors.light;
const STORAGE_KEY = "@candau_defis_v2";
const { width: SW } = Dimensions.get("window");

type StorageShape = {
  totalPoints: number;
  completed: Record<string, string[]>;
  redeemed: string[];
  streak: number;
  lastDate: string;
  currentMissionId: string | null;
  completedMissions: string[];
};

const DEFAULT_STORE: StorageShape = {
  totalPoints: 0,
  completed: {},
  redeemed: [],
  streak: 0,
  lastDate: "",
  currentMissionId: MISSIONS[0]?.id ?? null,
  completedMissions: [],
};

// ─── Animated confetti dot ───
function PointBurst({ visible }: { visible: boolean }) {
  const op = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      op.setValue(1);
      ty.setValue(0);
      Animated.parallel([
        Animated.timing(op, { toValue: 0, duration: 900, useNativeDriver: true }),
        Animated.timing(ty, { toValue: -40, duration: 900, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  return (
    <Animated.Text
      style={{
        position: "absolute",
        top: -8,
        right: 8,
        color: "#C4A35A",
        fontWeight: "700",
        fontSize: 14,
        opacity: op,
        transform: [{ translateY: ty }],
        zIndex: 10,
      }}
    >
      +pts
    </Animated.Text>
  );
}

// ─── Defi Card ───
function DefiCard({
  defi,
  done,
  onToggle,
}: {
  defi: Defi;
  done: boolean;
  onToggle: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const [burst, setBurst] = useState(false);

  const accent = CAT_COLORS[defi.cat];
  const bg = CAT_BG[defi.cat];
  const diffColor = DIFF_COLORS[defi.difficulty];

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
    if (!done) {
      setBurst(true);
      setTimeout(() => setBurst(false), 950);
    }
    onToggle();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, { position: "relative" }]}>
      <PointBurst visible={burst} />
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={handlePress}
        style={[styles.card, done && styles.cardDone]}
      >
        {/* Top row */}
        <View style={styles.cardTop}>
          <View style={styles.cardTopLeft}>
            <View style={[styles.catPill, { backgroundColor: bg }]}>
              <Text style={[styles.catPillText, { color: accent }]}>
                {CAT_LABELS[defi.cat].toUpperCase()}
              </Text>
            </View>
            <Text style={[styles.diffLabel, { color: diffColor }]}>
              {DIFF_LABELS[defi.difficulty]}{defi.duree}
            </Text>
          </View>
          <View style={styles.ptsBadge}>
            <Text style={styles.ptsValue}>+{defi.points}</Text>
            <Text style={styles.ptsSuffix}>pts</Text>
          </View>
        </View>

        {/* Body */}
        <View style={styles.cardTitleRow}>
          <View style={[styles.emojiBox, { backgroundColor: done ? "#EBEBEB" : bg }]}>
            <Text style={styles.emoji}>{defi.emoji}</Text>
          </View>
          <Text style={[styles.cardTitle, done && styles.cardTitleDone]} numberOfLines={2}>
            {defi.title}
          </Text>
        </View>

        <Text style={[styles.cardDesc, done && styles.cardDescDone]}>{defi.desc}</Text>

        {/* Footer / checkbox */}
        <TouchableOpacity style={styles.cardFooter} onPress={handlePress} activeOpacity={0.8}>
          <View style={[styles.checkbox, done && { backgroundColor: accent, borderColor: accent }]}>
            {done && <Text style={styles.check}>✓</Text>}
          </View>
          <Text style={[styles.checkLabel, done && { color: accent, fontWeight: "500" as any }]}>
            {done ? "Défi relevé — bien joué !" : "Marquer comme accompli"}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Reward Card ───
function RewardCard({
  r,
  totalPoints,
  redeemed,
  onRedeem,
}: {
  r: Recompense;
  totalPoints: number;
  redeemed: boolean;
  onRedeem: () => void;
}) {
  const canAfford = totalPoints >= r.cost;
  const tc = TIER_COLORS[r.tier];
  const tb = TIER_BG[r.tier];

  return (
    <View style={[styles.rewardCard, redeemed && styles.rewardCardDone]}>
      <View style={styles.rewardTop}>
        <View style={[styles.tierPill, { backgroundColor: tb }]}>
          <Text style={[styles.tierText, { color: tc }]}>
            {TIER_LABELS[r.tier].toUpperCase()}
          </Text>
        </View>
        <View style={[styles.costBadge, { backgroundColor: canAfford && !redeemed ? "#1E1625" : "#EDE8E4" }]}>
          <Text style={[styles.costText, { color: canAfford && !redeemed ? "#C4A35A" : "#B0A09A" }]}>
            {r.cost} pts
          </Text>
        </View>
      </View>

      <View style={styles.rewardBody}>
        <Text style={styles.rewardEmoji}>{r.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={[styles.rewardTitle, redeemed && styles.rewardTitleDone]}>{r.title}</Text>
          <Text style={styles.rewardDesc}>{r.desc}</Text>
        </View>
      </View>

      {redeemed ? (
        <View style={styles.redeemedBadge}>
          <Text style={styles.redeemedText}>✓ Récompense débloquée</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.redeemBtn, !canAfford && styles.redeemBtnDisabled]}
          onPress={onRedeem}
          disabled={!canAfford}
          activeOpacity={0.8}
        >
          <Text style={[styles.redeemBtnText, !canAfford && styles.redeemBtnTextDisabled]}>
            {canAfford ? "Débloquer" : `Il manque ${r.cost - totalPoints} pts`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ─── Mission Card ───
function MissionCard({
  mission,
  done,
  onComplete,
}: {
  mission: Defi;
  done: boolean;
  onComplete: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const [burst, setBurst] = useState(false);
  const accent = "#C4A35A";
  const bg = "rgba(196,163,90,0.1)";

  const handlePress = () => {
    if (done) return;
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
    setBurst(true);
    setTimeout(() => setBurst(false), 950);
    onComplete();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, { position: "relative" }]}>
      <PointBurst visible={burst} />
      <View style={missionStyles.card}>
        {/* Crown badge */}
        <View style={missionStyles.crownRow}>
          <View style={missionStyles.crownBadge}>
            <Text style={missionStyles.crownText}>✦ MISSION À ACCOMPLIR</Text>
          </View>
          <View style={missionStyles.ptsBadge}>
            <Text style={missionStyles.ptsValue}>+{mission.points}</Text>
            <Text style={missionStyles.ptsSuffix}>pts</Text>
          </View>
        </View>

        {/* Emoji + Title */}
        <View style={missionStyles.body}>
          <View style={[missionStyles.emojiBox, { backgroundColor: bg }]}>
            <Text style={missionStyles.emoji}>{mission.emoji}</Text>
          </View>
          <Text style={missionStyles.title}>{mission.title}</Text>
        </View>

        <Text style={missionStyles.desc}>{mission.desc}</Text>

        {/* CTA */}
        {done ? (
          <View style={missionStyles.doneBadge}>
            <Text style={missionStyles.doneText}>✓ Mission accomplie — bravo !</Text>
          </View>
        ) : (
          <TouchableOpacity style={missionStyles.cta} onPress={handlePress} activeOpacity={0.85}>
            <Text style={missionStyles.ctaText}>Mission accomplie ✦</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

// ─── Main Screen ───
export default function DefisScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const today = getTodayStr();
  const todayDefis = getDefisForDate(today);

  const [store, setStore] = useState<StorageShape>(DEFAULT_STORE);
  const [tab, setTab] = useState<"defis" | "mission" | "boutique">("defis");
  const [confirmReward, setConfirmReward] = useState<Recompense | null>(null);

  // ── Mission helpers ──
  const completedMissions = store.completedMissions ?? [];
  const currentMissionId = store.currentMissionId ?? (MISSIONS.find(m => !completedMissions.includes(m.id))?.id ?? null);
  const currentMission = MISSIONS.find(m => m.id === currentMissionId) ?? null;
  const missionsDoneCount = completedMissions.length;
  const allMissionsDone = missionsDoneCount >= MISSIONS.length;

  const completeMission = () => {
    if (!currentMission) return;
    const newCompleted = [...completedMissions, currentMission.id];
    const nextMission = MISSIONS.find(m => !newCompleted.includes(m.id)) ?? null;
    const next: StorageShape = {
      ...store,
      totalPoints: store.totalPoints + currentMission.points,
      completedMissions: newCompleted,
      currentMissionId: nextMission?.id ?? null,
    };
    setStore(next);
    save(next);
  };

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setStore(JSON.parse(raw));
      } catch {}
    })();
  }, []);

  const save = useCallback(async (next: StorageShape) => {
    try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  }, []);

  const todayCompleted = store.completed[today] ?? [];
  const allDoneToday = todayDefis.every((d) => todayCompleted.includes(d.id));
  const doneCount = todayDefis.filter((d) => todayCompleted.includes(d.id)).length;
  const progressPct = (doneCount / todayDefis.length) * 100;

  const toggleDefi = (defi: Defi) => {
    const current = store.completed[today] ?? [];
    const isDone = current.includes(defi.id);
    const nextCompleted = isDone
      ? current.filter((id) => id !== defi.id)
      : [...current, defi.id];

    const pointsDelta = isDone ? -defi.points : defi.points;
    const newTotal = Math.max(0, store.totalPoints + pointsDelta);

    // Bonus +30 if all 3 newly completed
    const wasAll = todayDefis.every((d) => current.includes(d.id));
    const nowAll = todayDefis.every((d) =>
      d.id === defi.id ? !isDone : current.includes(d.id)
    );
    const bonusPts = !wasAll && nowAll ? 30 : 0;

    // Streak
    let { streak, lastDate } = store;
    if (!wasAll && nowAll) {
      const yesterday = getYesterdayStr();
      streak = lastDate === yesterday ? streak + 1 : 1;
      lastDate = today;
    }

    const next: StorageShape = {
      ...store,
      totalPoints: newTotal + bonusPts,
      completed: { ...store.completed, [today]: nextCompleted },
      streak,
      lastDate,
    };
    setStore(next);
    save(next);
  };

  const redeemReward = (r: Recompense) => {
    if (store.totalPoints < r.cost) return;
    const next: StorageShape = {
      ...store,
      totalPoints: store.totalPoints - r.cost,
      redeemed: [...store.redeemed, r.id],
    };
    setStore(next);
    save(next);
    setConfirmReward(null);
  };

  const todayLabel = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const todayLabelCap = todayLabel.charAt(0).toUpperCase() + todayLabel.slice(1);

  // Sort rewards by cost
  const sortedRewards = [...RECOMPENSES].sort((a, b) => a.cost - b.cost);

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* ── Header ── */}
        <View style={[styles.header, { paddingTop: topPad + 20 }]}>
          <Text style={styles.appName}>CANDAU</Text>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>
                Défis <Text style={styles.italic}>& Récompenses</Text>
              </Text>
              <Text style={styles.dateLabel}>{todayLabelCap}</Text>
            </View>
            {/* Points orb */}
            <View style={styles.pointsOrb}>
              <Text style={styles.pointsOrbValue}>{store.totalPoints}</Text>
              <Text style={styles.pointsOrbLabel}>pts</Text>
            </View>
          </View>

          {/* Streak */}
          {store.streak > 0 && (
            <View style={styles.streakRow}>
              <Text style={styles.streakFire}>🔥</Text>
              <Text style={styles.streakText}>
                {store.streak} jour{store.streak > 1 ? "s" : ""} de suite — continuez !
              </Text>
            </View>
          )}

          {/* Progress bar (défis tab only) */}
          {tab === "defis" && (
            <>
              <View style={styles.progRow}>
                <Text style={styles.progLabel}>
                  {doneCount}/{todayDefis.length} défis
                </Text>
                {allDoneToday && <Text style={styles.bonusLabel}>🎁 +30 pts bonus !</Text>}
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressBar, { width: `${progressPct}%` as any }]} />
              </View>
            </>
          )}
        </View>

        {/* ── Tabs ── */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, tab === "defis" && styles.tabBtnActive]}
            onPress={() => setTab("defis")}
          >
            <Text style={[styles.tabBtnText, tab === "defis" && styles.tabBtnTextActive]}>
              🎯  Du jour
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, tab === "mission" && styles.tabBtnActive]}
            onPress={() => setTab("mission")}
          >
            <Text style={[styles.tabBtnText, tab === "mission" && styles.tabBtnTextActive]}>
              ✦  Mission
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, tab === "boutique" && styles.tabBtnActive]}
            onPress={() => setTab("boutique")}
          >
            <Text style={[styles.tabBtnText, tab === "boutique" && styles.tabBtnTextActive]}>
              ✨  Boutique
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── DÉFIS TAB ── */}
        {tab === "defis" && (
          <View style={styles.section}>
            {allDoneToday && (
              <View style={styles.congrats}>
                <Text style={styles.congratsEmoji}>🎉</Text>
                <Text style={styles.congratsTitle}>Journée complète !</Text>
                <Text style={styles.congratsText}>
                  Bonus de 30 pts crédité. Revenez demain pour de nouveaux défis — et dépensez vos points dans la boutique.
                </Text>
              </View>
            )}

            {todayDefis.map((defi) => (
              <DefiCard
                key={defi.id}
                defi={defi}
                done={todayCompleted.includes(defi.id)}
                onToggle={() => toggleDefi(defi)}
              />
            ))}

            {/* Legend */}
            <View style={styles.legend}>
              <Text style={styles.legendTitle}>Comment ça marche ?</Text>
              <View style={styles.legendRows}>
                {(["facile", "moyen", "osé"] as const).map((d) => (
                  <View key={d} style={styles.legendRow}>
                    <View style={[styles.legendDot, { backgroundColor: DIFF_COLORS[d] }]} />
                    <Text style={styles.legendText}>
                      <Text style={{ fontWeight: "500" as any }}>{DIFF_LABELS[d].replace(" · ", "")}</Text>
                      {d === "facile" && "  15-20 pts — gestes doux et dialogue"}
                      {d === "moyen" && "  25-35 pts — exploration et complicité"}
                      {d === "osé" && "  40-55 pts — expériences franches"}
                    </Text>
                  </View>
                ))}
                <View style={styles.legendRow}>
                  <Text style={styles.legendBonus}>🎁</Text>
                  <Text style={styles.legendText}>
                    <Text style={{ fontWeight: "500" as any }}>Bonus +30 pts</Text> si les 3 défis sont accomplis dans la journée
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* ── MISSION TAB ── */}
        {tab === "mission" && (
          <View style={styles.section}>
            {/* Progress header */}
            <View style={missionStyles.progressHeader}>
              <Text style={missionStyles.progressTitle}>
                Parcours {missionsDoneCount}/{MISSIONS.length}
              </Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressBar, { width: `${(missionsDoneCount / MISSIONS.length) * 100}%` as any }]} />
              </View>
              <Text style={missionStyles.progressSub}>
                {allMissionsDone
                  ? "Toutes les missions accomplies — vous êtes incroyables."
                  : "Cette mission reste en attente jusqu'à ce qu'elle soit relevée."}
              </Text>
            </View>

            {/* Active mission */}
            {allMissionsDone ? (
              <View style={missionStyles.allDone}>
                <Text style={missionStyles.allDoneEmoji}>✦</Text>
                <Text style={missionStyles.allDoneTitle}>Parcours terminé !</Text>
                <Text style={missionStyles.allDoneText}>
                  Vous avez relevé toutes les missions ensemble. C'est une belle victoire de complicité.
                </Text>
              </View>
            ) : currentMission ? (
              <MissionCard
                mission={currentMission}
                done={false}
                onComplete={completeMission}
              />
            ) : null}

            {/* Completed missions list */}
            {completedMissions.length > 0 && (
              <View style={missionStyles.historySection}>
                <Text style={missionStyles.historyTitle}>Missions accomplies</Text>
                {completedMissions.map((id) => {
                  const m = MISSIONS.find(x => x.id === id);
                  if (!m) return null;
                  return (
                    <View key={id} style={missionStyles.historyItem}>
                      <Text style={missionStyles.historyEmoji}>{m.emoji}</Text>
                      <Text style={missionStyles.historyText} numberOfLines={2}>{m.title}</Text>
                      <Text style={missionStyles.historyPts}>+{m.points} pts</Text>
                    </View>
                  );
                })}
              </View>
            )}

            {/* Explanation */}
            <View style={[styles.legend, { marginTop: 4 }]}>
              <Text style={styles.legendTitle}>Comment fonctionne la Mission ?</Text>
              <View style={styles.legendRows}>
                <View style={styles.legendRow}>
                  <Text style={styles.legendBonus}>✦</Text>
                  <Text style={styles.legendText}>
                    <Text style={{ fontWeight: "500" as any }}>Une mission à la fois</Text> — elle ne change pas tant qu'elle n'est pas accomplie
                  </Text>
                </View>
                <View style={styles.legendRow}>
                  <Text style={styles.legendBonus}>→</Text>
                  <Text style={styles.legendText}>
                    <Text style={{ fontWeight: "500" as any }}>Quand c'est fait</Text> — marquez-la et la suivante s'active automatiquement
                  </Text>
                </View>
                <View style={styles.legendRow}>
                  <Text style={styles.legendBonus}>🎁</Text>
                  <Text style={styles.legendText}>
                    Chaque mission rapporte des points supplémentaires cumulables avec vos défis du jour
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* ── BOUTIQUE TAB ── */}
        {tab === "boutique" && (
          <View style={styles.section}>
            <View style={styles.boutiqueHeader}>
              <Text style={styles.boutiqueTitle}>Vos points : {store.totalPoints}</Text>
              <Text style={styles.boutiqueSubtitle}>
                Relevez des défis pour accumuler des points et débloquer des récompenses à partager avec votre partenaire.
              </Text>
            </View>

            {sortedRewards.map((r) => (
              <RewardCard
                key={r.id}
                r={r}
                totalPoints={store.totalPoints}
                redeemed={store.redeemed.includes(r.id)}
                onRedeem={() => setConfirmReward(r)}
              />
            ))}

            <View style={styles.boutiqueFoot}>
              <Text style={styles.boutiqueFootText}>
                Chaque récompense débloquée doit être utilisée dans un cadre de confiance et de consentement mutuel. Votre mot de sécurité reste toujours valide.
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: Platform.OS === "web" ? 118 : 40 }} />
      </ScrollView>

      {/* ── Confirm modal ── */}
      <Modal
        visible={!!confirmReward}
        transparent
        animationType="slide"
        onRequestClose={() => setConfirmReward(null)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBg} onPress={() => setConfirmReward(null)} />
          {confirmReward && (
            <View style={styles.modalSheet}>
              <View style={styles.modalHandle} />
              <Text style={styles.modalEmoji}>{confirmReward.emoji}</Text>
              <Text style={styles.modalTitle}>{confirmReward.title}</Text>
              <Text style={styles.modalDesc}>{confirmReward.desc}</Text>
              <View style={styles.modalCost}>
                <Text style={styles.modalCostText}>Coût : {confirmReward.cost} pts</Text>
                <Text style={styles.modalBalance}>
                  Solde après : {store.totalPoints - confirmReward.cost} pts
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={() => redeemReward(confirmReward)}
              >
                <Text style={styles.modalConfirmText}>Débloquer cette récompense</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setConfirmReward(null)}>
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

function getYesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ─── STYLES ───
const PURPLE = "#1E1625";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.warmWhite },

  // Header
  header: { backgroundColor: PURPLE, paddingHorizontal: 24, paddingBottom: 24 },
  appName: { fontSize: 11, fontWeight: "300", letterSpacing: 5, color: "#C9A99A", marginBottom: 10 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  title: { fontSize: 26, fontWeight: "300", color: C.cream, lineHeight: 32 },
  italic: { color: "#C4A35A", fontStyle: "italic" },
  dateLabel: { fontSize: 11, fontWeight: "300", color: "rgba(247,242,236,0.4)", marginTop: 2 },
  pointsOrb: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: "rgba(196,163,90,0.15)",
    borderWidth: 1.5, borderColor: "rgba(196,163,90,0.4)",
    alignItems: "center", justifyContent: "center",
  },
  pointsOrbValue: { fontSize: 20, fontWeight: "500", color: "#C4A35A" },
  pointsOrbLabel: { fontSize: 10, fontWeight: "300", color: "rgba(196,163,90,0.7)" },
  streakRow: {
    flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: "rgba(196,163,90,0.12)", borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6, alignSelf: "flex-start", marginBottom: 14,
  },
  streakFire: { fontSize: 14 },
  streakText: { fontSize: 11, color: "#C4A35A" },
  progRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  progLabel: { fontSize: 10, color: "rgba(247,242,236,0.35)" },
  bonusLabel: { fontSize: 10, color: "#C4A35A", fontWeight: "500" },
  progressTrack: { height: 3, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" },
  progressBar: { height: "100%" as any, backgroundColor: "#C4A35A", borderRadius: 4 },

  // Tabs
  tabRow: {
    flexDirection: "row", backgroundColor: C.white,
    borderBottomWidth: 1, borderBottomColor: C.light,
  },
  tabBtn: {
    flex: 1, paddingVertical: 13, alignItems: "center",
    borderBottomWidth: 2, borderBottomColor: "transparent",
  },
  tabBtnActive: { borderBottomColor: "#C4A35A" },
  tabBtnText: { fontSize: 12, fontWeight: "300", color: "#B0A09A" },
  tabBtnTextActive: { color: "#2A1F1A", fontWeight: "500" as any },

  section: { padding: 16, gap: 14 },

  // Congrats
  congrats: {
    backgroundColor: "#FDF7EC", borderRadius: 16, padding: 20,
    alignItems: "center", borderWidth: 1, borderColor: "#E8D8B0",
  },
  congratsEmoji: { fontSize: 30, marginBottom: 6 },
  congratsTitle: { fontSize: 17, fontWeight: "400", color: C.deep, marginBottom: 4 },
  congratsText: { fontSize: 11, fontWeight: "300", color: C.mid, textAlign: "center", lineHeight: 17 },

  // Defi card
  card: {
    backgroundColor: C.white, borderRadius: 18, padding: 20,
    shadowColor: "#2A1F1A", shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07, shadowRadius: 12, elevation: 3,
    borderWidth: 1.5, borderColor: "transparent",
  },
  cardDone: { backgroundColor: "#F8F7F5", borderColor: "#E0DDD8", opacity: 0.78 },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardTopLeft: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  catPill: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 20 },
  catPillText: { fontSize: 9, fontWeight: "500", letterSpacing: 1.2 },
  diffLabel: { fontSize: 9, fontWeight: "300" },
  ptsBadge: {
    backgroundColor: "#FDF7EC", borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 5,
    flexDirection: "row", alignItems: "baseline", gap: 2,
  },
  ptsValue: { fontSize: 14, fontWeight: "600", color: "#C4A35A" },
  ptsSuffix: { fontSize: 9, color: "#C4A35A", fontWeight: "300" },
  cardTitleRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 },
  emojiBox: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 19 },
  cardTitle: { flex: 1, fontSize: 15, fontWeight: "400", color: C.deep, lineHeight: 21 },
  cardTitleDone: { color: "#9A9290", textDecorationLine: "line-through" },
  cardDesc: { fontSize: 12, fontWeight: "300", color: "#6B5147", lineHeight: 19, marginBottom: 14 },
  cardDescDone: { color: "#B8B0AC" },
  cardFooter: {
    flexDirection: "row", alignItems: "center", gap: 10,
    paddingTop: 12, borderTopWidth: 1, borderTopColor: "#F0EBE6",
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: "#D5CEC9", backgroundColor: C.white,
    alignItems: "center", justifyContent: "center",
  },
  check: { fontSize: 12, color: C.white, fontWeight: "700" },
  checkLabel: { fontSize: 11, fontWeight: "300", color: "#B0A09A" },

  // Legend
  legend: {
    backgroundColor: C.cream, borderRadius: 14, padding: 16,
    borderLeftWidth: 3, borderLeftColor: "#C4A35A",
  },
  legendTitle: { fontSize: 12, fontWeight: "500", color: C.deep, marginBottom: 10 },
  legendRows: { gap: 8 },
  legendRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginTop: 4 },
  legendBonus: { fontSize: 13, width: 8 },
  legendText: { fontSize: 11, fontWeight: "300", color: C.mid, lineHeight: 17, flex: 1 },

  // Boutique
  boutiqueHeader: { paddingBottom: 4 },
  boutiqueTitle: { fontSize: 20, fontWeight: "400", color: C.deep, marginBottom: 6 },
  boutiqueSubtitle: { fontSize: 12, fontWeight: "300", color: C.mid, lineHeight: 18 },
  rewardCard: {
    backgroundColor: C.white, borderRadius: 18, padding: 18,
    shadowColor: "#2A1F1A", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 10, elevation: 2,
    borderWidth: 1.5, borderColor: "transparent",
  },
  rewardCardDone: { borderColor: "#E0DDD8", backgroundColor: "#F9F8F6" },
  rewardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  tierPill: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 20 },
  tierText: { fontSize: 9, fontWeight: "500", letterSpacing: 1.2 },
  costBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  costText: { fontSize: 12, fontWeight: "600" },
  rewardBody: { flexDirection: "row", alignItems: "flex-start", gap: 14, marginBottom: 14 },
  rewardEmoji: { fontSize: 26, marginTop: 2 },
  rewardTitle: { fontSize: 15, fontWeight: "400", color: C.deep, marginBottom: 5, lineHeight: 20 },
  rewardTitleDone: { color: "#9A9290" },
  rewardDesc: { fontSize: 11, fontWeight: "300", color: C.mid, lineHeight: 17 },
  redeemBtn: {
    backgroundColor: "#1E1625", borderRadius: 12,
    paddingVertical: 13, alignItems: "center",
  },
  redeemBtnDisabled: { backgroundColor: "#F0EBE6" },
  redeemBtnText: { fontSize: 13, fontWeight: "500", color: "#C4A35A", letterSpacing: 0.3 },
  redeemBtnTextDisabled: { color: "#B0A09A" },
  redeemedBadge: {
    backgroundColor: "#F0F8F0", borderRadius: 12,
    paddingVertical: 12, alignItems: "center",
    borderWidth: 1, borderColor: "#C3D9C3",
  },
  redeemedText: { fontSize: 12, color: "#5A8A5A", fontWeight: "400" },
  boutiqueFoot: {
    backgroundColor: C.cream, borderRadius: 14, padding: 16,
    borderLeftWidth: 3, borderLeftColor: "#9DA8D8",
  },
  boutiqueFootText: { fontSize: 11, fontWeight: "300", color: C.mid, lineHeight: 17 },

  // Modal
  modalOverlay: { flex: 1, justifyContent: "flex-end" },
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)" },
  modalSheet: {
    backgroundColor: C.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 28, paddingBottom: 40, alignItems: "center",
  },
  modalHandle: {
    width: 40, height: 4, backgroundColor: C.light,
    borderRadius: 2, marginBottom: 20,
  },
  modalEmoji: { fontSize: 40, marginBottom: 12 },
  modalTitle: { fontSize: 20, fontWeight: "400", color: C.deep, textAlign: "center", marginBottom: 10 },
  modalDesc: { fontSize: 13, fontWeight: "300", color: C.mid, textAlign: "center", lineHeight: 20, marginBottom: 20 },
  modalCost: {
    backgroundColor: "#FDF7EC", borderRadius: 12, padding: 14,
    width: "100%", marginBottom: 20, alignItems: "center", gap: 4,
  },
  modalCostText: { fontSize: 14, fontWeight: "500", color: "#C4A35A" },
  modalBalance: { fontSize: 11, fontWeight: "300", color: C.mid },
  modalConfirmBtn: {
    backgroundColor: "#1E1625", borderRadius: 14,
    paddingVertical: 15, paddingHorizontal: 24, width: "100%",
    alignItems: "center", marginBottom: 10,
  },
  modalConfirmText: { fontSize: 14, fontWeight: "500", color: "#C4A35A", letterSpacing: 0.3 },
  modalCancelBtn: { paddingVertical: 12, width: "100%", alignItems: "center" },
  modalCancelText: { fontSize: 13, fontWeight: "300", color: C.mid },
});

// ─── MISSION STYLES ───
const missionStyles = StyleSheet.create({
  // Progress header
  progressHeader: {
    backgroundColor: PURPLE, borderRadius: 16, padding: 18, gap: 8,
  },
  progressTitle: { fontSize: 13, fontWeight: "500", color: "#C4A35A" },
  progressSub: { fontSize: 11, fontWeight: "300", color: "rgba(247,242,236,0.45)", lineHeight: 16, marginTop: 4 },

  // Mission card
  card: {
    backgroundColor: "#1E1625", borderRadius: 20, padding: 22,
    borderWidth: 1.5, borderColor: "rgba(196,163,90,0.35)",
    shadowColor: "#C4A35A", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 16, elevation: 5,
    gap: 14,
  },
  crownRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  crownBadge: {
    backgroundColor: "rgba(196,163,90,0.15)", borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  crownText: { fontSize: 9, fontWeight: "500", color: "#C4A35A", letterSpacing: 1.5 },
  ptsBadge: {
    backgroundColor: "rgba(196,163,90,0.12)", borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 5,
    flexDirection: "row", alignItems: "baseline", gap: 2,
  },
  ptsValue: { fontSize: 16, fontWeight: "600", color: "#C4A35A" },
  ptsSuffix: { fontSize: 9, color: "#C4A35A", fontWeight: "300" },
  body: { flexDirection: "row", alignItems: "center", gap: 14 },
  emojiBox: {
    width: 52, height: 52, borderRadius: 16,
    alignItems: "center", justifyContent: "center",
  },
  emoji: { fontSize: 24 },
  title: { flex: 1, fontSize: 17, fontWeight: "400", color: "#F7F2EC", lineHeight: 24 },
  desc: { fontSize: 13, fontWeight: "300", color: "rgba(247,242,236,0.6)", lineHeight: 20 },
  cta: {
    backgroundColor: "#C4A35A", borderRadius: 14,
    paddingVertical: 15, alignItems: "center",
  },
  ctaText: { fontSize: 14, fontWeight: "600", color: "#1E1625", letterSpacing: 0.3 },
  doneBadge: {
    backgroundColor: "rgba(91,160,91,0.15)", borderRadius: 14,
    paddingVertical: 13, alignItems: "center",
    borderWidth: 1, borderColor: "rgba(91,160,91,0.3)",
  },
  doneText: { fontSize: 13, color: "#7EC87E", fontWeight: "400" },

  // All done
  allDone: {
    backgroundColor: "rgba(196,163,90,0.08)", borderRadius: 18, padding: 28,
    alignItems: "center", borderWidth: 1, borderColor: "rgba(196,163,90,0.2)", gap: 8,
  },
  allDoneEmoji: { fontSize: 36, color: "#C4A35A" },
  allDoneTitle: { fontSize: 20, fontWeight: "400", color: "#2A1F1A" },
  allDoneText: { fontSize: 12, fontWeight: "300", color: "#6B5147", textAlign: "center", lineHeight: 18 },

  // History
  historySection: { gap: 8 },
  historyTitle: { fontSize: 12, fontWeight: "500", color: "#6B5147", marginBottom: 2 },
  historyItem: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: C.white, borderRadius: 12, padding: 12,
    borderWidth: 1, borderColor: "#E8DDD8",
  },
  historyEmoji: { fontSize: 18 },
  historyText: { flex: 1, fontSize: 12, fontWeight: "300", color: "#6B5147", lineHeight: 17 },
  historyPts: { fontSize: 11, fontWeight: "500", color: "#C4A35A" },
});
