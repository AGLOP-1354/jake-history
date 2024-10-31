const serializeQueryParams = (params: Record<string, string | number | boolean>) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    query.append(key, String(value));
  });
  return query.toString();
};

// GET Fetch Function
const getFetch = async <T>(url: string, queryParams?: Record<string, string | number | boolean>): Promise<T> => {
  try {
    // Append query parameters to URL if they exist
    const queryString = queryParams ? `?${serializeQueryParams(queryParams)}` : '';
    const response = await fetch(`${url}${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`GET request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getFetch:', error);
    throw error;
  }
}

// POST Fetch Function
const postFetch = async <T>(url: string, body: Record<string, unknown>): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`POST request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in postFetch:', error);
    throw error;
  }
}

export {
  getFetch,
  postFetch,
}
