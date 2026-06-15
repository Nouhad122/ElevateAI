import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Spinner } from '../components/ui/Spinner';

const LandingPage = lazy(() => import('../pages/LandingPage'));
const UploadPage = lazy(() => import('../pages/UploadPage'));
const ResultsPage = lazy(() => import('../pages/ResultsPage'));
const ResumeTailorPage = lazy(() => import('../pages/ResumeTailorPage'));
const ResumeTailorResultsPage = lazy(() => import('../pages/ResumeTailorResultsPage'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Spinner size="lg" />
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <PageWrapper>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/resume-tailor" element={<ResumeTailorPage />} />
            <Route path="/resume-tailor/results" element={<ResumeTailorResultsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </PageWrapper>
    </BrowserRouter>
  );
}
