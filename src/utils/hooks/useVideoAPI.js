import { useState, useEffect } from 'react';

const key = process.env.REACT_APP_YOUTUBE_API_KEY;

const baseUrl = 'https://www.googleapis.com/youtube/v3/videos?';

export default function useVideoAPI(videoId) {
  const [video, setVideo] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    function buildURI() {
      const fields = [
        `id=${videoId}`,
        'part=snippet',
        'fields=items(snippet(title,description,thumbnails(medium(url))))',
        `key=${key}`,
      ];
      return baseUrl.concat(
        fields.reduce((previous, current) => previous.concat(`&${current}`))
      );
    }

    const fetchData = async () => {
      try {
        const response = await fetch(encodeURI(buildURI()));
        const json = await response.json();
        if (Array.isArray(json.items) && json.items.length === 1) setVideo(json.items[0]);
        else setRedirect(true);
      } catch (e) {
        setFetchError(true);
      }
    };

    const check = /^[A-Za-z0-9_-]{11}$/.test(videoId);
    if (check) fetchData();
    else setRedirect(true);
  }, [videoId]);

  return { video, redirect, fetchError };
}
