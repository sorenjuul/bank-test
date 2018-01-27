import { get } from "lodash";
export function getImageUrls(data) {
  console.log(data);
  const photo = get(data, "photos.photo", []);
  const imageUrls = photo.map(photoItem => {
    return {
      url: `https://farm${photoItem.farm}.staticflickr.com/${photoItem.server}/${photoItem.id}_${
        photoItem.secret
      }.jpg`,
      id: photoItem.id
    };
  });
  return imageUrls;
}
