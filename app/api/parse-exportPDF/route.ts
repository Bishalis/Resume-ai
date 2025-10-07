
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
export async function POST(req: Request ) {
  try {
  
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const body = await req.json();
    console.log("Full Body:", body);
    const {htmlContent} = body;
    console.log("Post" + htmlContent);

    
    await page.setContent(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #333;
            }
            h2 {
              color: #222;
              border-bottom: 1px solid #eee;
              margin-top: 24px;
            }
            ul {
              padding-left: 20px;
            }
            li {
              margin-bottom: 6px;
            }
            p {
              margin: 6px 0;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `, { waitUntil: 'networkidle0' });

const pdfBuffer = await page.pdf({
  format: 'A4',
  printBackground: true,
  margin: { top: '30px', bottom: '30px', left: '30px', right: '30px' },
})
   
await browser.close();
return new NextResponse(pdfBuffer,{
  status:200,
  headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="tailored_resume.pdf"',
    'Content-Length': pdfBuffer.length.toString(),
  },
})
 
  } catch (error) {
    console.error("PDF parsing failed:", error);
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    );
  }
}