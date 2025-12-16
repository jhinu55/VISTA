import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;
    
    // Read all predictions
    const filePath = join(process.cwd(), '..', 'model', 'detected_anomalies.json');
    const fileContent = await readFile(filePath, 'utf-8');
    const allPredictions = JSON.parse(fileContent);
    
    // Apply pagination if limit is specified
    let predictions = allPredictions;
    if (limit) {
      predictions = allPredictions.slice(offset, offset + limit);
    }
    
    return NextResponse.json({
      predictions,
      total: allPredictions.length,
      offset,
      limit: limit || allPredictions.length
    });
  } catch (error) {
    console.error('Error reading predictions:', error);
    return NextResponse.json(
      { error: 'Failed to load predictions' },
      { status: 500 }
    );
  }
}
