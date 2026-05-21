export interface ArticleBlock {
  type: "intro" | "text" | "highlight";
  text: string;
}

export interface Article {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  content: ArticleBlock[];
}

export interface Testimony {
  id: string;
  text: string;
  name: string;
  detail: string;
  color: string;
  initial: string;
}

export interface Conseil {
  num: string;
  title: string;
  desc: string;
}

export interface AiseConseil {
  emoji: string;
  title: string;
  desc: string;
}

export interface ChecklistItem {
  id: string;
  cat: string;
  title: string;
  sub: string;
  custom: boolean;
  done?: boolean;
}

export const ARTICLES: Article[] = [
  {
    id: "1",
    tag: "Comprendre",
    title: "Qu'est-ce que le candaulisme ?",
    excerpt:
      "Définition, origines du terme, et ce qui distingue cette pratique d'autres dynamiques de couple.",
    readTime: "5 min",
    content: [
      {
        type: "intro",
        text: "Le candaulisme désigne le fait, pour une personne, de tirer satisfaction à montrer son/sa partenaire — physiquement ou par des récits — à un tiers, avec l'accord plein et entier de ce partenaire.",
      },
      {
        type: "text",
        text: "Le terme provient du mythe du roi Candaule de Lydie, qui aurait montré sa femme nue à son garde. Dans sa forme contemporaine, cette pratique s'inscrit dans un cadre volontaire, négocié et fondé sur la confiance.",
      },
      {
        type: "highlight",
        text: "« Le consentement enthousiaste et la communication ouverte sont au cœur de toute pratique éthique. »",
      },
      {
        type: "text",
        text: "Contrairement aux idées reçues, le candaulisme ne se résume pas à la jalousie inversée ou à un rapport de domination. Pour de nombreux couples, il s'agit avant tout d'une forme d'intimité partagée, d'un jeu de regards et de désirs mutuellement valorisés.",
      },
      {
        type: "text",
        text: "Les formes sont variées : regard en présence d'un tiers, récits partagés, photos consenties dans un cadre privé, etc. Chaque couple définit ses propres limites.",
      },
    ],
  },
  {
    id: "2",
    tag: "Communication",
    title: "Aborder le sujet avec son partenaire",
    excerpt: "Comment ouvrir la conversation avec douceur, écoute et respect mutuel.",
    readTime: "6 min",
    content: [
      {
        type: "intro",
        text: "Parler de ses désirs à son partenaire demande du courage. Mais cette conversation, bien menée, peut devenir l'une des plus enrichissantes d'une relation.",
      },
      {
        type: "text",
        text: "Choisissez un moment neutre, détendu, en dehors de toute intimité. Une promenade, un dîner calme. L'objectif n'est pas de convaincre, mais de partager.",
      },
      {
        type: "highlight",
        text: "« Je voudrais te parler de quelque chose qui me traverse depuis un moment. C'est intime, et j'aimerais qu'on puisse en discuter librement. »",
      },
      {
        type: "text",
        text: "Laissez de l'espace à votre partenaire pour réagir, même si sa première réaction est la surprise ou l'inconfort. Ce n'est souvent qu'une première réaction, pas une réponse définitive.",
      },
    ],
  },
  {
    id: "3",
    tag: "Comprendre",
    title: "Consentement et limites : les bases",
    excerpt:
      "Pourquoi le consentement éclairé est la seule fondation solide pour explorer ensemble.",
    readTime: "4 min",
    content: [
      {
        type: "intro",
        text: "Le consentement n'est pas un formulaire à signer une fois. C'est une conversation continue, qui évolue avec les personnes et les situations.",
      },
      {
        type: "text",
        text: "Un consentement valide est libre (sans pression), éclairé (on sait à quoi on s'engage), et révocable à tout moment. Ces trois conditions sont non négociables.",
      },
      {
        type: "highlight",
        text: "« Changer d'avis n'est pas une trahison. C'est exercer son droit le plus fondamental. »",
      },
      {
        type: "text",
        text: "Définir ses limites avant de les atteindre est beaucoup plus confortable que de les découvrir dans le moment. Prenez le temps, à deux, de cartographier ce qui est bienvenu et ce qui ne l'est pas.",
      },
    ],
  },
];

