// @/services/file.ts
import {uploadImage} from "@/utils/file";

const convertToWebpAndUpload = async (file: Blob | MediaSource) => {
    try {
        const webpImage = await new Promise((resolve, reject) => {
            const src = URL.createObjectURL(file);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const newImg = new Image();
            newImg.src = src;
            newImg.onload = () => {
                canvas.width = newImg.width;
                canvas.height = newImg.height;
                ctx?.drawImage(newImg, 0, 0);
                const webpImage = canvas.toDataURL('image/webp', 1);
                resolve(webpImage);
            };
        });

        const webpBlob = await (async () => {
            // @ts-ignore
            const byteString = atob(webpImage.split(',')[1]);
            // @ts-ignore
            const mimeString = webpImage.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], {type: mimeString});
        })();

        const formData = new FormData();
        formData.append('image', webpBlob);

        return await uploadImage(formData); // Your API requires
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default convertToWebpAndUpload;
