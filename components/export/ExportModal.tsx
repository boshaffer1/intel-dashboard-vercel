'use client';

import { useState } from 'react';
import { 
  DocumentArrowDownIcon,
  XMarkIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataType: 'briefs' | 'analytics' | 'dossiers';
}

export default function ExportModal({ isOpen, onClose, dataType }: ExportModalProps) {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv' | 'json'>('pdf');
  const [dateRange, setDateRange] = useState('7d');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsExporting(false);
    setExportComplete(true);
    
    // Reset after showing success
    setTimeout(() => {
      setExportComplete(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--border-light)]">
            <div className="flex items-center space-x-3">
              <DocumentArrowDownIcon className="w-6 h-6 text-[var(--primary)]" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                Export {dataType === 'briefs' ? 'Intelligence Briefs' : 
                       dataType === 'analytics' ? 'Analytics Report' : 
                       'Opponent Dossiers'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {!exportComplete ? (
              <>
                {/* Format Selection */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                    Export Format
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'pdf', label: 'PDF', desc: 'Formatted report' },
                      { key: 'csv', label: 'CSV', desc: 'Data spreadsheet' },
                      { key: 'json', label: 'JSON', desc: 'Raw data' }
                    ].map((format) => (
                      <button
                        key={format.key}
                        onClick={() => setExportFormat(format.key as typeof exportFormat)}
                        className={`p-3 border rounded-lg text-center transition-all ${
                          exportFormat === format.key
                            ? 'border-[var(--primary)] bg-blue-50 text-[var(--primary)]'
                            : 'border-[var(--border-light)] hover:border-[var(--primary)]'
                        }`}
                      >
                        <div className="font-medium text-sm">{format.label}</div>
                        <div className="text-xs text-[var(--text-secondary)] mt-1">
                          {format.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                    Date Range
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                    <select 
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-[var(--border-light)] rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
                    >
                      <option value="1d">Last 24 Hours</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                      <option value="90d">Last 3 Months</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                </div>

                {/* Options */}
                {exportFormat === 'pdf' && (
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                      Include
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={includeCharts}
                          onChange={(e) => setIncludeCharts(e.target.checked)}
                          className="mr-3 rounded border-[var(--border-light)] text-[var(--primary)] focus:ring-[var(--primary)]"
                        />
                        <span className="text-sm text-[var(--text-secondary)]">
                          Charts and visualizations
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Preview Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <ChartBarIcon className="w-5 h-5 text-[var(--text-secondary)] mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-[var(--text-primary)] mb-1">
                        Export Preview
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {dataType === 'briefs' && 'Daily intelligence summaries, sentiment analysis, and key events'}
                        {dataType === 'analytics' && 'Trend charts, viral moments, and competitive analysis'}
                        {dataType === 'dossiers' && 'Opponent profiles, vulnerabilities, and change history'}
                        <br />
                        {dateRange === '7d' ? 'Covering the last 7 days' : `Covering ${dateRange}`}
                        {exportFormat === 'pdf' && includeCharts && ' • Including visual charts'}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <CheckCircleIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  Export Complete!
                </h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Your {exportFormat.toUpperCase()} file has been downloaded.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {!exportComplete && (
            <div className="flex justify-end space-x-3 p-6 border-t border-[var(--border-light)]">
              <button
                onClick={onClose}
                className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className={`px-6 py-2 bg-[var(--primary)] text-white rounded-lg transition-all ${
                  isExporting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-[var(--primary-dark)]'
                }`}
              >
                {isExporting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Exporting...</span>
                  </div>
                ) : (
                  <>
                    <DocumentArrowDownIcon className="w-4 h-4 inline mr-2" />
                    Export {exportFormat.toUpperCase()}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}