'use client';

import { useState } from 'react';

export default function TestPolymarket() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testPolymarket = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🚀 Testing Polymarket API...');
      
      const response = await fetch('/api/polymarket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'Who will win FIFA 2026 World Cup?'
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch');
      }

      console.log('✅ Polymarket API Response:', data);
      setResult(data);
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-monad-dark-bg p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-monad-cyan mb-8">
          Polymarket API Test
        </h1>

        <button
          onClick={testPolymarket}
          disabled={loading}
          className="px-6 py-3 rounded-lg monad-gradient text-white font-semibold
                   hover:shadow-monad-glow transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Testing...' : 'Test Polymarket API'}
        </button>

        {error && (
          <div className="mt-6 p-4 rounded-lg bg-red-900/20 border border-red-500/50">
            <h2 className="text-red-400 font-semibold mb-2">Error:</h2>
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-6 rounded-lg bg-monad-black/50 border border-monad-purple/20">
            <h2 className="text-monad-cyan font-semibold text-xl mb-4">
              Results (Check Console for Full Details)
            </h2>
            
            <div className="space-y-4">
              <div>
                <span className="text-monad-light-purple">Market ID:</span>
                <span className="text-monad-white ml-2">{result.marketId}</span>
              </div>
              
              <div>
                <span className="text-monad-light-purple">Question:</span>
                <span className="text-monad-white ml-2">{result.question}</span>
              </div>
              
              <div>
                <span className="text-monad-light-purple">Volume:</span>
                <span className="text-monad-white ml-2">{result.volume}</span>
              </div>

              <div>
                <h3 className="text-monad-purple font-semibold mb-2">Outcomes:</h3>
                <div className="space-y-2">
                  {result.outcomes?.map((outcome: any, idx: number) => (
                    <div key={idx} className="p-3 rounded bg-monad-black/30 border border-monad-purple/10">
                      <div className="flex justify-between items-center">
                        <span className="text-monad-white">{outcome.country}</span>
                        <div className="text-right">
                          <div className="text-monad-cyan">{outcome.probability}</div>
                          <div className="text-xs text-monad-light-purple">
                            Price: {outcome.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded bg-monad-purple/10 border border-monad-purple/30">
              <p className="text-xs text-monad-light-purple">
                💡 Full response logged to console. Open DevTools to see all data.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
