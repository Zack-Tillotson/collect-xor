import React, {useEffect, useState} from 'react'
import dataImage from 'data/image'

const MAX_WIDTH = 420;
const MAX_HEIGHT = 420;

const getImageName = () => new Array(10).fill('').map(() => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random()*26)]).join('')

function resizeImage(file) {
    return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = function(e) {

                const img = document.createElement("img");
                img.src = e.target.result;
                document.body.appendChild(img)

                setTimeout(() => {
                    let width = img.naturalWidth;
                    let height = img.naturalHeight;

                    document.body.removeChild(img)

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }                
                    }
                    
                    const canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;
                    canvas.getContext('2d').drawImage(img, 0, 0, width, height)

                    canvas.toBlob(resolve, 'image/png', 0.8)
                }, 0)
            }
            reader.readAsDataURL(file);
        }
    )
}

function useImageUpload() {
    function uploadImage(file) {
        if(!file) throw new Error('file not found')
        const fileName = `${getImageName()}.${file.type.split('/')[1]}`
        return resizeImage(file).then(image => dataImage.uploadItemImage(fileName, image))
    }
    return {uploadImage}
}

export default useImageUpload