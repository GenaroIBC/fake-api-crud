export async function fetchRequest({ url, method, body, headers }) {
  const finalHeaders = {
    accept: "application/json",
    "content-type": "application/json",
    ...headers,
  };
  const options = {
    method,
    headers: finalHeaders,
    body,
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error({ error });
    return error;
  }
}
