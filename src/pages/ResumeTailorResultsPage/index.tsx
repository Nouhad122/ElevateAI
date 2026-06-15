import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useResumeTailorStore } from '../../store/resumeTailorStore';
import { ScoreCards } from '../../components/resumeTailor/ScoreCards';
import { KeywordChips } from '../../components/resumeTailor/KeywordChips';
import { StrengthsPanel } from '../../components/resumeTailor/StrengthsPanel';
import { WeaknessesPanel } from '../../components/resumeTailor/WeaknessesPanel';
import { RecommendationsPanel } from '../../components/resumeTailor/RecommendationsPanel';
import { ResumeDownloadPanel } from '../../components/resumeTailor/ResumeDownloadPanel';
import { Button } from '../../components/ui/Button';

export default function ResumeTailorResultsPage() {
  const navigate = useNavigate();
  const { result, reset } = useResumeTailorStore();

  useEffect(() => {
    if (!result) navigate('/resume-tailor');
  }, [result, navigate]);

  if (!result) return null;

  const handleAnalyzeAnother = () => {
    reset();
    navigate('/resume-tailor');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ATS Optimization Report</h1>
          <p className="text-sm text-gray-500 mt-1">Your resume has been analyzed and optimized by AI.</p>
        </div>
        <Button variant="secondary" onClick={handleAnalyzeAnother}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Analyze Another Resume
        </Button>
      </div>

      {/* Score cards */}
      <div className="mb-6">
        <ScoreCards matchScore={result.matchScore} atsScore={result.atsScore} />
      </div>

      {/* Three-column analysis */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <KeywordChips keywords={result.missingKeywords} />
        <StrengthsPanel strengths={result.strengths} />
        <WeaknessesPanel weaknesses={result.weaknesses} />
      </div>

      {/* Recommendations */}
      <div className="mb-6">
        <RecommendationsPanel recommendations={result.recommendations} />
      </div>

      {/* Download + preview */}
      {result.optimizedResumeHtml && (
        <div className="mb-6">
          <ResumeDownloadPanel
            optimizedResumeHtml={result.optimizedResumeHtml}
            pdfBase64={result.pdfBase64}
          />
        </div>
      )}

      <div className="text-center">
        <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
