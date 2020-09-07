
/////////// INIT IMG SLIDER ///////////
let imageSlides = document.getElementsByClassName('img-slider-img')
let imageData = []
let currentImage;
const initImgSlider = () => {
  
  for (let img of imageSlides) {

    imageData.push({
      loc: img.getAttribute('data-loc'),
      date: img.getAttribute('data-date'),
      author: img.getAttribute('data-author'),
      desc: img.getAttribute('data-desc')
    })
  }

  initImageLeft()
  initImageRight()

}

/////////// OPEN IMG SLIDER ///////////
let sliderBgOverlay = document.getElementById('img-slider-bg')
let imgSliderFixed = document.getElementById('img-slider-fixed')
// arrows
let leftImgArrow = document.getElementById('img-arrow-left')
let rightImgArrow = document.getElementById('img-arrow-right')
// data attributes
let sliderLoc = document.getElementById('img-slider-loc')
let sliderDate = document.getElementById('img-slider-date')
let sliderAut = document.getElementById('img-slider-author')
let sliderDesc = document.getElementById('img-slider-desc')

const openImgSlider = (imgID) => {
  sliderBgOverlay.classList.remove('d-none')
  sliderBgOverlay.classList.add('fade-in-img-slider-bg')

  imgSliderFixed.classList.remove('d-none')
  imgSliderFixed.classList.add('fade-in-img-slider-content')

  // open clicked img + img info
  let img = document.getElementById('img-slider-img-' + imgID)
  let indx = img.getAttribute('data-index')
  img.classList.remove('d-none')
  sliderLoc.innerHTML = img.getAttribute('data-loc')
  sliderDate.innerHTML = img.getAttribute('data-date')
  sliderAut.innerHTML = img.getAttribute('data-author')
  sliderDesc.innerHTML = img.getAttribute('data-desc')

  // set arrows data attributes
  indx = parseInt(indx)
  let prevIndx = indx - 1 < 0 ? imageSlides.length - 1 : indx - 1;
  let nextIndx = indx + 1 > imageSlides.length - 1 ? 0 : indx + 1;
  leftImgArrow.setAttribute('data-index', prevIndx)
  rightImgArrow.setAttribute('data-index',nextIndx)
}

/////////// CLOSE IMG SLIDER ///////////
const closeImgSlider = () => {
  //sliderBgOverlay.classList.remove('d-none')
  sliderBgOverlay.classList.add('fade-out')

  //imgSliderFixed.classList.remove('d-none')
  imgSliderFixed.classList.add('fade-out')

  // hide opened img + img info
  closeImages()
  sliderLoc.innerHTML = ''
  sliderDate.innerHTML = ''
  sliderAut.innerHTML = ''
  sliderDesc.innerHTML = ''
}

///// get opened img /////
const closeImages = () => {
  for (let img of imageSlides) {
    if (!img.classList.contains('d-none')) {
      img.classList.add('d-none')
    }
  }
}

