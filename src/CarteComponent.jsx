import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Footer from './Footer';

function CarteComponent() {
  const { communeName } = useParams();
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [centerCoordinates, setCenterCoordinates] = useState([0, 0]);
  const [surface, setSurface] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [postalCode, setPostalCode] = useState();
  const [codeInsee, setCodeInsee] = useState();
  const [population, setPopulation] = useState();
  const [codeDepartement, setCodeDepartement] = useState();
  const [departement, setDepartement] = useState();
  const [codeRegion, setCodeRegion] = useState();
  const [region, setRegion] = useState();

  useEffect(() => {
    fetchPolygonCoordinates();
    fetchData();
  }, []);

  const fetchPolygonCoordinates = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://geo.api.gouv.fr/communes?nom=${communeName}&fields=centre,surface,contour&format=json&geometry=centre`);
      const data = await response.json();

      if (data.length > 0 && data[0].centre) {
        setPolygonCoordinates(data[0].contour.coordinates[0].map(coords => [coords[1], coords[0]]));
        setCenterCoordinates([data[0].centre.coordinates[1], data[0].centre.coordinates[0]]);
        setDataLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching polygon coordinates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://geo.api.gouv.fr/communes?nom=${communeName}&fields=nom,code,codesPostaux,surface,codeDepartement,departement,codeRegion,region,population&format=json&geometry=centre`);
      const data = await response.json();

      if (data.length > 0) {
        setPostalCode(data[0].codesPostaux);
        setCodeInsee(data[0].code);
        setPopulation(data[0].population);
        setCodeDepartement(data[0].codeDepartement);
        setDepartement(data[0].departement.nom);
        setCodeRegion(data[0].codeRegion);
        setRegion(data[0].region.nom);
        setSurface(data[0].surface);
      }
    } catch (error) {
      console.error('Error fetching polygon coordinates:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col items-center pb-5 m-5">
          <div className="flex flex-row w-11/12 md:w-9/12 lg:w-7/12 items-center">
            <Link to="/">
              <div className="flex text-neutral-700 hover:text-blue-500 bg-neutral-50 hover:bg-neutral-100 transition-colors rounded shadow-lg shadow-neutral-200">
                <div className="flex items-end text-4xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12.3 15.3l-2.6-2.6q-.15-.15-.225-.325T9.4 12q0-.2.075-.375T9.7 11.3l2.6-2.6q.475-.475 1.088-.212t.612.937v5.15q0 .675-.613.938T12.3 15.3Z"></path></svg>
                </div>
              </div>
            </Link>
            <div className="flex justify-center w-full bg-white mx-auto border-2 rounded-md shadow-lg">
              <h2 className="my-2 text-xl md:text-2xl text-center">Carte de la commune : {communeName}</h2>
            </div>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <ClipLoader color="#6366F1" size={100} loading={isLoading} />
            </div>
          ) : (
            dataLoaded && (
              <div className="w-11/12 md:w-9/12 lg:w-7/12 border-2 rounded-md shadow-lg bg-white p-5 mt-5">
                <div className="h-96 mb-5">
                  <MapContainer center={centerCoordinates} zoom={13} style={{ width: '100%', height: '100%' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {polygonCoordinates.length > 0 && (
                      <Polygon
                        positions={polygonCoordinates}
                        color="blue"
                        fillOpacity={0.2}
                      />
                    )}
                  </MapContainer>
                </div>
                <div className="flex flex-col md:flex-row md:justify-evenly text-neutral-700 text-lg">
                  <div>
                    <p className="text-neutral-700 font-semibold">Code postal :{" "} <span className="text-base font-medium">{postalCode.join(', ')}</span></p>
                    <p className="text-neutral-700 font-semibold">Département : <span className="text-base font-medium">{departement} ({codeDepartement})</span></p>
                    <p className="text-neutral-700 font-semibold">Région : <span className="text-base font-medium">{region} ({codeRegion})</span></p>
                  </div>
                  <div>
                    <p className="text-neutral-700 font-semibold">Code INSEE : <span className="text-base font-medium">{codeInsee}</span></p>
                    <p className="text-neutral-700 font-semibold">Population : <span className="text-base font-medium">{population} habitants</span></p>
                    <p className="text-neutral-700 font-semibold">Surface : <span className="text-base font-medium">{surface} hectares </span><span className="text-sm font-normal">({(surface * 0.01).toFixed(2)} km²)</span></p>
                  </div>
                </div>
              </div>
            )
          )}
          <Link to="/">
            <div className="mt-5 flex flex-row gap-2 text-white bg-blue-500 hover:bg-blue-400 px-3 py-1 transition-colors rounded shadow-lg shadow-blue-500">
              <div className="flex items-end text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 7v4H5.83l3.58-3.59L8 6l-6 6l6 6l1.41-1.42L5.83 13H21V7h-2Z"></path></svg>
              </div>
              <div className="flex text-lg">
                Accueil
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CarteComponent;
