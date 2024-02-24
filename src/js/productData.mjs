const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category = "tents") {
  console.log(baseURL)
  const response = await fetch(`${baseURL}products/search/${category}`);
  const data = await convertToJson(response);
  console.log(data)
  return data.Result;
}

export async function findProductById(id) {
  const product = await fetch(`${baseURL}product/${id}`);
  const data = await convertToJson(product)
  console.log(data.Result)
  return data.Result;
}
