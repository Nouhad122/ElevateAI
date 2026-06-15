import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  submitDocumentForCorrection,
  submitDocumentMock,
} from '../services/correctorApi';
import { useCorrectionStore } from '../store/correctionStore';
import { PROCESSING_MESSAGES, N8N_WEBHOOK_URL } from '../constants/config';

export function useDocumentCorrector() {
  const navigate = useNavigate();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const {
    status,
    uploadPercent,
    processingMessageIndex,
    selectedFile,
    error,
    setStatus,
    setUploadPercent,
    setProcessingMessageIndex,
    setResult,
    setError,
    reset,
  } = useCorrectionStore();

  const startProcessingMessages = useCallback(() => {
    let index = 0;
    intervalRef.current = setInterval(() => {
      index = (index + 1) % PROCESSING_MESSAGES.length;
      setProcessingMessageIndex(index);
    }, 3000);
  }, [setProcessingMessageIndex]);

  const stopProcessingMessages = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => () => stopProcessingMessages(), [stopProcessingMessages]);

  const submit = useCallback(async () => {
    if (!selectedFile) return;

    setStatus('uploading');
    setUploadPercent(0);

    const apiCall = N8N_WEBHOOK_URL
      ? submitDocumentForCorrection
      : submitDocumentMock;

    try {
      const result = await apiCall(selectedFile, (percent) => {
        setUploadPercent(percent);
        if (percent === 100) {
          setStatus('processing');
          startProcessingMessages();
        }
      });

      stopProcessingMessages();
      setResult(result);
      navigate('/results');
    } catch (err: unknown) {
      stopProcessingMessages();
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    }
  }, [
    selectedFile,
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
    processingMessage: PROCESSING_MESSAGES[processingMessageIndex],
    error,
    submit,
    reset,
  };
}
