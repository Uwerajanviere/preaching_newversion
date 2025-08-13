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
    <div className="relative min-h-screen flex flex-col bg-background">

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
        <section id="latest-sermons" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Latest Sermons</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <VideoSection key="faith" category="Faith" limit={2} />
              <VideoSection key="grace" category="Grace" limit={2} />
              <VideoSection key="love" category="Love" limit={2} />
            </div>
            
            {/* View All Videos Button */}
            <div className="text-center mt-12">
              <Link href="/videos" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                Reba Amashusho Yose
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>


      </main>
    </div>
  )
}
