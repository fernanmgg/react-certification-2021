import { useState, useEffect } from 'react';

const key = process.env.REACT_APP_API_KEY;

const baseUrl = 'https://www.googleapis.com/youtube/v3/search?';

export default function useFetch(search) {
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
        `q=${search}`,
      ];
      return baseUrl.concat(
        fields.reduce((previous, current) => previous.concat(`&${current}`))
      );
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(encodeURI(buildURI()));
        const json = await response.json();
        setVideos(json.items);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    };

    if (search.length > 3) fetchData();
  }, [search]);

  return { videos, loading, error };
}
