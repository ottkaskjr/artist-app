/////////////////////////////////////
//////////// INIT SLIDES ////////////
/////////////////////////////////////
let slidesContainer = document.getElementById('slides-container');
let slide_Containers = document.getElementsByClassName('slide-container')
let slideDivs = document.getElementsByClassName('slide-div')

for (let slide of slideDivs) {
  // set bg
  if (slide.getAttribute('data-bg') != '') {
    slide.style.backgroundImage = "url('/" + slide.getAttribute('data-bg') + "')"; 
  }
}


/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////

/////////////////////////////////////
////////// SWITCH MODULES ///////////
/////////////////////////////////////
let moduleSelect = document.getElementById('select-module');
let moduleSeletcOptions = document.querySelectorAll('#select-module option')


for (let option of moduleSeletcOptions) {
  // update moduleSelect data-module attribute upon page load
  if (option.selected === true) {
    moduleSelect.setAttribute('data-module', option.getAttribute('data-module'))
  }
}

moduleSelect.addEventListener('change', function () {
  // update moduleSelect data-module attribute upon click
  moduleSelect.setAttribute('data-module', this.value)
  let otherVal = this.value === 'concerts' ? 'news' : 'concerts'
  document.getElementById(this.value + '-items').classList.remove('d-none')
  document.getElementById(otherVal + '-items').classList.add('d-none')
})



/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////

/////////////////////////////////////
////////// UPDATE CAROUSEL //////////
/////////////////////////////////////
document.getElementById('save-carousel').addEventListener('click', function () {
  let hidden_car = document.getElementById('hide-carousel-section').checked;

  let btn = this;

  let Data = {
    btn,
    section: 'carousel',
    hidden_car
  }
  postData(Data)
})



/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////

/////////////////////////////////////
/////////// UPDATE SLIDE ////////////
/////////////////////////////////////


const updateSaveSlideBtns = (className) => {

  let saveSlideBtns = document.getElementsByClassName(className)

  for (let btn of saveSlideBtns) {
    btn.addEventListener('click', function () {
      //let hidden_car = document.getElementById('hide-carousel-section').checked;
    
      let btn = this;
      let slide_id = this.getAttribute('data-id')
      let module_id = this.getAttribute('data-module-id')

      let Data = {
        btn,
        section: 'slide',
        module_id,
        slide_id

      }
      postData(Data)
    })
  }

}

updateSaveSlideBtns('save-slide')


/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////


/////////////////////////////////////
///////////// ADD SLIDE /////////////
/////////////////////////////////////



/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////



