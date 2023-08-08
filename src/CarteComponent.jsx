import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link, useParams } from 'react-router-dom';
import SurfaceDisplay from './SurfaceDisplay';

function CarteComponent() {
  const { communeName } = useParams();
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [centerCoordinates, setCenterCoordinates] = useState([0, 0]);
  const [surface, setSurface] = useState();

  useEffect(() => {
    fetchPolygonCoordinates();
  }, []);

  const fetchPolygonCoordinates = async () => {

    try {
      const response = await fetch(`https://geo.api.gouv.fr/communes?nom=${communeName}&fields=centre,surface,contour&format=json&geometry=centre`);
      const data = await response.json();

      if (data.length > 0 && data[0].centre) {
        setPolygonCoordinates(data[0].contour.coordinates[0].map(coords => [coords[1], coords[0]]));
        setCenterCoordinates([data[0].centre.coordinates[1], data[0].centre.coordinates[0]]);
        setSurface(data[0].surface);
      }
    } catch (error) {
      console.error('Error fetching polygon coordinates:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-2 text-2xl">Carte de la commune : {communeName}</h2>
      <SurfaceDisplay surfaceHectares={surface} />
      <div className="w-11/12 md:w-9/12 lg:w-7/12 h-96">
        <MapContainer
          center={centerCoordinates}
          zoom={13}
          style={{ height: '100%' }}
        >
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
      <Link to="/" className="mt-4 text-blue-500 underline">Retour à la page d'accueil</Link>
    </div>
  );
}

export default CarteComponent;
