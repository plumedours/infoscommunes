import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Footer from './Footer';

function CarteComponent() {
  const { communeCode } = useParams();
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
  const [commune, setCommune] = useState();

  useEffect(() => {
    fetchPolygonCoordinates();
  }, []);

  const fetchPolygonCoordinates = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://geo.api.gouv.fr/communes/${communeCode}?fields=nom,code,codesPostaux,centre,surface,contour,codeDepartement,departement,codeRegion,region,population&format=json&geometry=centre`);
      const data = await response.json();

      if (data.centre) {
        setPolygonCoordinates(data.contour.coordinates[0].map(coords => [coords[1], coords[0]]));
        setCenterCoordinates([data.centre.coordinates[1], data.centre.coordinates[0]]);
        setCodeDepartement(data.codeDepartement);
        setDepartement(data.departement.nom);
        setCodeRegion(data.codeRegion);
        setRegion(data.region.nom);
        setSurface(data.surface);
        setPostalCode(data.codesPostaux[0]);
        setCodeInsee(data.code);
        setPopulation(data.population);
        setDataLoaded(true);
        setCommune(data.nom);
      }
    } catch (error) {
      console.error('Error fetching polygon coordinates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col items-center pb-5 m-5">
          <div className="flex flex-col w-11/12 md:w-9/12 lg:w-7/12 items-center justify-center bg-white mx-auto border-2 rounded-md shadow-lg">
            <div className="my-2 text-xl md:text-2xl text-center">
              <h2>Carte de la commune :</h2>
              <p>{commune}</p>
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
                    <p className="text-neutral-700 font-semibold">Code postal :{" "} <span className="text-base font-medium">{postalCode}</span></p>
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
