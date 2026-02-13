"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BookmarkForm({ user }: { user: any }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const addBookmark = async () => {
    if (!url) return alert("Enter URL");

    setLoading(true);
    try {
      const { error } = await supabase.from("bookmarks").insert({
        url,
        title,
        user_id: user.id,
      });

      if (error) {
        alert(error.message);
      } else {
        setUrl("");
        setTitle("");
        // Don't reload - let realtime subscription handle the update
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
      alert("Failed to add bookmark");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2 mt-6">
      <input
        className="border p-2 w-full rounded"
        placeholder="Website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={loading}
      />

      <input
        className="border p-2 w-full rounded"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />

      <button
        onClick={addBookmark}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Bookmark"}
      </button>
    </div>
  );
}