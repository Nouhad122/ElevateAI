import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCorrectionStore } from '../../store/correctionStore';
import { ScoreCard } from '../../components/results/ScoreCard';
import { MistakeSummary } from '../../components/results/MistakeSummary';
import { CorrectionsReport } from '../../components/results/CorrectionsReport';
import { DownloadPanel } from '../../components/results/DownloadPanel';
import { Button } from '../../components/ui/Button';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { result, reset } = useCorrectionStore();

  useEffect(() => {
    if (!result) navigate('/upload');
  }, [result, navigate]);

  if (!result) return null;

  const handleNewDocument = () => {
    reset();
    navigate('/upload');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Correction Report</h1>
          <p className="text-sm text-gray-500 mt-1">Your document has been analysed and corrected by AI.</p>
        </div>
        <Button variant="secondary" onClick={handleNewDocument}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Correct Another Document
        </Button>
      </div>

      {/* Top row: score widgets left, corrections table right */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1 space-y-4">
          <ScoreCard
            score={result.score ?? 0}
            totalMistakes={result.totalMistakes ?? 0}
          />
          <MistakeSummary totalMistakes={result.totalMistakes ?? 0} />
        </div>

        <div className="lg:col-span-2">
          {result.emailHtml ? (
            <CorrectionsReport
              emailHtml={result.emailHtml}
              totalMistakes={result.totalMistakes ?? 0}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center h-full flex flex-col items-center justify-center">
              <p className="text-gray-400 text-sm">No correction details returned by the workflow.</p>
            </div>
          )}
        </div>
      </div>

      {/* Full-width corrected document */}
      {result.correctedDocumentHtml && (
        <DownloadPanel
          correctedDocumentHtml={result.correctedDocumentHtml}
          pdfBase64={result.pdfBase64}
        />
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
