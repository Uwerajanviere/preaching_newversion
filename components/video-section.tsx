"use client";

import { useState, useEffect } from "react";
import { YouTubeVideo } from "./youtube-video";
import { getYouTubeLinksByCategory } from "@/lib/firebase-service";
import { YouTubeLinkCategory } from "@/lib/types";

interface VideoSectionProps {
  category: YouTubeLinkCategory;
  limit?: number;
}

export function VideoSection({ category, limit }: VideoSectionProps) {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    async function fetchVideos() {
      try {
        const fetchedVideos = await getYouTubeLinksByCategory(category);
        // Apply limit in the component if needed
        const limitedVideos = limit ? fetchedVideos.slice(0, limit) : fetchedVideos;
        setVideos(limitedVideos);
      } catch (err) {
        console.error(`Error fetching ${category} videos:`, err);
        setError("Failed to load videos");
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
  }, [category, limit, isMounted]);

  // Always render the same structure to prevent hydration mismatch
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white text-center">{category}</h3>
      {!isMounted || isLoading ? (
        <div className="animate-pulse bg-black/20 rounded-xl h-48"></div>
      ) : error ? (
        <div className="bg-red-500/20 rounded-xl p-4 text-white text-center">
          {error}
        </div>
      ) : videos.length > 0 ? (
        videos.map((video) => (
          <YouTubeVideo key={video.id} video={video} />
        ))
      ) : (
        <div className="bg-black/20 rounded-xl p-4 text-white text-center">
          No videos available
        </div>
      )}
    </div>
  );
} 