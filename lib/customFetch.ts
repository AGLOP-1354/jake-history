import getDefaultUrl from "@/src/lib/utils/getDefaultUrl";

const serializeQueryParams = (params: Record<string, string | number | boolean>) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    query.append(key, String(value));
  });
  return query.toString();
};

type FetchOptions = {
  url: string;
  queryParams?: Record<string, string | number | boolean> | { [key: string]: any };
  options?: RequestInit;
};

const getFetch = async <T>({ url, queryParams, options }: FetchOptions): Promise<T> => {
  const defaultUrl = getDefaultUrl();

  try {
    const queryString = queryParams ? `?${serializeQueryParams(queryParams)}` : "";
    const response = await fetch(`${defaultUrl}${url}${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`GET request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getFetch:", error);
    throw error;
  }
};

const postFetch = async <T>({ url, queryParams, options }: FetchOptions): Promise<T> => {
  const defaultUrl = getDefaultUrl();

  try {
    console.log("queryParams", queryParams);
    console.log("`${defaultUrl}${url}`", `${defaultUrl}${url}`);
    const response = await fetch(`${defaultUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryParams),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`POST request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in postFetch:", error);
    throw error;
  }
};

export { getFetch, postFetch };
