import { NextResponse } from 'next/server';
import { generateTimeSlots } from '@/lib/mockData';

export async function GET() {
  const today = new Date();
  const slots = generateTimeSlots(today, 14);
  
  return NextResponse.json(slots);
}
