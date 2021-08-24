const defaultVideo = {
  id: { videoId: '' },
  snippet: {
    title: '...',
    description: '...',
    thumbnails: {
      medium: {
        url: '',
      },
    },
  },
};

const loadingVideo = {
  id: { videoId: '' },
  snippet: {
    title: '',
    description: 'Fetching info...',
    thumbnails: {
      medium: {
        url: '',
      },
    },
  },
};

const errorVideo = {
  id: { videoId: '' },
  snippet: {
    title: '',
    description: 'Error fetching info...',
    thumbnails: {
      medium: {
        url: '',
      },
    },
  },
};

export { defaultVideo, loadingVideo, errorVideo };
