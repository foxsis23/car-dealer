import React from 'react';
import CarDealerApi from '@/api/CarDealerApi';
import { yearsOptions } from '@/constants/selectOptions';
import { Card } from '@/components/Card';

export async function generateStaticParams() {
  const vehicles = await CarDealerApi.getVehicles();

  const params = [];

  for (const vehicle of vehicles) {
    for (const year of yearsOptions) {
      params.push({
        makeId: vehicle.MakeId.toString(),
        year,
      });
    }
  }

  return params;
}

const Page = async ({ params }) => {
  const { makeId, year } = await params;

  let vehiclesData = null;
  let error = null;

  try {
    vehiclesData = await CarDealerApi.getVehiclesByIdAndYear(makeId, year);
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return <div className="m-auto text-4xl text-red-500">{error}</div>;
  }

  return (
    <main className="flex flex-col items-center md:mt-40 mt-10 gap-5">
      <h1 className="font-bold text-4xl text-white">Results</h1>
      <section className="flex md:flex-row flex-col gap-4 items-center flex-wrap justify-center md:max-w-[950px] m-10">
        {vehiclesData.map(vehicle => (
          <Card
            key={vehicle.Model_ID}
            makeId={vehicle.Make_ID}
            makeName={vehicle.Make_Name}
            modelId={vehicle.Model_ID}
            modelName={vehicle.Model_Name}
          />
        ))}
      </section>
    </main>
  );
};

export default Page;