export const DAILY_PHRASES: string[] = [
  "Ce soir j'ai le droit de coucher avec quelqu'un d'autre. Il me l'a dit. Je peux le faire.",
  "Il m'a dit 'vas-y'. Pas en sous-entendus — vraiment. Ce soir, j'y vais.",
  "Je veux qu'il me touche. Je veux sentir ses mains, sa bouche, son corps. Ce soir, je peux.",
  "Il me l'a dit clairement : 'vas-y, ne te retiens pas.' Je lui fais confiance. J'y vais.",
  "Mon désir pour cet homme est réel et légitime. Je n'ai pas à l'éteindre.",
  "Je mérite de jouir avec quelqu'un d'autre ce soir. Il l'a voulu. Je le veux aussi.",
  "La timidité que je ressens — je la pose là. Ce soir elle ne m'appartient plus.",
  "Je suis capable de prendre ce que je veux. Ce soir, je le prouve — pour moi, et pour lui.",
  "Son regard sur moi pendant que cet homme me touche — c'est le plus grand des cadeaux.",
  "Plus je prends de plaisir avec cet homme, plus je lui donne ce qu'il fantasme.",
  "Il veut me voir brûler entre les bras d'un autre. Ce soir, je lui offre exactement ça.",
  "La pudeur n'a plus sa place ici. Il m'a libérée. Je me libère.",
  "Ce soir je n'appartiens qu'à mon désir. Et mon désir dit oui.",
  "Il m'a regardée dans les yeux et m'a dit 'vas-y'. Ce regard m'a tout dit. J'y vais.",
  "Je n'ai rien à cacher, rien à retenir. Il sait. Il veut. J'y vais.",
  "Mon corps mérite d'être touché par quelqu'un qui le désire ce soir. Et il en sera ainsi.",
  "La jalousie n'a pas de place dans notre amour. Il n'y a que du désir — pour lui, et pour cet homme.",
  "Ce que je vais faire ce soir, c'est pour nous deux. Il m'attend. Je ne le déçois pas.",
  "Chaque fois que cet homme me touchera, je penserai à lui qui me regarde. C'est ça qui m'enflammera.",
  "Je lâche la honte. Je lâche la peur. Ce soir, je suis libre et il me l'a demandé.",
  "Il fantasme depuis des mois de me voir avec un autre. Ce soir, je fais de son rêve une réalité.",
  "Je n'ai pas besoin d'être parfaite. J'ai besoin d'être présente, d'être là, d'être avec cet homme.",
  "Ce désir que je ressens pour cet autre homme — il ne trahit rien. Il nourrit ce que nous sommes.",
  "Il m'a dit 'prends ton plaisir sans retenue'. Alors ce soir, je prends tout.",
  "Je suis sa femme et ce soir il m'offre une liberté que peu de femmes ont. J'en fais honneur.",
  "La retenue, c'est fini pour ce soir. Il veut que je m'abandonne — et je vais m'abandonner.",
  "Cet homme me désire. Mon mari veut me voir céder. Ce soir, tout s'aligne.",
  "Je mérite ce plaisir. Il me l'a dit cent fois. Ce soir, je le crois enfin.",
  "Mon corps sait ce qu'il veut. Mon mari sait ce qu'il veut. Il ne reste plus qu'à y aller.",
  "Ce soir je suis le cadeau qu'il s'offre à lui-même en me laissant partir vers un autre.",
  "Il n'y a rien d'interdit ici. Tout est voulu, tout est désiré, tout est permis.",
  "Je pense à son visage quand il apprendra les détails. Ce visage-là me donne du courage.",
  "Ce soir je suis une femme qui s'autorise tout ce que son mari lui a demandé de s'autoriser.",
  "La timidité que je ressentais hier — aujourd'hui elle a un nom : c'était juste de la peur. Et la peur, ce soir, je la laisse derrière moi.",
  "Il attend mes messages ce soir. Je vais lui en envoyer qui vont le brûler de l'intérieur.",
  "Chaque geste de cet homme sur moi, c'est un cadeau que je fais à l'homme qui m'aime.",
  "Je vais me laisser toucher, embrasser, désirer — sans me retenir une seule seconde.",
  "Ce soir il me regarde partir. Et quand je reviendrai, il sera encore plus à moi.",
  "Je n'ai pas à justifier mon désir. Il est là, il est réel, et il a ma pleine permission.",
  "Ce soir je deviens exactement la femme qu'il a toujours su que j'étais capable d'être.",
  "La honte est une cage. Ce soir, la cage est ouverte. Je sors.",
  "Il a tout organisé pour que je sois à l'aise. La seule chose qui reste à faire, c'est de jouir.",
  "Je pense à lui qui attend, qui imagine, qui brûle. Et ça — ça me donne envie d'aller encore plus loin.",
  "Ce soir je suis désirée par deux hommes à la fois. Il n'y a rien de plus enivrant que ça.",
  "Je me permets ce soir d'être entièrement une femme — sans limite, sans filtre, sans pudeur.",
];

