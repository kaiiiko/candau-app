import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PURPLE = "#1E1625";
const GOLD = "#C4A35A";

type Category = "liberté" | "désir" | "regard" | "ose";

interface Phrase {
  id: string;
  cat: Category;
  text: string;
}

const CAT_LABELS: Record<Category, string> = {
  liberté: "Liberté",
  désir: "Désir",
  regard: "Être regardée",
  ose: "Ose",
};

const CAT_EMOJIS: Record<Category, string> = {
  liberté: "🌹",
  désir: "🔥",
  regard: "👁️",
  ose: "💋",
};

const PHRASES: Phrase[] = [
  // ── LIBERTÉ ──
  {
    id: "l01",
    cat: "liberté",
    text: "Ce soir j'ai le droit de coucher avec quelqu'un d'autre. Il me l'a dit. Je peux le faire.",
  },
  {
    id: "l02",
    cat: "liberté",
    text: "Mon corps m'appartient. Ce que j'en fais, avec qui, et comment — c'est mon choix. Il l'a voulu.",
  },
  {
    id: "l03",
    cat: "liberté",
    text: "Je n'ai rien à cacher ce soir. Il sait. Il veut. Je peux y aller entièrement.",
  },
  {
    id: "l04",
    cat: "liberté",
    text: "Il m'a dit 'vas-y'. Pas en sous-entendus — vraiment. Ce soir, j'y vais.",
  },
  {
    id: "l05",
    cat: "liberté",
    text: "Je ne trahis rien. Je vis quelque chose qu'on a choisi ensemble. Je peux en profiter sans retenue.",
  },
  {
    id: "l06",
    cat: "liberté",
    text: "Lui donner ce spectacle, c'est lui faire un cadeau. Je n'ai aucune raison de me retenir.",
  },
  {
    id: "l07",
    cat: "liberté",
    text: "Je suis libre de prendre du plaisir avec un autre ce soir. Complètement, vraiment libre.",
  },
  {
    id: "l08",
    cat: "liberté",
    text: "Je n'appartiens à personne. Il le sait, il l'aime, et ce soir ça me donne des ailes.",
  },
  {
    id: "l09",
    cat: "liberté",
    text: "Il ne me le reprochera pas demain. Il m'attendra. Je peux aller jusqu'au bout.",
  },
  {
    id: "l10",
    cat: "liberté",
    text: "Ce n'est pas de la tromperie. C'est de l'amour qui prend une forme que la plupart n'osent pas imaginer.",
  },
  {
    id: "l11",
    cat: "liberté",
    text: "Il a dit oui pour de vrai. Pas pour me faire plaisir — parce qu'il le veut. Alors ce soir, je lui donne ce qu'il veut.",
  },
  {
    id: "l12",
    cat: "liberté",
    text: "Je suis mariée et libre à la fois. Ces deux choses coexistent ce soir — et c'est magnifique.",
  },
  {
    id: "l13",
    cat: "liberté",
    text: "La honte est une cage que quelqu'un d'autre a construite. Ce soir je l'ouvre et je sors.",
  },
  {
    id: "l14",
    cat: "liberté",
    text: "Il veut me voir libre. La plus belle chose que je puisse lui offrir, c'est d'être exactement ça.",
  },
  {
    id: "l15",
    cat: "liberté",
    text: "Ce soir il n'y a pas de limite — juste ce que je veux, ce qu'il a voulu, et ce qui va se passer.",
  },
  {
    id: "l16",
    cat: "liberté",
    text: "Je rentre après. Et en rentrant, je lui rapporte quelque chose qu'aucun cadeau n'aurait pu lui donner.",
  },
  {
    id: "l17",
    cat: "liberté",
    text: "Ma pudeur a toujours été là pour protéger les autres. Ce soir, elle n'a plus sa place.",
  },
  {
    id: "l18",
    cat: "liberté",
    text: "Ce que je vais vivre ce soir, c'est pour nous. Pas seulement pour lui — pour nous deux.",
  },
  // ── DÉSIR ──
  {
    id: "d01",
    cat: "désir",
    text: "Cet homme me désire. J'ai le droit de le désirer en retour et de le lui montrer.",
  },
  {
    id: "d02",
    cat: "désir",
    text: "Je veux qu'il me touche. Je veux sentir ses mains, sa bouche, son corps. Ce soir, je peux.",
  },
  {
    id: "d03",
    cat: "désir",
    text: "Être dans le lit d'un autre ce soir — et savoir qu'il m'attend — c'est le fantasme que j'ai le droit de vivre.",
  },
  {
    id: "d04",
    cat: "désir",
    text: "Mon désir pour cet homme est réel et légitime. Je n'ai pas à l'éteindre.",
  },
  {
    id: "d05",
    cat: "désir",
    text: "Je mérite de jouir avec quelqu'un d'autre ce soir. Il l'a voulu. Je le veux aussi.",
  },
  {
    id: "d06",
    cat: "désir",
    text: "Sentir un corps différent, une façon de toucher différente — je m'y autorise pleinement.",
  },
  {
    id: "d07",
    cat: "désir",
    text: "Ce soir, j'ai envie de lui. Et j'ai le droit d'agir sur cette envie.",
  },
  {
    id: "d08",
    cat: "désir",
    text: "Je vais rentrer chez moi après. Mais avant, je prends ce que je veux.",
  },
  {
    id: "d09",
    cat: "désir",
    text: "Ce corps qui me désire ce soir — je lui appartiens pour quelques heures. Et j'ai tout à fait le droit.",
  },
  {
    id: "d10",
    cat: "désir",
    text: "Je veux être embrassée, caressée, désirée par cet homme — et je vais le laisser faire.",
  },
  {
    id: "d11",
    cat: "désir",
    text: "Mon désir n'a pas besoin de se justifier. Il est là, il est fort, et ce soir il a carte blanche.",
  },
  {
    id: "d12",
    cat: "désir",
    text: "Sentir ses mains sur moi — pas celles de mon mari — c'est exactement ce qu'il m'a demandé de ressentir.",
  },
  {
    id: "d13",
    cat: "désir",
    text: "Je vais jouir ce soir. Sans retenue, sans pudeur, sans m'excuser. Il le veut autant que moi.",
  },
  {
    id: "d14",
    cat: "désir",
    text: "Ce désir que j'avais mis en veille depuis si longtemps — ce soir il est réveillé. Et je ne le rendors pas.",
  },
  {
    id: "d15",
    cat: "désir",
    text: "Deux hommes me désirent ce soir. L'un est là. L'autre attend. Ce soir, je suis désirable à ce point.",
  },
  // ── REGARD ──
  {
    id: "r01",
    cat: "regard",
    text: "Il me regarde de loin pendant que quelqu'un d'autre me veut. C'est exactement pour ça que je suis là.",
  },
  {
    id: "r02",
    cat: "regard",
    text: "Son regard sur moi pendant que cet homme me touche — c'est le plus grand des cadeaux que je puisse lui faire.",
  },
  {
    id: "r03",
    cat: "regard",
    text: "Je suis la femme qu'on regarde se donner à un autre. Et j'en suis fière.",
  },
  {
    id: "r04",
    cat: "regard",
    text: "Plus je prends de plaisir avec cet homme, plus je lui donne ce qu'il fantasme. Je vais y mettre tout ce que j'ai.",
  },
  {
    id: "r05",
    cat: "regard",
    text: "Il m'a demandé de ne rien retenir ce soir. Je vais lui offrir exactement ça.",
  },
  {
    id: "r06",
    cat: "regard",
    text: "Être vue, désirée par un autre, prise par un autre — c'est ce qu'il veut voir. Je lui donne.",
  },
  {
    id: "r07",
    cat: "regard",
    text: "Je suis son fantasme vivant ce soir. Je vais jouer ce rôle jusqu'au bout, sans retenue.",
  },
  {
    id: "r08",
    cat: "regard",
    text: "Il pense à moi en ce moment, il imagine, il brûle. Cette pensée me donne envie d'aller encore plus loin.",
  },
  {
    id: "r09",
    cat: "regard",
    text: "Je suis le cadeau qu'il s'offre à lui-même — en me laissant vivre ça. Je vais être le plus beau cadeau possible.",
  },
  {
    id: "r10",
    cat: "regard",
    text: "Il verra dans mes yeux ce que j'ai vécu quand je rentrerai. Ce regard-là, je vais le mériter.",
  },
  {
    id: "r11",
    cat: "regard",
    text: "Je vais lui envoyer un message ce soir. Deux mots. Et ces deux mots vont le consumer jusqu'à mon retour.",
  },
  {
    id: "r12",
    cat: "regard",
    text: "Ce corps que cet homme voit ce soir — mon mari me l'a prêté pour la nuit. Je vais en faire honneur.",
  },
  {
    id: "r13",
    cat: "regard",
    text: "Il saura tout demain matin. Et cette pensée — savoir que je vais tout lui raconter — me libère de tout.",
  },
  // ── OSE ──
  {
    id: "o01",
    cat: "ose",
    text: "La timidité que je ressens — je la pose là. Ce soir elle ne m'appartient plus.",
  },
  {
    id: "o02",
    cat: "ose",
    text: "Je l'ai imaginé cent fois. Ce soir c'est réel. La seule chose qui reste, c'est d'y aller.",
  },
  {
    id: "o03",
    cat: "ose",
    text: "Si je ne le fais pas ce soir, je m'en voudrai. Alors autant aller jusqu'au bout.",
  },
  {
    id: "o04",
    cat: "ose",
    text: "Il m'attend à la maison. La meilleure façon de le retrouver, c'est d'être allée au bout.",
  },
  {
    id: "o05",
    cat: "ose",
    text: "Une femme qui ose prendre ce qu'elle veut — c'est la femme qu'il m'a demandé d'être ce soir.",
  },
  {
    id: "o06",
    cat: "ose",
    text: "Il me l'a dit clairement : 'vas-y, ne te retiens pas.' Je lui fais confiance. J'y vais.",
  },
  {
    id: "o07",
    cat: "ose",
    text: "Le pire qui puisse arriver, c'est d'aimer ça. J'ai décidé que j'avais le droit d'aimer ça.",
  },
  {
    id: "o08",
    cat: "ose",
    text: "Je mérite de vivre ce que j'ai fantasmé, pas juste d'y penser. Ce soir, c'est le moment.",
  },
  {
    id: "o09",
    cat: "ose",
    text: "Cet homme est là, il me veut. Je n'ai rien à perdre et tout à vivre.",
  },
  {
    id: "o10",
    cat: "ose",
    text: "Je suis capable de prendre ce que je veux. Ce soir, je le prouve — pour moi, et pour lui.",
  },
  {
    id: "o11",
    cat: "ose",
    text: "J'arrête d'attendre d'être 'prête'. On n'est jamais prête. On y va, et on devient prête en y allant.",
  },
  {
    id: "o12",
    cat: "ose",
    text: "Ce soir je dis oui — pas à moitié, pas du bout des lèvres. Oui pour de vrai, sans retenue.",
  },
  {
    id: "o13",
    cat: "ose",
    text: "Le blocage que je ressens — c'est la peur de trop aimer ça. Et ça, ce n'est pas une raison de reculer.",
  },
  {
    id: "o14",
    cat: "ose",
    text: "J'ai passé des mois à me demander si je pouvais. Ce soir j'arrête de me demander et je prouve que oui.",
  },
  {
    id: "o15",
    cat: "ose",
    text: "Chaque fois que j'ai reculé, j'ai regretté. Ce soir je ne recule pas.",
  },
  {
    id: "o16",
    cat: "ose",
    text: "Il n'attend pas que je sois parfaite. Il attend que je sois là — pleinement, entièrement là.",
  },
  {
    id: "o17",
    cat: "ose",
    text: "Ce soir je suis la version de moi-même qui n'a plus peur. Elle existe. Je la laisse prendre le dessus.",
  },
  {
    id: "o18",
    cat: "ose",
    text: "Dans un an je me souviendrai de ce soir. Autant m'en donner un souvenir qui vaut quelque chose.",
  },
];

