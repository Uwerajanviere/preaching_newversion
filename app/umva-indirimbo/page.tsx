"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Heart, Share2, Search } from "lucide-react";

// Mock hymn data
const hymns = [
  {
    id: 1,
    title: "Imana Nshimwe",
    category: "Indirimbo z'Uwishingizi",
    duration: "4:32",
    lyrics: "Imana nshimwe kuko unyongera ubuzima bwaniye...",
    audioUrl: "#"
  },
  {
    id: 2,
    title: "Uwishingizi Wanjye",
    category: "Indirimbo z'Uwishingizi",
    duration: "3:45",
    lyrics: "Uwishingizi wanjye ni Yehova...",
    audioUrl: "#"
  },
  {
    id: 3,
    title: "Amahoro Y'Imana",
    category: "Indirimbo z'Amahoro",
    duration: "5:12",
    lyrics: "Amahoro y'Imana yagutse...",
    audioUrl: "#"
  },
  {
    id: 4,
    title: "Umusi W'Uwishingizi",
    category: "Indirimbo z'Uwishingizi",
    duration: "4:18",
    lyrics: "Umusi w'uwishingizi wanjye...",
    audioUrl: "#"
  },
  {
    id: 5,
    title: "Imana Irabarinda",
    category: "Indirimbo z'Uwishingizi",
    duration: "3:56",
    lyrics: "Imana irabarinda...",
    audioUrl: "#"
  },
  {
    id: 6,
    title: "Umutekano Wanjye",
    category: "Indirimbo z'Amahoro",
    duration: "4:23",
    lyrics: "Umutekano wanjye ni Yehova...",
    audioUrl: "#"
  }
];

const categories = [
  "Zose",
  "Indirimbo z'Uwishingizi",
  "Indirimbo z'Amahoro",
  "Indirimbo z'Imana",
  "Indirimbo z'Umutekano"
];

export default function UmvaIndirimboPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Zose");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredHymns, setFilteredHymns] = useState(hymns);

  useEffect(() => {
    let filtered = hymns;
    
    if (selectedCategory !== "Zose") {
      filtered = filtered.filter(hymn => hymn.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(hymn => 
        hymn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hymn.lyrics.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredHymns(filtered);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="relative min-h-screen flex flex-col bg-white">

      {/* Header */}
      <header className="relative z-20 w-full bg-[#0a3a5c] backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-3xl font-bold text-white">
            yera
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">Umva Indirimbo</h1>
          
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Shaka indirimbo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-amber-500 hover:bg-amber-600 text-black" 
                    : "border-white/20 text-white hover:bg-white/10"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Hymns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHymns.map((hymn) => (
              <Card key={hymn.id} className="bg-black/40 backdrop-blur-sm border-white/20 hover:bg-black/50 transition">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{hymn.title}</CardTitle>
                  <p className="text-white/70 text-sm">{hymn.category}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-white/80 text-sm line-clamp-3">
                      {hymn.lyrics}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">{hymn.duration}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-white/20 text-white">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/20 text-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/20 text-white">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHymns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/70 text-lg">Nta ndirimbo yabonetse</p>
            </div>
          )}

          {/* Featured Hymn */}
          <Card className="mt-12 bg-black/40 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Indirimbo y'Umunsi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <h3 className="text-white text-xl font-semibold">Imana Nshimwe</h3>
                <p className="text-white/80 text-lg italic">
                  "Imana nshimwe kuko unyongera ubuzima bwaniye, kandi unyongera amahoro y'ubuzima bwaniye. 
                  Imana nshimwe kuko unyongera ubuzima bwaniye, kandi unyongera amahoro y'ubuzima bwaniye."
                </p>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                  <Play className="h-4 w-4 mr-2" />
                  Umva Indirimbo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 