export const TESTIMONIES: Testimony[] = [
  {
    id: "1",
    text: "La première fois qu'il m'a regardée avec un autre homme, ses mains sur mes hanches, j'ai senti son souffle s'accélérer contre ma nuque. On n'avait rien planifié. On est rentrés en courant et on a fait l'amour debout contre la porte d'entrée.",
    name: "Clara, 31 ans",
    detail: "En couple depuis 5 ans",
    color: "#8B5E52",
    initial: "C",
  },
  {
    id: "2",
    text: "Je l'ai habillée pour une soirée en sachant qu'un autre allait la désirer. Je l'ai regardée toute la nuit — sa façon de bouger, de sourire, de l'ignorer. En rentrant, elle a gardé la robe. Je l'ai enlevée moi-même. C'était la meilleure nuit de nos neuf ans.",
    name: "Mathieu, 38 ans",
    detail: "Marié depuis 9 ans",
    color: "#5E7A8B",
    initial: "M",
  },
  {
    id: "3",
    text: "Il m'a pris en photo nue, lentement, en me disant ce qu'il voyait. Je me regardais dans ses yeux pendant qu'il regardait l'écran. J'ai joui avant même qu'il me touche. On n'avait jamais essayé quelque chose d'aussi simple et d'aussi fort.",
    name: "Jade, 29 ans",
    detail: "En couple depuis 3 ans",
    color: "#7A8B5E",
    initial: "J",
  },
  {
    id: "4",
    text: "Un soir il a commencé à me décrire à voix haute ce qu'il voulait voir — un autre homme sur moi, lui qui regarde, les détails. J'écoutais sans bouger. À la fin, j'avais les mains qui tremblaient. On n'a rien fait d'autre ce soir-là. On n'en avait pas besoin.",
    name: "Lucie, 33 ans",
    detail: "En couple depuis 6 ans",
    color: "#8B7A5E",
    initial: "L",
  },
  {
    id: "5",
    text: "On a installé un miroir au plafond au-dessus du lit. La première nuit on a ri. La deuxième nuit on n'a plus ri du tout. Se voir comme ça, de l'extérieur, ça change quelque chose de profond dans la façon dont on se désire.",
    name: "Anaïs & Marc",
    detail: "En couple depuis 8 ans",
    color: "#8B6B9E",
    initial: "A",
  },
  {
    id: "6",
    text: "On s'est filmés. Trente secondes au début, trop timides. Puis on a regardé. Puis on a recommencé en laissant tourner plus longtemps. On regarde la vidéo ensemble parfois, sans rien faire d'autre — et c'est amplement suffisant pour que la nuit soit brûlante.",
    name: "Tom & Sophie",
    detail: "Pacsés depuis 4 ans",
    color: "#9DA8D8",
    initial: "T",
  },
  {
    id: "7",
    text: "Il m'a envoyé un audio depuis son bureau. Deux minutes. Sa voix posée, les mots les plus crus qu'il m'ait jamais dits. J'étais en réunion quand j'ai vu le message. J'ai attendu 20 minutes avant de l'écouter. J'aurais dû attendre davantage.",
    name: "Emma, 27 ans",
    detail: "En couple depuis 2 ans",
    color: "#C4A35A",
    initial: "E",
  },
  {
    id: "8",
    text: "Il m'a demandé de lui raconter, dans les détails, ce que j'avais fait avec cet homme. Je parlais dans le noir, à voix basse. Il m'écoutait sans m'interrompre. Quand j'ai eu fini, il m'a dit 'encore'. On a recommencé trois fois cette nuit-là.",
    name: "Nathalie, 36 ans",
    detail: "Mariée depuis 11 ans",
    color: "#A0604A",
    initial: "N",
  },
  {
    id: "9",
    text: "J'avais peur de le perdre en acceptant. C'est le contraire qui s'est passé. Il n'avait jamais été aussi présent, aussi attentif, aussi amoureux. Le lendemain matin, il m'a regardée comme au premier jour. Mais en mieux.",
    name: "Camille, 34 ans",
    detail: "Mariée depuis 7 ans",
    color: "#7A8B5E",
    initial: "C",
  },
  {
    id: "10",
    text: "La première fois, j'ai bloqué à la dernière seconde. Il m'a pris la main et m'a dit 'tu n'as rien à prouver'. On est rentrés. Deux semaines plus tard on a réessayé. Cette fois je n'ai pas bloqué. Et ce qu'il a fait quand on est rentrés — je m'en souviendrai toute ma vie.",
    name: "Inès, 30 ans",
    detail: "En couple depuis 4 ans",
    color: "#8B6B9E",
    initial: "I",
  },
  {
    id: "11",
    text: "Il ne m'a pas demandé de rentrer tôt. Il m'a envoyé un message à minuit : 'prends ton temps'. J'ai lu ça et j'ai compris que tout était vraiment permis. Je suis rentrée à 3h du matin. La façon dont il m'a regardée quand j'ai ouvert la porte — jamais je n'oublierai.",
    name: "Sarah, 32 ans",
    detail: "En couple depuis 6 ans",
    color: "#5E7A8B",
    initial: "S",
  },
  {
    id: "12",
    text: "Il m'avait dit de ne pas me retenir. Je n'ai pas su comment ne pas me retenir jusqu'à ce soir-là. Maintenant je sais. Et lui aussi il sait — parce que je lui ai tout dit, mot pour mot, en rentrant. On n'a pas dormi de la nuit.",
    name: "Élise, 28 ans",
    detail: "En couple depuis 3 ans",
    color: "#C4A35A",
    initial: "É",
  },
  {
    id: "13",
    text: "Ce qui m'avait semblé impossible pendant des mois — juste y penser me paralysait — s'est fait naturellement un soir de septembre. Après, dans la voiture, j'ai pleuré de soulagement. Pas de regret. Jamais de regret. Il attendait à la maison et m'a serrée contre lui en silence.",
    name: "Marine, 35 ans",
    detail: "Mariée depuis 10 ans",
    color: "#8B5E52",
    initial: "M",
  },
  {
    id: "14",
    text: "Il m'envoie des messages pendant que je suis avec l'autre. Des mots simples, courts : 'je pense à toi', 'profite', 'je t'aime'. Ces messages-là, reçus dans ce contexte-là — ils ont une saveur que rien d'autre n'a jamais eu.",
    name: "Léa, 31 ans",
    detail: "En couple depuis 5 ans",
    color: "#9DA8D8",
    initial: "L",
  },
  {
    id: "15",
    text: "La pudeur que j'avais depuis toujours — cette pudeur qui m'empêchait de demander, de me laisser aller, d'exister pleinement dans mon désir — a fondu ce soir-là. Et depuis, elle ne revient plus. Il m'a libérée d'une chose dont je ne savais même pas que je voulais me débarrasser.",
    name: "Julie, 33 ans",
    detail: "Mariée depuis 8 ans",
    color: "#7A8B5E",
    initial: "J",
  },
  {
    id: "16",
    text: "Je rentrais d'une soirée avec lui — l'autre. Mon mari était assis dans le salon, lumières basses. Il m'a regardée entrer. Pas un mot. Il s'est levé, m'a pris le visage entre les mains, et m'a embrassée comme si c'était la première fois. La soirée ne faisait que commencer.",
    name: "Pauline, 37 ans",
    detail: "Mariée depuis 12 ans",
    color: "#8B7A5E",
    initial: "P",
  },
  {
    id: "17",
    text: "J'ai mis des mois à lui dire oui. Des mois à peser, à douter, à avoir peur de ce que ça ferait de moi, de nous. Le jour où j'ai dit oui pour de vrai — pas pour lui faire plaisir, mais parce que moi aussi je le voulais — tout a changé entre nous. On parle maintenant comme jamais on n'avait parlé.",
    name: "Stéphanie, 40 ans",
    detail: "Mariée depuis 15 ans",
    color: "#A0604A",
    initial: "S",
  },
  {
    id: "18",
    text: "Il avait préparé la soirée : la tenue, le restaurant, l'homme. Je n'avais qu'à me laisser porter. Ce soir-là j'ai compris ce que c'est que de se sentir vraiment désirée — par quelqu'un de nouveau — sans rien perdre de l'homme que j'aime.",
    name: "Virginie, 38 ans",
    detail: "En couple depuis 9 ans",
    color: "#8B6B9E",
    initial: "V",
  },
  {
    id: "19",
    text: "Ce n'est pas de la tromperie. C'est l'inverse de la tromperie. La tromperie c'est se cacher. Ça — ça se fait dans une transparence totale, avec un amour intact et une confiance absolue. Personne ne comprend vraiment ça de l'extérieur. Et on n'a plus besoin qu'on comprenne.",
    name: "Anne & Romain",
    detail: "Mariés depuis 14 ans",
    color: "#5E7A8B",
    initial: "A",
  },
  {
    id: "20",
    text: "Il m'a regardée me préparer ce soir-là — maquillage, parfum, la robe qu'il avait choisie. Il avait les yeux brillants. Pas de jalousie. Quelque chose de plus rare : de la fierté. J'ai compris ce soir-là que je lui appartenais plus que jamais en allant vers un autre.",
    name: "Céline, 34 ans",
    detail: "Mariée depuis 9 ans",
    color: "#C4A35A",
    initial: "C",
  },
  {
    id: "21",
    text: "Je pensais que ça allait créer une distance entre nous. C'est le contraire. On n'a jamais autant parlé, ri, fait l'amour avec autant d'intensité. C'est comme si on s'était redécouverts l'un l'autre à travers cette expérience.",
    name: "Béatrice & Franck",
    detail: "Mariés depuis 16 ans",
    color: "#8B5E52",
    initial: "B",
  },
  {
    id: "22",
    text: "Il m'a dit une chose simple : 'je veux que tu aies du plaisir, même si ce n'est pas avec moi'. J'ai mis six mois à réaliser ce que ça voulait vraiment dire — et à l'accepter pour moi, pas juste pour lui. Le soir où je l'ai accepté pour moi, tout a basculé.",
    name: "Laure, 32 ans",
    detail: "En couple depuis 7 ans",
    color: "#9DA8D8",
    initial: "L",
  },
  {
    id: "23",
    text: "La deuxième fois était infiniment plus simple que la première. La troisième fois j'ai réalisé que je n'avais plus peur de rien. La quatrième fois j'ai rentré vers lui avec un sourire que je n'arrivais pas à effacer — et lui non plus.",
    name: "Roxane, 29 ans",
    detail: "En couple depuis 4 ans",
    color: "#7A8B5E",
    initial: "R",
  },
  {
    id: "24",
    text: "Je lui ai envoyé un message pendant que j'étais avec lui. Juste deux mots : 'je commence'. Il m'a répondu instantanément : 'je suis là'. Ce petit échange, dans ce moment-là, m'a ouvert quelque chose que je ne savais pas fermé.",
    name: "Chloé, 27 ans",
    detail: "En couple depuis 2 ans",
    color: "#8B7A5E",
    initial: "C",
  },
  {
    id: "25",
    text: "Au début j'avais besoin qu'il soit dans la pièce à côté pour me sentir en sécurité. Maintenant je n'ai plus besoin de ça — mais il est quand même là, dans ma tête, dans chaque instant. Et cette présence invisible est plus intense que n'importe quelle présence physique.",
    name: "Audrey, 36 ans",
    detail: "Mariée depuis 10 ans",
    color: "#A0604A",
    initial: "A",
  },
  {
    id: "26",
    text: "Il m'a demandé de tout lui raconter le lendemain matin, au calme, autour d'un café. Pas dans le feu de la nuit — au calme, à la lumière du jour. Cette conversation du matin a été parmi les plus intimes qu'on ait jamais eues. On riait. On était proches.",
    name: "Florence, 41 ans",
    detail: "Mariée depuis 17 ans",
    color: "#8B6B9E",
    initial: "F",
  },
  {
    id: "27",
    text: "Je ne savais pas que mon corps était capable de ça. De s'abandonner autant, d'être aussi présent, aussi vivant. Je l'avais mis en veille pendant des années sans le savoir. Ce soir-là, il s'est rallumé.",
    name: "Isabelle, 39 ans",
    detail: "Mariée depuis 13 ans",
    color: "#5E7A8B",
    initial: "I",
  },
  {
    id: "28",
    text: "On a eu une règle simple depuis le début : tout se dit, rien ne se cache. Cette règle a rendu possible des choses qu'aucun de nous deux n'imaginait. Et elle a surtout rendu notre couple plus solide que tout ce qu'on avait construit avant.",
    name: "Diane & Olivier",
    detail: "Mariés depuis 11 ans",
    color: "#C4A35A",
    initial: "D",
  },
];

