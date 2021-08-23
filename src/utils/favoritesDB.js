function getFavorites(name) {
  const favorites = localStorage.getItem('favorites');
  let result = [];
  if (favorites) {
    const temp = JSON.parse(favorites).filter((element) => element.name === name);
    if (temp.length === 1 && temp[0].videos) result = temp[0].videos;
  }
  return result;
}

export { getFavorites };
