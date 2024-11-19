import React from 'react';

export const Card = ({ modelId, makeName, modelName, makeId }) => (
  <div className="bg-white rounded-md p-2 shadow-lg w-[300px]">
    <div className="flex flex-row gap-2 text-xl">
      <p>{makeName}</p>
      <p>{modelName}</p>
    </div>
    <p>Make ID: {makeId}</p>
    <p>Model ID: {modelId}</p>
  </div>
);
