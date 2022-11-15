import Resizer from "react-image-file-resizer";

export const resizeImage = (file, width, height, format) =>
new Promise(resolve => {
  Resizer.imageFileResizer(
    file,
    width,
    height,
    format,
    100,
    0,
    (uri) => {
      resolve(uri);
    },
    "file"
  );
});