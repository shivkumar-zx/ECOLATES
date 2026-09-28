import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    const inquiriesPath = path.join(process.cwd(), 'src/data/inquiries.json');

    let inquiries = [];
    if (fs.existsSync(inquiriesPath)) {
      try {
        inquiries = JSON.parse(fs.readFileSync(inquiriesPath, 'utf8'));
      } catch (e) {
        inquiries = [];
      }
    }

    const newInquiry = {
      id: `INQ-${1000 + inquiries.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      ...data,
      status: 'Pending Review'
    };

    inquiries.unshift(newInquiry);
    fs.writeFileSync(inquiriesPath, JSON.stringify(inquiries, null, 2), 'utf8');

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
