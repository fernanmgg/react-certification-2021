function getFavorites(name) {
  const localData = localStorage.getItem(name);
  if (localData) {
    return JSON.parse(localData);
  }
  return [];
}

function isFavorite(name, videoId) {
  const localData = localStorage.getItem(name);
  if (localData) {
    return JSON.parse(localData).some((element) => element.id.videoId === videoId);
  }
  return false;
}

function addFavorite(name, video) {
  const localData = localStorage.getItem(name);
  if (localData) {
    localStorage.setItem(name, JSON.stringify([video, ...JSON.parse(localData)]));
  } else {
    localStorage.setItem(name, JSON.stringify([video]));
  }
}

function removeFavorite(name, videoId) {
  const localData = localStorage.getItem(name);
  if (localData) {
    const videos = JSON.parse(localData).filter(
      (element) => element.id.videoId !== videoId
    );
    localStorage.setItem(name, JSON.stringify(videos));
  }
}

export { getFavorites, isFavorite, addFavorite, removeFavorite };
