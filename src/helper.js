import { get } from "lodash";
export function getImageUrls(data) {
  console.log(data);
  const photo = get(data, "photos.photo", []);
  const imageUrls = photo.map(photoItem => {
    return {
      url: `https://farm${photoItem.farm}.staticflickr.com/${photoItem.server}/${photoItem.id}_${
        photoItem.secret
      }_q.jpg`,
      id: photoItem.id
    };
  });
  return { imageUrls, total: data.photos.total };
}
