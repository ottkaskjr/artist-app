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
wrapperDiv.classList.add('fadeIn')

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


