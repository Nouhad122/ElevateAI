import { create } from 'zustand';
import type { ResumeTailorResult, ResumeTailorStatus } from '../types/resumeTailor.types';

interface ResumeTailorStore {
  status: ResumeTailorStatus;
  uploadPercent: number;
  processingMessageIndex: number;
  result: ResumeTailorResult | null;
  error: string | null;
  selectedFile: File | null;
  jobDescription: string;

  setStatus: (status: ResumeTailorStatus) => void;
  setUploadPercent: (percent: number) => void;
  setProcessingMessageIndex: (index: number) => void;
  setResult: (result: ResumeTailorResult) => void;
  setError: (error: string | null) => void;
  setFile: (file: File | null) => void;
  setJobDescription: (jd: string) => void;
  reset: () => void;
}

const initialState = {
  status: 'idle' as ResumeTailorStatus,
  uploadPercent: 0,
  processingMessageIndex: 0,
  result: null,
  error: null,
  selectedFile: null,
  jobDescription: '',
};

export const useResumeTailorStore = create<ResumeTailorStore>((set) => ({
  ...initialState,
  setStatus: (status) => set({ status }),
  setUploadPercent: (uploadPercent) => set({ uploadPercent }),
  setProcessingMessageIndex: (processingMessageIndex) => set({ processingMessageIndex }),
  setResult: (result) => set({ result, status: 'success', selectedFile: null, jobDescription: '', error: null }),
  setError: (error) => set({ error, status: 'error' }),
  setFile: (selectedFile) => set({ selectedFile }),
  setJobDescription: (jobDescription) => set({ jobDescription }),
  reset: () => set(initialState),
}));
