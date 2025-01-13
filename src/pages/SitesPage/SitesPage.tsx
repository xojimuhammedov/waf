import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Globe } from 'lucide-react';

// Toggle komponenti
//@ts-ignore
const Toggle = ({ enabled, onChange }) => (
  <div
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
      enabled ? 'bg-emerald-600' : 'bg-zinc-700'
    }`}
    onClick={() => onChange(!enabled)}
  >
    <div
      className={`absolute h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </div>
);

// Dropdown menu komponenti
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="text-gray-400 hover:text-white"
      >
        <MoreVertical />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-zinc-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu">
            <button 
              className="w-full px-4 py-2 text-sm text-white hover:bg-zinc-700 text-left"
              onClick={() => setIsOpen(false)}
            >
              Tahrirlash
            </button>
            <button 
              className="w-full px-4 py-2 text-sm text-white hover:bg-zinc-700 text-left"
              onClick={() => setIsOpen(false)}
            >
              O'chirish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Filtr modal komponenti
//@ts-ignore
const FilterModal = ({ isOpen, onClose, filters, setFilters }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-lg w-[500px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-white">Filtrlar</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Sayt holati */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white">Sayt holati</h3>
            <div className="flex gap-2">
              {['all', 'active', 'inactive'].map((value) => (
                <button
                  key={value}
                  className={`px-3 py-1 rounded ${
                    filters.status === value ? 'bg-emerald-600' : 'bg-zinc-700'
                  } text-white`}
                  //@ts-ignore
                  onClick={() => setFilters(prev => ({ ...prev, status: value }))}
                >
                  {value === 'all' ? 'Barchasi' : 
                   value === 'active' ? 'Aktiv' : 'Aktiv emas'}
                </button>
              ))}
            </div>
          </div>

          {/* Nazorat holati */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white">Nazorat holati</h3>
            <div className="flex gap-2">
              {['all', 'monitored', 'unmonitored'].map((value) => (
                <button
                  key={value}
                  className={`px-3 py-1 rounded ${
                    filters.monitoring === value ? 'bg-emerald-600' : 'bg-zinc-700'
                  } text-white`}
                  //@ts-ignore
                  onClick={() => setFilters(prev => ({ ...prev, monitoring: value }))}
                >
                  {value === 'all' ? 'Barchasi' : 
                   value === 'monitored' ? 'Nazoratda' : 'Nazoratda emas'}
                </button>
              ))}
            </div>
          </div>

          {/* SSL holati */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white">SSL holati</h3>
            <div className="flex gap-2">
              {['all', 'enabled', 'disabled'].map((value) => (
                <button
                  key={value}
                  className={`px-3 py-1 rounded ${
                    filters.ssl === value ? 'bg-emerald-600' : 'bg-zinc-700'
                  } text-white`}
                  //@ts-ignore
                  onClick={() => setFilters(prev => ({ ...prev, ssl: value }))}
                >
                  {value === 'all' ? 'Barchasi' : 
                   value === 'enabled' ? 'Yoqilgan' : "O'chirilgan"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sayt kartasi komponenti
//@ts-ignore
const SiteCard = ({ site, onToggleSite, onToggleMonitoring }) => (
  <div className="bg-zinc-900 p-4 rounded-lg shadow-lg">
    <div className="flex justify-between items-start">
      <div className="flex gap-3">
        <Globe className="text-emerald-500" size={24} />
        <div>
          <h3 className="text-emerald-500 font-medium">{site.domain}</h3>
          <a href={site.url} className="text-gray-400 text-sm hover:underline">{site.url}</a>
        </div>
      </div>
      <DropdownMenu />
    </div>

    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-blue-400">SSL:</span>
        <span className={`px-2 py-1 rounded text-xs ${
          site.ssl ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
        }`}>
          {site.ssl ? 'yoqilgan' : 'yoqilmagan'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-blue-400">Port:</span>
        <span className="text-gray-300">{site.port}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-blue-400">Saytni yoqish:</span>
        <Toggle enabled={site.enabled} onChange={() => onToggleSite(site.id)} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-blue-400">Nazoratga olish:</span>
        <Toggle enabled={site.monitored} onChange={() => onToggleMonitoring(site.id)} />
      </div>
    </div>
  </div>
);

// Asosiy sahifa komponenti
const SitesPage = () => {
  const [sites, setSites] = useState([
    {
      id: 1,
      domain: 'datagaze.uz',
      url: 'https://192.168.1.102:4443',
      ssl: true,
      port: 443,
      enabled: true,
      monitored: true
    },
    {
      id: 2,
      domain: 'wt.datagaze-lab.uz',
      url: 'https://192.168.1.102:80',
      ssl: false,
      port: 80,
      enabled: false,
      monitored: false
    },
    {
      id: 3,
      domain: 'wt.datagaze-lab.uz',
      url: 'https://192.168.1.102:80',
      ssl: true,
      port: 443,
      enabled: true,
      monitored: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    monitoring: 'all',
    ssl: 'all'
  });

  // Toggle funksiyalari
  //@ts-ignore
  const handleToggleSite = (siteId) => {
    setSites(sites.map(site => 
      site.id === siteId 
        ? { ...site, enabled: !site.enabled }
        : site
    ));
  };
//@ts-ignore
  const handleToggleMonitoring = (siteId) => {
    setSites(sites.map(site => 
      site.id === siteId 
        ? { ...site, monitored: !site.monitored }
        : site
    ));
  };

  // Filtrlash logikasi
  const filteredSites = sites.filter(site => {
    const matchesSearch = site.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.url.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filters.status === 'all' ||
      (filters.status === 'active' && site.enabled) ||
      (filters.status === 'inactive' && !site.enabled);

    const matchesMonitoring = filters.monitoring === 'all' ||
      (filters.monitoring === 'monitored' && site.monitored) ||
      (filters.monitoring === 'unmonitored' && !site.monitored);

    const matchesSSL = filters.ssl === 'all' ||
      (filters.ssl === 'enabled' && site.ssl) ||
      (filters.ssl === 'disabled' && !site.ssl);

    return matchesSearch && matchesStatus && matchesMonitoring && matchesSSL;
  });

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-[1920px] mx-auto px-6 py-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-white">Nazoratdagi saytlar</h1>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Izlash"
                className="pl-10 pr-4 py-2 rounded-lg bg-zinc-800 text-white outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <button 
              className="px-4 py-2 bg-zinc-800 rounded-lg text-white flex items-center gap-2 hover:bg-zinc-700"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter size={18} />
              Filtr
            </button>
            <button className="px-4 py-2 bg-emerald-600 rounded-lg text-white hover:bg-emerald-700">
              Qo'shish
            </button>
          </div>
        </div>

        {/* Filtr Modal */}
        <FilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          setFilters={setFilters}
        />

        {/* Sites Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <div key={site.id} className="min-w-[400px]">
              <SiteCard 
                site={site}
                onToggleSite={handleToggleSite}
                onToggleMonitoring={handleToggleMonitoring}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SitesPage;