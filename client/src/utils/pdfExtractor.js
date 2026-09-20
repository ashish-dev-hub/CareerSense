import * as pdfjsLib from 'pdfjs-dist';

// Configure CDN worker for browser execution
try {
  if (typeof window !== 'undefined' && pdfjsLib?.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || '4.0.379'}/build/pdf.worker.min.mjs`;
  }
} catch (e) {
  console.warn('PDF.js worker setup fallback:', e);
}

// Fallback plain stream decoder for raw binary PDF extraction if worker is blocked
function fallbackExtractStringsFromBuffer(arrayBuffer) {
  try {
    const bytes = new Uint8Array(arrayBuffer);
    let binaryStr = '';
    const chunk = 8192;
    for (let i = 0; i < bytes.length; i += chunk) {
      binaryStr += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }

    // Extract text blocks inside parentheses (text) Tj or [(text)] TJ
    const matches = binaryStr.match(/\(([^()]{2,120})\)\s*T[jJ]/g) || [];
    const extracted = matches
      .map((m) => m.replace(/^\(/, '').replace(/\)\s*T[jJ]$/, '').trim())
      .filter((s) => s.length > 2 && !/^[\d\s.,;:]+$/.test(s));

    if (extracted.length > 10) {
      return extracted.join(' ');
    }

    // ASCII word extraction fallback
    const words = binaryStr.match(/[A-Za-z0-9+#./-]{3,30}/g) || [];
    return words.slice(0, 500).join(' ');
  } catch (err) {
    console.error('Binary stream extract error:', err);
    return '';
  }
}

export async function extractTextFromPdfBuffer(arrayBuffer) {
  try {
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
      disableFontFace: true,
    });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => (item.str ? item.str : ''))
        .join(' ');
      fullText += pageText + '\n';
    }

    if (fullText.trim().length > 30) {
      return fullText;
    }
  } catch (pdfError) {
    console.warn('PDF.js parse failed, falling back to raw buffer scanner:', pdfError);
  }

  // Fallback scanner
  const fallbackText = fallbackExtractStringsFromBuffer(arrayBuffer);
  return fallbackText || '';
}
