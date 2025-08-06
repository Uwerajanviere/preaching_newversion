"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, ArrowRight } from "lucide-react";

interface BibleStudy {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  createdAt: string;
}

export function LatestBibleStudiesSection() {
  const [bibleStudies, setBibleStudies] = useState<BibleStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestBibleStudies();
  }, []);

  const fetchLatestBibleStudies = async () => {
    try {
      const response = await fetch('/api/bible-study');
      if (response.ok) {
        const data = await response.json();
        // Get only the latest 3 bible studies
        setBibleStudies(data.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching bible studies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Twige Bibiliya
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-video rounded-t-lg"></div>
                <div className="bg-gray-100 p-6 rounded-b-lg">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (bibleStudies.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Twige Bibiliya
          </h2>
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nta cyigisho kihari ubu.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Twige Bibiliya
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soma amabwiriza n'amakuru y'ubwiyunge kugira ngo wiyongere ubumenyi bw'Inyandiko Ntagatifu
          </p>
        </div>

        {/* Bible Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {bibleStudies.map((study) => (
            <Link key={study.id} href={`/twige-bibiliya/${study.id}`}>
              <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <CardContent className="p-0 h-full flex flex-col">
                  {/* Study Image */}
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src={study.imageUrl}
                      alt={study.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Study Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-xl text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-3">
                      {study.title}
                    </h3>
                    
                    <p className="text-gray-600 line-clamp-3 mb-4 flex-1">
                      {study.content.substring(0, 120)}...
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(study.createdAt).toLocaleDateString('rw-RW', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-blue-600 group-hover:text-blue-700 text-sm font-medium">
                        <span>Soma</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/twige-bibiliya">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Reba cyigisho cyose
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
