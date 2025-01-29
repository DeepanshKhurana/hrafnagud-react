import { useState, useEffect } from 'react';
import axios from 'axios';

const makeEndpoint = (...parts) => {
  const path = parts.join('/');
  const apiPath = process.env.REACT_APP_API_PATH;
  
  if (!apiPath) {
    throw new Error('REACT_APP_API_PATH not set as an environment variable.');
  }
  
  return `${apiPath}${path}`;
};

const getApiKey = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  
  if (!apiKey) {
    throw new Error('REACT_APP_API_KEY not set as an environment variable.');
  }
  
  return apiKey;
};

const getCacheStatus = async (endpoint) => {
    try {
        const url = makeEndpoint('staleness');
        const params = new URLSearchParams({ endpoint });
        const fullUrl = `${url}?${params.toString()}`;

        const response = await axios.get(fullUrl, {
            headers: {
                'Accept': 'application/json',
                'X-API-KEY': getApiKey(),
                'Origin': window.location.origin
            }
        });

        return response.data;
    } catch (error) {
        console.error('Axios error:', error);
        // Provide a more informative error
        throw new Error(`Failed to fetch cache status: ${error.message}`);
    }
};
  
const processApi = async (endpoint, cached = false) => {
    try {
        const url = makeEndpoint(endpoint);
        const params = new URLSearchParams({ cached: cached.toString() });
        const fullUrl = `${url}?${params.toString()}`;

        const response = await axios.get(fullUrl, {
            headers: {
                'Accept': 'application/json',
                'X-API-KEY': getApiKey(),
                'Origin': window.location.origin
            }
        });

        return response.data;
    } catch (error) {
        console.error('Axios error:', error);
        throw new Error(`Failed to fetch ${endpoint}: ${error.message}`);
    }
};

export const processApiWithCache = async (endpoint, forceRefresh = false) => {
  try {
    const { cron_status: cachedStatus } = await getCacheStatus(endpoint);
    let response;

    if (forceRefresh || cachedStatus === 'green') {
      response = await processApi(endpoint, false);
      return {
        response,
        status: 'green'
      };
    } else {
      response = await processApi(endpoint, true);
      return {
        response,
        status: cachedStatus
      };
    }
  } catch (error) {
    console.error('Error in processApiWithCache:', error);
    throw error;
  }
};

export const useApiWithCache = (endpoint) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      const result = await processApiWithCache(endpoint, forceRefresh);
      setData(result.response);
      setStatus(result.status);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const refresh = () => fetchData(true);

  return { data, status, error, isLoading, refresh };
};

export default {
  processApiWithCache,
  useApiWithCache
};
