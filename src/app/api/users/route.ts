import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const users = await prisma.users.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  //   {
  //     "avatar": "string",
  //     "username": "string",
  //     "email": "string",
  //     "phone": "string",
  //     "status": "string",
  //     "bio": "string"
  // }
  try {
    const body = await req.json();
    const user = await prisma.users.create({ data: body });
    return NextResponse.json({ data: user }, { status: 201 });
  } catch {
    return NextResponse.json(
      { data: [], message: "Can't add user" },
      { status: 500 },
    );
  }
}
