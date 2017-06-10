import { metadataPromise, db } from './db.js';
import Sortable from 'sortablejs';

const sortableContainer = document.createElement('div')
document.body.append(sortableContainer);

const updateButton = document.createElement('button');
updateButton.textContent = "Update Photo Order"
updateButton.onclick = () => {
  const ul = document.getElementById("photo-sort");
  const newMetadataArray = Array.from(ul.childNodes).map(li => {
    return JSON.parse(li.getAttribute("data"));
  });
  db.ref('imageMetadata').set(newMetadataArray);
}
document.body.append(updateButton);

metadataPromise.then(metadataSnapshot =>{
  const metadata = metadataSnapshot.val();
  const ul = document.createElement('ul');
  ul.id = "photo-sort";
  metadata.forEach(obj => {
    const li = document.createElement('li');
    li.setAttribute("data", JSON.stringify(obj));
    li.textContent = obj.filename;
    ul.append(li);
  });

  Sortable.create(ul, {
    animation: 150
  });
  sortableContainer.append(ul);
});
