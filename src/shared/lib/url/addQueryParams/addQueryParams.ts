export const getQueryParams = (params: OptionalRecord<string, string>) => {
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([name, val]) => {
    if (val !== undefined) {
      searchParams.set(name, val);
    }
  });
  return `?${searchParams.toString()}`;
};

/**
 * Function to add query parameters to URL
 * @param params
 */

export const addQueryParams = (params: OptionalRecord<string, string>) => {
  window.history.pushState(null, '', getQueryParams(params));
};
