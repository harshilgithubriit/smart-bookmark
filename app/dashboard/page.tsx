"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Get session properly
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
      }

      setLoading(false);
    };

    getSession();

    // ✅ Listen for login changes (IMPORTANT)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading...</p>;

  if (!user)
    return <p className="text-center mt-10 text-lg">Please login</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">
        Welcome {user.user_metadata?.full_name || "User"}
      </h1>

      <BookmarkForm user={user} />
      <BookmarkList user={user} />
    </div>
  );
}
