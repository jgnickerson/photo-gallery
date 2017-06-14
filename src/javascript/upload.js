import DB from './db.js';

const imgInput = document.getElementById('img-upload-input');
const imgPreview = document.getElementById('img-upload-preview');
const imgRename = document.getElementById('img-upload-rename');
const uploadButton = document.getElementById('img-upload-button');

imgInput.addEventListener("change", () => {
  let file = imgInput.files[0];
  let reader = new FileReader();

  imgRename.addEventListener('change', () => { file.newName = imgRename.value });

  reader.addEventListener('load', ()=> {
    imgPreview.src = reader.result;
    imgRename.value = file.name;
    file.newName = file.name;
    file.width = imgPreview.naturalWidth;
    file.height = imgPreview.naturalHeight;
  });

  if (file) {
    reader.readAsDataURL(file);
  }
});

uploadButton.addEventListener("click", (e) => {
  e.preventDefault(); //necessary?
  const img = imgInput.files[0];
  DB.isFilenameDuplicate(img.newName).then(isDuplicate => {
    if (isDuplicate) {
      alert("Duplicate Filename. Please Rename");
    } else {
      imgPreview.classList.add('loading');
      DB.putImage(img, img.newName).then(()=>{
        imgPreview.classList.remove('loading');
      });
    }
  });
});
