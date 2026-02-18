// app/api/debate-stream/route.ts
import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: Request) {
  const { question, marketData } = await req.json();
  
  console.log('🎭 Debate Stream API called');

  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Send initial status
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'status', message: 'Starting debate...' })}\n\n`)
        );

        const debateContext = `
PREDICTION MARKET DATA:
Question: ${marketData.question}
Market Volume: $${(parseFloat(marketData.volume) / 1000000).toFixed(2)}M

Current Probabilities:
${marketData.outcomes.map((o: any) => 
  `- ${o.name}: ${o.liveProbability || o.probability} (Price: ${o.livePrice || o.price})`
).join('\n')}

Tags: ${marketData.tags?.map((t: any) => t.label).join(', ') || 'None'}

DEBATE TOPIC: ${question}

Based on the market data above, argue your position on this prediction.
`;

        // Run Python debate with streaming
        const assPath = path.join(process.cwd(), 'ass');
        const pythonProcess = spawn('python3', [
          'stream_debate.py',
          '--question', question,
          '--context', debateContext
        ], {
          cwd: assPath,
          env: {
            ...process.env,
            PYTHONUNBUFFERED: '1'
          }
        });

        pythonProcess.stdout.on('data', (data) => {
          const output = data.toString();
          console.log('Python output:', output);
          
          // Send each line as SSE event
          const lines = output.split('\n').filter((line: string) => line.trim());
          lines.forEach((line: string) => {
            try {
              const parsed = JSON.parse(line);
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(parsed)}\n\n`)
              );
            } catch (e) {
              // Not JSON, send as status
              if (line.trim()) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ type: 'status', message: line })}\n\n`)
                );
              }
            }
          });
        });

        pythonProcess.stderr.on('data', (data) => {
          console.error('Python stderr:', data.toString());
        });

        pythonProcess.on('close', (code) => {
          console.log(`Python process exited with code ${code}`);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'complete', code })}\n\n`)
          );
          controller.close();
        });

        pythonProcess.on('error', (error) => {
          console.error('Python process error:', error);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'error', message: error.message })}\n\n`)
          );
          controller.close();
        });

      } catch (error) {
        console.error('Stream error:', error);
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ 
            type: 'error', 
            message: error instanceof Error ? error.message : 'Unknown error' 
          })}\n\n`)
        );
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
