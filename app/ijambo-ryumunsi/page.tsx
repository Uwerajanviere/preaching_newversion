"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Loader2, Calendar, BookOpen, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DailyWord {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function IjamboRyumunsiPage() {
  const [dailyWord, setDailyWord] = useState<DailyWord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDailyWord();
  }, []);

  const fetchDailyWord = async () => {
    try {
      // Debug logging
      const apiUrl = '/api/daily-word';
      console.log('Fetching daily word from:', apiUrl);
      console.log('Current window location:', window.location.href);
      
      const response = await fetch(apiUrl);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error(`Failed to fetch daily word: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Daily word data:', data);
      setDailyWord(data);
    } catch (err) {
      console.error('Error fetching daily word:', err);
      setError(err instanceof Error ? err.message : 'Failed to load daily word');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!dailyWord) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center flex-col">
          <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">Nta jambo ry'umunsi rihari ubu.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Ijambo ry'Umunsi
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
            Soma ijambo ry'Imana ryawe buri munsi kugira ngo wiyongere ubwoba bw'Imana
          </p>
        </div>
      </div>

      {/* Daily Word Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Date Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-full px-6 py-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="text-blue-800 font-medium">
                {new Date(dailyWord.createdAt).toLocaleDateString('rw-RW', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Main Content Card */}
          <Card className="shadow-xl border-0 bg-white">
            <CardContent className="p-8 md:p-12">
              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 leading-tight">
                {dailyWord.title}
              </h2>

              {/* Decorative Divider */}
              <div className="flex justify-center mb-8">
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              </div>

              {/* Content */}
              <div className="prose prose-lg prose-blue max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed text-lg md:text-xl text-center whitespace-pre-wrap"
                  style={{ lineHeight: '1.8' }}
                >
                  {dailyWord.content}
                </div>
              </div>

              {/* Bottom Decoration */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-blue-600">
                    <Heart className="h-5 w-5" />
                    <span className="text-sm font-medium">Imana ikugume</span>
                    <Heart className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inspirational Quote Section */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8">
                <blockquote className="text-lg md:text-xl text-gray-700 italic">
                  "Ijambo ry'Imana ni itara ku maguru yanjye, n'urumuri ku nzira yanjye."
                </blockquote>
                <cite className="block mt-4 text-blue-600 font-medium">
                  - Zaburi 119:105
                </cite>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Saba kandi utekereze
              </h3>
              <p className="text-gray-600 mb-6">
                Fata igihe cyo gutekereza ku jambo ry'uyu munsi. Saba Imana ikugire ubwoba bwayo mu mutima wawe.
              </p>
              <div className="flex justify-center">
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                  <span className="font-medium">🙏 Igihe cyo gusaba</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
