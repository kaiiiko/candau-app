export type DefiCategory =
  | "gage"
  | "communication"
  | "regard"
  | "connexion"
  | "fantasme";

export type Difficulty = "facile" | "moyen" | "osé";

export interface Defi {
  id: string;
  cat: DefiCategory;
  difficulty: Difficulty;
  points: number;
  emoji: string;
  title: string;
  desc: string;
  duree: string;
}

export interface Recompense {
  id: string;
  cost: number;
  emoji: string;
  title: string;
  desc: string;
  tier: "bronze" | "argent" | "or" | "platine";
}

export const CAT_LABELS: Record<DefiCategory, string> = {
  gage: "Gage",
  communication: "Dialogue",
  regard: "Regard",
  connexion: "Connexion",
  fantasme: "Fantasme",
};

export const CAT_COLORS: Record<DefiCategory, string> = {
  gage: "#C4A35A",
  communication: "#A0604A",
  regard: "#9DA8D8",
  connexion: "#C9A99A",
  fantasme: "#8B6B9E",
};

export const CAT_BG: Record<DefiCategory, string> = {
  gage: "#FDF7EC",
  communication: "#FDF0EB",
  regard: "#EEF0FA",
  connexion: "#FDF5F3",
  fantasme: "#F5F0FA",
};

export const DIFF_COLORS: Record<Difficulty, string> = {
  facile: "#8FBC8F",
  moyen: "#C4A35A",
  osé: "#A0604A",
};

export const DIFF_LABELS: Record<Difficulty, string> = {
  facile: "Chaud · ",
  moyen: "Très chaud · ",
  osé: "Brûlant · ",
};

