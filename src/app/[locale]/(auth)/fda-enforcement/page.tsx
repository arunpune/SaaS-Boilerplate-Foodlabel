'use client';

import { useState } from 'react';
import { fdaApi } from '@/libs/FdaApi';
import type { FdaEnforcementRecord } from '@/types/FdaApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function FdaEnforcementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'nationwide' | 'product' | 'firm' | 'recent'>('nationwide');
  const [results, setResults] = useState<FdaEnforcementRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      switch (searchType) {
        case 'nationwide':
          response = await fdaApi.searchByDistributionPattern('nationwide', 10);
          break;
        case 'product':
          response = await fdaApi.searchByProductDescription(searchTerm, 10);
          break;
        case 'firm':
          response = await fdaApi.searchByRecallingFirm(searchTerm, 10);
          break;
        case 'recent':
          response = await fdaApi.getRecentRecalls(10);
          break;
      }
      
      setResults(response.results);
      setTotalResults(response.meta.results.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">FDA Food Enforcement Reports</h1>
      
      <div className="mb-6 space-y-4 rounded-lg border p-4">
        <div className="flex gap-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as any)}
            className="rounded border px-3 py-2"
          >
            <option value="nationwide">Nationwide Distribution</option>
            <option value="product">Product Description</option>
            <option value="firm">Recalling Firm</option>
            <option value="recent">Recent Recalls</option>
          </select>
          
          {(searchType === 'product' || searchType === 'firm') && (
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Enter ${searchType === 'product' ? 'product name' : 'firm name'}...`}
              className="flex-1"
            />
          )}
          
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-50 p-4 text-red-700">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {totalResults > 0 && (
        <p className="mb-4 text-gray-600">
          Found {totalResults} total results (showing {results.length})
        </p>
      )}

      <div className="space-y-4">
        {results.map((record, index) => (
          <div key={record.recall_number || index} className="rounded-lg border p-4 shadow-sm">
            <div className="mb-2 flex items-start justify-between">
              <h3 className="text-lg font-semibold">
                {record.recalling_firm || 'Unknown Firm'}
              </h3>
              {record.classification && (
                <span className={`rounded px-2 py-1 text-sm font-medium ${
                  record.classification === 'Class I' ? 'bg-red-100 text-red-800' :
                  record.classification === 'Class II' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {record.classification}
                </span>
              )}
            </div>
            
            <p className="mb-2 text-gray-700">
              <strong>Product:</strong> {record.product_description || 'N/A'}
            </p>
            
            {record.reason_for_recall && (
              <p className="mb-2 text-gray-700">
                <strong>Reason:</strong> {record.reason_for_recall}
              </p>
            )}
            
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              {record.distribution_pattern && (
                <p><strong>Distribution:</strong> {record.distribution_pattern}</p>
              )}
              {record.recall_initiation_date && (
                <p><strong>Recall Date:</strong> {record.recall_initiation_date}</p>
              )}
              {record.city && record.state && (
                <p><strong>Location:</strong> {record.city}, {record.state}</p>
              )}
              {record.recall_number && (
                <p><strong>Recall #:</strong> {record.recall_number}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && !loading && !error && (
        <div className="rounded-lg border p-8 text-center text-gray-500">
          <p>No results yet. Try searching for FDA enforcement reports.</p>
        </div>
      )}
    </div>
  );
}
