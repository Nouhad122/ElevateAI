import { useCallback, useState } from 'react';
import { useCorrectionStore } from '../../store/correctionStore';
import { validateFile } from '../../utils/fileValidation';

interface DropZoneProps {
  validationError: string | null;
  onValidationError: (error: string | null) => void;
}

export function DropZone({ validationError, onValidationError }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const setFile = useCorrectionStore((s) => s.setFile);

  const handleFile = useCallback(
    (file: File) => {
      const error = validateFile(file);
      if (error) {
        onValidationError(error);
        return;
      }
      onValidationError(null);
      setFile(file);
    },
    [setFile, onValidationError]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div>
      <label
        htmlFor="pdf-upload"
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`
          flex flex-col items-center justify-center w-full h-56 rounded-2xl border-2 border-dashed cursor-pointer
          transition-all duration-200
          ${isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/40'
          }
        `}
      >
        <div className="flex flex-col items-center gap-3 text-center px-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <svg className={`w-7 h-7 transition-colors ${isDragging ? 'text-blue-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {isDragging ? 'Drop your PDF here' : 'Drag & drop your PDF'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              or <span className="text-blue-600 font-medium">click to browse</span> — PDF only, max 10MB
            </p>
          </div>
        </div>
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={onInputChange}
        />
      </label>

      {validationError && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {validationError}
        </p>
      )}
    </div>
  );
}
