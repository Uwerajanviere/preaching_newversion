"use client";

import { Navigation } from "@/components/navigation";
import { VideoSection } from "@/components/video-section";

export default function VideosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Videos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Reba amashusho yose y'amasomo n'amakuru y'ubwiyunge
          </p>
        </div>

        {/* All Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <VideoSection key="faith" category="Faith" />
          <VideoSection key="grace" category="Grace" />
          <VideoSection key="love" category="Love" />
          <VideoSection key="hope" category="Hope" />
          <VideoSection key="salvation" category="Salvation" />
          <VideoSection key="prayer" category="Prayer" />
        </div>
      </main>
    </div>
  );
}
