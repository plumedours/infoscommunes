import React from 'react';

function SurfaceDisplay({ surfaceHectares }) {
  // Convert hectares to square kilometers
  const surfaceSquareKm = surfaceHectares * 0.01;

  return (
    <div>
      <p className="text-sm text-neutral-700 mb-5">Surface : {surfaceHectares} hectares <span className="text-xs text-neutral-700">({surfaceSquareKm.toFixed(2)} km²)</span></p>
    </div>
  );
}

export default SurfaceDisplay;
