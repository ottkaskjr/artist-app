///////////// EDIT VIDEO BUTTON EVENT /////////////////

const updateVidEditBtn = (btns) => {
  let editButtons = document.querySelectorAll(btns);

  for (let i = 0; i < editButtons.length; i++) {
    console.log('click')
    // FIRST REMOVE EVENT LISTENER
    //editButtons[i].removeEventListener('click');
    editButtons[i].addEventListener('click', function () {
      console.log('click')
      const id = this.getAttribute('data-id');
      console.log(id)
      // get data
      //let link = this.getAttribute('data-link')
      let description = this.getAttribute('data-desc')
      console.log(description)
      let description_eng = this.getAttribute('data-desc-eng')
      let date = this.getAttribute('data-date')
      let author = this.getAttribute('data-author')
      let onMedia = this.getAttribute('data-on-media')

      let saveBtn = document.getElementById('save-data-vid')
      let delBtn = document.getElementById('delete-vid')

      saveBtn.innerHTML = 'Salvesta';

      saveBtn.setAttribute('data-id', id)
      delBtn.setAttribute('data-id', id)
      //document.getElementById('delete-img').setAttribute('data-name', id + format)
      
      // open modal and pass image data
      //document.querySelector('#modal-img-div img').setAttribute('src', '/' + id + format)
      // descrtiption
      document.getElementById('vid-desc').value = description
      document.getElementById('vid-desc-eng').value = description_eng
      // date
      document.getElementById('vid-date').value = date
      // author
      document.getElementById('vid-author').value = author
      // toggle
      //document.getElementById('img-toggle').setAttribute('value', this.getAttribute('data-toggle'))
      if (onMedia === 'false') {
        document.getElementById('vid-toggle').checked = true;
      } else {
        document.getElementById('vid-toggle').checked = false;
      }
      

      openModal('edit-video-modal')

    })
  }
}
updateVidEditBtn('.edit-video-btn')

//

/////////////////////////////////////////

/////////////////////////////////////////////////
////////////////// EDIT VIDEO ////////////////////
/////////////////////////////////////////////////

// define URL and for element
//const url = "http://localhost:3000/upload-avatar";

//const form = document.querySelector('form');

document.getElementById('save-data-vid').addEventListener('click', function (e) {

  // disable default action
  //e.preventDefault();
  let btn = this
  let id = this.getAttribute('data-id')
  // get url
  //const videoId = document.getElementById('add-video-input').value;

  let toggle = document.getElementById('vid-toggle').checked;
  let onMedia = toggle === false ? true : false;

  let Data = {
    btn,
    action: 'update',
    id,
    description: document.getElementById('vid-desc').value,
    description_eng: document.getElementById('vid-desc-eng').value,
    date: document.getElementById('vid-date').value,
    author: document.getElementById('vid-author').value,
    onMedia
  }

  postDataVid(Data)
});

const postDataVid = (Data) => {
  let btn = Data.btn;
  delete Data.btn;
  let json = JSON.stringify(Data);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/admin/videos/edit", true);
  // set header content type to json
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        
        let res = JSON.parse(xhr.responseText)

        console.log(res);

        // update
        if (res.status.includes('updated')) {
          btn.innerHTML = 'Salvestatud';
          updateVideoData(btn, res.videoData);
          
        }
        // changing section hidden value
        if (res.status.includes('hidden')) {
          btn.innerHTML = 'Salvesta';
          btn.classList.add('d-none')
          document.getElementById('hide-vid-section').setAttribute('data-status', res.value)
        }
        // creating a new
        if (res.status.includes('created')) {
          btn.innerHTML = 'Lisa';
          document.getElementById('add-video-input').value = ''
          btn.disabled = true;
          addNewVideo(res.videoData)
        }
        // remove a video
        if (res.status.includes('removed')) {
          btn.innerHTML = 'Kinnita';
          closeModal('remove-confirm-modal-vid')
          closeModal('edit-video-modal')
          // remove article div
          removeMedia('vid-div-' + res.videoData.id)
        }
        
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send(json); 
  btn.innerHTML = 'Laeb';
}

