import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!user)
      return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Interaanl server Erroororr' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const user = await prisma.users.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      { message: 'User Delete Successfully' },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: 'Failed To Delete User' },
      { status: 500 },
    );
  }
}
