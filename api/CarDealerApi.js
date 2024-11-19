const url = process.env.API_URL;

class CarDealerApi {
  async getVehicles() {
    try {
      const res = await fetch(`${url}car?format=json`);
      const data = await res.json();
      if (data) {
        console.log(data.Results);
      }
      return data.Results;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new CarDealerApi();
