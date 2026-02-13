"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for OAuth callback parameters
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const queryParams = new URLSearchParams(window.location.search);
    
    const hasOAuthParams = 
      hashParams.has('access_token') || 
      queryParams.has('code');

    const initAuth = async () => {
      try {
        if (hasOAuthParams) {
          // If we have OAuth params, wait for Supabase to process them
          console.log("🔄 Processing OAuth callback...");
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        
        console.log("📦 Session:", session);
        console.log("❌ Error:", error);

        if (error) {
          console.error("Session error:", error);
        }

        setUser(session?.user ?? null);
        
        // Clean URL after processing
        if (hasOAuthParams) {
          window.history.replaceState({}, document.title, "/dashboard");
        }
      } catch (error) {
        console.error("💥 Auth error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("🔄 Auth event:", event, session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg font-semibold mb-4">Please login</p>
        <a 
          href="/" 
          className="bg-black text-white px-6 py-3 rounded-lg inline-block hover:bg-gray-800"
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">
        Welcome {user.user_metadata?.full_name || user.email || "User"}
      </h1>

      <BookmarkForm user={user} />
      <BookmarkList user={user} />
    </div>
  );
}