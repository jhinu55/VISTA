import { NextRequest, NextResponse } from 'next/server';
import { spawn, ChildProcess } from 'child_process';
import path from 'path';

let streamProcess: ChildProcess | null = null;

export async function POST(request: NextRequest) {
  const { action } = await request.json();

  if (action === 'start') {
    if (streamProcess) {
      return NextResponse.json({ success: false, message: 'Stream already running' });
    }

    try {
      const modelPath = path.join(process.cwd(), 'model');
      const scriptPath = path.join(modelPath, 'stream_simulator.py');

      streamProcess = spawn('python', [scriptPath], {
        cwd: modelPath,
        stdio: 'pipe',
        env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
      });

      streamProcess.stdout?.on('data', (data) => {
        console.log(`[Stream]: ${data.toString().replace(/[\u{1F300}-\u{1F9FF}]/gu, '')}`);
      });

      streamProcess.stderr?.on('data', (data) => {
        console.error(`[Stream Error]: ${data.toString().replace(/[\u{1F300}-\u{1F9FF}]/gu, '')}`);
      });

      streamProcess.on('close', (code) => {
        console.log(`[Stream]: Process exited with code ${code}`);
        streamProcess = null;
      });

      return NextResponse.json({ success: true, message: 'Stream started' });
    } catch (error) {
      console.error('Failed to start stream:', error);
      return NextResponse.json({ success: false, message: 'Failed to start stream', error: String(error) });
    }
  }

  if (action === 'stop') {
    if (!streamProcess) {
      return NextResponse.json({ success: false, message: 'No stream running' });
    }

    streamProcess.kill();
    streamProcess = null;
    return NextResponse.json({ success: true, message: 'Stream stopped' });
  }

  if (action === 'status') {
    return NextResponse.json({ 
      success: true, 
      running: streamProcess !== null 
    });
  }

  return NextResponse.json({ success: false, message: 'Invalid action' });
}

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    running: streamProcess !== null 
  });
}
