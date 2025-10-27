import { auth } from "./firebase";

export async function getCurrentUserIdToken(forceRefresh = false): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken(forceRefresh);
}