export interface AuthState {
    user: { uid: string; name: string; email: string; photoURL: string } | null;
    loading: boolean;
  }