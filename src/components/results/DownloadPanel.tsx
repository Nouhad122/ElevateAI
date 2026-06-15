interface DownloadPanelProps {
  correctedDocumentHtml: string;
  pdfBase64?: string;
}

function withPreviewStyles(html: string): string {
  const style = `<style>
    strong {
      font-weight: 700;
      color: #1d4ed8;
      background-color: #eff6ff;
      border-radius: 2px;
      padding: 0 2px;
    }
  </style>`;
  return html.includes('</head>')
    ? html.replace('</head>', `${style}</head>`)
    : style + html;
}

export function DownloadPanel({ correctedDocumentHtml, pdfBase64 }: DownloadPanelProps) {
  const handleDownloadPdf = () => {
    if (!pdfBase64) return;
    const bytes = Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0));
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Corrected_doc.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!correctedDocumentHtml) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Corrected Document</h2>
          <p className="text-xs text-gray-500 mt-0.5">Corrections highlighted in blue — preview below</p>
        </div>
        {pdfBase64 && (
          <button
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        )}
      </div>

      <iframe
        srcDoc={withPreviewStyles(correctedDocumentHtml)}
        title="Corrected Document Preview"
        className="w-full border-0"
        style={{ height: '520px' }}
      />
    </div>
  );
}
