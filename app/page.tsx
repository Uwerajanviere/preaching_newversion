import Image from "next/image"
import { Play, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { VideoSection } from "@/components/video-section"
import { DailyWordSection } from "@/components/daily-word-section"
import { LatestBooksSection } from "@/components/latest-books-section"
import { LatestBibleStudiesSection } from "@/components/latest-bible-studies-section"
import Link from 'next/link'

export default function Home() {
  const videoLimit = 3; // Define the number of videos to display on the homepage

  return (
    <div className="relative min-h-screen flex flex-col bg-white">

      {/* Navigation */}
      <Navigation />

      {/* Daily Word Hero Section */}
      <main className="flex-1 flex flex-col pt-20">
        <DailyWordSection />

        {/* Latest Books Section */}
        <LatestBooksSection />

        {/* Latest Bible Studies Section */}
        <LatestBibleStudiesSection />

        {/* Sermons Section */}
        <section id="latest-sermons" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Latest Sermons</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <VideoSection key="faith" category="Faith" limit={videoLimit} />
              <VideoSection key="grace" category="Grace" limit={videoLimit} />
              <VideoSection key="love" category="Love" limit={videoLimit} />
              <VideoSection key="hope" category="Hope" limit={videoLimit} />
              <VideoSection key="salvation" category="Salvation" limit={videoLimit} />
              <VideoSection key="prayer" category="Prayer" limit={videoLimit} />
            </div>
          </div>
        </section>


      </main>
    </div>
  )
}
