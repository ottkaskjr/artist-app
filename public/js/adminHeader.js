const retVal = (id) => {
  return document.getElementById(id).value;
}


///////////////////////////////////////////
//              TITLE & BG               //
///////////////////////////////////////////

document.getElementById('save-title').addEventListener('click', function() {
  let btn = this;

  let Data = {
    section: 'title',
    hidden: document.getElementById('hide-title-section').checked,
    heading: retVal('main-heading-input'),
    heading_eng: retVal('main-heading-input-eng'),
    heading_pos: retVal('main-heading-pos'),
    heading_color: retVal('main-heading-color'),
    heading_size: retVal('main-heading-size'),
    introduction: retVal('main-introduction-input'),
    introduction_eng: retVal('main-introduction-input-eng'),
    introduction_pos: retVal('main-introduction-pos'),
    introduction_color: retVal('main-introduction-color'),
    introduction_size: retVal('main-introduction-size'),
    height: retVal('title-section-height'),
    img: document.getElementById('img-input-data').getAttribute('data-name'),
    overlay: retVal('title-overlay-slider'),
    btn
  }


  postData(Data)
})

const postData = (Data) => {
  let btn = Data.btn;
  delete Data.btn;
  let json = JSON.stringify(Data);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/admin/header", true);
  // set header content type to json
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        
        let res = JSON.parse(xhr.responseText)

        console.log(res);

        // update
        if (res.status.includes('updated')) {
          btn.innerHTML = 'Salvesta';
        }
        // changing section hidden value
        /*
        if (res.status.includes('hidden')) {
          btn.innerHTML = 'Salvesta';
          btn.classList.add('d-none')
          document.getElementById('hide-section').setAttribute('data-status', res.value)
        }
        */
        // creating a new
        /*
        if (res.status.includes('created')) {
          btn.innerHTML = 'Lisa uus';
          addNewTable(res.memberEst, res.memberEng)
        }
        */
        // removing an article
        /*
        if (res.status.includes('removed')) {
          btn.innerHTML = 'Kinnita';
          closeModal('remove-confirm-modal')
          // remove article div
          document.getElementById('section-pre-' + res.id).remove()
        }
        */
        // update main heading
        /*
        if (res.status.includes('mainHeading')) {
          btn.innerHTML = 'Salvesta';
          document.getElementById('main-heading').innerHTML = res.mainHeading;
        }
        */
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




/////////////////////////////////////////
// UPDATE #bg-div-overlay
// correct overlay (sort of)


//let previewImgWidth = document.getElementById('about-img-preview').offsetWidth;
//let previewImgHeight = document.getElementById('about-img-preview').offsetHeight;
//let imgParentWidth = document.getElementById('header-overlay-preview').offsetWidth;

//let margin = (imgParentWidth - previewImgWidth) / 2;
//let height = previewImgHeight.toString();
//margin = margin.toString();
//overlay.style.left = margin + 'px'
//overlay.style.right = margin + 'px'
//overlay.style.bottom = height + 'px'
//overlay.style.width = previewImgWidth.toString() + 'px';


let overlay = document.getElementById('bg-div-overlay')
const updateOverlay = () => {
  
  // OVERLAY OPACITY & BG COLOR
  let overlayVal = overlay.getAttribute('data-overlay')
  let overlayNum = parseInt(overlayVal)
  let bg = '#fff';
  let opacity = overlayNum/100;

  if (overlayNum < 0) {
    bg = '#000';
    opacity = - opacity
  }

  opacity = opacity.toString()
  overlay.style.background = bg;
  overlay.style.opacity = opacity;
}

const updateTxtPreview = () => {
  // TEXT-PREVIEW STYLE
  console.log('got here')
  let hSize = parseInt(document.getElementById('main-heading-size').value)*0.4;
  let hPos = 'txt-' + document.getElementById('main-heading-pos').getAttribute('data-value').charAt(0);
  console.log(hPos)
  let hColor = document.getElementById('main-heading-color').value;

  let iSize = parseInt(document.getElementById('main-introduction-size').value)*0.4
  let iPos = 'txt-' + document.getElementById('main-introduction-pos').getAttribute('data-value').charAt(0);
  let iColor = document.getElementById('main-introduction-color').value;
  
  let h = document.querySelector('#heading-preview p');
  let hP = document.getElementById('heading-preview')
  let i = document.querySelector('#intro-preview p');
  let iP = document.getElementById('intro-preview')

  h.style.fontSize = hSize.toString() + 'px'
  if (!hP.classList.contains(hPos)) {
    console.log('does not contain')
    hP.classList.remove('txt-l')
    hP.classList.remove('txt-c')
    hP.classList.remove('txt-r')
    hP.classList.add(hPos)
  }
  h.style.color = hColor;

  i.style.fontSize = iSize.toString() + 'px'
  if (!iP.classList.contains(iPos)) {
    iP.classList.remove('txt-l')
    iP.classList.remove('txt-c')
    iP.classList.remove('txt-r')
    iP.classList.add(iPos)
  }
  i.style.color = iColor;
}

const heightPreview = document.getElementById('bg-height-preview');
const updatePreviewHeight = () => {
  let hVal = (100 - document.getElementById('title-section-height').value).toString()
  console.log(hVal)
  heightPreview.style.height = hVal + '%'
  
}
updatePreviewHeight();
updateTxtPreview();
updateOverlay();


//overlay.style.transform = 'translateX(50%)'

// EVENT LISTENERS FOR INPUTS FOR UPDATING PREVIEW

// update data-value of selects
//const selects = 

const pressInputs = ['main-heading-input', 'main-heading-size', 'main-introduction-input', 'main-introduction-size']
const changeInputs = [ 'main-heading-pos', 'main-heading-color',   'main-introduction-pos', 'main-introduction-color']

// X POSITION & COLOR
for (let input of changeInputs) {
  document.getElementById(input).addEventListener('change', function () {
    if (this.type.includes('select')) {
      console.log('select')
      this.setAttribute('data-value', this.value)
    } 
    updateTxtPreview();
  })
}

// TEXT & SIZE
for (let input of pressInputs) {
  document.getElementById(input).addEventListener('input', function () {
    if (this.type.includes('number')) {
      updateTxtPreview();
    } else {
      console.log(this.value)
      document.querySelector('#' + this.getAttribute('data-preview') + ' p').innerHTML = this.value;
    }
    
  })
}

// TITLE CONTAINER HEIGHT
document.getElementById('title-section-height').addEventListener('input', function () {
  updatePreviewHeight();
})