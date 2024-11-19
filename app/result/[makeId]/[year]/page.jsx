import React from 'react';
import CarDealerApi from '@/api/CarDealerApi';
import { yearsOptions } from '@/constants/selectOptions';

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

  const vehiclesData = await CarDealerApi.getVehiclesByIdAndYear(makeId, year);

  return (
    <main className="flex flex-col items-center md:mt-40 mt-10 gap-5">
      <h1 className="font-bold text-4xl text-white">Results</h1>
      <section className="flex md:flex-row flex-col gap-4 items-center flex-wrap justify-center md:max-w-[950px]">
        {vehiclesData.map(vehicle => (
          <div
            key={vehicle.Model_ID}
            className="bg-white rounded-md p-2 shadow-lg w-[300px]"
          >
            <div className="flex flex-row gap-2 text-xl">
              <p>{vehicle.Make_Name}</p>
              <p>{vehicle.Model_Name}</p>
            </div>
            <p>Make ID:{vehicle.Make_ID}</p>
            <p>Model ID:{vehicle.Model_ID}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Page;
