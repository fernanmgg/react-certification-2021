import data from './youtube-videos-mock.json';

function getVideos() {
  return data.items.filter((element) => element.id.kind === 'youtube#video');
}

export { getVideos };
