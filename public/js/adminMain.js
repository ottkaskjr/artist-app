////////////////////////////////////////////////////
////// fix broken links (remove whitespaces, ///////
///////////// line breaks and tabs) ////////////////
////////////////////////////////////////////////////
let divs = document.querySelectorAll('.navbar-menu-item');

for (let div of divs) {
  let a = div.firstChild;
  let href = a.getAttribute('href')
  href = href.replace(/\s/g,'')
  a.setAttribute('href', href)
}

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////


////////////////////////////////////////////////////
////////////// TOGGLE NAVBAR PANEL /////////////////
////////////////////////////////////////////////////

document.querySelector('.navbar-toggle-icon a').addEventListener('click', function () {

  document.querySelector('.navbar-panel-parent').classList.toggle('navbar-panel-closed')

})

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

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
