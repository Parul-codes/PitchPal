import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Plus } from 'lucide-react';
import { Brand } from '../types';
import axios from 'axios';

interface BrandResearchProps {
  onAddBrand: (brand: Brand) => void;
}

const BrandResearch: React.FC<BrandResearchProps> = ({ onAddBrand }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [suggestions, setSuggestions] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const niches = ['beauty', 'fashion', 'fitness', 'lifestyle', 'tech'];

  const handleSearch = async () => {
    if (!searchQuery && !selectedNiche) return;
    setIsLoading(true);

    try {
      interface brandResearch {
        brands: Brand[];
      }
      const res = await axios.post<brandResearch>("http://localhost:5000/api/brand-research", {
        query: searchQuery,
        niche: selectedNiche,
      });

      const brands: Brand[] = Array.isArray(res.data) ? res.data : res.data.brands || [];

      setSuggestions(brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNicheSelect = (niche: string) => {
    setSelectedNiche(niche);
    setSearchQuery('');
    handleSearch(); // fetch brands for this niche
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Research</h1>
        <p className="text-gray-600">Discover brands perfect for your niche and audience</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Brands</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter brand name or product..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>

          <div className="lg:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">Niche</label>
            <select
              value={selectedNiche}
              onChange={(e) => handleNicheSelect(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent capitalize"
            >
              <option value="">All Niches</option>
              {niches.map((niche) => (
                <option key={niche} value={niche} className="capitalize">
                  {niche}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">&nbsp;</label>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Filter size={20} />
              <span>{isLoading ? 'Searching...' : 'Search'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Niche buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        {niches.map((niche) => (
          <button
            key={niche}
            onClick={() => handleNicheSelect(niche)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
              selectedNiche === niche
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {niche}
          </button>
        ))}
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((brand) => (
            <div key={brand.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{brand.name}</h3>
                  <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full capitalize">
                    {brand.niche}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onAddBrand(brand)}
                    className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
                    title="Add to outreach list"
                  >
                    <Plus size={16} />
                  </button>
                  {brand.website && (
                    <a
                      href={`https://${brand.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                      title="Visit website"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              {brand.suggestedProducts && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Products:</h4>
                  <div className="flex flex-wrap gap-1">
                    {brand.suggestedProducts.slice(0, 3).map((product, index) => (
                      <span key={index} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {suggestions.length === 0 && !isLoading && (searchQuery || selectedNiche) && (
        <div className="text-center py-12">
          <Search className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
          <p className="text-gray-600">Try adjusting your search terms or explore different niches.</p>
        </div>
      )}
    </div>
  );
};

export default BrandResearch;
