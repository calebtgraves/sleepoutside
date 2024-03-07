const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { 
      name: 'servicesError', 
      message: await res.json()
    };
  }
}

export async function getProductsByCategory(category = "tents") {
  console.log(baseURL)
  const response = await fetch(`${baseURL}products/search/${category}`);
  const data = await convertToJson(response);
  console.log(data)
  return data.Result;
}

export async function findProductById(id) {
  const product = await fetch(`${baseURL}product/${id}`);
  const data = await convertToJson(product)
  return data.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

export async function loginRequest(creds) {
  const response = await fetch(baseURL + "login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds)
  });
  return await response.json();
}
