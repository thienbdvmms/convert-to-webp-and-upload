const handleUploadImage = async (event) => {
  const file = event.target.files[0];
  const webpImage = await convertImage(file);
  webpPath.value = webpImage;
};

const convertImage = async (file) => {
  return new Promise((resolve, reject) => {
    const src = URL.createObjectURL(file);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const newImg = new Image();
    newImg.src = src;
    newImg.onload = () => {
      canvas.width = newImg.width;
      canvas.height = newImg.height;
      ctx?.drawImage(newImg, 0, 0);
      const webpImage = canvas.toDataURL("image/webp", 1);
      resolve(webpImage);
    };
  });
};
