const url = process.env.API_URL;

class CarDealerApi {
  async getVehicles() {
    try {
      const res = await fetch(`${url}GetMakesForVehicleType/car?format=json`);
      const data = await res.json();

      return data.Results;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getVehiclesByIdAndYear(makesId, modelYear) {
    try {
      const res = await fetch(
        `${url}GetModelsForMakeIdYear/makeId/${makesId}/modelyear/${modelYear}?format=json`,
      );

      const data = await res.json();

      return data.Results;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new CarDealerApi();
