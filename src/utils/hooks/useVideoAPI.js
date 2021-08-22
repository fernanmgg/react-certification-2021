import { useState, useEffect } from 'react';

const key = process.env.REACT_APP_API_KEY;

const baseUrl = 'https://www.googleapis.com/youtube/v3/videos?';

export default function useVideoAPI(videoId) {
  const [video, setVideo] = useState({ title: '...', description: '...' });

  useEffect(() => {
    function buildURI() {
      const fields = [
        `id=${videoId}`,
        'part=snippet',
        'fields=items(snippet(title,description))',
        `key=${key}`,
      ];
      return baseUrl.concat(
        fields.reduce((previous, current) => previous.concat(`&${current}`))
      );
    }

    const fetchData = async () => {
      setVideo({ title: '', description: 'Fetching info...' });
      try {
        const response = await fetch(encodeURI(buildURI()));
        const json = await response.json();
        if (json.items)
          setVideo({
            title: json.items[0].snippet.title,
            description: json.items[0].snippet.description,
          });
        else setVideo({ title: '', description: 'Error fetching info...' });
      } catch (e) {
        setVideo({ title: '', description: 'Error fetching info...' });
      }
    };

    const check = /[A-Za-z0-9_-]{11}/.test(videoId);
    if (check) fetchData();
    else setVideo({ title: '', description: 'Error fetching info...' });
  }, [videoId]);

  return { video };
}