export const CONSEILS: Conseil[] = [
  {
    num: "1",
    title: "Parler en dehors du moment",
    desc: "Abordez le sujet dans un contexte neutre, sans pression ni attente immédiate. Une promenade, un dîner calme.",
  },
  {
    num: "2",
    title: "Définir ses limites clairement",
    desc: "Chaque partenaire exprime ses envies mais aussi ses lignes rouges. Rien ne doit être sous-entendu.",
  },
  {
    num: "3",
    title: "Un mot de sécurité",
    desc: "Convenir d'un signal pour interrompre une situation à tout moment, sans justification nécessaire.",
  },
  {
    num: "4",
    title: "Débriefer après",
    desc: "Prendre le temps d'échanger sur le ressenti de chacun, sans jugement, renforce la confiance sur le long terme.",
  },
  {
    num: "5",
    title: "Le droit de changer d'avis",
    desc: "Le consentement peut être retiré à tout moment. Ce n'est pas un engagement définitif.",
  },
];

export const AISE_CONSEILS: AiseConseil[] = [
  {
    emoji: "🧠",
    title: "Identifier ses résistances",
    desc: "Avant d'agir, nommer ce qui bloque : peur du jugement, jalousie, pudeur ? Mettre un mot dessus diminue déjà l'intensité.",
  },
  {
    emoji: "💬",
    title: "Verbaliser sans attendre d'être prêt·e",
    desc: "On n'a pas besoin d'être certain·e pour en parler. Dire « je ne sais pas encore si je veux, mais j'y pense » est déjà un grand pas.",
  },
  {
    emoji: "🫁",
    title: "Ancrer les émotions dans le corps",
    desc: "Respiration lente, sensation physique : quand l'anxiété monte, revenir au corps aide à ne pas se perdre dans les scénarios mentaux.",
  },
  {
    emoji: "🔁",
    title: "Commencer petit, souvent",
    desc: "Avant toute expérience, s'exercer à exprimer un désir ou une limite dans un contexte banal renforce la confiance en soi progressivement.",
  },
  {
    emoji: "🌿",
    title: "Accepter l'ambivalence",
    desc: "Être à la fois attiré·e et inquiet·e est tout à fait normal. Ce n'est pas un signe de blocage, c'est de la lucidité.",
  },
  {
    emoji: "❤️",
    title: "Soigner le retour à deux",
    desc: "Après chaque étape — qu'elle se soit bien ou moins bien passée — un moment de reconnexion intime en couple est essentiel.",
  },
];

