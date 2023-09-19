export async function getCars(id) {
  const base = "https://api.npoint.io/2748d15519c67fc51dc5/cars";
  const url = id ? `${base}/${id - 1}` : base;
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch Cars",
      statsText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return await data;
}
