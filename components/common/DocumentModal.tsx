'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, DocumentTextIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  metadata?: {
    lastUpdated?: string;
    author?: string;
    type?: string;
    threatLevel?: string;
  };
}

export default function DocumentModal({ 
  isOpen, 
  onClose, 
  title, 
  content, 
  metadata 
}: DocumentModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-white flex items-center gap-2"
                      >
                        <DocumentTextIcon className="h-6 w-6" />
                        {title}
                      </Dialog.Title>
                      {metadata && (
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-white/80">
                          {metadata.lastUpdated && (
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-4 w-4" />
                              Updated: {metadata.lastUpdated}
                            </div>
                          )}
                          {metadata.author && (
                            <div className="flex items-center gap-1">
                              <UserIcon className="h-4 w-4" />
                              {metadata.author}
                            </div>
                          )}
                          {metadata.threatLevel && (
                            <div className={`px-2 py-1 rounded text-xs font-semibold ${
                              metadata.threatLevel === 'HIGH' ? 'bg-red-500 text-white' :
                              metadata.threatLevel === 'MEDIUM' ? 'bg-yellow-500 text-white' :
                              'bg-green-500 text-white'
                            }`}>
                              Threat: {metadata.threatLevel}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      className="ml-4 inline-flex justify-center rounded-md bg-white/20 p-2 text-white hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      onClick={onClose}
                    >
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
                  <div className="prose prose-sm max-w-none">
                    <div 
                      className="whitespace-pre-wrap font-sans text-[var(--text-primary)]"
                      dangerouslySetInnerHTML={{ 
                        __html: content
                          .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mb-4 mt-6">$1</h1>')
                          .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mb-3 mt-5">$2</h2>')
                          .replace(/^### (.+)$/gm, '<h3 class="text-lg font-medium mb-2 mt-4">$3</h3>')
                          .replace(/^\*\*(.+?)\*\*/gm, '<strong>$1</strong>')
                          .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
                          .replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>')
                          .replace(/\n\n/g, '</p><p class="mb-4">')
                          .replace(/^/, '<p class="mb-4">')
                          .replace(/$/, '</p>')
                      }} 
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-3 flex justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                    onClick={() => {
                      const blob = new Blob([content], { type: 'text/markdown' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.md`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    Export as Markdown
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--primary-dark)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}