import { useState, useEffect } from 'react';

import { defaultVideo, loadingVideo, errorVideo } from './useVideoAPI.vars';

const key = process.env.REACT_APP_API_KEY;

const baseUrl = 'https://www.googleapis.com/youtube/v3/videos?';

export default function useVideoAPI(videoId) {
  const [video, setVideo] = useState(defaultVideo);

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
      setVideo(loadingVideo);
      try {
        const response = await fetch(encodeURI(buildURI()));
        const json = await response.json();
        if (json.items) setVideo(json.items[0]);
        else setVideo(errorVideo);
      } catch (e) {
        setVideo(errorVideo);
      }
    };

    const check = /[A-Za-z0-9_-]{11}/.test(videoId);
    if (check) fetchData();
    else setVideo(errorVideo);
  }, [videoId]);

  return { video };
}
