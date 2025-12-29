'use client';

import { useState } from 'react';

export const NotesAttachmentsTab = () => {
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('file-upload')?.click();
  };

  return (
    <div className="space-y-6">
      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded bg-red-400 px-6 py-2 text-sm font-medium text-white hover:bg-red-500"
        >
          Save
        </button>
      </div>

      {/* Additional Recipe Notes */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-slate-700">Additional Recipe Notes</h2>

        {/* Rich Text Editor Toolbar */}
        <div className="rounded-t border border-b-0 border-slate-300 bg-slate-50 px-3 py-2">
          <div className="flex flex-wrap items-center gap-1">
            {/* Text Dropdown */}
            <select className="rounded border border-slate-300 bg-white px-2 py-1 text-sm">
              <option>Text</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
              <option>Heading 3</option>
            </select>

            <div className="mx-1 h-6 w-px bg-slate-300" />

            {/* Bold */}
            <button
              type="button"
              className="rounded p-1.5 hover:bg-slate-200"
              title="Bold"
            >
              <span className="font-bold">B</span>
            </button>

            {/* Italic */}
            <button
              type="button"
              className="rounded p-1.5 hover:bg-slate-200"
              title="Italic"
            >
              <span className="italic">I</span>
            </button>

            {/* Underline */}
            <button
              type="button"
              className="rounded p-1.5 hover:bg-slate-200"
              title="Underline"
            >
              <span className="underline">U</span>
            </button>

            {/* Strikethrough */}
            <button
              type="button"
              className="rounded p-1.5 hover:bg-slate-200"
              title="Strikethrough"
            >
              <span className="line-through">S</span>
            </button>

            <div className="mx-1 h-6 w-px bg-slate-300" />

            {/* Link */}
            <button
              type="button"
              className="rounded p-1.5 hover:bg-slate-200"
              title="Insert Link"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>

            <div className="mx-1 h-6 w-px bg-slate-300" />

            {/* Align Left */}
            <button
              type="button"
              className="rounded p-1.5 hover:bg-slate-200"
              title="Align Left"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
              </svg>
            </button>

            {/* Align Center */}
            <button
              type="button"
              className="rounded p-1.5 hover:bg-slate-200"
              title="Align Center"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Align Right */}
            <button
              type="button"
              className="rounded p-1.5 hover:bg-slate-200"
              title="Align Right"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h6M4 18h16" />
              </svg>
            </button>

            <div className="mx-1 h-6 w-px bg-slate-300" />

            {/* Font Size */}
            <button
              type="button"
              className="rounded p-1.5 hover:bg-slate-200"
              title="Font Size"
            >
              <span className="flex items-center gap-1 text-sm">
                A
                <svg className="size-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>

            {/* Font Color */}
            <button
              type="button"
              className="rounded p-1.5 hover:bg-slate-200"
              title="Font Color"
            >
              <span className="flex items-center gap-1 text-sm">
                A
                <svg className="size-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>

            <div className="mx-1 h-6 w-px bg-slate-300" />

            {/* Bullet List */}
            <button
              type="button"
              className="rounded p-1.5 hover:bg-slate-200"
              title="Bullet List"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Numbered List */}
            <button
              type="button"
              className="rounded p-1.5 hover:bg-slate-200"
              title="Numbered List"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="mx-1 h-6 w-px bg-slate-300" />

            {/* Undo */}
            <button
              type="button"
              className="rounded p-1.5 hover:bg-slate-200"
              title="Undo"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>

            {/* Redo */}
            <button
              type="button"
              className="rounded p-1.5 hover:bg-slate-200"
              title="Redo"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="min-h-[300px] w-full rounded-b border border-slate-300 p-4 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          placeholder="Enter your additional notes here..."
        />
      </div>

      {/* Attachments */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-slate-700">Attachments</h2>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
            isDragging
              ? 'border-teal-500 bg-teal-50'
              : 'border-slate-300 bg-slate-50 hover:border-slate-400'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <svg className="size-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-base text-slate-500">Drop your files here or click to upload</p>
            <p className="text-sm text-slate-400">Maximum file size is 5MB</p>
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept="*/*"
          />
        </div>

        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded border border-slate-200 bg-white p-3"
              >
                <div className="flex items-center gap-3">
                  <svg className="size-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{file.name}</p>
                    <p className="text-xs text-slate-500">
                      {(file.size / 1024).toFixed(2)}
                      {' '}
                      KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFiles(files.filter((_, i) => i !== index));
                  }}
                  className="text-slate-400 hover:text-red-500"
                >
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
