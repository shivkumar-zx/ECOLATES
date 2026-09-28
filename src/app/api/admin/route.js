import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const configPath = path.join(process.cwd(), 'src/data/site-config.json');
    const productsPath = path.join(process.cwd(), 'src/data/products.json');
    const inquiriesPath = path.join(process.cwd(), 'src/data/inquiries.json');

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    const inquiries = fs.existsSync(inquiriesPath) 
      ? JSON.parse(fs.readFileSync(inquiriesPath, 'utf8')) 
      : [];

    return NextResponse.json({ success: true, config, products, inquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, config, products, inquiryUpdate } = body;

    if (action === 'update_seo' && config) {
      const configPath = path.join(process.cwd(), 'src/data/site-config.json');
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
      return NextResponse.json({ success: true, message: 'SEO settings and page content saved successfully!' });
    }

    if (action === 'update_products' && products) {
      const productsPath = path.join(process.cwd(), 'src/data/products.json');
      fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
      return NextResponse.json({ success: true, message: 'Product catalog updated successfully!' });
    }

    if (action === 'update_inquiry' && inquiryUpdate) {
      const inquiriesPath = path.join(process.cwd(), 'src/data/inquiries.json');
      let inquiries = fs.existsSync(inquiriesPath) ? JSON.parse(fs.readFileSync(inquiriesPath, 'utf8')) : [];
      inquiries = inquiries.map(inq => inq.id === inquiryUpdate.id ? { ...inq, status: inquiryUpdate.status } : inq);
      fs.writeFileSync(inquiriesPath, JSON.stringify(inquiries, null, 2), 'utf8');
      return NextResponse.json({ success: true, message: 'Inquiry status updated!' });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
