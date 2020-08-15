///////////// EDIT IMAGE BUTTON EVENT /////////////////
const updateEditBtn = () => {
  let editButtons = document.querySelectorAll('.edit-image-btn');

  for (let i = 0; i < editButtons.length; i++) {
    // FIRST REMOVE EVENT LISTENER
    //editButtons[i].removeEventListener('click');
    editButtons[i].addEventListener('click', function () {
      const id = this.getAttribute('data-id');
      // get format
      let format = this.getAttribute('data-format')

      document.getElementById('save-data').innerHTML = 'Salvesta';

      document.getElementById('save-data').setAttribute('data-id', id)
      document.getElementById('delete-img').setAttribute('data-id', id)
      document.getElementById('delete-img').setAttribute('data-name', id + format)
      
      // open modal and pass image data
      document.querySelector('#modal-img-div img').setAttribute('src', '/' + id + format)
      // descrtiption
      document.getElementById('img-desc').setAttribute('value', this.getAttribute('data-desc'))
      document.getElementById('img-desc-eng').setAttribute('value', this.getAttribute('data-desc-eng'))
      // date
      document.getElementById('img-date').setAttribute('value', this.getAttribute('data-date'))
      // author
      document.getElementById('img-author').setAttribute('value', this.getAttribute('data-author'))
      // toggle
      //document.getElementById('img-toggle').setAttribute('value', this.getAttribute('data-toggle'))
      let onMedia = this.getAttribute('data-toggle');
      if (onMedia === 'false') {
        document.getElementById('img-toggle').checked = true;
      } else {
        document.getElementById('img-toggle').checked = false;
      }
      

      openModal('edit-image-modal')

    })
  }
}
updateEditBtn()


//

/////////////////////////////////////////

///////////// OPEN MODAL FUNCTION /////////////////
const openModal = (modal_id) => {
  let modal = document.getElementById(modal_id);
  //modal.classList.add('fade-in-default')
  modal.classList.remove('modal-closed')
}
/////////////////////////////////////////
///////////// CLOSE MODAL FUNCTION /////////////////

const closeModal = (modal_id) => {
  document.getElementById(modal_id).classList.add('modal-closed')
}

/////////////////////////////////////////


/////////////////////////////////////////////////
//////////////// UPLOAD IMAGE ///////////////////
/////////////////////////////////////////////////

// define URL and for element
//const url = "http://localhost:3000/upload-avatar";
const form = document.querySelector('form');

form.addEventListener('submit', e => {

  // disable default action
  e.preventDefault();

  // collect files
  const files = document.querySelector('[name=image]').files;
  const formData = new FormData();
  Array.from(files).forEach(file => {
    formData.append("images", file);
  });
  //formData.append('images', files);

  // post form data
  const xhrUpload = new XMLHttpRequest();
  xhrUpload.responseType = 'json';

  // log response
  xhrUpload.onload = () => {
      console.log(xhrUpload.response);
  };

  // create and send the reqeust
  xhrUpload.open('POST', '/admin/images');
  xhrUpload.send(formData);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
////////////////// EDIT IMAGE ///////////////////
/////////////////////////////////////////////////

document.getElementById('save-data').addEventListener('click', function () {
  let btn = this
  let id = this.getAttribute('data-id')
  let desc = document.getElementById('img-desc').value;
  let desc_eng = document.getElementById('img-desc-eng').value;
  let date = document.getElementById('img-date').value;
  
  let toggle = document.getElementById('img-toggle').checked;
  let onMedia = toggle === false ? true : false;
  let author = document.getElementById('img-author').value

  postData(btn, desc, desc_eng, date, author, onMedia, id)
})

const postData = (btn, desc, desc_eng, date, author, onMedia, id) => {
  let json = JSON.stringify({
    id,
    desc,
    desc_eng,
    date,
    author,
    onMedia
  });

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/admin/images/edit", true);
  // set header content type to json
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          btn.innerHTML = 'Salvestatud';
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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
///////////////// DELETE IMAGE //////////////////
/////////////////////////////////////////////////

document.getElementById('delete-img').addEventListener('click', function () {
  let btn = this
  let id = this.getAttribute('data-id')
  let name = this.getAttribute('data-name')
  
  deleteData(btn, id, name)
})

const deleteData = (btn, id, name) => {
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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////


/////////////////////////////////////////////////
//////////////// HIDE SECTIONS //////////////////
/////////////////////////////////////////////////

let hideSections = document.getElementsByClassName('hide-sections');
let hideSectionsBtn = document.getElementById('save-hide-sections');
let hiddenData;
// compare values functions
const checkBoxes = () => {
  hiddenData = {
    hidden_img: false,
    hidden_vid: false,
    hidden_snd: false
  }
  let foundFalse = false;
  for (let i of hideSections) {
    let val = i.getAttribute('data-value') === 'true' ? false : true
    hiddenData[i.name] = i.checked === true ? false : true
    //console.log(val)
    //hiddenData[i.name] = val
    if (val != i.checked) {
      foundFalse = true;
    } 
  }
  if (foundFalse === true) {
    hideSectionsBtn.disabled = false
  } else {
    hideSectionsBtn.disabled = true
  }
  
}

for (let i of hideSections) {
  i.addEventListener('click', function () {
    checkBoxes()
  })
}

hideSectionsBtn.addEventListener('click', function () {
  console.log(hiddenData)
  let btn = this

  let Data = hiddenData;
  Data.btn = btn
  Data.action = 'editMedia'

  editMediaSection(Data)
  // change data-value
  for (let i of hideSections) {
    let dataValue = i.checked === true ? 'false' : 'true'
    i.setAttribute('data-value', dataValue)
    
  }
})


/////////////////////////////////////////////////
////////////// HIDE SECTIONS XHR ////////////////
/////////////////////////////////////////////////

const editMediaSection = (Data) => {
  let btn = Data.btn
  delete Data.btn
  let json = JSON.stringify(Data);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/admin/videos/edit", true);
  // set header content type to json
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          let response = JSON.parse(xhr.responseText)
          if (response.status.includes('section visibilities')) {
            btn.disabled = true
          }
          btn.innerHTML = 'Salvesta';
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
