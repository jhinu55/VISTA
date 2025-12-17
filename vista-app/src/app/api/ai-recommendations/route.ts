import { NextResponse } from 'next/server';
import { mockAIRecommendations } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockAIRecommendations);
}
