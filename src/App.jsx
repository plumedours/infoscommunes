import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import ByPostalCode from './ByPostalCode';
import ByName from './ByName';
import Header from './Header';
import Footer from './Footer';
import CarteComponent from './CarteComponent';
import { ClipLoader } from 'react-spinners';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carte/:communeCode" element={<CarteComponent />} />
      </Routes>
    </div>
  );
}

export default App;

function Home() {
  const [activeTab, setActiveTab] = useState('Code postal');
  const [communeData, setCommuneData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleDataLoaded = (data) => {
    setCommuneData(data);
    setIsLoading(false);
    setDataLoaded(true);
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="w-11/12 md:w-9/12 lg:w-6/12 bg-white mx-auto mt-5 border-2 rounded-md shadow-lg">
          <Header />
        </div>
        <div className="w-11/12 md:w-9/12 lg:w-6/12 bg-white mx-auto mt-5 border-2 rounded-md shadow-lg">
          <div className="flex border-t">
            <Tab activeTab={activeTab} onClick={handleTabClick} tabName="Code postal" />
            <Tab activeTab={activeTab} onClick={handleTabClick} tabName="Nom" />
          </div>
          <div className="p-4">
            {activeTab === 'Code postal' ? (
              <ByPostalCode setCommuneData={setCommuneData} />
            ) : (
              <ByName setCommuneData={setCommuneData} />
            )}
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <ClipLoader color="#6366F1" size={100} loading={isLoading} />
            </div>
          ) : (
            communeData && (
              <div>
                <h3 className="flex flex-col px-3 mb-5 text-neutral-700">Résultats :</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mx-5">
                  {communeData.map((ville) => (
                    <div key={ville.code} className="border-2 rounded-md shadow-lg p-5 flex flex-col">
                      <div className="flex flex-row justify-center mb-3">
                        <h4 className="mb-2 text-xl font-semibold text-neutral-700">{ville.nom}</h4>
                      </div>
                      <div className="flex flex-col justify-between">
                        <p className="text-neutral-700 font-semibold">Code postal :{" "} <span className="text-sm font-medium">{ville.codesPostaux.join(', ')}</span></p>
                        <p className="text-neutral-700 font-semibold">Code INSEE : <span className="text-sm font-medium">{ville.code}</span></p>
                        <p className="text-neutral-700 font-semibold">Population : <span className="text-sm font-medium">{ville.population} hab.</span></p>
                        <p className="text-neutral-700 font-semibold">Surface : <span className="text-sm font-medium">{ville.surface} ha </span><span className="text-xs font-normal">({(ville.surface * 0.01).toFixed(2)} km²)</span></p>
                        <p className="text-neutral-700 font-semibold">Département : <span className="text-sm font-medium">{ville.departement.nom} ({ville.codeDepartement})</span></p>
                        <p className="text-neutral-700 font-semibold">Région : <span className="text-sm font-medium">{ville.region.nom} ({ville.codeRegion})</span></p>
                      </div>
                      <div className="text-sm mt-2 flex flex-row items-center gap-2 text-blue-500">
                        <Link to={`/carte/${ville.code}`}>Voir sur la carte</Link> <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="m15 21l-6-2.1l-4.65 1.8q-.5.2-.925-.113T3 19.75v-14q0-.325.188-.575T3.7 4.8L9 3l6 2.1l4.65-1.8q.5-.2.925.113T21 4.25v14q0 .325-.188.575t-.512.375L15 21Zm-1-2.45V6.85l-4-1.4v11.7l4 1.4Zm2 0l3-1V5.7l-3 1.15v11.7ZM5 18.3l3-1.15V5.45l-3 1V18.3ZM16 6.85v11.7v-11.7Zm-8-1.4v11.7v-11.7Z"></path></svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Tab({ activeTab, onClick, tabName }) {
  return (
    <button
      className={`px-4 py-2 font-medium border-t-2 border-transparent ${activeTab === tabName
        ? 'border-blue-500 font-semibold text-blue-600 underline'
        : 'text-neutral-500 hover:text-neutral-700'
        }`}
      onClick={() => onClick(tabName)}
    >
      {tabName}
    </button>
  );
}
