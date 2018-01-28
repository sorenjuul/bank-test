export async function searchFlickr(searchTerm, page) {
  let data;
  try {
    const response = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1794b363d1993ad0517ba5a03ed6f208&tags=${searchTerm}&sort=relevance&safe_search=1&is_getty=true&per_page=12&page=${page}&format=json&nojsoncallback=1`
    );
    data = await response.json();
  } catch (error) {
    data = {};
  }
  return data;
}
