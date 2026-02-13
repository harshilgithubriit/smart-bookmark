"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BookmarkList({ user }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  async function fetchBookmarks() {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  }

  const deleteBookmark = async (id) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();
  };

  return (
    <div className="mt-6 space-y-3">
      {bookmarks.map((b) => (
        <div
          key={b.id}
          className="border p-3 flex justify-between items-center"
        >
          <a href={b.url} target="_blank" className="font-medium">
            {b.title || b.url}
          </a>

          <button
            onClick={() => deleteBookmark(b.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
