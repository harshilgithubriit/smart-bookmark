"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export default function BookmarkList({ user }: { user: any }) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching bookmarks:", error);
      } else {
        setBookmarks(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchBookmarks();

    const channel = supabase
      .channel("realtime bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchBookmarks]);

  const deleteBookmark = async (id: string) => {
    try {
      const { error } = await supabase.from("bookmarks").delete().eq("id", id);
      if (error) console.error("Error deleting:", error);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading bookmarks...</p>;

  return (
    <div className="mt-6 space-y-3">
      {bookmarks.length === 0 ? (
        <p className="text-gray-500 text-center">No bookmarks yet</p>
      ) : (
        bookmarks.map((b) => (
          <div
            key={b.id}
            className="border p-3 flex justify-between items-center"
          >
            <a href={b.url} target="_blank" rel="noopener noreferrer" className="font-medium">
              {b.title || b.url}
            </a>

            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}