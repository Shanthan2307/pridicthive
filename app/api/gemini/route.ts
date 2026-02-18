// app/api/gemini/route.ts
import { NextResponse } from 'next/server';

const GEMINI_API_KEY = 'AIzaSyAZhynwJJ5rbdAxtYblS93h6LLuM_Wewjw';

export async function POST(req: Request) {
  const { query, context } = await req.json();
  
  console.log('🤖 Gemini API called with query:', query);

  try {
    const prompt = context 
      ? `Context: ${context}\n\nUser question: ${query}\n\nRefine this question to be clear and suitable for fetching prediction market data from Polymarket. Return only the refined question, nothing else.`
      : `Refine this question to be clear and suitable for fetching prediction market data from Polymarket: "${query}"\n\nReturn only the refined question, nothing else.`;

    // Using the correct v1beta endpoint with gemini-2.0-flash-exp model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error response:', errorData);
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const refinedQuery = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!refinedQuery) {
      throw new Error('No response from Gemini');
    }

    console.log('✅ Refined query:', refinedQuery);

    return NextResponse.json({
      originalQuery: query,
      refinedQuery,
      context
    });
  } catch (error) {
    console.error('❌ Gemini API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to refine query with Gemini',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
