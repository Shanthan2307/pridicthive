// app/api/debate/route.ts
import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: Request) {
  const { question, marketData } = await req.json();
  
  console.log('🎭 Debate API called');
  console.log('Question:', question);
  console.log('Market Data:', marketData);

  try {
    // Prepare context for the debate bots
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

    console.log('📝 Debate context prepared');

    // Run the Python debate script
    const result = await runPythonDebate(question, debateContext);
    
    // Check for errors in the result
    if (result.error) {
      console.error('❌ Debate error:', result.error);
      return NextResponse.json({
        error: result.error,
        error_type: result.error_type || 'unknown',
        setup_instructions: result.setup_instructions,
        question,
        marketData,
      }, { status: 500 });
    }
    
    console.log('✅ Debate completed successfully');
    
    return NextResponse.json({
      question,
      marketData,
      debateResult: result,
    });
  } catch (error) {
    console.error('❌ Debate error:', error);
    return NextResponse.json(
      {
        error: 'Failed to run debate',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function runPythonDebate(question: string, context: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const assPath = path.join(process.cwd(), 'ass');
    
    console.log('🐍 Starting Python debate process...');
    console.log('Working directory:', assPath);
    
    // Use Python to run the debate
    const pythonProcess = spawn('python3', [
      'simple_debate.py',
      '--question', question,
      '--context', context,
      '--json-output'
    ], {
      cwd: assPath,
      env: {
        ...process.env,
        PYTHONUNBUFFERED: '1'
      }
    });

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
      const output = data.toString();
      stdout += output;
      console.log('Python stdout:', output);
    });

    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
      console.error('Python stderr:', data.toString());
    });

    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
      
      if (code !== 0) {
        reject(new Error(`Python process failed with code ${code}\nStderr: ${stderr}`));
        return;
      }

      // Parse JSON output
      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (e) {
        console.error('Failed to parse JSON output:', e);
        console.error('Raw output:', stdout);
        reject(new Error('Failed to parse debate output'));
      }
    });

    pythonProcess.on('error', (error) => {
      console.error('Failed to start Python process:', error);
      reject(error);
    });

    // Timeout after 120 seconds
    setTimeout(() => {
      pythonProcess.kill();
      reject(new Error('Debate timeout after 120 seconds'));
    }, 120000);
  });
}
