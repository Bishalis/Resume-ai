import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null;

  try {
    const body = await req.json();
    const htmlContent = body?.htmlContent;

    if (!htmlContent || typeof htmlContent !== "string") {
      return NextResponse.json(
        { error: "htmlContent is required" },
        { status: 400 },
      );
    }

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();
    const documentHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      padding: 0;
      margin: 0;
      color: #111827;
      line-height: 1.5;
      font-size: 11pt;
    }
    h2 {
      color: #166534;
      margin: 1rem 0 0.35rem;
      font-size: 13pt;
      page-break-after: avoid;
    }
    h2:first-child { margin-top: 0; }
    p { margin: 0.25rem 0; }
    ul { margin: 0.25rem 0 0.5rem 1.1rem; padding: 0; }
    li { margin: 0.15rem 0; }
    strong { font-weight: 600; }
  </style>
</head>
<body>${htmlContent}</body>
</html>`;

    await page.setContent(documentHtml, {
      waitUntil: "load",
      timeout: 45_000,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "18mm", right: "14mm", bottom: "18mm", left: "14mm" },
    });

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="tailored_resume.pdf"',
      },
    });
  } catch (e) {
    console.error("parse-exportPDF:", e);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
}
