import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would come from your database
const mockBooks = [
  { id: 1, title: "Ubwiyunge bw'Imana", author: "Pastor John", category: "book", description: "Igitabo gikurikira ubwiyunge bw'Imana mu buzima bwacu" },
  { id: 2, title: "Urukundo rw'Imana", author: "Pastor Mary", category: "book", description: "Urukundo rw'Imana rutanga ubuzima" },
  { id: 3, title: "Kwizera no Gusenga", author: "Pastor David", category: "book", description: "Uburyo bwo kwizera no gusenga" },
];

const mockBibleStudies = [
  { id: 1, title: "Amasomo ku Bwiyunge", category: "bible-study", description: "Amasomo y'ibanze ku bwiyunge" },
  { id: 2, title: "Urukundo mu Bibiliya", category: "bible-study", description: "Urukundo rw'Imana mu Bibiliya" },
  { id: 3, title: "Kwizera no Kwihangana", category: "bible-study", description: "Amasomo ku kwizera no kwihangana" },
];

const mockSermons = [
  { id: 1, title: "Ubwiyunge bw'Imana", category: "sermon", description: "Amasomo ku bwiyunge bw'Imana", videoCategory: "Faith" },
  { id: 2, title: "Ubuntu bw'Imana", category: "sermon", description: "Ubuntu bw'Imana mu buzima bwacu", videoCategory: "Grace" },
  { id: 3, title: "Urukundo rw'Kristo", category: "sermon", description: "Urukundo rw'Kristo rutanga ubuzima", videoCategory: "Love" },
];

const mockDailyWords = [
  { id: 1, title: "Ijambo ry'Umunsi - Ubwiyunge", category: "daily-word", description: "Ijambo ry'umunsi ku bwiyunge" },
  { id: 2, title: "Ijambo ry'Umunsi - Urukundo", category: "daily-word", description: "Ijambo ry'umunsi ku rukundo" },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    
    if (!query.trim()) {
      return NextResponse.json({ results: [], total: 0 });
    }

    // Search across all content types
    const allContent = [
      ...mockBooks,
      ...mockBibleStudies,
      ...mockSermons,
      ...mockDailyWords,
    ];

    // Filter content based on search query
    const results = allContent.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.author && item.author.toLowerCase().includes(query))
    );

    // Sort results by relevance (title matches first)
    const sortedResults = results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(query) ? 1 : 0;
      const bTitle = b.title.toLowerCase().includes(query) ? 1 : 0;
      return bTitle - aTitle;
    });

    return NextResponse.json({
      results: sortedResults,
      total: sortedResults.length,
      query: query
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
