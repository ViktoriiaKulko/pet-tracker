export const client = async (
  endpoint,
  { body, method, ...customConfig } = {}
) => {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    method: method ? method : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, config);
  const data = await response.json();

  if (response.ok) {
    // ok to show that the request was successful
    return { ok: true, data: data.data };
  } else {
    return data;
  }
};
