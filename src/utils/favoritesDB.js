function getFavorites(id) {
  const localData = localStorage.getItem(id);
  if (localData) {
    return JSON.parse(localData).map((element) => element.id.videoId);
  }
  return [];
}

function getFavoritesInfo(id, favorites) {
  const localData = localStorage.getItem(id);
  if (localData) {
    return JSON.parse(localData).filter((element) =>
      favorites.includes(element.id.videoId)
    );
  }
  return [];
}

function isFavorite(id, videoId) {
  const localData = localStorage.getItem(id);
  if (localData) {
    return JSON.parse(localData).some((element) => element.id.videoId === videoId);
  }
  return false;
}

function addFavorite(id, video) {
  const localData = localStorage.getItem(id);
  if (localData) {
    localStorage.setItem(id, JSON.stringify([video, ...JSON.parse(localData)]));
  } else {
    localStorage.setItem(id, JSON.stringify([video]));
  }
}

function removeFavorite(id, videoId) {
  const localData = localStorage.getItem(id);
  if (localData) {
    const videos = JSON.parse(localData).filter(
      (element) => element.id.videoId !== videoId
    );
    localStorage.setItem(id, JSON.stringify(videos));
  }
}

export { getFavorites, getFavoritesInfo, isFavorite, addFavorite, removeFavorite };
