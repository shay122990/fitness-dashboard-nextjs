import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "./firebase-config";
import { AppDispatch } from "../store";
import { setUser } from "../store/authSlice";

export const googleSignIn = async (dispatch: AppDispatch) => {
  try {
    await signInWithPopup(auth, googleAuthProvider);
    const user = auth.currentUser;

    if (user) {
      await user.reload();
      dispatch(
        setUser({
          uid: user.uid,
          name: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
        })
      );
    }

    console.log("Google Sign-In successful:", user);
    return user;
  } catch (error) {
    console.error("Google Sign-In error:", error);
    throw error;
  }
};
