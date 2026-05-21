import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  FlatList,
  TextInput,
  ActivityIndicator,
  Modal,
  Image,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import {
  getPosts,
  requestUploadUrl,
  uploadImage,
  createPost,
  type PostResult,
} from "@/src/lib/apiClient";
import colors from "@/constants/colors";

const C = colors.light;
const { width: SW } = Dimensions.get("window");
const IMG_SIZE = (SW - 48 - 8) / 2;

const PURPLE = "#1E1625";

export default function GalerieScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const [posts, setPosts] = useState<PostResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [nicknameModal, setNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [selectedUri, setSelectedUri] = useState<string | null>(null);
  const [viewPost, setViewPost] = useState<PostResult | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch {}
    setLoading(false);
    setRefreshing(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts();
  }, []);

  const pickImage = async () => {
    setUploadError("");
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setUploadError("Permission d'accès à la galerie requise");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      setSelectedUri(result.assets[0].uri);
      setNicknameModal(true);
    }
  };

  const takePhoto = async () => {
    setUploadError("");
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      setUploadError("Permission caméra requise");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      setSelectedUri(result.assets[0].uri);
      setNicknameModal(true);
    }
  };

  const confirmNickname = () => {
    if (!nickname.trim()) return;
    setNicknameModal(false);
    setUploadModal(true);
  };

  const publishPost = async () => {
    if (!selectedUri) return;
    setUploading(true);
    setUploadError("");
    try {
      const filename = selectedUri.split("/").pop() ?? "photo.jpg";
      const mimeType = filename.endsWith(".png") ? "image/png" : "image/jpeg";
      const { uploadUrl, imageKey } = await requestUploadUrl(filename, mimeType);
      await uploadImage(uploadUrl, selectedUri, mimeType);
      const post = await createPost(imageKey, caption || undefined);
      setPosts((prev) => [post, ...prev]);
      setUploadModal(false);
      setCaption("");
      setSelectedUri(null);
      setNickname("");
    } catch (e: any) {
      setUploadError(e.message ?? "Erreur lors de la publication");
    } finally {
      setUploading(false);
    }
  };

  const cancelUpload = () => {
    setUploadModal(false);
    setNicknameModal(false);
    setCaption("");
    setSelectedUri(null);
    setNickname("");
    setUploadError("");
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 16 }]}>
        <Text style={styles.appName}>CANDAU</Text>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>
              Galerie <Text style={styles.italic}>commune</Text>
            </Text>
            <Text style={styles.coupleLabel}>
              Partagé par la communauté
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.addPhotoBtn} onPress={takePhoto}>
              <Text style={styles.addPhotoIcon}>📷</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addPhotoBtn} onPress={pickImage}>
              <Text style={styles.addPhotoIcon}>＋</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Posts grid */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={C.terracotta} />
        </View>
      ) : posts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>📸</Text>
          <Text style={styles.emptyTitle}>La galerie est vide</Text>
          <Text style={styles.emptyText}>
            Soyez le premier à partager un moment avec la communauté.
          </Text>
          <TouchableOpacity style={styles.authBtn} onPress={pickImage}>
            <Text style={styles.authBtnText}>Publier une photo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(p) => p.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={{ gap: 8 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={C.terracotta}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => setViewPost(item)}
              activeOpacity={0.88}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.gridImage}
                resizeMode="cover"
              />
              <View style={styles.gridOverlay}>
                <Text style={styles.gridNickname} numberOfLines={1}>
                  {item.nickname}
                </Text>
                {item.caption ? (
                  <Text style={styles.gridCaption} numberOfLines={1}>
                    {item.caption}
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={<View style={{ height: Platform.OS === "web" ? 120 : 24 }} />}
        />
      )}

      {/* ── Nickname modal ── */}
      <Modal visible={nicknameModal} transparent animationType="slide" onRequestClose={cancelUpload}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBg} onPress={cancelUpload} />
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Votre prénom ou pseudo</Text>
            <Text style={styles.modalSub}>Visible sur votre publication</Text>
            <TextInput
              style={styles.captionInput}
              placeholder="Ex : Clara, Mathieu & Jade..."
              placeholderTextColor="#B0A09A"
              value={nickname}
              onChangeText={setNickname}
              maxLength={30}
              autoFocus
            />
            <TouchableOpacity
              style={[styles.publishBtn, !nickname.trim() && styles.btnDisabled]}
              onPress={confirmNickname}
              disabled={!nickname.trim()}
            >
              <Text style={styles.publishBtnText}>Continuer →</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={cancelUpload}>
              <Text style={styles.cancelBtnText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── Upload modal ── */}
      <Modal visible={uploadModal} transparent animationType="slide" onRequestClose={cancelUpload}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBg} onPress={cancelUpload} />
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Nouvelle publication</Text>

            {selectedUri && (
              <Image
                source={{ uri: selectedUri }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            )}

            <TextInput
              style={styles.captionInput}
              placeholder="Ajoutez une note (facultatif)..."
              placeholderTextColor="#B0A09A"
              value={caption}
              onChangeText={setCaption}
              multiline
              maxLength={200}
            />

            {uploadError ? (
              <Text style={styles.uploadError}>{uploadError}</Text>
            ) : null}

            <TouchableOpacity
              style={[styles.publishBtn, uploading && styles.btnDisabled]}
              onPress={publishPost}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator color="#1E1625" />
              ) : (
                <Text style={styles.publishBtnText}>Publier dans la galerie</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={cancelUpload}>
              <Text style={styles.cancelBtnText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── View post modal ── */}
      <Modal visible={!!viewPost} transparent animationType="fade" onRequestClose={() => setViewPost(null)}>
        <View style={styles.viewOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setViewPost(null)} />
          {viewPost && (
            <View style={styles.viewSheet}>
              <Image
                source={{ uri: viewPost.imageUrl }}
                style={styles.viewImage}
                resizeMode="contain"
              />
              <View style={styles.viewMeta}>
                <Text style={styles.viewNickname}>{viewPost.nickname}</Text>
                <Text style={styles.viewDate}>
                  {new Date(viewPost.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric", month: "long",
                  })}
                </Text>
              </View>
              {viewPost.caption ? (
                <Text style={styles.viewCaption}>{viewPost.caption}</Text>
              ) : null}
              <TouchableOpacity style={styles.closeBtn} onPress={() => setViewPost(null)}>
                <Text style={styles.closeBtnText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.warmWhite },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },

  // Header
  header: { backgroundColor: PURPLE, paddingHorizontal: 24, paddingBottom: 22 },
  appName: { fontSize: 11, fontWeight: "300", letterSpacing: 5, color: "#C9A99A", marginBottom: 8 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  title: { fontSize: 26, fontWeight: "300", color: "#F7F2EC" },
  italic: { fontStyle: "italic", color: "#C4A35A" },
  coupleLabel: { fontSize: 11, fontWeight: "300", color: "rgba(247,242,236,0.35)", marginTop: 2 },
  headerActions: { flexDirection: "row", gap: 8 },
  addPhotoBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(196,163,90,0.15)",
    borderWidth: 1, borderColor: "rgba(196,163,90,0.3)",
    alignItems: "center", justifyContent: "center",
  },
  addPhotoIcon: { fontSize: 18, color: "#C4A35A" },

  // Grid
  grid: { padding: 16, gap: 8 },
  gridItem: { width: IMG_SIZE, borderRadius: 14, overflow: "hidden", backgroundColor: "#E8E0D8" },
  gridImage: { width: IMG_SIZE, height: IMG_SIZE },
  gridOverlay: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    backgroundColor: "rgba(30,22,37,0.65)",
    paddingHorizontal: 8, paddingVertical: 6,
  },
  gridNickname: { fontSize: 10, fontWeight: "500", color: "#C4A35A" },
  gridCaption: { fontSize: 9, fontWeight: "300", color: "rgba(247,242,236,0.7)" },

  // Empty state
  emptyState: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  emptyEmoji: { fontSize: 40, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: "400", color: C.deep, textAlign: "center", marginBottom: 8 },
  emptyText: { fontSize: 12, fontWeight: "300", color: C.mid, textAlign: "center", lineHeight: 19, marginBottom: 24 },
  authBtn: {
    backgroundColor: PURPLE, borderRadius: 14,
    paddingVertical: 14, paddingHorizontal: 28,
  },
  authBtnText: { color: "#C4A35A", fontSize: 13, fontWeight: "500" },

  // Upload modal
  modalOverlay: { flex: 1, justifyContent: "flex-end" },
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  modalSheet: {
    backgroundColor: C.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 40, gap: 14,
  },
  modalHandle: { width: 40, height: 4, backgroundColor: C.light, borderRadius: 2, alignSelf: "center", marginBottom: 4 },
  modalTitle: { fontSize: 18, fontWeight: "400", color: C.deep },
  modalSub: { fontSize: 12, fontWeight: "300", color: C.mid, marginTop: -8 },
  previewImage: { width: "100%", height: 200, borderRadius: 14 },
  captionInput: {
    backgroundColor: C.cream, borderRadius: 12, padding: 14,
    color: C.deep, fontSize: 14, minHeight: 48,
    borderWidth: 1, borderColor: C.light,
  },
  uploadError: { fontSize: 12, color: "#E8826A", textAlign: "center" },
  publishBtn: {
    backgroundColor: PURPLE, borderRadius: 14,
    paddingVertical: 15, alignItems: "center",
  },
  publishBtnText: { color: "#C4A35A", fontSize: 14, fontWeight: "600" },
  cancelBtn: { paddingVertical: 10, alignItems: "center" },
  cancelBtnText: { color: C.mid, fontSize: 13, fontWeight: "300" },
  btnDisabled: { opacity: 0.4 },

  // View modal
  viewOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.88)",
    alignItems: "center", justifyContent: "center", padding: 16,
  },
  viewSheet: { width: "100%", maxWidth: 420, gap: 12 },
  viewImage: { width: "100%", height: 380, borderRadius: 16 },
  viewMeta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  viewNickname: { fontSize: 14, fontWeight: "500", color: "#C4A35A" },
  viewDate: { fontSize: 11, fontWeight: "300", color: "rgba(247,242,236,0.4)" },
  viewCaption: { fontSize: 13, fontWeight: "300", color: "rgba(247,242,236,0.7)", lineHeight: 20 },
  closeBtn: {
    backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 12,
    paddingVertical: 12, alignItems: "center", marginTop: 8,
  },
  closeBtnText: { color: "rgba(247,242,236,0.5)", fontSize: 13 },
});
