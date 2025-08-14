"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation } from "@/components/navigation";
import Link from 'next/link';

// Force dynamic rendering to prevent build-time issues
export const dynamic = 'force-dynamic';

interface SearchResult {
  id: number;
  title: string;
  author?: string;
  category: string;
  description: string;
  videoCategory?: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && query.trim()) {
      performSearch(query);
    }
  }, [mounted, query]);

  const performSearch = async (searchQuery: string) => {
    if (!mounted) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      const data = await response.json();
      setResults(data.results || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Search error:', error);
      setError(error instanceof Error ? error.message : 'Search failed');
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'book': return 'Igitabo';
      case 'bible-study': return 'Amasomo';
      case 'sermon': return 'Amasomo';
      case 'daily-word': return 'Ijambo ry\'Umunsi';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'book': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'bible-study': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'sermon': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'daily-word': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getResultLink = (result: SearchResult) => {
    switch (result.category) {
      case 'book': return '/ibitabo';
      case 'bible-study': return '/twige-bibiliya';
      case 'sermon': return '/videos';
      case 'daily-word': return '/ijambo-ryumunsi';
      default: return '#';
    }
  };

  // Prevent hydration issues
  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Error boundary
  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Search Error</h1>
        <p className="text-muted-foreground mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Ibisubizo by'Ubushakashatsi
        </h1>
        {query && (
          <p className="text-muted-foreground">
            Ubushakashatsi bwa: <span className="font-semibold">"{query}"</span>
            {total > 0 && <span className="ml-2">({total} ibisubizo)</span>}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Gushakisha...</p>
        </div>
      )}

      {/* No Query */}
      {!query.trim() && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Andika ijambo ushaka gushakisha.</p>
        </div>
      )}

      {/* No Results */}
      {query.trim() && !loading && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nta gisubizo cyabonetse kuri "{query}". Gerageza ijambo rikindi.
          </p>
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && !loading && (
        <div className="space-y-6">
          {results.map((result) => (
            <div
              key={`${result.category}-${result.id}`}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(result.category)}`}>
                    {getCategoryLabel(result.category)}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                <Link 
                  href={getResultLink(result)}
                  className="hover:text-primary transition-colors"
                >
                  {result.title}
                </Link>
              </h3>
              
              {result.author && (
                <p className="text-sm text-muted-foreground mb-2">
                  Umwanditsi: {result.author}
                </p>
              )}
              
              <p className="text-muted-foreground mb-4">
                {result.description}
              </p>
              
              <Link 
                href={getResultLink(result)}
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Soma byinshi
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchLoading() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Suspense fallback={<SearchLoading />}>
          <SearchContent />
        </Suspense>
      </main>
    </div>
  );
}
