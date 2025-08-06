"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

interface Book {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  createdAt: string;
}

export default function BookPage() {
  const params = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchBook(params.id as string);
    }
  }, [params.id]);

  const fetchBook = async (id: string) => {
    try {
      const response = await fetch(`/api/books/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book');
      }
      const data = await response.json();
      setBook(data);
    } catch (err) {
      setError('Failed to load book');
      console.error('Error fetching book:', err);
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

  if (error || !book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <p className="text-red-500 text-lg">{error || 'Book not found'}</p>
          <Link href="/ibitabo">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Button>
          </Link>
        </div>

      </div>
    );
  }

  // Format content with proper paragraphs
  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      return (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
          {paragraph.trim()}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-1">
        {/* Header Section */}
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <Link href="/ibitabo">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Subira ku bitabo
              </Button>
            </Link>
          </div>
        </div>

        {/* Book Content */}
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Book Cover */}
            <div className="lg:w-1/3">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="lg:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {book.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span>
                  Cyanditswe: {new Date(book.createdAt).toLocaleDateString('rw-RW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {/* Reading time estimate */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  <strong>Igihe cyo gusoma:</strong> {Math.ceil(book.content.split(' ').length / 200)} iminota
                </p>
              </div>
            </div>
          </div>

          {/* Book Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-lg leading-relaxed">
              {formatContent(book.content)}
            </div>
          </div>

          {/* Back to Books Button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/ibitabo">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Subira ku bitabo byose
              </Button>
            </Link>
          </div>
        </article>
      </main>


    </div>
  );
}
