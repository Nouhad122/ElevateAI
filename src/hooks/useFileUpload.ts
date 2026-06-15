import { useCallback } from 'react';
import { useCorrectionStore } from '../store/correctionStore';
import { validateFile } from '../utils/fileValidation';

export function useFileUpload() {
  const { selectedFile, setFile } = useCorrectionStore();

  const selectFile = useCallback(
    (file: File): string | null => {
      const error = validateFile(file);
      if (error) return error;
      setFile(file);
      return null;
    },
    [setFile]
  );

  const clearFile = useCallback(() => setFile(null), [setFile]);

  return { selectedFile, selectFile, clearFile };
}
