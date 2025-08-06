"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";

import { Loader2, ArrowLeft, Calendar, BookOpen } from "lucide-react";

interface BibleStudy {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  createdAt: string;
}

export default function BibleStudyPage({ params }: { params: { id: string } }) {
  const [study, setStudy] = useState<BibleStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBibleStudy();
  }, []);

  const fetchBibleStudy = async () => {
    try {
      const response = await fetch(`/api/bible-study/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bible study');
      }
      const data = await response.json();
      setStudy(data);
    } catch (err) {
      setError('Failed to load bible study');
      console.error('Error fetching bible study:', err);
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

  if (error || !study) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center flex-col">
          <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-red-500 mb-4">{error || 'Bible study not found'}</p>
          <Link 
            href="/twige-bibiliya"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Subira ku cyigisho
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/twige-bibiliya"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Subira ku cyigisho
          </Link>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="aspect-video relative">
            <Image
              src={study.imageUrl}
              alt={study.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Meta Info */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Calendar className="h-4 w-4" />
              <time dateTime={study.createdAt}>
                {new Date(study.createdAt).toLocaleDateString('rw-RW', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              {study.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: study.content.replace(/\n/g, '<br />') }}
              />
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link 
            href="/twige-bibiliya"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Subira ku cyigisho cyose
          </Link>
        </div>
      </main>


    </div>
  );
}
