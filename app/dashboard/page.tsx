"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Dashboard() {
const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
  if (data?.user) {
    setUser(data.user);
  }
});
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-bold">Welcome {user.user_metadata?.full_name || "User"}
</h1>

      <BookmarkForm user={user} />
      <BookmarkList user={user} />
    </div>
  );
}
