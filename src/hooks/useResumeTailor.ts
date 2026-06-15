import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitResumeForTailoring, submitResumeMock } from '../services/resumeTailorApi';
import { useResumeTailorStore } from '../store/resumeTailorStore';
import { RESUME_TAILOR_WEBHOOK_URL, RESUME_TAILOR_PROCESSING_MESSAGES } from '../constants/config';

export function useResumeTailor() {
  const navigate = useNavigate();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const {
    status,
    uploadPercent,
    processingMessageIndex,
    selectedFile,
    jobDescription,
    error,
    setStatus,
    setUploadPercent,
    setProcessingMessageIndex,
    setResult,
    setError,
    reset,
  } = useResumeTailorStore();

  const startProcessingMessages = useCallback(() => {
    let index = 0;
    intervalRef.current = setInterval(() => {
      index = (index + 1) % RESUME_TAILOR_PROCESSING_MESSAGES.length;
      setProcessingMessageIndex(index);
    }, 2500);
  }, [setProcessingMessageIndex]);

  const stopProcessingMessages = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => () => stopProcessingMessages(), [stopProcessingMessages]);

  const submit = useCallback(async () => {
    if (!selectedFile || !jobDescription.trim()) return;

    setStatus('uploading');
    setUploadPercent(0);

    const apiCall = RESUME_TAILOR_WEBHOOK_URL
      ? submitResumeForTailoring
      : submitResumeMock;

    try {
      const result = await apiCall(selectedFile, jobDescription, (percent) => {
        setUploadPercent(percent);
        if (percent === 100) {
          setStatus('processing');
          startProcessingMessages();
        }
      });

      stopProcessingMessages();
      setResult(result);
      navigate('/resume-tailor/results');
    } catch (err: unknown) {
      stopProcessingMessages();
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    }
  }, [
    selectedFile,
    jobDescription,
    setStatus,
    setUploadPercent,
    setResult,
    setError,
    startProcessingMessages,
    stopProcessingMessages,
    navigate,
  ]);

  return {
    status,
    uploadPercent,
    processingMessage: RESUME_TAILOR_PROCESSING_MESSAGES[processingMessageIndex],
    error,
    submit,
    reset,
  };
}
