import axios from "axios";

export async function getCars(id) {
  const base = "https://api.npoint.io/2748d15519c67fc51dc5/cars";
  const url = id ? `${base}/${id - 1}` : base;

  const data = await axios
    .get(url)
    .then((res) => res.data)
    .catch(() => alert("Something went wrong! Please refresh the page."));

  if (data) {
    return data;
  }
}

export async function getCarsSpecs() {
  const url = "https://api.npoint.io/2748d15519c67fc51dc5/cars";
  const data = await axios
    .get(url)
    .then((res) => res.data)
    .catch(() => alert("Something went wrong! Please refresh the page."));

  if (data) {
    //gather all the specs of cars
    const carsSpecs = [];
    data.forEach((car) => {
      carsSpecs.push(car.specs);
    });
    return carsSpecs;
  }
}
/* Search cars by name */
export async function getCarsByName(name) {
  const url = "https://api.npoint.io/2748d15519c67fc51dc5/cars";
  const data = await axios
    .get(url)
    .then((res) => res.data)
    .catch(() => alert("Something went wrong! Please refresh the page."));

  if (data) {
    const cars = data.filter((car) => {
      const carName = `${car.make.toLowerCase()} ${car.model.toLowerCase()}`;
      return carName.includes(name.toLowerCase());
    });
    return cars;
  }
}