const updateVideoData = (btn, videoData) => {
  btn.setAttribute('data-desc', videoData.description)
  btn.setAttribute('data-desc-eng', videoData.description_eng)
  btn.setAttribute('data-author', videoData.author)
  btn.setAttribute('data-date', videoData.date)
  btn.setAttribute('data-on-media', videoData.onMedia)
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
/////////////////// ADD VIDEO ///////////////////
/////////////////////////////////////////////////

// check video link input length 
let submitLinkBtn = document.getElementById('add-video-btn')
document.getElementById('add-video-input').addEventListener('input', function () {
  
  if (this.value.includes('youtube.com')) {
    submitLinkBtn.disabled = false
  } else {
    submitLinkBtn.disabled = true
  }
})

document.getElementById('add-video-btn').addEventListener('click', function () {
  const btn = this;
  const videoID = document.getElementById('add-video-input').value
  
  let Data = {
    btn,
    videoID,
    action: 'create'
  }

  // disable video input
  //btn.disabled = true

  postDataVid(Data)
})

const addNewVideo = (videoData) => {
  // video parent div
  let container = document.getElementById('admin-videos-container')
  // video div
  let videoDiv = document.createElement('DIV');
  videoDiv.setAttribute('id', 'vid-div-' + videoData.id);
  videoDiv.classList.add('media-vid-div', 'mb-5', 'mx-1')

  // iframe + append to videoDiv
  let iframe = document.createElement('IFRAME')
  iframe.setAttribute('width', '100%')
  iframe.setAttribute('height', '100%')
  iframe.classList.add('b-10')
  iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoData.link)
  iframe.setAttribute('frameborder', '1')
  iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture')
  iframe.setAttribute('allowfullscreen', true)
  videoDiv.appendChild(iframe);

  //btn div + append to videoDiv
  let btnDIV = document.createElement('DIV');
  btnDIV.classList.add('txt-c')
  videoDiv.appendChild(btnDIV)

 
// button + append to btnDIV
  
  let editBtn = document.createElement('BUTTON');
  editBtn.classList.add('edit-video-btn', 'edit-video-btn-' + videoData.id)
  editBtn.setAttribute('data-id', videoData.id);
  editBtn.setAttribute('data-link', videoData.link);
  editBtn.setAttribute('data-desc', '');
  editBtn.setAttribute('data-desc-eng', '');
  editBtn.setAttribute('data-date', '');
  editBtn.setAttribute('data-author','');
  editBtn.setAttribute('data-on-media', videoData.onMedia);
  editBtn.innerHTML = 'Halda'
  btnDIV.appendChild(editBtn)

  container.prepend(videoDiv)

  // update new edit button
  updateVidEditBtn('.edit-video-btn-' + videoData.id)
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
///////////////// DELETE VIDEO //////////////////
/////////////////////////////////////////////////

document.getElementById('delete-vid').addEventListener('click', function () {

  let id = this.getAttribute('data-id')
  // update confirm remove modal

  document.getElementById('confirm-remove-btn-vid').setAttribute('data-id', id)

  openModal('remove-confirm-modal-vid')
  //deleteDataVid(btn, id)
})

// CANCEL REMOVE
document.getElementById('cancel-remove-btn-vid').addEventListener('click', () => {
  closeModal('remove-confirm-modal-vid')
})

// CONFIRM REMOVE
document.getElementById('confirm-remove-btn-vid').addEventListener('click', function () {
  console.log('CLICK')
  let btn = this
  let Data = {
    action: 'remove',
    id: this.getAttribute('data-id'),
    btn
  }

  postDataVid(Data)
})

// REMOVE FUNCTION
/*
const removeMedia = (id) => {
  document.getElementById(id).remove();
}
*/
/*
const deleteDataVid = (btn, id) => {
  let json = JSON.stringify({
    id,
    name
  });

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/admin/images/delete", true);
  // set header content type to json
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          // close modal
          btn.closest(".modal").classList.add('modal-closed')
          btn.innerHTML = 'Kustuta';
          // remove deleted img-div
          document.getElementById('img-div-' + id).remove();
        } else {
          console.error(xhr.statusText);
        }
      }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send(json); 
  btn.innerHTML = 'Laeb';
}
*/
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////