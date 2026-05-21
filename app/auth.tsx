import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { register, connectCouple } from "@/src/lib/apiClient";
import { saveSession } from "@/src/lib/session";
import colors from "@/constants/colors";

const C = colors.light;

type Step = "landing" | "register" | "code-shown" | "connect" | "success";

export default function AuthScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 20 : insets.top;

  const [step, setStep] = useState<Step>("landing");
  const [nickname, setNickname] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [myCode, setMyCode] = useState("");
  const [myToken, setMyToken] = useState("");
  const [myUserId, setMyUserId] = useState("");
  const [myNickname, setMyNickname] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!nickname.trim()) { setError("Entrez votre prénom ou pseudo"); return; }
    setLoading(true); setError("");
    try {
      const res = await register(nickname.trim());
      setMyCode(res.code);
      setMyToken(res.token);
      setMyUserId(res.userId);
      setMyNickname(res.nickname);
      await saveSession({
        userId: res.userId,
        token: res.token,
        nickname: res.nickname,
        code: res.code,
        coupleId: null,
        partnerNickname: null,
      });
      setStep("code-shown");
    } catch (e: any) {
      setError(e.message ?? "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    if (partnerCode.length !== 6) { setError("Le code fait 6 chiffres"); return; }
    setLoading(true); setError("");
    try {
      const res = await connectCouple(partnerCode.trim());
      await saveSession({
        userId: myUserId,
        token: myToken,
        nickname: myNickname,
        code: myCode,
        coupleId: res.coupleId,
        partnerNickname: res.partnerNickname,
      });
      setPartnerName(res.partnerNickname);
      setStep("success");
    } catch (e: any) {
      setError(e.message ?? "Code invalide");
    } finally {
      setLoading(false);
    }
  };

  const goToApp = () => {
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: topPad + 32 }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoArea}>
          <Text style={styles.logoText}>CANDAU</Text>
          <Text style={styles.logoSub}>Votre espace privé de couple</Text>
        </View>

        {/* ── LANDING ── */}
        {step === "landing" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Bienvenue</Text>
            <Text style={styles.cardBody}>
              Créez votre espace ou rejoignez votre partenaire avec son code à 6 chiffres.
            </Text>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => setStep("register")}
            >
              <Text style={styles.primaryBtnText}>Créer mon espace</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => setStep("connect")}
            >
              <Text style={styles.secondaryBtnText}>
                Rejoindre avec un code
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── REGISTER ── */}
        {step === "register" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Votre prénom</Text>
            <Text style={styles.cardBody}>
              Choisissez le nom qui apparaîtra sur vos publications dans la galerie privée.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex : Sophie"
              placeholderTextColor="#B0A09A"
              value={nickname}
              onChangeText={setNickname}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleRegister}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity
              style={[styles.primaryBtn, loading && styles.btnDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FDF7EC" />
              ) : (
                <Text style={styles.primaryBtnText}>Continuer →</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setStep("landing"); setError(""); }}>
              <Text style={styles.backLink}>← Retour</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── CODE SHOWN ── */}
        {step === "code-shown" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Votre code</Text>
            <Text style={styles.cardBody}>
              Partagez ce code avec votre partenaire pour vous connecter ensemble. Gardez-le précieusement.
            </Text>
            <View style={styles.codeBox}>
              {myCode.split("").map((ch, i) => (
                <View key={i} style={styles.codeDigit}>
                  <Text style={styles.codeDigitText}>{ch}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.codeHint}>
              Votre partenaire devra créer son propre espace puis entrer ce code.
            </Text>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => { setStep("connect"); setError(""); }}
            >
              <Text style={styles.primaryBtnText}>Entrer le code de mon partenaire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn} onPress={goToApp}>
              <Text style={styles.secondaryBtnText}>Continuer sans me connecter</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── CONNECT (enter partner code) ── */}
        {step === "connect" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Code partenaire</Text>
            <Text style={styles.cardBody}>
              Entrez le code à 6 chiffres de votre partenaire pour créer votre espace privé commun.
            </Text>
            <TextInput
              style={[styles.input, styles.codeInput]}
              placeholder="000000"
              placeholderTextColor="#B0A09A"
              value={partnerCode}
              onChangeText={(t) => setPartnerCode(t.replace(/[^0-9]/g, "").slice(0, 6))}
              keyboardType="number-pad"
              maxLength={6}
              autoFocus
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity
              style={[styles.primaryBtn, loading && styles.btnDisabled]}
              onPress={handleConnect}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FDF7EC" />
              ) : (
                <Text style={styles.primaryBtnText}>Nous connecter ✦</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setError("");
                setStep(myCode ? "code-shown" : "landing");
              }}
            >
              <Text style={styles.backLink}>← Retour</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── SUCCESS ── */}
        {step === "success" && (
          <View style={styles.card}>
            <Text style={styles.successEmoji}>✦</Text>
            <Text style={styles.cardTitle}>Connectés !</Text>
            <Text style={styles.cardBody}>
              Vous et{" "}
              <Text style={{ color: C.terracotta, fontWeight: "500" as any }}>
                {partnerName}
              </Text>{" "}
              êtes maintenant liés. Votre galerie privée est prête.
            </Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={goToApp}>
              <Text style={styles.primaryBtnText}>Entrer dans notre espace →</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const PURPLE = "#1E1625";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: PURPLE },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
  logoArea: { alignItems: "center", marginBottom: 40 },
  logoText: {
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 7,
    color: "#C9A99A",
    marginBottom: 6,
  },
  logoSub: {
    fontSize: 12,
    fontWeight: "300",
    color: "rgba(247,242,236,0.35)",
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: "#2C2237",
    borderRadius: 22,
    padding: 28,
    gap: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "300",
    color: "#F7F2EC",
    lineHeight: 30,
  },
  cardBody: {
    fontSize: 13,
    fontWeight: "300",
    color: "rgba(247,242,236,0.55)",
    lineHeight: 20,
  },
  input: {
    backgroundColor: "#1E1625",
    borderRadius: 12,
    padding: 16,
    color: "#F7F2EC",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  codeInput: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "300",
    letterSpacing: 10,
  },
  primaryBtn: {
    backgroundColor: "#C4A35A",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#1E1625",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "rgba(247,242,236,0.5)",
    fontSize: 13,
    fontWeight: "300",
  },
  btnDisabled: { opacity: 0.5 },
  error: {
    color: "#E8826A",
    fontSize: 12,
    fontWeight: "300",
    textAlign: "center",
  },
  backLink: {
    color: "rgba(247,242,236,0.3)",
    fontSize: 12,
    fontWeight: "300",
    textAlign: "center",
    paddingVertical: 4,
  },
  codeBox: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginVertical: 4,
  },
  codeDigit: {
    width: 44,
    height: 54,
    backgroundColor: "#1E1625",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(196,163,90,0.3)",
  },
  codeDigitText: {
    fontSize: 24,
    fontWeight: "300",
    color: "#C4A35A",
  },
  codeHint: {
    fontSize: 11,
    fontWeight: "300",
    color: "rgba(247,242,236,0.3)",
    textAlign: "center",
    lineHeight: 17,
  },
  successEmoji: {
    fontSize: 36,
    color: "#C4A35A",
    textAlign: "center",
    marginBottom: 4,
  },
});
