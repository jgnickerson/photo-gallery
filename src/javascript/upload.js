import {db, storage, metadataPromise} from './db.js';

const imgInput = document.createElement('input');
imgInput.type = 'file';

const imgPreview = document.createElement('img');
imgPreview.className = "img-preview";

const uploadButton = document.createElement('button');
uploadButton.textContent = "Upload";
uploadButton.className = "button";
uploadButton.onclick = () => {
  const img = imgInput.files[0];
  if (img) {
    storage.ref().child('images/' + img.name).put(img)
    .then(snapshot => {
      const newImgMetadata = {filename: img.name, url: snapshot.downloadURL, width: imgPreview.naturalWidth, height: imgPreview.naturalHeight};
      metadataPromise.then(metadataSnapshot => {
        const newMetadataArray = [];
        if (metadataSnapshot.val()) {
          newMetadataArray.push(...metadataSnapshot.val());
        }
        newMetadataArray.push(newImgMetadata);
        db.ref('imageMetadata').set(newMetadataArray);
      })
    })
  } else {
    console.log("please select a file");
  }
}

imgInput.onchange = () => {
  let file = imgInput.files[0];
  let reader = new FileReader();

  reader.addEventListener('load', ()=> {
    imgPreview.src = reader.result;

  });

  if (file) {
    reader.readAsDataURL(file);
  }
}

const container = document.getElementById("upload");
container.appendChild(imgInput);
container.appendChild(imgPreview);
container.appendChild(uploadButton);
