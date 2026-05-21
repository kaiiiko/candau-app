import { getSession } from "./session";

const BASE =
  process.env.EXPO_PUBLIC_DOMAIN
    ? `https://${process.env.EXPO_PUBLIC_DOMAIN}/api`
    : "/api";

async function authHeaders(): Promise<Record<string, string>> {
  const session = await getSession();
  if (!session) return {};
  return { Authorization: `Bearer ${session.token}` };
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
    ...(await authHeaders()),
  };
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error ?? `HTTP ${res.status}`);
  return json as T;
}

// ── Auth ──
export interface RegisterResult {
  userId: string;
  token: string;
  nickname: string;
  code: string;
}
export function register(nickname: string) {
  return request<RegisterResult>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ nickname }),
  });
}

export interface ConnectResult {
  coupleId: string;
  partnerNickname: string;
}
export function connectCouple(partnerCode: string) {
  return request<ConnectResult>("/auth/connect", {
    method: "POST",
    body: JSON.stringify({ code: partnerCode }),
  });
}

export interface MeResult {
  userId: string;
  nickname: string;
  code: string;
  coupleId: string | null;
  partnerNickname: string | null;
}
export function getMe() {
  return request<MeResult>("/auth/me");
}

// ── Posts ──
export interface UploadUrlResult {
  uploadUrl: string;
  imageKey: string;
}
export function requestUploadUrl(filename: string, mimeType: string) {
  return request<UploadUrlResult>("/posts/upload-url", {
    method: "POST",
    body: JSON.stringify({ filename, mimeType }),
  });
}

export interface PostResult {
  id: string;
  imageUrl: string;
  caption: string | null;
  userId: string;
  nickname: string;
  createdAt: string;
}
export function createPost(imageKey: string, caption?: string) {
  return request<PostResult>("/posts", {
    method: "POST",
    body: JSON.stringify({ imageKey, caption }),
  });
}

export function getPosts(): Promise<PostResult[]> {
  return request<PostResult[]>("/posts");
}

export async function uploadImage(
  uploadUrl: string,
  uri: string,
  mimeType: string
): Promise<void> {
  const blob = await uriToBlob(uri);
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": mimeType },
    body: blob,
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
}

async function uriToBlob(uri: string): Promise<Blob> {
  const res = await fetch(uri);
  return await res.blob();
}
