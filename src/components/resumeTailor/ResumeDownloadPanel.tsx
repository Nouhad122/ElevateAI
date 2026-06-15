interface ResumeDownloadPanelProps {
  optimizedResumeHtml: string;
  pdfBase64?: string;
}

export function ResumeDownloadPanel({ optimizedResumeHtml, pdfBase64 }: ResumeDownloadPanelProps) {
  const handleDownload = () => {
    if (!pdfBase64) return;
    const bytes = Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0));
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Optimized_Resume.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Optimized Resume</h2>
          <p className="text-xs text-gray-500 mt-0.5">AI-tailored version ready to download</p>
        </div>
        {pdfBase64 && (
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm shadow-blue-200 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Optimized Resume
          </button>
        )}
      </div>

      {optimizedResumeHtml && (
        <iframe
          srcDoc={optimizedResumeHtml}
          title="Optimized Resume Preview"
          className="w-full border-0"
          style={{ height: '540px' }}
        />
      )}
    </div>
  );
}
