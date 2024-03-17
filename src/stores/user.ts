import { defineStore } from 'pinia';
import router from '@/router';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';

export const useUserStore = defineStore('user', () => {
  const auth = useFirebaseAuth()!;

  async function googleLogin() {
    await signInWithPopup(auth, new GoogleAuthProvider());
  }

  async function logout() {
    await signOut(auth);
    await router.push('/login');
  }

  return { googleLogin, logout };
});
