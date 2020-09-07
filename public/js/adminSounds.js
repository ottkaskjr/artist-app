// get all iframe string from .sound-iframe attribute 'data-embed' and add to innerHTML
let soundIframes = document.getElementsByClassName('sound-iframe')

for (let sound of soundIframes) {
  sound.innerHTML += sound.getAttribute('data-embed')
}


///////////// EDIT SOUND BUTTON EVENT /////////////////

const updateSndEditBtn = (btns) => {
  let editButtons = document.querySelectorAll(btns);

  for (let i = 0; i < editButtons.length; i++) {
    //console.log('click')
    // FIRST REMOVE EVENT LISTENER
    //editButtons[i].removeEventListener('click');
    editButtons[i].addEventListener('click', function () {
      console.log('click')
      const id = this.getAttribute('data-id');
      console.log(id)
      // get data
      //let link = this.getAttribute('data-link')
      let onMedia = this.getAttribute('data-on-media')

      let saveBtn = document.getElementById('save-data-snd')
      let delBtn = document.getElementById('delete-snd')

      saveBtn.innerHTML = 'Salvesta';

      saveBtn.setAttribute('data-id', id)
      delBtn.setAttribute('data-id', id)
      //document.getElementById('delete-img').setAttribute('data-name', id + format)
      
      // open modal and pass image data
      // toggle
      if (onMedia === 'false') {
        document.getElementById('snd-toggle').checked = true;
      } else {
        document.getElementById('snd-toggle').checked = false;
      }
      

      openModal('edit-sound-modal')

    })
  }
}
updateSndEditBtn('.edit-sound-btn')

//

/////////////////////////////////////////

/////////////////////////////////////////////////
////////////////// EDIT SOUND ////////////////////
/////////////////////////////////////////////////

// define URL and for element
//const url = "http://localhost:3000/upload-avatar";

//const form = document.querySelector('form');

document.getElementById('save-data-snd').addEventListener('click', function (e) {

  // disable default action
  //e.preventDefault();
  let btn = this
  let id = this.getAttribute('data-id')
  // get url
  //const videoId = document.getElementById('add-sound-input').value;

  let toggle = document.getElementById('snd-toggle').checked;
  let onMedia = toggle === false ? true : false;

  let Data = {
    btn,
    action: 'update',
    id,
    onMedia
  }

  postDataSnd(Data)
});

const postDataSnd = (Data) => {
  let btn = Data.btn;
  delete Data.btn;
  let json = JSON.stringify(Data);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/admin/sound/edit", true);
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
          updateSoundData(btn, res.soundData);
          
        }
        // changing section hidden value
        if (res.status.includes('hidden')) {
          btn.innerHTML = 'Salvesta';
          btn.classList.add('d-none-admin')
          document.getElementById('hide-snd-section').setAttribute('data-status', res.value)
        }
        // creating a new
        if (res.status.includes('created')) {
          btn.innerHTML = 'Lisa';
          document.getElementById('add-sound-input').value = ''
          btn.disabled = true;
          addNewSound(res.soundData)
        }
        // remove a video
        if (res.status.includes('removed')) {
          btn.innerHTML = 'Kinnita';
          closeModal('remove-confirm-modal-snd')
          closeModal('edit-sound-modal')
          // remove article div
          removeMedia('snd-div-' + res.soundData.id)
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

const updateSoundData = (btn, soundData) => {
  btn.setAttribute('data-on-media', soundData.onMedia)
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
/////////////////// ADD SOUND ///////////////////
/////////////////////////////////////////////////

// check sound link input
let submitSndLinkBtn = document.getElementById('add-sound-btn')
document.getElementById('add-sound-input').addEventListener('input', function () {
  
  if (this.value.includes('soundcloud.com')) {
    submitSndLinkBtn.disabled = false
  } else {
    submitSndLinkBtn.disabled = true
  }
})

document.getElementById('add-sound-btn').addEventListener('click', function () {
  const btn = this;
  const embed = document.getElementById('add-sound-input').value
  
  let Data = {
    btn,
    embed,
    action: 'create'
  }

  // disable video input
  //btn.disabled = true

  postDataSnd(Data)
})

const addNewSound = (soundData) => {
  // video parent div
  let container = document.getElementById('admin-sound-container')
  // video div
  let soundDiv = document.createElement('DIV');
  soundDiv.setAttribute('id', 'snd-div-' + soundData.id);
  soundDiv.classList.add('media-snd-div', 'mb-5', 'mx-1')

  // iframe parent + append to soundDiv
  let iframeParent = document.createElement('DIV')
  iframeParent.classList.add('sound-iframe')
  iframeParent.setAttribute('data-embed', soundData.link)
  iframeParent.innerHTML += soundData.link
  soundDiv.appendChild(iframeParent);

  //btn div + append to soundDiv
  let btnDIV = document.createElement('DIV');
  btnDIV.classList.add('txt-c')
  soundDiv.appendChild(btnDIV)

 
// button + append to btnDIV
  
  let editBtn = document.createElement('BUTTON');
  editBtn.classList.add('edit-sound-btn', 'edit-sound-btn-' + soundData.id)
  editBtn.setAttribute('data-id', soundData.id);
  editBtn.setAttribute('data-link', soundData.link);
  editBtn.setAttribute('data-on-media', soundData.onMedia);
  editBtn.innerHTML = 'Halda'
  btnDIV.appendChild(editBtn)

  container.prepend(soundDiv)

  // update new edit button
  updateSndEditBtn('.edit-sound-btn-' + soundData.id)
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
///////////////// DELETE SOUND //////////////////
/////////////////////////////////////////////////

document.getElementById('delete-snd').addEventListener('click', function () {

  let id = this.getAttribute('data-id')
  // update confirm remove modal

  document.getElementById('confirm-remove-btn-snd').setAttribute('data-id', id)

  openModal('remove-confirm-modal-snd')
  //deleteDataVid(btn, id)
})

// CANCEL REMOVE

document.getElementById('cancel-remove-btn-snd').addEventListener('click', () => {
  closeModal('remove-confirm-modal-snd')
})


// CONFIRM REMOVE
document.getElementById('confirm-remove-btn-snd').addEventListener('click', function () {
  console.log('CLICK')
  let btn = this
  let Data = {
    action: 'remove',
    id: this.getAttribute('data-id'),
    btn
  }

  postDataSnd(Data)
})

// REMOVE FUNCTION
const removeMedia = (id) => {
  document.getElementById(id).remove();
}