export const DEFIS: Defi[] = [
  // ── GAGES ──
  {
    id: "g01",
    cat: "gage",
    difficulty: "facile",
    points: 20,
    emoji: "📱",
    title: "Le message qui brûle",
    desc: "Envoyez-lui, en pleine journée depuis votre lieu de travail, un message détaillant exactement ce que vous voulez lui faire ce soir. Positions, endroits, demandes — rien n'est censuré.",
    duree: "5 min",
  },
  {
    id: "g02",
    cat: "gage",
    difficulty: "facile",
    points: 20,
    emoji: "🎙️",
    title: "L'audio interdit",
    desc: "Enregistrez un message vocal de 2 minutes décrivant votre fantasme du moment à voix basse, comme si vous étiez juste à son oreille. Chaque détail, chaque demande, sans filtre. Envoyez sans prévenir.",
    duree: "10 min",
  },
  {
    id: "g03",
    cat: "gage",
    difficulty: "moyen",
    points: 35,
    emoji: "👗",
    title: "Commando toute la soirée",
    desc: "Ce soir, vous sortez dîner ou recevez des gens sans aucun sous-vêtement. Votre partenaire est le seul à le savoir. Vous lui glissez l'information à l'oreille dès le début de la soirée.",
    duree: "Soirée",
  },
  {
    id: "g04",
    cat: "gage",
    difficulty: "moyen",
    points: 35,
    emoji: "🪟",
    title: "La fenêtre ouverte",
    desc: "Faites l'amour en laissant les rideaux entrouverts, lumière allumée. Vous ne savez pas si quelqu'un regarde — et cette incertitude est exactement le but.",
    duree: "—",
  },
  {
    id: "g05",
    cat: "gage",
    difficulty: "osé",
    points: 55,
    emoji: "📸",
    title: "La photo depuis les toilettes",
    desc: "Prenez une photo de vous — nu·e ou dans la tenue la plus suggestive que vous ayez — depuis les toilettes de votre bureau, d'un restaurant ou d'un bar. Envoyez-la immédiatement à votre partenaire. Aucun texte.",
    duree: "5 min",
  },
  {
    id: "g06",
    cat: "gage",
    difficulty: "osé",
    points: 55,
    emoji: "🔐",
    title: "Carte blanche totale",
    desc: "Pendant 45 minutes vous accordez un contrôle total à votre partenaire. Lieu, positions, vitesse, mots, demandes — vous dites oui à tout sans négocier. Un seul droit : votre mot de sécurité.",
    duree: "45 min",
  },
  {
    id: "g07",
    cat: "gage",
    difficulty: "moyen",
    points: 35,
    emoji: "🎭",
    title: "La tenue imposée",
    desc: "Votre partenaire choisit ce que vous portez ce soir — ou l'absence de tenue. Vous portez sa sélection sans commenter, sans vous couvrir davantage, et vous l'assumez jusqu'au bout.",
    duree: "Soirée",
  },
  {
    id: "g08",
    cat: "gage",
    difficulty: "facile",
    points: 20,
    emoji: "👄",
    title: "L'aveu à table",
    desc: "En plein repas au restaurant, penchez-vous et chuchotez à votre partenaire la dernière chose à laquelle vous avez pensé en vous touchant. En détail. Sans baisser les yeux.",
    duree: "—",
  },
  {
    id: "g09",
    cat: "gage",
    difficulty: "osé",
    points: 55,
    emoji: "🚗",
    title: "Dans la voiture",
    desc: "Garez-vous dans un endroit discret à la nuit tombée. Pas de chambre, pas de lit — juste la voiture. Faites-le là, maintenant, comme si vous aviez 20 ans et nulle part où aller.",
    duree: "—",
  },
  // ── COMMUNICATION ──
  {
    id: "c01",
    cat: "communication",
    difficulty: "facile",
    points: 20,
    emoji: "🔥",
    title: "Dire ce qu'on veut vraiment",
    desc: "Dites à voix haute, sans métaphore, la chose précise que vous voulez que votre partenaire vous fasse ce soir. Pas 'd'être avec toi' — quelque chose de précis, de physique, de cru.",
    duree: "5 min",
  },
  {
    id: "c02",
    cat: "communication",
    difficulty: "moyen",
    points: 30,
    emoji: "🗺️",
    title: "La carte du désir",
    desc: "Chacun écrit : 3 choses sexuelles que vous voulez essayer ensemble, 2 fantasmes que vous n'avez jamais osé dire, 1 limite ferme. Vous échangez et lisez à voix haute. Aucun jugement autorisé.",
    duree: "20 min",
  },
  {
    id: "c03",
    cat: "communication",
    difficulty: "facile",
    points: 20,
    emoji: "🌡️",
    title: "Le niveau de désir",
    desc: "Demandez-lui sur 10 à quel point il/elle a envie de vous là maintenant, et ce qu'il/elle voudrait faire. Répondez honnêtement. C'est souvent explosif.",
    duree: "5 min",
  },
  {
    id: "c04",
    cat: "communication",
    difficulty: "moyen",
    points: 30,
    emoji: "📝",
    title: "Le scénario à deux",
    desc: "Écrivez un scénario sexuel à tour de rôle, une phrase chacun, sans censurer ni corriger l'autre. Chaque phrase doit aller plus loin que la précédente. Lisez-le à voix haute ensemble.",
    duree: "20 min",
  },
  {
    id: "c05",
    cat: "communication",
    difficulty: "osé",
    points: 50,
    emoji: "🔓",
    title: "Le fantasme le plus inavouable",
    desc: "Décrivez à votre partenaire, dans tous les détails, le scénario le plus interdit que vous n'avez jamais dit à personne. Pas pour le vivre nécessairement — juste pour ne plus avoir à le porter seul·e.",
    duree: "15 min",
  },
  {
    id: "c06",
    cat: "communication",
    difficulty: "facile",
    points: 20,
    emoji: "👁️",
    title: "Ce que vous aimez regarder",
    desc: "Dites-lui précisément ce qui vous excite chez lui/elle physiquement — pas 'tu es beau/belle', quelque chose de précis : une courbe, un geste, la façon dont il/elle vous regarde. Avec des mots crus si besoin.",
    duree: "10 min",
  },
  // ── REGARD ──
  {
    id: "r01",
    cat: "regard",
    difficulty: "facile",
    points: 25,
    emoji: "👁️",
    title: "Se déshabiller sous le regard",
    desc: "Déshababillez-vous lentement devant votre partenaire assis·e en face de vous. Pas de précipitation, pas de pudeur. Regardez-le/la dans les yeux jusqu'au dernier vêtement.",
    duree: "10 min",
  },
  {
    id: "r02",
    cat: "regard",
    difficulty: "moyen",
    points: 40,
    emoji: "📸",
    title: "La séance photo chaude",
    desc: "Votre partenaire vous dirige pour une séance photo suggestive ou explicite — poses, tenue ou nudité, expressions. Vous obéissez à chaque instruction. Les photos restent entre vous deux.",
    duree: "20 min",
  },
  {
    id: "r03",
    cat: "regard",
    difficulty: "moyen",
    points: 40,
    emoji: "🪞",
    title: "Le miroir comme témoin",
    desc: "Faites l'amour devant un miroir, ou installez-en un pour vous voir. Ne détournez pas le regard. Regardez ce que vous faites, regardez-vous en train de jouir.",
    duree: "—",
  },
  {
    id: "r04",
    cat: "regard",
    difficulty: "osé",
    points: 60,
    emoji: "🎬",
    title: "La vidéo privée",
    desc: "Filmez 2 à 5 minutes de vous deux — bisers, corps nus, ébats. Regardez-la ensemble immédiatement après. Usage et effacement décidés ensemble avant, sans aucune exception.",
    duree: "—",
  },
  {
    id: "r05",
    cat: "regard",
    difficulty: "facile",
    points: 25,
    emoji: "🌙",
    title: "Se toucher sous son regard",
    desc: "Devant votre partenaire qui vous regarde sans vous toucher, montrez-lui exactement comment et où vous aimez être touché·e. Lentement. Sans pudeur. C'est un guide, pas un spectacle.",
    duree: "10 min",
  },
  {
    id: "r06",
    cat: "regard",
    difficulty: "osé",
    points: 60,
    emoji: "👀",
    title: "Le regard imaginaire",
    desc: "Pendant l'amour, l'un de vous décrit à voix haute quelqu'un qui vous observe — physique, ce qu'il/elle voit, ce qu'il/elle ressent. L'autre laisse cette image envahir le moment complètement.",
    duree: "—",
  },
  {
    id: "r07",
    cat: "regard",
    difficulty: "moyen",
    points: 40,
    emoji: "🛁",
    title: "Douche sous surveillance",
    desc: "L'un de vous prend une douche, l'autre regarde — assis·e sur le bord de la baignoire ou debout dans l'encadrement. Pas de participation. Juste le regard, jusqu'au bout.",
    duree: "15 min",
  },
  // ── CONNEXION ──
  {
    id: "cn01",
    cat: "connexion",
    difficulty: "facile",
    points: 20,
    emoji: "🫦",
    title: "Le baiser qui dure",
    desc: "Embrassez-vous pendant 5 minutes complètes — nulle part ailleurs, pas de précipitation. Juste les lèvres, les mains libres qui explorent, les yeux parfois ouverts. Voyez ce qui se passe après.",
    duree: "5 min",
  },
  {
    id: "cn02",
    cat: "connexion",
    difficulty: "facile",
    points: 20,
    emoji: "🔥",
    title: "Le meilleur souvenir",
    desc: "Racontez-lui le souvenir sexuel que vous avez de lui/elle qui vous revient le plus souvent. Dans tous les détails. Regardez-le/la pendant que vous parlez.",
    duree: "10 min",
  },
  {
    id: "cn03",
    cat: "connexion",
    difficulty: "moyen",
    points: 30,
    emoji: "🎧",
    title: "Dans le noir total",
    desc: "Éteignez toutes les lumières. Musique lente. Restez ensemble 20 minutes — vous toucher, vous sentir, vous embrasser — sans viser un objectif. Allez aussi loin que la nuit vous emmène.",
    duree: "20 min",
  },
  {
    id: "cn04",
    cat: "connexion",
    difficulty: "moyen",
    points: 30,
    emoji: "📜",
    title: "Le contrat de la nuit",
    desc: "Écrivez ensemble les règles de la nuit — ce que vous voulez essayer, ce que chacun peut demander, ce qui est interdit. Signez tous les deux. Puis respectez-le à la lettre.",
    duree: "15 min",
  },
  {
    id: "cn05",
    cat: "connexion",
    difficulty: "osé",
    points: 50,
    emoji: "💬",
    title: "Parler pendant l'acte",
    desc: "Ce soir, vous parlez pendant l'amour — vous décrivez ce que vous ressentez, vous demandez explicitement ce que vous voulez, vous dites exactement ce que vous aimez. Sans filtre, sans silence.",
    duree: "—",
  },
  {
    id: "cn06",
    cat: "connexion",
    difficulty: "osé",
    points: 50,
    emoji: "🫴",
    title: "Jeu de rôle : inconnus",
    desc: "Choisissez un bar ou un café. Entrez séparément, à 10 minutes d'écart. Faites semblant de ne pas vous connaître. Draguez-vous comme si c'était la première fois. Finissez la nuit comme des étrangers qui cèdent.",
    duree: "2–3h",
  },
  // ── FANTASME ──
  {
    id: "f01",
    cat: "fantasme",
    difficulty: "facile",
    points: 25,
    emoji: "☁️",
    title: "Le fantasme du réveil",
    desc: "Avant de vous lever, décrivez à votre partenaire exactement ce à quoi vous pensez en ce moment. La scène, les corps, les sensations. Précis. Cru si nécessaire.",
    duree: "10 min",
  },
  {
    id: "f02",
    cat: "fantasme",
    difficulty: "moyen",
    points: 40,
    emoji: "👤",
    title: "Le tiers imaginaire",
    desc: "Inventez ensemble un personnage — physique précis, attitude, ce qu'il/elle vous ferait ou vous regarderait faire. Décrivez la scène en détail. Puis faites l'amour en gardant cette image en tête.",
    duree: "—",
  },
  {
    id: "f03",
    cat: "fantasme",
    difficulty: "moyen",
    points: 40,
    emoji: "📖",
    title: "La nouvelle érotique",
    desc: "L'un de vous écrit une nouvelle sexuellement explicite (une page) vous mettant en scène. L'autre la lit à voix haute ce soir, jusqu'au bout, sans sauter une ligne.",
    duree: "20 min",
  },
  {
    id: "f04",
    cat: "fantasme",
    difficulty: "osé",
    points: 60,
    emoji: "🎭",
    title: "Jouer le rôle jusqu'au bout",
    desc: "Scénario choisi ensemble — patron et employé·e, inconnus dans un hôtel, prof et étudiant·e — joué du début à la fin sans sortir du personnage. Le scénario commence dehors, avant même de rentrer.",
    duree: "2–3h",
  },
  {
    id: "f05",
    cat: "fantasme",
    difficulty: "osé",
    points: 60,
    emoji: "🔑",
    title: "La demande impossible",
    desc: "Dites à votre partenaire la chose que vous n'avez jamais osé demander — la plus inavouable, la plus intense. Pas pour la faire ce soir nécessairement. Juste pour briser ce silence-là, une fois pour toutes.",
    duree: "10 min",
  },
  {
    id: "f06",
    cat: "fantasme",
    difficulty: "moyen",
    points: 40,
    emoji: "🌹",
    title: "Objet du désir",
    desc: "Ce soir votre partenaire vous traite comme un objet de désir pur — pas de tendresse, pas de conversation, juste l'envie brute. Vous avez dit oui. Vous vous laissez complètement faire.",
    duree: "—",
  },
  {
    id: "f07",
    cat: "fantasme",
    difficulty: "facile",
    points: 25,
    emoji: "🎲",
    title: "Le fantasme au dé",
    desc: "Chacun écrit 3 fantasmes sur des papiers numérotés 1 à 6. On lance un dé. Le numéro sorti sera réalisé ce soir — sans discussion ni recul possible.",
    duree: "15 min",
  },
  {
    id: "f08",
    cat: "fantasme",
    difficulty: "osé",
    points: 60,
    emoji: "🏨",
    title: "La chambre d'hôtel",
    desc: "Réservez une chambre d'hôtel pour une nuit. Arrivez séparément, lui d'abord. Elle frappe à la porte 15 minutes après. La nuit commence là — dans une chambre neutre, loin de tout ce qui est familier.",
    duree: "1 nuit",
  },
  // ── HARD — CANDAULISME DIRECT ──
  {
    id: "h01",
    cat: "fantasme",
    difficulty: "osé",
    points: 80,
    emoji: "🔥",
    title: "Le soir avec un autre",
    desc: "Ce soir, elle passe la soirée avec un homme de son choix. Il sait. Il a dit oui. Elle ne se retient sur rien. Elle rentre quand elle veut. Il attend. Pas de messages de vérification — juste la confiance totale.",
    duree: "Soirée",
  },
  {
    id: "h02",
    cat: "gage",
    difficulty: "osé",
    points: 80,
    emoji: "💬",
    title: "Raconter en détail",
    desc: "Elle raconte à voix haute, sans rien omettre, ce qu'elle a fait avec l'autre — positions, moments, sensations, ce qu'elle a ressenti. Il écoute sans l'interrompre. Il peut poser des questions. Elle répond à tout.",
    duree: "30 min",
  },
  {
    id: "h03",
    cat: "regard",
    difficulty: "osé",
    points: 80,
    emoji: "👁️",
    title: "Il regarde, en direct",
    desc: "Il est présent dans la pièce — ou dans la pièce adjacente, porte entrouverte — pendant qu'elle est avec un autre. Il ne participe pas. Il regarde. Elle sait qu'il regarde. C'est exactement le but.",
    duree: "—",
  },
  {
    id: "h04",
    cat: "gage",
    difficulty: "osé",
    points: 75,
    emoji: "📱",
    title: "Les messages en direct",
    desc: "Pendant qu'elle est avec l'autre, elle lui envoie un message toutes les 30 minutes. Pas de code — des mots clairs, crus, précis. Ce qui se passe, ce qu'elle ressent. Il répond deux mots : 'continue.' Et elle continue.",
    duree: "—",
  },
  {
    id: "h05",
    cat: "fantasme",
    difficulty: "osé",
    points: 75,
    emoji: "🎬",
    title: "La vidéo pour lui",
    desc: "Pendant qu'elle est avec l'autre, ils filment une courte scène — 2 à 3 minutes — que lui pourra regarder seul ce soir. Usage et effacement décidés ensemble à l'avance. La scène est pour ses yeux seulement.",
    duree: "—",
  },
  {
    id: "h06",
    cat: "communication",
    difficulty: "osé",
    points: 70,
    emoji: "🗣️",
    title: "Débrief brûlant",
    desc: "Le lendemain matin, autour d'un café, elle lui raconte tout — de A à Z — avec le même niveau de détail que si elle écrivait un roman. Lui pose des questions précises. Elle ne censure rien. On finit le café. La nuit recommence.",
    duree: "1h",
  },
  {
    id: "h07",
    cat: "gage",
    difficulty: "osé",
    points: 70,
    emoji: "🍷",
    title: "Le dîner à trois",
    desc: "Dîner à trois : lui, elle, et l'autre. Comportement normal en apparence — mais lui sait ce que l'autre lui a fait ou lui fera ce soir. Cette tension sous la surface, maintenue jusqu'à la fin du repas, est le vrai défi.",
    duree: "2–3h",
  },
  {
    id: "h08",
    cat: "regard",
    difficulty: "osé",
    points: 75,
    emoji: "🌙",
    title: "Elle rentre au petit matin",
    desc: "Elle passe la nuit entière dehors. Il ne l'appelle pas. Elle rentre quand la nuit est finie — elle, ses vêtements de la veille, son sourire. Lui est réveillé et l'attend. Ce moment d'arrivée est la récompense de tous les deux.",
    duree: "1 nuit",
  },
  {
    id: "h09",
    cat: "connexion",
    difficulty: "osé",
    points: 70,
    emoji: "💋",
    title: "Le retour",
    desc: "Quand elle rentre de chez l'autre, il ne lui demande rien tout de suite. Il l'embrasse, longuement, sans un mot. Puis ils font l'amour — immédiatement, sans douche, sans transition. Ce qui vient de se passer est encore présent. C'est voulu.",
    duree: "—",
  },
  {
    id: "h10",
    cat: "fantasme",
    difficulty: "osé",
    points: 80,
    emoji: "🔑",
    title: "Carte blanche pour la nuit",
    desc: "Il lui dit : 'cette nuit tu fais ce que tu veux, avec qui tu veux, jusqu'à l'heure que tu veux. Je veux juste tout savoir demain.' Elle décide seule. Il n'intervient pas. Il attend. Il saura tout au matin.",
    duree: "1 nuit",
  },
  {
    id: "h11",
    cat: "communication",
    difficulty: "osé",
    points: 65,
    emoji: "📝",
    title: "Elle écrit, il lit",
    desc: "Après une soirée avec un autre, elle écrit tout — une page ou plus — dans les détails les plus précis. Sensations, pensées, moments. Elle lui donne à lire le lendemain sans être dans la pièce. Il lit seul. Il la retrouve ensuite.",
    duree: "—",
  },
  {
    id: "h12",
    cat: "regard",
    difficulty: "osé",
    points: 70,
    emoji: "🖼️",
    title: "La photo qu'il lui envoie",
    desc: "Pendant qu'elle est avec l'autre, l'autre prend une photo d'elle — consentie, suggestive — et la lui envoie directement. Il reçoit. Il voit. Elle sait qu'il a reçu. Aucun commentaire ce soir — juste l'image.",
    duree: "—",
  },
  {
    id: "h13",
    cat: "gage",
    difficulty: "osé",
    points: 65,
    emoji: "🎙️",
    title: "L'audio qu'il reçoit",
    desc: "Depuis chez l'autre, en pleine soirée, elle enregistre un message vocal de 60 secondes et le lui envoie. Sa voix, l'ambiance, ce qu'elle ressent — maintenant, en temps réel. Il écoute seul. Il répond un seul mot.",
    duree: "—",
  },
  {
    id: "h14",
    cat: "connexion",
    difficulty: "moyen",
    points: 45,
    emoji: "🧠",
    title: "Fantasmer ensemble sur quelqu'un de réel",
    desc: "Choisissez ensemble — maintenant, ce soir — un homme précis et réel que vous connaissez tous les deux. Décrivez à voix haute, en détail, ce que vous imaginez. Puis faites l'amour avec cette image en tête, les yeux fermés.",
    duree: "—",
  },
  {
    id: "h15",
    cat: "fantasme",
    difficulty: "osé",
    points: 75,
    emoji: "🌹",
    title: "Elle choisit l'homme",
    desc: "Elle désigne un homme — dans leur entourage ou non — et lui annonce : 'c'est lui que je veux.' Il dit oui ou il négocie, mais il ne dit pas non. Ensemble ils définissent comment ça se passe. Puis ça se passe.",
    duree: "—",
  },
  // ── PARCOURS EN 20 ÉTAPES ──

  // ─ PHASE 1 : L'ENGAGEMENT ─
  {
    id: "p01",
    cat: "communication",
    difficulty: "facile",
    points: 20,
    emoji: "🤝",
    title: "Étape 1 — L'engagement solennel",
    desc: "Elle dit à voix haute, face à lui, les yeux dans les yeux : 'Je vais le faire. Je m'engage.' Il répond : 'Je sais. Je t'attends.' Ces mots prononcés à voix haute rendent la chose réelle. Ce défi ne peut pas être annulé une fois dit.",
    duree: "5 min",
  },
  {
    id: "p02",
    cat: "communication",
    difficulty: "facile",
    points: 25,
    emoji: "🌅",
    title: "Étape 2 — La phrase du matin",
    desc: "Pendant 7 jours consécutifs, chaque matin au réveil, elle lui dit cette phrase exacte : 'Je cherche. Je vais trouver.' Pas de variante. Cette répétition quotidienne transforme l'intention en réalité. Le défi est réussi après les 7 matins — sans en manquer un seul.",
    duree: "7 jours",
  },
  {
    id: "p03",
    cat: "connexion",
    difficulty: "facile",
    points: 30,
    emoji: "📲",
    title: "Étape 3 — Le profil activé",
    desc: "Elle crée ou réactive un profil sur l'application ou le réseau de son choix — avec une vraie photo, une vraie description. Elle le lui montre avant de valider. Il approuve. Elle publie. Le parcours commence ici, concrètement.",
    duree: "20 min",
  },

  // ─ PHASE 2 : LA RECHERCHE ─
  {
    id: "p04",
    cat: "regard",
    difficulty: "facile",
    points: 35,
    emoji: "🔍",
    title: "Étape 4 — Le candidat identifié",
    desc: "Elle cherche activement et identifie un candidat ou une candidate qui l'intéresse vraiment. Elle lui montre le profil. Ils en parlent ensemble — elle explique pourquoi cette personne l'attire. Cette conversation compte autant que la recherche elle-même.",
    duree: "—",
  },
  {
    id: "p05",
    cat: "communication",
    difficulty: "facile",
    points: 40,
    emoji: "💬",
    title: "Étape 5 — Le premier message",
    desc: "Elle envoie le premier message — normalement, sans forcer, comme une vraie conversation. Elle le rédige devant lui, il voit l'écran. Il dit 'vas-y'. Elle appuie sur envoyer. C'est parti. La conversation est ouverte.",
    duree: "5 min",
  },

  // ─ PHASE 3 : LA CONNEXION ─
  {
    id: "p06",
    cat: "connexion",
    difficulty: "facile",
    points: 40,
    emoji: "🗣️",
    title: "Étape 6 — La conversation s'installe",
    desc: "Les échanges se font réguliers. Elle lui lit un extrait chaque soir — un message qui lui a plu, une répartie qui l'a fait sourire. Il écoute. Ce partage quotidien maintient leur complicité pendant qu'elle explore.",
    duree: "Quelques jours",
  },
  {
    id: "p07",
    cat: "connexion",
    difficulty: "moyen",
    points: 45,
    emoji: "🔥",
    title: "Étape 7 — La conversation devient chaude",
    desc: "Avant 7 jours depuis le premier message, la conversation bascule — elle devient suggestive, sensuelle, sans équivoque. Elle lui montre les échanges chauds ce soir-là, sans filtrer. Il lit. Ils en parlent ensemble. Cette transparence-là est une intimité à part entière.",
    duree: "Avant J+7",
  },
  {
    id: "p08",
    cat: "communication",
    difficulty: "moyen",
    points: 45,
    emoji: "📊",
    title: "Étape 8 — Le rapport de progression",
    desc: "Elle fait le point avec lui : où en est la conversation, ce qu'elle ressent, ce qu'elle veut. Elle partage les screenshots les plus significatifs. Ce bilan à deux renforce leur lien et l'aide à avancer sans hésiter.",
    duree: "30 min",
  },

  // ─ PHASE 4 : L'ESCALADE ─
  {
    id: "p09",
    cat: "regard",
    difficulty: "moyen",
    points: 50,
    emoji: "📸",
    title: "Étape 9 — La première photo envoyée",
    desc: "Elle envoie une première photo à l'autre — suggestive, mais pas explicite. Elle choisit laquelle. Il la voit avant qu'elle parte. Il dit 'celle-là'. Elle l'envoie. Ce geste marque un franchissement clair dans la connexion.",
    duree: "—",
  },
  {
    id: "p10",
    cat: "fantasme",
    difficulty: "moyen",
    points: 55,
    emoji: "💌",
    title: "Étape 10 — Le désir confirmé",
    desc: "L'autre exprime clairement qu'il veut la voir. Elle lui montre le message. Ensemble, ils lisent ces mots qui disent qu'on la désire. Elle voit dans ses yeux à lui que ça lui plaît. Ce moment-là, à trois à travers un écran, est unique.",
    duree: "—",
  },
  {
    id: "p11",
    cat: "gage",
    difficulty: "moyen",
    points: 55,
    emoji: "📅",
    title: "Étape 11 — Le rendez-vous fixé",
    desc: "Une date, une heure, un lieu — concrets et confirmés. Elle lui annonce la date ce soir. Il choisit ce qu'elle portera. Elle accepte sa sélection. Le rendez-vous est dans le calendrier. Il n'y a plus à décider, juste à y aller.",
    duree: "—",
  },
  {
    id: "p12",
    cat: "communication",
    difficulty: "moyen",
    points: 55,
    emoji: "📞",
    title: "Étape 12 — L'appel juste avant de partir",
    desc: "Habillée, prête, devant la porte — elle l'appelle. Trente secondes. Elle dit : 'Je pars.' Il répond : 'Je t'aime. Vas-y.' Elle raccroche. Et elle ouvre la porte. Cet appel ancre leur complicité au moment précis où l'aventure commence.",
    duree: "30 sec",
  },

  // ─ PHASE 5 : LE RENDEZ-VOUS ─
  {
    id: "p13",
    cat: "connexion",
    difficulty: "osé",
    points: 65,
    emoji: "🚗",
    title: "Étape 13 — Elle arrive",
    desc: "Elle franchit la porte du lieu de rendez-vous. Ce seul acte — être là, en vrai, en face de l'autre — est déjà une victoire. Elle lui envoie un message court en arrivant : une émoticône, un mot. Il sait qu'elle est là.",
    duree: "—",
  },
  {
    id: "p14",
    cat: "connexion",
    difficulty: "osé",
    points: 65,
    emoji: "🥂",
    title: "Étape 14 — Le premier verre",
    desc: "Ils sont seuls, face à face, un verre à la main. La conversation est électrique. Elle se laisse aller à être là, vraiment — sans penser à après, sans se retenir. Ce moment de présence totale, c'est déjà quelque chose d'extraordinaire.",
    duree: "—",
  },
  {
    id: "p15",
    cat: "fantasme",
    difficulty: "osé",
    points: 70,
    emoji: "🤍",
    title: "Étape 15 — Le premier contact",
    desc: "La main effleurée, le bras touché, le regard qui dit tout. Le premier contact physique — même doux, même bref — change tout. À partir de là, le corps est dans l'histoire. Elle note l'instant dans sa mémoire pour le lui raconter.",
    duree: "—",
  },
  {
    id: "p16",
    cat: "communication",
    difficulty: "osé",
    points: 70,
    emoji: "📱",
    title: "Étape 16 — L'appel du milieu",
    desc: "À un moment qu'elle choisit — pendant la soirée — elle s'éclipse 30 secondes et l'appelle. Elle dit juste : 'Je suis là. Je vais bien. Je continue.' Il dit : 'Je t'aime.' Elle raccroche. Et elle retourne vers l'autre. Cet appel maintient leur lien au cœur même de l'aventure.",
    duree: "30 sec",
  },
  {
    id: "p17",
    cat: "fantasme",
    difficulty: "osé",
    points: 75,
    emoji: "💋",
    title: "Étape 17 — Le premier baiser",
    desc: "Les lèvres se touchent pour la première fois. Ce baiser-là, elle le vit pleinement — sans culpabilité, sans retenue. Elle sait qu'il attend ce récit. Elle grave chaque détail pour lui. Ce qu'elle ressent en cet instant, il en fera quelque chose de beau.",
    duree: "—",
  },

  // ─ PHASE 6 : L'ABANDON ─
  {
    id: "p18",
    cat: "fantasme",
    difficulty: "osé",
    points: 80,
    emoji: "🌊",
    title: "Étape 18 — Elle laisse aller",
    desc: "Elle arrête de réfléchir. Elle suit ce que le moment demande, naturellement, sans se retenir. Ce lâcher-prise — décidé, assumé, offert — est l'acte le plus courageux de tout le parcours. Elle va au bout de ce qu'elle ressent.",
    duree: "—",
  },
  {
    id: "p19",
    cat: "communication",
    difficulty: "osé",
    points: 85,
    emoji: "🌙",
    title: "Étape 19 — Elle rentre et tout raconte",
    desc: "Elle rentre. Il l'attend. Elle s'assoit face à lui et raconte tout — dans l'ordre, dans les détails, sans rien cacher. Ses sensations, ses doutes, ses plaisirs. Ce récit partagé à chaud est la plus belle intimité qu'ils puissent vivre ensemble.",
    duree: "—",
  },
  {
    id: "p20",
    cat: "fantasme",
    difficulty: "osé",
    points: 100,
    emoji: "✦",
    title: "Étape 20 — Le passage à l'acte complet",
    desc: "L'expérience est vécue jusqu'au bout — pleinement, librement, avec tout ce que ça implique. Pas de demi-mesure, pas de reculade à la dernière seconde. Elle a fait ce chemin, elle a relevé chaque étape. Ce moment clôt le parcours et en ouvre un nouveau — ensemble, plus proches que jamais.",
    duree: "—",
  },
];

