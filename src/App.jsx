import { useState } from 'react'
import './App.css'
import ByPostalCode from './ByPostalCode'
import ByName from './ByName'
import Header from './Header'
import Footer from './Footer'

// eslint-disable-next-line react/prop-types
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

function App() {
  const [activeTab, setActiveTab] = useState('Code postal');
  const [communeData, setCommuneData] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
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
      </div>
      <div className="w-11/12 lg:w-10/12 bg-white mx-auto mt-5 border-2 rounded-md shadow-lg mb-auto">
        <div className="flex flex-col items-center p-3 text-neutral-700">
          <h3>Résultats :</h3>
        </div>
        {communeData && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 m-5">
            {communeData.map((ville) => (
              <div key={ville.code} className="border-2 rounded-md shadow-lg p-5 flex flex-col">
                <div className="flex flex-row justify-center mb-3">
                  <h4 className="mb-2 text-xl font-semibold text-neutral-700">{ville.nom}</h4>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-neutral-700 font-semibold">Code postal : <span className="text-sm font-medium">{ville.codesPostaux}</span></p>
                  <p className="text-neutral-700 font-semibold">Code INSEE : <span className="text-sm font-medium">{ville.code}</span></p>
                  <p className="text-neutral-700 font-semibold">Population : <span className="text-sm font-medium">{ville.population} hab.</span></p>
                  <p className="text-neutral-700 font-semibold">Surface : <span className="text-sm font-medium">{ville.surface} m²</span></p>
                  <p className="text-neutral-700 font-semibold">Département : <span className="text-sm font-medium">{ville.departement.nom} ({ville.codeDepartement})</span></p>
                  <p className="text-neutral-700 font-semibold">Région : <span className="text-sm font-medium">{ville.region.nom} ({ville.codeRegion})</span></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-11/12 md:w-9/12 lg:w-6/12 bg-white mx-auto mt-5 border-2 rounded-md shadow-lg mb-5">
        <Footer />
      </div>
    </div>

  );
}

export default App;

