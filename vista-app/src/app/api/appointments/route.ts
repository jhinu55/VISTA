import { NextResponse } from 'next/server';
import { mockAppointments } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockAppointments);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newAppointment = {
      id: mockAppointments.length + 1,
      ...body,
      status: 'Scheduled' as const
    };
    
    mockAppointments.push(newAppointment);
    
    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Appointment ID is required' },
        { status: 400 }
      );
    }
    
    const index = mockAppointments.findIndex(apt => apt.id === parseInt(id));
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    mockAppointments.splice(index, 1);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete appointment' },
      { status: 500 }
    );
  }
}
