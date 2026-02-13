"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        console.log("🔍 Starting auth check...");
        
        // Get the session
        const { data, error } = await supabase.auth.getSession();
        
        console.log("📦 Session data:", data);
        console.log("❌ Session error:", error);
        console.log("👤 User:", data.session?.user);
        
        if (error) {
          console.error("Session error:", error);
          setError(error.message);
        }
        
        setUser(data.session?.user ?? null);

        // Remove access token from URL
        window.history.replaceState({}, document.title, "/dashboard");
      } catch (error: any) {
        console.error("💥 Error in init:", error);
        setError(error.message);
      } finally {
        console.log("✅ Setting loading to false");
        setLoading(false);
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("🔄 Auth state changed:", event, session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  console.log("🎨 Rendering - loading:", loading, "user:", user, "error:", error);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p>Loading...</p>
        <p className="text-sm text-gray-500 mt-2">Check browser console for logs</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg font-semibold mb-4">Please login</p>
        <a 
          href="/" 
          className="bg-black text-white px-6 py-3 rounded-lg inline-block"
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