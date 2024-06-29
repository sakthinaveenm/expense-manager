const logApiRequest = (url, method, headers, body) => {
    console.log("API Request:");
    console.log("URL:", url);
    console.log("Method:", method);
    console.log("Headers:", headers);
    console.log("Body:", body);
    console.log("------------------------");
  };
  
  const contentType = {
    json: "application/json",
    form: "application/x-www-form-urlencoded",
  };
  
  const logApiErrorMessage = (url, errorMessage) => {
    console.error(`Error fetching data from ${url}:`, errorMessage);
  };
  
  const nodeFetchRestApi = async (url, method, headers, body) => {
    try {
      logApiRequest(url, method, headers, body);
      // Make the API request
      const response = await fetch(url, {
        method,
        headers,
        body:
          String(method).toLowerCase() === "get"
            ? undefined
            : JSON.stringify(body),
      });
      // Handle different HTTP response status codes
      if (response.status === 200 || response.ok) {
        return await response.json();
      } else if (response.status === 401) {
        return await response.json();
      }
      if (response.status === 400 || response.status === 404) {
        return await response.json();
      } else {
        var errorResponse = await response.json();
        throw new Error(errorResponse.error);
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      logApiErrorMessage(url, error.message);
      throw error;
    }
  };
  
  module.exports = { nodeFetchRestApi, contentType };