// ── RÉCOMPENSES ──
export const RECOMPENSES: Recompense[] = [
  {
    id: "r01",
    cost: 50,
    emoji: "💆",
    tier: "bronze",
    title: "Massage complet",
    desc: "30 minutes de massage corps entier — dans la position que vous choisissez, à l'heure que vous voulez.",
  },
  {
    id: "r02",
    cost: 75,
    emoji: "🕯️",
    tier: "bronze",
    title: "Soirée à votre goût",
    desc: "Vous choisissez tout : musique, lumières, tenue ou absence de tenue de votre partenaire. Il/elle exécute sans négocier.",
  },
  {
    id: "r03",
    cost: 100,
    emoji: "👑",
    tier: "argent",
    title: "1h sous vos ordres",
    desc: "Votre partenaire dit oui à tout pendant 1 heure — dans les limites établies ensemble. Toute demande, tout geste, tout ordre.",
  },
  {
    id: "r04",
    cost: 125,
    emoji: "📸",
    tier: "argent",
    title: "Séance photo chaude",
    desc: "Votre partenaire pose selon vos instructions — nu·e, suggestif·ve, dans la position que vous choisissez. Les images vous appartiennent.",
  },
  {
    id: "r05",
    cost: 150,
    emoji: "🔥",
    tier: "argent",
    title: "Votre fantasme ce soir",
    desc: "Vous désignez le scénario. Votre partenaire le joue ce soir dans sa totalité — pas de demi-mesure, pas de recul.",
  },
  {
    id: "r06",
    cost: 175,
    emoji: "🛏️",
    tier: "or",
    title: "Direction totale au lit",
    desc: "1 heure où vous guidez tout — rythme, positions, demandes verbales. Votre partenaire vous suit avec enthousiasme et sans résistance.",
  },
  {
    id: "r07",
    cost: 200,
    emoji: "🎭",
    tier: "or",
    title: "Mise en scène sur mesure",
    desc: "Un scénario de A à Z — rôles, tenue, lieu, script. Votre partenaire joue jusqu'au bout sans sortir du personnage.",
  },
  {
    id: "r08",
    cost: 250,
    emoji: "🏨",
    tier: "or",
    title: "Nuit en chambre d'hôtel",
    desc: "Une chambre, une nuit, vos règles. Votre partenaire s'engage à réaliser tout ce que vous demandez dans ce cadre.",
  },
  {
    id: "r09",
    cost: 300,
    emoji: "🌙",
    tier: "platine",
    title: "Nuit selon vos règles",
    desc: "Une nuit entière où vous décidez heure par heure de ce qui se passe. Votre partenaire dit oui — jusqu'au mot de sécurité seulement.",
  },
  {
    id: "r10",
    cost: 400,
    emoji: "✨",
    tier: "platine",
    title: "Carte blanche absolue",
    desc: "Le scénario que vous n'osiez pas demander. Votre partenaire vous accorde une soirée entière pour le vivre exactement comme vous l'avez imaginé.",
  },
];

