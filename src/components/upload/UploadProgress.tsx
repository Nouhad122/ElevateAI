import { Spinner } from '../ui/Spinner';
import { ProgressBar } from '../ui/ProgressBar';

interface UploadProgressProps {
  status: 'uploading' | 'processing';
  uploadPercent: number;
  processingMessage: string;
}

export function UploadProgress({ status, uploadPercent, processingMessage }: UploadProgressProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <Spinner size="lg" />
      <div className="w-full max-w-sm text-center">
        {status === 'uploading' ? (
          <>
            <p className="text-sm font-semibold text-gray-700 mb-3">Uploading document...</p>
            <ProgressBar value={uploadPercent} />
            <p className="text-xs text-gray-400 mt-1.5">{uploadPercent}%</p>
          </>
        ) : (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700">Analyzing your document</p>
            <p className="text-sm text-blue-600 animate-pulse">{processingMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
