import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@candau_session";

export interface Session {
  userId: string;
  token: string;
  nickname: string;
  code: string;
  coupleId: string | null;
  partnerNickname: string | null;
}

export async function getSession(): Promise<Session | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export async function saveSession(session: Session): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(session));
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}

export async function updateSession(patch: Partial<Session>): Promise<void> {
  const current = await getSession();
  if (!current) return;
  await saveSession({ ...current, ...patch });
}
