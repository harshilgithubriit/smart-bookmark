"use client";

import { supabase } from "@/lib/supabase";

export default function LoginButton() {
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      },
    });

    if (error) {
      console.error("Login error:", error);
      alert(error.message);
    }
  };

  return (
    <button
      onClick={loginWithGoogle}
      className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
    >
      Sign in with Google
    </button>
  );
}