export const TIER_COLORS: Record<string, string> = {
  bronze: "#C4A35A",
  argent: "#9DA8D8",
  or: "#C4A35A",
  platine: "#8B6B9E",
};

export const TIER_BG: Record<string, string> = {
  bronze: "#FDF7EC",
  argent: "#EEF0FA",
  or: "#FDF7EC",
  platine: "#F5F0FA",
};

export const TIER_LABELS: Record<string, string> = {
  bronze: "Bronze",
  argent: "Argent",
  or: "Or",
  platine: "Platine",
};

/** All "push to succeed" missions — sticky until completed */
export const MISSIONS: Defi[] = DEFIS.filter((d) => d.id.startsWith("p"));

/** Returns 3 défis for a given date string (YYYY-MM-DD), balanced across difficulties */
export function getDefisForDate(dateStr: string): Defi[] {
  const seed = dateStr
    .split("-")
    .reduce((acc, part) => acc * 100 + parseInt(part, 10), 0);

  const easy = DEFIS.filter((d) => d.difficulty === "facile");
  const med = DEFIS.filter((d) => d.difficulty === "moyen");
  const hard = DEFIS.filter((d) => d.difficulty === "osé");

  const pick = (arr: Defi[], s: number): Defi => arr[Math.abs(s) % arr.length];

  let s = seed;
  s = (s * 1664525 + 1013904223) & 0x7fffffff;
  const d1 = pick(easy, s);
  s = (s * 1664525 + 1013904223) & 0x7fffffff;
  const d2 = pick(med, s);
  s = (s * 1664525 + 1013904223) & 0x7fffffff;
  const d3 = pick(hard, s);

  return [d1, d2, d3];
}

export function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
