export async function searchFlickr(searchTerm, page) {
  let data;
  try {
    const response = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ae1c82d8bc018a4706a0d14117f11f67&tags=${searchTerm}&format=json&nojsoncallback=1&per_page=12&page=${page}&safe_search=1&sort=relevance&is_getty=true`
    );
    data = await response.json();
  } catch (error) {
    data = {};
  }
  return data;
}