/////// LEFT ARROW //////
const initImageLeft = () => {
  leftImgArrow.addEventListener('click', function () {
    let prevIndx = this.getAttribute('data-index')
    prevIndx = parseInt(prevIndx)
    //let currentIndx = prevIndx + 1 > imageSlides.length - 1 ? 0 : prevIndx + 1;
    // close current img
    closeImages()
    // open clicked img + img info
    //let img = document.getElementById('img-slider-img-' + imgID)
    imageSlides[prevIndx].classList.remove('d-none')
    //let indx = img.getAttribute('data-index')
    // add new data-index to left arrow
    prevIndx = parseInt(prevIndx)
    let newIndx = prevIndx - 1 < 0 ? imageSlides.length - 1 : prevIndx - 1;
    // change right arrow indx
    rightImgArrow.setAttribute('data-index', prevIndx)
    this.setAttribute('data-index', newIndx)
    sliderLoc.innerHTML = imageSlides[prevIndx].getAttribute('data-loc')
    sliderDate.innerHTML = imageSlides[prevIndx].getAttribute('data-date')
    sliderAut.innerHTML = imageSlides[prevIndx].getAttribute('data-author')
    sliderDesc.innerHTML = imageSlides[prevIndx].getAttribute('data-desc')
  })
}
/////// RIGHT ARROW //////
const initImageRight = () => {
  rightImgArrow.addEventListener('click', function () {
    let nextIndx = this.getAttribute('data-index')
    nextIndx = parseInt(nextIndx)
    //let currentIndx = prevIndx + 1 > imageSlides.length - 1 ? 0 : prevIndx + 1;
    // close current img
    closeImages()
    // open clicked img + img info
    //let img = document.getElementById('img-slider-img-' + imgID)
    imageSlides[nextIndx].classList.remove('d-none')
    //let indx = img.getAttribute('data-index')
    // add new data-index to left arrow
    nextIndx = parseInt(nextIndx)
    let newIndx = nextIndx + 1 > imageSlides.length - 1 ? 0 : nextIndx + 1;
    // change right arrow indx
    leftImgArrow.setAttribute('data-index', nextIndx)
    this.setAttribute('data-index', newIndx)
    sliderLoc.innerHTML = imageSlides[nextIndx].getAttribute('data-loc')
    sliderDate.innerHTML = imageSlides[nextIndx].getAttribute('data-date')
    sliderAut.innerHTML = imageSlides[nextIndx].getAttribute('data-author')
    sliderDesc.innerHTML = imageSlides[nextIndx].getAttribute('data-desc')
  })
}

// HIDE/SHOW NAVBAR ON SCROLL
let navDiv = document.getElementById('navbar-div')
let lastScrollY = window.pageYOffset;

window.onscroll = function () {
  document.getElementsByTagName('html')[0].style.scrollBehavior = 'smooth'

  // FIRST CHECK IF WINDOW SCROLLTOP IS BELOW THE CLIENT SCREEN HEIGHT
  if (window.pageYOffset > window.innerHeight) {
    // CHECK IF MOBILE NAVBAR ITEMS ARE CLOSED
    if (mobileDropdown.classList.contains('close-nav')) {
      // IF SCROLLTOP IS BELOW OR ABOVE THE LAST SCROLL POSITION
      if (window.pageYOffset > lastScrollY) {
        //console.log('hide')
        navDiv.classList.remove('show-nav')
        navDiv.classList.add('hide-nav')
      } else if (window.pageYOffset <= lastScrollY) {
        navDiv.classList.remove('hide-nav')
        navDiv.classList.add('show-nav')
      }
    }
  }
  

  lastScrollY = window.pageYOffset;
}


const disableScroll = () => { 
	// Get the current page scroll position 
	scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, 
  
		// if any scroll is attempted, set this to the previous value 
		window.onscroll = function(e) { 
      document.getElementsByTagName('html')[0].style.scrollBehavior = 'auto'
      window.scrollTo(scrollLeft, scrollTop); 
    }; 
} 

const enableScroll = () => { 
	window.onscroll = function() {
    document.getElementsByTagName('html')[0].style.scrollBehavior = 'smooth'
    // RE-ENABLE NAVBAR TOGGLE
    // FIRST CHECK IF WINDOW SCROLLTOP IS BELOW THE CLIENT SCREEN HEIGHT
  if (window.pageYOffset > window.innerHeight) {
    // CHECK IF MOBILE NAVBAR ITEMS ARE CLOSED
    if (mobileDropdown.classList.contains('close-nav')) {
      // IF SCROLLTOP IS BELOW OR ABOVE THE LAST SCROLL POSITION
      if (window.pageYOffset > lastScrollY) {
        //console.log('hide')
        navDiv.classList.remove('show-nav')
        navDiv.classList.add('hide-nav')
      } else if (window.pageYOffset <= lastScrollY) {
        navDiv.classList.remove('hide-nav')
        navDiv.classList.add('show-nav')
      }
    }
  }
  

  lastScrollY = window.pageYOffset;
  }; 
} 
