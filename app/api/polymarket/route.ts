// app/api/polymarket/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { query } = await req.json(); // e.g., "Who will win FIFA 2026 World Cup?"
  
  console.log('🔍 Polymarket API called with query:', query);

  try {
    // Step 1: Fetch active events and search for relevant markets
    console.log('📊 Fetching active events...');
    const eventsRes = await fetch('https://gamma-api.polymarket.com/events?active=true&closed=false&limit=100');
    const events = await eventsRes.json();
    console.log(`✅ Fetched ${events.length} active events`);
    
    // Search for FIFA/World Cup related events
    const relevantEvents = events.filter((event: any) => 
      event.title?.toLowerCase().includes('fifa') ||
      event.title?.toLowerCase().includes('world cup') ||
      event.title?.toLowerCase().includes('2026') ||
      event.slug?.toLowerCase().includes('fifa') ||
      event.slug?.toLowerCase().includes('world-cup')
    );
    
    console.log(`🔍 Found ${relevantEvents.length} FIFA/World Cup related events`);
    
    if (relevantEvents.length > 0) {
      console.log('📋 Relevant events:', relevantEvents.map((e: any) => ({
        title: e.title,
        slug: e.slug,
        markets: e.markets?.length || 0
      })));
    }

    // If no FIFA events found, use the first active event as a demo
    let selectedEvent = relevantEvents[0] || events[0];
    
    if (!selectedEvent) {
      console.log('❌ No active events found');
      return NextResponse.json({ 
        error: 'No active events found on Polymarket'
      }, { status: 404 });
    }

    console.log('🎯 Selected event:', {
      id: selectedEvent.id,
      title: selectedEvent.title,
      slug: selectedEvent.slug,
      marketsCount: selectedEvent.markets?.length || 0
    });

    // Step 2: Get the first market from the event
    const market = selectedEvent.markets?.[0];
    
    if (!market) {
      console.log('❌ No markets found in event');
      return NextResponse.json({ 
        error: 'No markets found in selected event'
      }, { status: 404 });
    }

    console.log('🏆 Selected market:', {
      id: market.id,
      question: market.question,
      outcomes: market.outcomes,
      outcomePrices: market.outcomePrices
    });

    // Step 3: Parse outcomes and prices
    // Outcomes and outcomePrices are JSON strings that need to be parsed
    const outcomesArray = JSON.parse(market.outcomes || '[]');
    const pricesArray = JSON.parse(market.outcomePrices || '[]');
    
    console.log('📊 Parsed data:', { outcomesArray, pricesArray });

    // Map outcomes to their prices
    const outcomes = outcomesArray.map((outcome: string, index: number) => {
      const price = parseFloat(pricesArray[index] || '0');
      return {
        name: outcome,
        price: price,
        probability: (price * 100).toFixed(2) + '%',
      };
    });

    console.log('✅ Processed outcomes:', outcomes);

    // Step 4: Optionally fetch current prices from CLOB
    if (market.clobTokenIds && market.clobTokenIds.length > 0) {
      console.log('💰 Fetching live prices from CLOB...');
      try {
        const tokenIds = JSON.parse(market.clobTokenIds);
        const pricePromises = tokenIds.map((tokenId: string) =>
          fetch(`https://clob.polymarket.com/price?token_id=${tokenId}&side=buy`)
            .then(res => res.json())
            .catch(() => null)
        );
        const livePrices = await Promise.all(pricePromises);
        console.log('💰 Live prices:', livePrices);
        
        // Update outcomes with live prices if available
        livePrices.forEach((priceData, index) => {
          if (priceData && outcomes[index]) {
            const livePrice = parseFloat(priceData.price || '0');
            outcomes[index].livePrice = livePrice;
            outcomes[index].liveProbability = (livePrice * 100).toFixed(2) + '%';
          }
        });
      } catch (e) {
        console.log('⚠️ Could not fetch live prices:', e);
      }
    }

    const response = {
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      eventSlug: selectedEvent.slug,
      marketId: market.id,
      question: market.question,
      outcomes,
      volume: market.volume,
      tags: selectedEvent.tags,
    };
    
    console.log('✅ Final response:', JSON.stringify(response, null, 2));
    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Error fetching Polymarket data:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch Polymarket data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
