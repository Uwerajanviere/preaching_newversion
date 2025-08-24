"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Quote } from "lucide-react";

interface DailyWord {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export function DailyWordSection() {
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
      
      if (response.ok) {
        const data = await response.json();
        console.log('Daily word data:', data);
        setDailyWord(data);
      } else {
        console.error('Failed to fetch daily word:', response.status, response.statusText);
        setError(`Failed to fetch daily word: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching daily word:', error);
      setError('Network error while fetching daily word');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="animate-pulse">
                  <div className="h-6 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-gradient-to-r from-primary/10 to-primary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                Ijambo ry'Umunsi
              </h2>
              <p className="text-sm text-muted-foreground">Daily Word</p>
            </div>
            
            <Card className="shadow-lg border bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                  onClick={fetchDailyWord}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                >
                  Retry
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (!dailyWord) {
    return null;
  }

  return (
    <section className="py-8 bg-gradient-to-r from-primary/10 to-primary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              Ijambo ry'Umunsi
            </h2>
            <p className="text-sm text-muted-foreground">Daily Word</p>
          </div>
          
          <Card className="shadow-lg border bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-3">
              <CardTitle className="text-lg md:text-xl font-bold text-card-foreground flex items-center justify-center gap-2">
                <Quote className="h-5 w-5 text-primary" />
                {dailyWord.title}
              </CardTitle>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(dailyWord.createdAt).toLocaleDateString('rw-RW', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="prose max-w-none text-center">
                <blockquote className="text-base md:text-lg leading-relaxed text-card-foreground/90 italic border-l-4 border-primary pl-4 bg-primary/10 rounded-r-lg py-3">
                  "{dailyWord.content}"
                </blockquote>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
