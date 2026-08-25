'use client';

import { signInWithPopup } from 'firebase/auth';

import { auth, googleProvider } from '@/lib/firebase';

export default function GoogleLoginButton() {
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={login}>Sign in with Google</button>;
}
