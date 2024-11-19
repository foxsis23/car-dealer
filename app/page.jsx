'use client';

import { useEffect, useState } from 'react';
import CarDealerApi from '@/api/CarDealerApi';
import { Dropdown } from '@/components/Dropdown';
import Link from 'next/link';
import { yearsOptions } from '@/constants/selectOptions';
import { Loader } from '@/components/Loader';

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedMakesId, setSelectedMakesId] = useState('');
  const [selectedYearModel, setSelectedYearModel] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getVehiclesData = async () => {
    try {
      const vehiclesData = await CarDealerApi.getVehicles();
      setLoading(true);
      setVehicles(vehiclesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVehiclesData();
  }, []);

  if (error) {
    return <div className="m-auto text-4xl text-red-500">{error}</div>;
  }

  return (
    <main className="flex flex-col gap-6 mt-40 items-center justify-center">
      <h1 className="text-5xl font-bold text-white">
        Car <span className="text-[#FFC107]">Dealer</span> App
      </h1>
      <div className="flex flex-row items-end gap-3">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Dropdown
              label="Makes ID"
              setItem={setSelectedMakesId}
              items={vehicles}
            />

            <Dropdown
              label="Model Year"
              setItem={setSelectedYearModel}
              items={yearsOptions}
            />
          </>
        )}

        <Link href={`/result/${selectedMakesId}/${selectedYearModel}`}>
          <button
            disabled={!selectedMakesId || !selectedYearModel}
            className="bg-black px-6 py-2 h-10 disabled:opacity-50 text-white font-bold rounded-md hover:bg-gray-700 transition-all ease-in duration-200"
          >
            Next →
          </button>
        </Link>
      </div>
    </main>
  );
}
