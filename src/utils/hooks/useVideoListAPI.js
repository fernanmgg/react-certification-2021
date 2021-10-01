import { useState, useEffect } from 'react';

const key = process.env.REACT_APP_YOUTUBE_API_KEY;

const baseUrl = 'https://www.googleapis.com/youtube/v3/search?';

export default function useVideoListAPI(query, relatedVideos = false) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    function buildURI() {
      const fields = [
        'part=snippet',
        'fields=items(id(videoId),snippet(title,description,thumbnails(medium(url))))',
        'maxResults=20',
        'type=video',
        `key=${key}`,
      ];
      if (!relatedVideos) fields.push(`q=${query}`);
      else fields.push(`relatedToVideoId=${query}`);
      return baseUrl.concat(
        fields.reduce((previous, current) => previous.concat(`&${current}`))
      );
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(encodeURI(buildURI()));
        const json = await response.json();
        if (json.items) setVideos(json.items);
        else setError(true);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    };

    const check = !relatedVideos
      ? query.length > 0 && query.length < 64
      : /^[A-Za-z0-9_-]{11}$/.test(query);
    if (check) fetchData();
  }, [query, relatedVideos]);

  return { videos, loading, error };
}
