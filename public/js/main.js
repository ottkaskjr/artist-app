console.log('main.js loaded');

let wrapperDiv = document.getElementById('document-wrapper');

// DETECT TRANSITION END ON DIFFERENT BROWSERS
function getTransitionEndEventName() {
  var transitions = {
      "transition"      : "transitionend",
      "OTransition"     : "oTransitionEnd",
      "MozTransition"   : "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
   }
  let wrapperStyle = wrapperDiv.style;
  for(let transition in transitions) {
      if(wrapperStyle[transition] != undefined) {
        
          return transitions[transition];
      } 
  }
}
// GET CLIENT BROWSER's transition end name
let transitionEndEventName = getTransitionEndEventName();



// FADE IN WRAPPER
wrapperDiv.classList.add('fadeInWrapper')

// DETECT WRAPPER TRANSITION END AND REMOVE IT
wrapperDiv.addEventListener(transitionEndEventName, function () {
  console.log('detected transition end')
  this.remove();
});


// init data-dismiss class
let dataDismiss = document.getElementsByClassName('data-dismiss')
for (let i = 0; i < dataDismiss.length; i++) {
  dataDismiss[i].addEventListener('click', function () {
    this.closest(".modal").classList.add('modal-closed')
  })
}


/////////// INIT SCROLLTOP ///////////
// get document height
let docHeight = document.body.clientHeight
let scrollTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', function () {
  let scrollTop = window.pageYOffset
  if (scrollTop > docHeight*0.25) {
    scrollTopBtn.style.display = 'block'
    scrollTopBtn.classList.remove('op-0')
    scrollTopBtn.classList.remove('fadeOut')
    scrollTopBtn.classList.add('fadeIn')
  } else {
    /*scrollTopBtn.style.display = 'none'*/
    scrollTopBtn.classList.add('fadeOut')
    scrollTopBtn.classList.remove('fadeIn')
  }
});

// DETECT SCROLL TO TOP TRANSITION END AND CHANGE DISPLAY
scrollTopBtn.addEventListener(transitionEndEventName, function () {
  // detect animation/transition end and display=none if btn has 'fadeOut' class
  if (this.classList.contains('fadeOut')) {
    this.style.display = 'none'
  }
  
});
/////////////////////////////////////////

////////// OPEN IMAGE SLIDER ////////////
let imgThumbs = document.getElementsByClassName('img-thumbnail')

for (let i = 0; i < imgThumbs.length; i++) {
  imgThumbs[i].addEventListener('click', function (e) {
    disableScroll();

    e.preventDefault()
    let imgID = this.getAttribute('data-id')
    openImgSlider(imgID)
    //console.log(this.href)
    
  })
}

////////// CLOSE IMAGE SLIDER ////////////
let imgCloseBtn = document.getElementById('close-img-slider')

imgCloseBtn.addEventListener('click', function () {
    //e.preventDefault()
    enableScroll()
    closeImgSlider()
    //console.log(this.href)
    // get both img-slider-bg and img-slider-fixed by their .fade-out classes and remove all the animations
    let fadeOut = document.getElementsByClassName('fade-out');
    for (let el of fadeOut) {
      el.addEventListener('animationend', function() {
        // this check ensures we run the code only on closing the slider
        if (this.classList.contains('fade-out')) {
          this.classList.add('d-none')
          this.classList.remove('fade-in-img-slider-content')
          this.classList.remove('fade-in-img-slider-bg')
          this.classList.remove('fade-out')
        }
      }, false);
    }
    
})
/*
el.addEventListener("animationend", function() {}, false);

imgSliderFixed.addEventListener(transitionEndEventName, function () {
  // detect animation/transition end and display=none if btn has 'fadeOut' class
  console.log('end')
  //this.style.display = 'none'
  
  
});*/