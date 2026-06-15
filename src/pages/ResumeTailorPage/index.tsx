import { useState } from 'react';
import { ResumeDropZone } from '../../components/resumeTailor/ResumeDropZone';
import { FilePreview } from '../../components/upload/FilePreview';
import { UploadProgress } from '../../components/upload/UploadProgress';
import { useResumeTailorStore } from '../../store/resumeTailorStore';
import { useResumeTailor } from '../../hooks/useResumeTailor';

export default function ResumeTailorPage() {
  const [fileError, setFileError] = useState<string | null>(null);
  const [jdError, setJdError] = useState<string | null>(null);

  const { selectedFile, jobDescription, setFile, setJobDescription } = useResumeTailorStore();
  const { status, uploadPercent, processingMessage, error, submit, reset } = useResumeTailor();

  const isActive = status === 'uploading' || status === 'processing';

  const handleRemoveFile = () => {
    setFile(null);
    setFileError(null);
  };

  const handleSubmit = () => {
    let valid = true;
    if (!selectedFile) {
      setFileError('Please upload your resume as a PDF.');
      valid = false;
    }
    if (!jobDescription.trim()) {
      setJdError('Please paste the job description.');
      valid = false;
    }
    if (!valid) return;
    submit();
  };

  if (isActive) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-white flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl ring-1 ring-black/5 shadow-2xl shadow-slate-200/80 p-10">
            <UploadProgress
              status={status as 'uploading' | 'processing'}
              uploadPercent={uploadPercent}
              processingMessage={processingMessage}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            AI-Powered ATS Optimizer
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl ring-1 ring-black/5 shadow-2xl shadow-slate-200/80 overflow-hidden">

          {/* Header */}
          <div className="px-8 pt-8 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-200">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  Resume Tailor & ATS Optimizer
                </h1>
                <p className="text-sm text-gray-500 leading-tight">
                  Match your resume to any job description
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { value: 'ATS', label: 'Score check' },
                { value: '99%', label: 'Accuracy' },
                { value: 'Free', label: 'No account' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center py-2.5 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <span className="text-sm font-bold text-gray-900">{value}</span>
                  <span className="text-[11px] text-gray-500 mt-0.5">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-linear-to-r from-transparent via-gray-100 to-transparent mx-8" />

          <div className="px-8 pt-6 pb-8 space-y-5">

            {/* Resume upload */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Resume PDF
              </label>
              {!selectedFile ? (
                <ResumeDropZone
                  validationError={fileError}
                  onValidationError={setFileError}
                  onFileSelected={(file) => { setFile(file); setFileError(null); }}
                />
              ) : (
                <FilePreview file={selectedFile} onRemove={handleRemoveFile} />
              )}
            </div>

            {/* Job description */}
            <div>
              <label htmlFor="job-description" className="block text-xs font-semibold text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                id="job-description"
                rows={6}
                value={jobDescription}
                onChange={(e) => { setJobDescription(e.target.value); if (e.target.value.trim()) setJdError(null); }}
                placeholder="Paste the full job description here..."
                className={`w-full px-3.5 py-3 rounded-2xl border text-sm text-gray-800 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                  jdError ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              />
              {jdError && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {jdError}
                </p>
              )}
            </div>

            {/* Submission error */}
            {error && (
              <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold">Something went wrong</p>
                  <p className="text-red-600 mt-0.5 text-xs">{error}</p>
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="mt-1.5 text-red-700 underline text-xs hover:text-red-800"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!!fileError}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-200/60 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-150"
            >
              Tailor My Resume
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* Trust footer */}
            <div className="flex items-center justify-center gap-4 pt-1">
              <span className="flex items-center gap-1 text-[11px] text-gray-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure &amp; private
              </span>
              <span className="w-px h-3 bg-gray-200" />
              <span className="text-[11px] text-gray-400">No account required</span>
              <span className="w-px h-3 bg-gray-200" />
              <span className="text-[11px] text-gray-400">Results in ~60s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