function getDailyPhrases(): Phrase[] {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  let s = seed;
  const pick = (offset: number) => {
    s = (s * 1664525 + 1013904223 + offset) & 0x7fffffff;
    return PHRASES[Math.abs(s) % PHRASES.length];
  };
  const picks: Phrase[] = [];
  const used = new Set<string>();
  let i = 0;
  while (picks.length < 3) {
    const p = pick(i++);
    if (!used.has(p.id)) {
      used.add(p.id);
      picks.push(p);
    }
  }
  return picks;
}

const ALL_CATS: Category[] = ["liberté", "désir", "regard", "ose"];

export default function MotivationScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const [activeCat, setActiveCat] = useState<Category | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const dailyPhrases = getDailyPhrases();
  const today = new Date();
  const dateLabel = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const displayed =
    activeCat === "all"
      ? PHRASES
      : PHRASES.filter((p) => p.cat === activeCat);

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: topPad + 16 }]}>
          <Text style={styles.appName}>CANDAU</Text>
          <Text style={styles.title}>
            Pour <Text style={styles.italic}>m'autoriser</Text>
          </Text>
          <Text style={styles.sub}>
            Lis ces phrases quand tu en as besoin. Elles sont pour toi.
          </Text>
        </View>

        {/* Phrases du jour */}
        <View style={styles.dailySection}>
          <View style={styles.dailyHeader}>
            <Text style={styles.dailyLabel}>PHRASES DU JOUR</Text>
            <Text style={styles.dailyDate}>{dateLabel}</Text>
          </View>
          {dailyPhrases.map((phrase, idx) => (
            <View key={phrase.id} style={styles.dailyCard}>
              <View style={styles.dailyNum}>
                <Text style={styles.dailyNumText}>{idx + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.dailyCatRow}>
                  {CAT_EMOJIS[phrase.cat]}{" "}
                  <Text style={styles.dailyCatLabel}>
                    {CAT_LABELS[phrase.cat].toUpperCase()}
                  </Text>
                </Text>
                <Text style={styles.dailyText}>{phrase.text}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* All phrases */}
        <View style={styles.allSection}>
          <Text style={styles.sectionTitle}>TOUTES LES PHRASES</Text>

          {/* Category filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            <TouchableOpacity
              style={[
                styles.filterPill,
                activeCat === "all" && styles.filterActive,
              ]}
              onPress={() => setActiveCat("all")}
            >
              <Text
                style={[
                  styles.filterText,
                  activeCat === "all" && styles.filterTextActive,
                ]}
              >
                Toutes
              </Text>
            </TouchableOpacity>
            {ALL_CATS.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.filterPill,
                  activeCat === cat && styles.filterActive,
                ]}
                onPress={() => setActiveCat(cat)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeCat === cat && styles.filterTextActive,
                  ]}
                >
                  {CAT_EMOJIS[cat]} {CAT_LABELS[cat]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* List */}
          <View style={styles.list}>
            {displayed.map((phrase) => {
              const isOpen = expanded === phrase.id;
              return (
                <TouchableOpacity
                  key={phrase.id}
                  style={[styles.card, isOpen && styles.cardOpen]}
                  onPress={() => setExpanded(isOpen ? null : phrase.id)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.catEmoji}>{CAT_EMOJIS[phrase.cat]}</Text>
                  <Text
                    style={[
                      styles.phraseText,
                      isOpen && styles.phraseTextOpen,
                    ]}
                  >
                    {phrase.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ height: Platform.OS === "web" ? 120 : 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F7F2EC" },

  header: {
    backgroundColor: PURPLE,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  appName: {
    fontSize: 11,
    fontWeight: "300",
    letterSpacing: 5,
    color: "#C9A99A",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "300",
    color: "#F7F2EC",
    marginBottom: 6,
  },
  italic: { fontStyle: "italic", color: GOLD },
  sub: {
    fontSize: 13,
    fontWeight: "300",
    color: "rgba(247,242,236,0.45)",
    lineHeight: 20,
  },

  // Daily section
  dailySection: {
    backgroundColor: PURPLE,
    paddingHorizontal: 20,
    paddingBottom: 28,
    gap: 12,
  },
  dailyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  dailyLabel: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 2,
    color: GOLD,
  },
  dailyDate: {
    fontSize: 10,
    fontWeight: "300",
    color: "rgba(247,242,236,0.3)",
    textTransform: "capitalize",
  },
  dailyCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(196,163,90,0.2)",
    padding: 16,
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
  },
  dailyNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: GOLD,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  dailyNumText: {
    fontSize: 12,
    fontWeight: "700",
    color: PURPLE,
  },
  dailyCatRow: {
    fontSize: 10,
    marginBottom: 6,
    color: GOLD,
  },
  dailyCatLabel: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 1.2,
    color: GOLD,
  },
  dailyText: {
    fontSize: 15,
    fontWeight: "300",
    color: "#F7F2EC",
    lineHeight: 23,
    fontStyle: "italic",
  },

  // All section
  allSection: {
    padding: 20,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 2,
    color: "#9A8A82",
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 4,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(30,22,37,0.15)",
    backgroundColor: "rgba(30,22,37,0.04)",
  },
  filterActive: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#6B5147",
  },
  filterTextActive: {
    color: GOLD,
    fontWeight: "500",
  },

  list: { gap: 10 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(196,163,90,0.12)",
    shadowColor: "#1E1625",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardOpen: {
    backgroundColor: PURPLE,
    borderColor: GOLD,
  },
  catEmoji: { fontSize: 16, marginTop: 1 },
  phraseText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "300",
    color: "#2A1F2E",
    lineHeight: 22,
    fontStyle: "italic",
  },
  phraseTextOpen: {
    color: "#F7F2EC",
    fontSize: 15,
    lineHeight: 24,
  },
});
