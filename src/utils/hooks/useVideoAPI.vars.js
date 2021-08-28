const defaultVideo = {
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
