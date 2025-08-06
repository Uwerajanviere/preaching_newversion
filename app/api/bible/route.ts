import { NextResponse } from 'next/server';

// Mock Bible data - replace with actual API integration
const mockBibleData = {
  'gen': {
    1: {
      1: "Mu ntangiriro Imana yarema ijuru n'isi.",
      2: "Isi yari itaraba kandi itaraba, umwijima wari kuri uburambe bw'inyanja, kandi Umwuka wa Imana wari ugereranya kuri amazi.",
      3: "Imana yavuga iti 'Haba urumuri', maze urumuri rwaba.",
      4: "Imana yabona ko urumuri rwiza, maze Imana yatandukanya urumuri n'umwijima.",
      5: "Imana yita urumuri 'Umunsi', n'umwijima yarwita 'Ikiroramwo'. Kuri uwo munsi wa nyuma wa gatanu, maze haba umugoroba n'umuseke."
    }
  },
  'jhn': {
    3: {
      16: "Kuko Imana yagukunda uko yagukundaga, nshya uko yagukundaga, kandi yatanze Umwana wayo wa mbere kugira ngo uwese wemeye atarimbuka, ahubwo afite ubuzima budahera."
    }
  },
  'psa': {
    23: {
      1: "Yehova ni Umwishingizi wanjye, ntibuzagutse.",
      2: "Yantera kuri amashami y'ubwiza, anyyereke kuri amazi y'umutekano.",
      3: "Yongera ubuzima bwaniye, anyyereke kuri nzira z'ubugororamutima kugira izina rye."
    }
  }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const book = searchParams.get('book');
    const chapter = searchParams.get('chapter');
    const verse = searchParams.get('verse');

    if (!book || !chapter) {
      return NextResponse.json({ 
        error: 'Book and chapter are required' 
      }, { status: 400 });
    }

    // Check if we have mock data for this reference
    const bookData = mockBibleData[book as keyof typeof mockBibleData];
    if (!bookData) {
      return NextResponse.json({ 
        text: `Igitabo cya ${book} ntibashoboka kuzuza ubu buryo.` 
      });
    }

    const chapterData = bookData[parseInt(chapter)];
    if (!chapterData) {
      return NextResponse.json({ 
        text: `Urupapuro rwa ${chapter} mu gitabo cya ${book} ntibashoboka kuzuza ubu buryo.` 
      });
    }

    if (verse) {
      const verseText = chapterData[parseInt(verse)];
      if (!verseText) {
        return NextResponse.json({ 
          text: `Umusigiti wa ${verse} mu gitabo cya ${book} urupapuro rwa ${chapter} ntibashoboka kuzuza ubu buryo.` 
        });
      }
      return NextResponse.json({ 
        text: verseText,
        reference: `${book} ${chapter}:${verse}`
      });
    } else {
      // Return entire chapter
      const chapterText = Object.entries(chapterData)
        .map(([verseNum, text]) => `${verseNum}. ${text}`)
        .join('\n\n');
      
      return NextResponse.json({ 
        text: chapterText,
        reference: `${book} ${chapter}`
      });
    }

  } catch (error) {
    console.error('Bible API error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch Bible text' 
    }, { status: 500 });
  }
} 