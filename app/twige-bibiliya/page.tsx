"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";

import { Loader2, BookOpen, Calendar } from "lucide-react";

interface BibleStudy {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  createdAt: string;
}

export default function TwigeBibiliyaPage() {
  const [bibleStudies, setBibleStudies] = useState<BibleStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBibleStudies();
  }, []);

  const fetchBibleStudies = async () => {
    try {
      const response = await fetch('/api/bible-study');
      if (!response.ok) {
        throw new Error('Failed to fetch bible studies');
      }
      const data = await response.json();
      setBibleStudies(data);
    } catch (err) {
      setError('Failed to load bible studies');
      console.error('Error fetching bible studies:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Twige Bibiliya
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soma amabwiriza n'amakuru y'ubwiyunge kugira ngo wiyongere ubumenyi bw'Inyandiko Ntagatifu
          </p>
        </div>

        {bibleStudies.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nta cyigisho kihari ubu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bibleStudies.map((study) => (
              <Link key={study.id} href={`/twige-bibiliya/${study.id}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image
                        src={study.imageUrl}
                        alt={study.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-3">
                        {study.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {study.content.substring(0, 150)}...
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {new Date(study.createdAt).toLocaleDateString('rw-RW', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>


    </div>
  );
}
