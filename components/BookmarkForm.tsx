"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BookmarkForm({ user }: { user: any }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const addBookmark = async () => {
    if (!url) return alert("Enter URL");

    const { error } = await supabase.from("bookmarks").insert({
      url,
      title,
      user_id: user.id,
    });

    if (error) alert(error.message);
    else {
      setUrl("");
      setTitle("");
      location.reload();
    }
  };

  return (
    <div className="space-y-2 mt-6">
      <input
        className="border p-2 w-full"
        placeholder="Website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={addBookmark}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save Bookmark
      </button>
    </div>
  );
}
