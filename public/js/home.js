//////////// FIX DIVS WITH FLOAT IMAGES ////////////
let sectionImgs = document.querySelectorAll('.section-img');

setTimeout(() => {
  for (let img of sectionImgs) {
    let parentHeight = img.closest('.parent-container').offsetHeight;
    //img.closest('.parent-container').style.minHeight = img.offsetHeight + 'px'
    
    if ((img.offsetHeight + 100) > parentHeight) {
      /*
      let stretch = parentHeight + (img.offsetHeight - parentHeight);
      let buffer = 100
      stretch += buffer;
      console.log(stretch)
      */
      let fix = img.offsetHeight + 200
      img.closest('.parent-container').style.minHeight = fix + 'px'
    }
    //console.log(parentHeight)
    //console.log(img.offsetHeight)
    
  }
}, 500)


// display soundcloud iframes
// TEE DÜNAAMILISEKS, KUVA NEED, kui scrollTop on jõudnud sinnani
let soundIframes = document.getElementsByClassName('sound-iframe')

for (let sound of soundIframes) {
  sound.innerHTML += sound.getAttribute('data-embed')
  sound.getElementsByTagName('iframe')[0].setAttribute('height', '150px')
}

