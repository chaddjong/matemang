// src/app/api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { orderId, grossAmount } = await req.json();

    if (!orderId || !grossAmount) {
      return NextResponse.json(
        { error: 'orderId & grossAmount diperlukan' },
        { status: 400 }
      );
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) throw new Error('MIDTRANS_SERVER_KEY belum diatur di env');

    const payload = {
      payment_type: 'qris', // <--- wajib
      transaction_details: { order_id: orderId, gross_amount: grossAmount },
      customer_details: {
        first_name: 'Customer',
        email: 'customer@example.com',
        phone: '08123456789',
      },
    };

    const res = await fetch('https://api.sandbox.midtrans.com/v2/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + Buffer.from(serverKey + ':').toString('base64'),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Gagal membuat payment link' },
      { status: 500 }
    );
  }
}
