let currentIndex = 0;
console.log(window.innerWidth)
let spd = window.innerWidth/28
let minSpd = 1
let interval = 4;
// Boolean for preventing slide change during animation
let canChangeSlide = true;

let Slides
let Navs

let slidesLength;
// auto change
const autoChange = () => {
  if (currentIndex == slidesLength - 1) {

    leftToRight(spd, Slides[0], Slides[currentIndex], Slides[0], Navs[0], 0)

  } else {

   let nextIndx = currentIndex + 1
    RightToLeft(spd, Slides[nextIndx], Slides[currentIndex], Slides[nextIndx], Navs[nextIndx], nextIndx)

  }
}


//let changeInterval = setInterval(autoChange, 5000);
let changeInterval

const initCarousel = (className, carouselNav) => {
  // GET SLIDE ELEMENTS
  
  // ADD slide elements to array
  createSlidesArr(className, carouselNav)

  // init bottom controls
  initBottomControls(Slides, Navs)

  // init arrows
  initLeftArrow('arrow-left');
  initRightArrow('arrow-right');

  // autochange
  //changeInterval = setInterval(autoChange, 5000);
  changeInterval = setInterval( function() { 
    
    autoChange(); 
  }, 2000 );
  
}



const createSlidesArr = (className, carouselNav) => {
  slidesLength = document.getElementsByClassName(className).length
  Slides = document.getElementsByClassName(className);
  Navs = document.getElementsByClassName(carouselNav);

  for (let i = 0; i < Slides.length; i++) {
    // SHOW FIRST SLIDE
    if (i === 0) {
      Slides[i].classList.remove('d-none')
      Navs[i].classList.add('current-nav')
    }
    
  }
}

const initBottomControls = (slideArray, Navs) => {
  for (let i = 0; i < slideArray.length; i++) {

    Navs[i].addEventListener('click', function () {
      if (canChangeSlide === true) {
        canChangeSlide = false;
        let index = this.getAttribute('data-slide')

        // compare current index to this index % prevent event on the same index
        if (currentIndex != index) {
          if (currentIndex < index) {
            RightToLeft(spd, slideArray[i], slideArray[currentIndex], slideArray[index], Navs[index], index)
          }
          if (currentIndex > index) {
            
            leftToRight(spd, slideArray[i], slideArray[currentIndex], slideArray[index], Navs[index], index)
          }

        }

      }
    })
  }
}
  
  
//}
// PROOVI IKKAGI TEHA ANIMATSIOONIGA, TEHES SLAIDID TERVE EKRAANI LAIUSEKS JA KASUTADES PUNKTIDEKS -100vw +100vw jne
const leftToRight = (spd, slide, otherSlide, newSlide, newNav, newIndx) => {
  document.getElementsByClassName('current-nav')[0].classList.remove('current-nav')
  
  // set new current slide and nav
  newSlide.classList.remove('d-none')
  newNav.classList.add('current-nav')
  currentIndex = parseInt(newIndx)

  // set autochange to zero
  clearInterval(changeInterval);
  changeInterval = setInterval(autoChange, 5000);

  //var w = window.innerWidth;
  let pos = -window.innerWidth
  let otherPos = 0
  slide.style.left = pos + 'px';
  //slide.classList.add('slide-left-to-right')
  let speed = spd;
  let id = setInterval(frame, interval);
  function frame() {
    if (pos >= 0) {
      slide.style.left = '0px';
      // hide last slide
      otherSlide.classList.add('d-none')
      // enable slide changing
      canChangeSlide = true;
      clearInterval(id);
    } else {
      pos = pos + speed;
      otherPos = otherPos + speed;
      //elem.style.top = pos + 'px';
      slide.style.left = pos + 'px';
      otherSlide.style.left = otherPos + 'px';
      if (speed > minSpd) {
        speed = speed * 0.98
      }
    }
  }
  
}

const RightToLeft = (spd, slide, otherSlide, newSlide, newNav, newIndx) => {

  document.getElementsByClassName('current-nav')[0].classList.remove('current-nav')
  // set new current slide and nav
  newSlide.classList.remove('d-none')
  newNav.classList.add('current-nav')
  currentIndex = parseInt(newIndx)

  // set autochange to zero
  clearInterval(changeInterval);
  changeInterval = setInterval(autoChange, 5000);

  //var w = window.innerWidth;
  let pos = window.innerWidth;
  let otherPos = 0
  slide.style.left = pos + 'px';
  //slide.classList.add('slide-left-to-right')
  let speed = spd;
  let id = setInterval(frame, interval);
  function frame() {
    if (pos <= 0) {
      slide.style.left = '0px';
      // hide last slide
      otherSlide.classList.add('d-none')
      // enable slide changing
      canChangeSlide = true;
      clearInterval(id);
    } else {
      pos = pos - speed;
      otherPos = otherPos - speed;
      //elem.style.top = pos + 'px';
      slide.style.left = pos + 'px';
      otherSlide.style.left = otherPos + 'px';

      if (speed > minSpd) {
        speed = speed * 0.98
      }
    }
  }
}

// left arrow
const initLeftArrow = (className) => {
  document.getElementsByClassName(className)[0].addEventListener('click', function () {
    if (canChangeSlide === true) {
      //console.log(currentIndex)
      //console.log(slidesLength)

      if (currentIndex == 0) {

        RightToLeft(spd, Slides[slidesLength - 1], Slides[currentIndex], Slides[slidesLength - 1], Navs[slidesLength - 1], slidesLength - 1)
    
      } else {
    
       let nextIndx = currentIndex - 1
       leftToRight(spd, Slides[nextIndx], Slides[currentIndex], Slides[nextIndx], Navs[nextIndx], nextIndx)
    
      }
    }
  })
}

// right arrow
const initRightArrow = (className) => {
  document.getElementsByClassName(className)[0].addEventListener('click', function () {
    if (canChangeSlide === true) {
      //console.log(currentIndex)
      //console.log(slidesLength)

      if (currentIndex == slidesLength - 1) {

        leftToRight(spd, Slides[0], Slides[currentIndex], Slides[0], Navs[0], 0)
    
      } else {
    
       let nextIndx = currentIndex + 1
        RightToLeft(spd, Slides[nextIndx], Slides[currentIndex], Slides[nextIndx], Navs[nextIndx], nextIndx)
    
      }
    }
  })
}