'use client';

import { useEffect, useState } from 'react';
import CarDealerApi from '@/api/CarDealerApi';

const yearsOptions = [
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
];

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedMakesId, setSelectedMakesId] = useState('');
  const [selectedYearModel, setSelectedYearModel] = useState('');

  const getVehiclesData = async () => {
    const vehiclesData = await CarDealerApi.getVehicles();
    setVehicles(vehiclesData);
    console.log(vehiclesData);
  };

  useEffect(() => {
    getVehiclesData();
  }, []);

  return (
    <main className="flex flex-col gap-6 mt-40 items-center justify-center">
      <h1 className="text-5xl font-bold text-white">
        Car <span className="text-[#FFC107]">Dealer</span> App
      </h1>
      <div className="flex flex-row items-end gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="Makes id" className="font-bold text-white">
            Makes ID
          </label>
          <select
            name="Makes id"
            className="block max-w-full rounded-lg text-blue-800 py-2 px-4 h-10"
            onChange={e => setSelectedMakesId(e.target.value)}
          >
            {vehicles.map(vehicle => (
              <option value={vehicle.MakeId} key={vehicle.MakeId}>
                {vehicle.MakeId}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="Model Year" className="font-bold text-white">
            Model Year
          </label>
          <select
            name="Model Year"
            className="block max-w-full rounded-lg text-blue-800 py-2 px-4 h-10"
            onChange={e => setSelectedYearModel(e.target.value)}
          >
            {yearsOptions.map(year => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={!selectedMakesId || !selectedYearModel}
          className="bg-black px-6 py-2 h-10 disabled:opacity-50 text-white font-bold rounded-md hover:bg-gray-700 transition-all ease-in duration-200"
        >
          Next →
        </button>
      </div>
    </main>
  );
}
