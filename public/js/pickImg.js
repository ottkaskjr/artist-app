//// GET IMAGES FOR IMAGE SELECTION MODAL /////
let selectionModalOpened = false;
const getData = () => {

  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/admin/images/?xml=true", true);
  // set header content type to json
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        let parsedResponse = JSON.parse(xhr.responseText)
        let images = parsedResponse.media.images;
        console.log(images)

        // APPEND IMAGES
        appendImages(images, 'modal-img-container')
        selectionModalOpened = true;
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send();
}

////////////////////////////////////////////////////
////////////// APPEND IMAGES TO MODAL //////////////
////////////////////////////////////////////////////

const getCurrentImg = (currentID, id, bg = false) => {
  if (bg === false) {
    if (currentID.includes(id)) return 'img-selected'
  } else {
    if (currentID.includes(id)) return 'selected-bg'
  }
}

// images => array
// div => parent div to append array
const appendImages = (images, div) => {
  let parentDiv = document.getElementById(div);
  let currentID = document.getElementById('img-input-data').getAttribute('data-name')

  if (Array.isArray(images)) {
    for (let image of images) {
      parentDiv.innerHTML += "<div class=" + getCurrentImg(currentID, image.id, true) + "><a class=" + getCurrentImg(currentID, image.id) + " data-id='" + image.id + "' data-format='" + image.format + "'><img src='/" + image.id + image.format + "' alt=''></a></div>"
    }
  } else {
    parentDiv.innerHTML += "<div class=" + getCurrentImg(currentID, image.id, true) + "><a class=" + getCurrentImg(currentID, image.id) + " data-id='" + image.id + "' data-format='" + image.format + "'><img src='/" + images.id + images.format + "' alt=''></a></div>"
  }
  imgSelectionEvents();
}

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

////////////////////////////////////////////////////
/////////// IMG SELECTION FROM IMG MODAL ///////////
////////////////////////////////////////////////////
const imgSelectionEvents = () => {
  let images = document.querySelectorAll('#modal-img-container a');
  let imgDataEl = document.getElementById('img-input-data');
  let imgPreview = document.getElementById('about-img-preview');
  let noImgMes = document.getElementById('no-preview-img')
  let imgPosDiv = document.getElementById('img-position-div')
  let imgOverlay = document.getElementById('bg-div-overlay'); // adminHeader
  
  for (let img of images) {
    img.addEventListener('click', function () {
      let id = img.getAttribute('data-id');
      let format = img.getAttribute('data-format');
      let currentSelected = document.querySelector('.img-selected');
      let currentParentBg = document.querySelector('.selected-bg');
      
      
      //let childImg = this.getElementsByTagName('img')[0];
      if (img.classList.contains('img-selected')) {

        // remove img data
        imgDataEl.setAttribute('data-name', '');

        // remove background to parent div
        img.parentNode.classList.remove('selected-bg')

        // remove img preview
        if (noImgMes != null) { // adminHeader
          if (!imgPreview.classList.contains('d-none')) {
            imgPreview.classList.add('d-none')
          }
          imgPreview.setAttribute('src', '')
        } else {
          if (imgPreview.style.visibility != 'hidden') { // adminHeader
            console.log('hidden')
            imgPreview.style.visibility = 'hidden'
            if (imgOverlay != null) {
              imgOverlay.style.visibility = 'hidden'
            }
          } 
        }
        

        // show no-img-preview message
        if (noImgMes != null) {
          if (noImgMes.classList.contains('d-none')) {
            noImgMes.classList.remove('d-none')
          }
        }
        

        // hide img position radio
        if (imgPosDiv != null) {
          if (!imgPosDiv.classList.contains('d-none')) {
            imgPosDiv.classList.add('d-none')
          }
        }
        
        

        // finally remove the a TAG .img-selected
        img.classList.remove('img-selected')
      } else {
        // remove .img-selected from current a
        if (currentSelected != null) {
          currentSelected.classList.remove('img-selected')
        } 
        // remove .selected-bg from current parent div
        if (currentParentBg != null) {
          currentParentBg.classList.remove('selected-bg')
        } 

        // set img data
        imgDataEl.setAttribute('data-name', id + format);

        
        // set img preview
        if (noImgMes != null) { // adminHeader
          if (imgPreview.classList.contains('d-none')) {
            imgPreview.classList.remove('d-none')
          }
        } else if (imgPreview.style.visibility === 'hidden') {  // adminHeader
          console.log('visible')
            imgPreview.style.visibility = 'visible'
            if (imgOverlay != null) {
              imgOverlay.style.visibility = 'visible'
            }
        }
        imgPreview.setAttribute('src', '/' + id + format)
        
        // hide no-img-preview message
        if (noImgMes != null) {
          if (!noImgMes.classList.contains('d-none')) {
            noImgMes.classList.add('d-none')
          }
        }

        // show img position radio
        if (imgPosDiv != null) {
          if (imgPosDiv.classList.contains('d-none')) {
            imgPosDiv.classList.remove('d-none')
          }
        }
        

        // add background to parent div
        img.parentNode.classList.add('selected-bg')

        // finally add the a TAG .img-selected
        img.classList.add('img-selected')
      }
    })
  }
  
}



////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////


///////////// OPEN IMG MODAL EVENT ////////////////
document.getElementById('open-img-modal').addEventListener('click', function () {
  openModal('select-img-modal')

  /// SIIA TEE XMLHttpRequest(), et saada kõik pildid ja kuva need modalis
  /// selectionModalOpened => only make the request for the first time
  if (!selectionModalOpened) {
    getData();
  }
  
})