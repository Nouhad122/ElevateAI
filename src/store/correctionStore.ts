import { create } from 'zustand';
import type { CorrectionApiResponse, UploadStatus } from '../types/api.types';

interface CorrectionStore {
  status: UploadStatus;
  uploadPercent: number;
  processingMessageIndex: number;
  result: CorrectionApiResponse | null;
  error: string | null;
  selectedFile: File | null;

  setFile: (file: File | null) => void;
  setStatus: (status: UploadStatus) => void;
  setUploadPercent: (percent: number) => void;
  setProcessingMessageIndex: (index: number) => void;
  setResult: (result: CorrectionApiResponse) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  status: 'idle' as UploadStatus,
  uploadPercent: 0,
  processingMessageIndex: 0,
  result: null,
  error: null,
  selectedFile: null,
};

export const useCorrectionStore = create<CorrectionStore>((set) => ({
  ...initialState,
  setFile: (file) => set({ selectedFile: file, status: file ? 'file_selected' : 'idle' }),
  setStatus: (status) => set({ status }),
  setUploadPercent: (uploadPercent) => set({ uploadPercent }),
  setProcessingMessageIndex: (processingMessageIndex) => set({ processingMessageIndex }),
  setResult: (result) => set({ result, status: 'success', selectedFile: null, error: null }),
  setError: (error) => set({ error, status: 'error' }),
  reset: () => set(initialState),
}));