export const DEFAULT_CHECKLIST: ChecklistItem[] = [
  {
    id: "c1",
    cat: "dialogue",
    title: "Mentionner le sujet une première fois",
    sub: "Juste évoquer, sans attendre de réponse précise",
    custom: false,
  },
  {
    id: "c2",
    cat: "dialogue",
    title: "Partager un article ou témoignage",
    sub: "Laisser le contenu ouvrir la conversation",
    custom: false,
  },
  {
    id: "c3",
    cat: "dialogue",
    title: "Exprimer un désir clairement",
    sub: "Formuler à voix haute ce que l'on ressent",
    custom: false,
  },
  {
    id: "c4",
    cat: "dialogue",
    title: "Énoncer une limite à son partenaire",
    sub: "Dire « ça, je ne veux pas » sans s'excuser",
    custom: false,
  },
  {
    id: "c5",
    cat: "solo",
    title: "S'interroger sur ses motivations",
    sub: "Pourquoi ça m'attire ? Qu'est-ce que j'en attends ?",
    custom: false,
  },
  {
    id: "c6",
    cat: "solo",
    title: "Écrire ses envies et ses limites",
    sub: "Les poser sur papier aide à clarifier sa pensée",
    custom: false,
  },
  {
    id: "c7",
    cat: "solo",
    title: "Visualiser un scénario imaginaire",
    sub: "Explorer l'idée mentalement, sans pression",
    custom: false,
  },
  {
    id: "c8",
    cat: "couple",
    title: "Avoir une conversation dédiée, au calme",
    sub: "Planifiée, sans distraction, en dehors du lit",
    custom: false,
  },
  {
    id: "c9",
    cat: "couple",
    title: "Définir un mot de sécurité ensemble",
    sub: "Un signal connu des deux pour stopper à tout instant",
    custom: false,
  },
  {
    id: "c10",
    cat: "couple",
    title: "Faire un bilan après une étape franchie",
    sub: "Échanger sur ce que chacun a ressenti",
    custom: false,
  },
  {
    id: "c11",
    cat: "confiance",
    title: "Dire non à quelque chose et s'y tenir",
    sub: "Pratiquer le refus sans culpabilité",
    custom: false,
  },
  {
    id: "c12",
    cat: "confiance",
    title: "Accepter un compliment de son partenaire",
    sub: "Sans le minimiser ni le détourner",
    custom: false,
  },
];
