export async function getCars(id) {
  const base =
    "https://my-json-server.typicode.com/Sinac0de/Rentina_db_server/cars";
  const url = id ? `${base}/${id}` : base;
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch Cars",
      statsText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.cars;
}
