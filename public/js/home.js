//////////// ADD STYLE TO CAROUSEL SLIDES ////////////
//let slidesContainer = document.getElementById('slides-container');
//let slide_Containers = document.getElementsByClassName('slide-container')
let slideDivs = document.getElementsByClassName('slide-div-home')


for (let slide of slideDivs) {
  // set bg for slide
  if (slide.getAttribute('data-bg') != '') {
    slide.style.backgroundImage = "url('/" + slide.getAttribute('data-bg') + "')"; 
  }

  // set bg & opacity for .slide-overlay
  let overlay = slide.getElementsByClassName('slide-overlay')[0];
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

  // set text color and size
  let contentDiv = slide.getElementsByClassName('slide-content-div')[0]
  let textSize = contentDiv.getAttribute('data-size')
  let textColor = contentDiv.getAttribute('data-color')
  let redSize = parseInt(textSize) - 30;
  redSize = redSize.toString()
  // heading
  contentDiv.getElementsByClassName('slide-heading')[0].style.fontSize = textSize + '%'
  //contentDiv.getElementsByClassName('slide-heading')[0].style.color = textColor
  // subheadings
  contentDiv.getElementsByClassName('slide-subheading')[0].style.fontSize = redSize + '%'
  contentDiv.getElementsByClassName('slide-subheading')[1].style.fontSize = redSize + '%'
  // color for both
  contentDiv.style.color = textColor 
  // btn text color
  let btn = slide.getElementsByClassName('slide-button')[0]
  btnTextColor = btn.getAttribute('data-color')
  btn.style.color = btnTextColor
  // btn bg
  btnBg = btn.getAttribute('data-bg')
  btn.style.background = btnBg
}



// display soundcloud iframes
// TEE DÜNAAMILISEKS, KUVA NEED, kui scrollTop on jõudnud sinnani
let soundIframes = document.getElementsByClassName('sound-iframe')

for (let sound of soundIframes) {
  sound.innerHTML += sound.getAttribute('data-embed')
  sound.getElementsByTagName('iframe')[0].setAttribute('height', '150px')
  // HIDE SOUNDCLOUR IFRAME ELEMENTS
  sound.getElementsByTagName('iframe')[0].classList.add('d-none')
}



/////////// INIT CAROUSEL ///////////
initCarousel('slide-parent-abs', 'carousel-nav')


/////////// INIT IMAGE SLIDE ///////////
initImgSlider()



//////////// TOGGLE MOBILE NAVBAR /////////
let navToggler = document.getElementById('navbar-toggler');
let mobileDropdown = document.getElementById('navbar-mobile-dropdown')
navToggler.addEventListener('click', function () {
  if (mobileDropdown.classList.contains('close-nav')) {
    //mobileDropdown.classList.add('nav-open')
    mobileDropdown.classList.add('open-nav')
    mobileDropdown.classList.remove('close-nav')
    mobileDropdown.classList.remove('nav-closed')
  } else {
    mobileDropdown.classList.add('close-nav')
    mobileDropdown.classList.remove('open-nav')
    //mobileDropdown.classList.add('nav-closed')
    //mobileDropdown.classList.remove('nav-open')
  }
})

