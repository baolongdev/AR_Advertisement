import React, { useEffect, useState } from 'react'

export function useFetch(url, timing, initialData = null) {
  const vercelToken = 'Bearer CjeMvx9Rgv3VVp9TamJy337o';
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: vercelToken, // Use the Bearer token
          },
        });
        if (!response.ok) {
          if (response.status === 429) {
            // Handle rate limit error
            const resetTime = parseInt(response.headers.get('x-ratelimit-reset')) * 1000;
            await new Promise((resolve) => setTimeout(resolve, resetTime));
            fetchData();
          } else {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    const fetchDataWithDelay = async () => {
      if (!firstRun) {
        // Delay the fetch based on the provided timing
        await new Promise((resolve) => setTimeout(resolve, timing));
      }
      fetchData();
    };

    fetchDataWithDelay();

    if (firstRun) {
      setFirstRun(false); // Set it to false after the first run
    }
  }, [url, timing, firstRun]);

  return { data, loading, error };
}
function calculateDateRange(time) {
  const now = new Date();
  let from, to;

  if (time === "24h") {
    from = new Date(now - 24 * 60 * 60 * 1000); // 24 hours ago
    to = now;
  } else if (time === "7d") {
    from = new Date(now - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    to = now;
  } else if (time === "30d") {
    from = new Date(now - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    to = now;
  } else {
    from = new Date(now - 24 * 60 * 60 * 1000); // 24 hours ago
    to = now;
  }

  return { from, to };
}
// Vistor || Page Views
export function getOverview(environment, time, projectId, timing = 1000, filter = {}) {
  const { from, to } = calculateDateRange(time);
  const apiUrl = `https://vercel.com/api/web/insights/overview?environment=${environment}&filter=${JSON.stringify(filter)}&from=${from}&projectId=${projectId}&to=${to}`;
  return useFetch(apiUrl, timing);
}

// Chi tiết về Vistor || Page Views
export function getTimeseries(environment, time, projectId, timing = 1000, filter = {}) {
  const { from, to } = calculateDateRange(time);
  const apiUrl = `https://vercel.com/api/web/insights/timeseries?environment=${environment}&filter=${JSON.stringify(filter)}&from=${from}&projectId=${projectId}&to=${to}`;
  return useFetch(apiUrl, timing);
}

// Top Referrers || Top path || Top os_name || Top country || Top client_name
export function getData(top_name, environment, time, projectId, timing = 1000, filter = {}, limit = 250,) {
  const { from, to } = calculateDateRange(time);
  const apiUrl = `https://vercel.com/api/web/insights/stats/${top_name}?environment=${environment}&filter=${JSON.stringify(filter)}&from=${from}&limit=${limit}&projectId=${projectId}&to=${to}`;
  return useFetch(apiUrl, timing);
}