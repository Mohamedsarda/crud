import { NextResponse } from 'next/server';
import pool from '../db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    let query, params: any[];

    const db = await pool.getConnection();
    if (id) {
      query = 'SELECT * FROM users WHERE id = ?';
      params = [id];
    } else {
      query = 'select * from users';
      params = [];
    }
    const [rows] = await db.execute(query, params);
    db.release();

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 },
    );
  }
}

// export async function GET(id: number) {
//   try {
//     const db = await pool.getConnection();
//     const query = 'SELECT * FROM users WHERE id = ?';
//     const [result] = await db.execute(query, [id]);
//     db.release();

//     return NextResponse.json({
//       data: result,
//       status: true,
//     });
//   } catch (err) {
//     return NextResponse.json({
//       data: [],
//       status: false,
//     });
//   }
// }

// export async function PUT(id: number) {
//   console.log(id);
//   console.log('qweqweqw eqw eqw eq eqweqwe ---------------');

//   try {
//     const db = await pool.getConnection();
//     const query = 'DELETE FROM users WHERE id = ?';
//     const [result] = await db.execute(query, [id]);
//     db.release();

//     return NextResponse.json({
//       message: `User with id ${id} deleted successfully.`,
//     });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     return NextResponse.json(
//       {
//         error: 'Failed to delete user.',
//       },
//       { status: 500 },
//     );
//   }
// }
