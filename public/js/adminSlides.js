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

const initSlides = (select_module, concerts_items, news_items, select_concert, select_article) => {

let moduleSelects = document.getElementsByClassName(select_module);
//let moduleSelectOptions = document.querySelectorAll('.select-module')
let moduleItemDivs = [concerts_items, news_items]
let moduleItemSelects = [select_concert, select_article]


// update moduleSelect data-module attribute upon page load
/*
for (let option of moduleSelectOptions) {
  if (option.selected === true) {
    document.closest('.select-module').setAttribute('data-module', option.getAttribute('data-module'))
  }
}
*/

for (let select of moduleSelects) {
  let options = select.getElementsByTagName('option')
  for (let option of options) {
    if (option.selected === true) {
      let dataModule = option.getAttribute('data-module') != null ? option.getAttribute('data-module') : 'concerts';
      option.closest('.select-module').setAttribute('data-module', dataModule)
    }
  }
}

// update moduleSelect data-module attribute upon click
for (let select of moduleSelects) {
  //console.log(select.getAttribute('id'), 'a')
  let slide_id = select.getAttribute('id').replace('select-module-', '')
  console.log(slide_id)
  select.addEventListener('change', function () {
    this.setAttribute('data-module', this.value)
    let otherVal = this.value === 'concerts' ? 'news' : 'concerts'
    document.getElementById(this.value + '-items-' + slide_id).classList.remove('d-none-admin')
    document.getElementById(otherVal + '-items-' + slide_id).classList.add('d-none-admin')
  
    changeItem(moduleItemDivs, moduleItemSelects);
  })
}


// change event for module item select input

for (let itemSelect of moduleItemSelects) {
  
  for (let select of document.getElementsByClassName(itemSelect)) {
    
    select.addEventListener('change', function () {
      changeItem(moduleItemDivs, moduleItemSelects);
    })
  }
  
}
} // init slides end
initSlides('select-module', 'concerts-items', 'news-items', 'select-concert', 'select-article')

// function for changing module item
const changeItem = (itemDivs, itemSelects) => {
  for (let i = 0; i < itemDivs.length; i++) {
    for (let item of document.getElementsByClassName(itemDivs[i])) {
      //console.log(item)
      // only check for the showing item select
    //let div = document.getElementById(moduleItemDivs[i])
    let slide_id = item.getAttribute('data-id')
    if (!item.classList.contains('d-none-admin')) {
      let idQuery = itemSelects[i];
      if (idQuery.includes('-new')) {
        //idQuery = idQuery.replace('-new', '')
        idQuery = idQuery.slice(0, idQuery.indexOf('-new'))
      }
      console.log(idQuery)
      console.log(slide_id)
      let moduleItemOptions = document.querySelectorAll('#' + /*itemSelects[i]*/idQuery + '-' + slide_id +' option')
      

      for (let option of moduleItemOptions) {
        if (option.selected === true) {

         changeSlidePreview(
          option.getAttribute('data-slide-id'),
          option.getAttribute('data-module-id'),
          option.getAttribute('data-module'),
          option.getAttribute('data-img'),
          option.getAttribute('data-heading'),
          option.getAttribute('data-heading-eng')
         )
         
        }
      }
    }
  }
  }
}

const changeSlidePreview = (slide_id, module_id, module, img, heading, heading_eng) => {
  let btn = document.getElementById('save-slide-' + slide_id)
  // SLIDE
  // img
  // if item is missing an image, pick automatic replacement
  let imgReplacement = module === 'concerts' ? '71ixag68wke5es2wk.jpeg' : '71ixag68wke5es2wp.jpeg';
  let imgUrl = img != "" ? "url('/" + img + "')" : "url('/" + imgReplacement + "')"
  document.getElementById('slide-' + slide_id).style.backgroundImage = imgUrl;
  //btn.setAttribute('data-img', img)
  // heading
  document.getElementById('slide-heading-' + slide_id).innerHTML = heading;
  // clear subheading
  //  document.getElementById('1-slide-subheading-' + slide_id).innerHTML = ''
  //  document.getElementById('2-slide-subheading-' + slide_id).innerHTML = ''
  
  // EDIT SECTION
  // heading
  document.getElementById('slide-heading-input-' + slide_id).value = heading;
  document.getElementById('slide-heading-input-' + slide_id + '-eng').value = heading_eng;

  // replace img with imgReplacement if img === ''
  if (img === '') {
    img = imgReplacement
  }

  // BUTTON
  updateBtnAttributes(btn, module_id, module, img, heading, heading_eng)
}

// update save btn attributes function
const updateBtnAttributes = (btn, module_id, module, img, heading, heading_eng) => {
  btn.setAttribute('data-module-id', module_id)
  btn.setAttribute('data-module', module)
  btn.setAttribute('data-img', img)

}


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
      let module = this.getAttribute('data-module')
      let img = this.getAttribute('data-img')
      let heading = document.getElementById('slide-heading-input-' + slide_id).value
      let heading_eng = document.getElementById('slide-heading-input-' + slide_id + '-eng').value
      let content_pos = document.getElementById('slide-content-pos-' + slide_id).value
      let subHeadings = [document.getElementById('1-slide-subheading-input-' + slide_id).value, document.getElementById('2-slide-subheading-input-' + slide_id).value]
      let subHeadings_eng = [document.getElementById('1-slide-subheading-input-' + slide_id + '-eng').value, document.getElementById('2-slide-subheading-input-' + slide_id + '-eng').value]
      let text_size = document.getElementById('slide-text-size-' + slide_id).value
      let text_color = document.getElementById('slide-text-color-' + slide_id).value
      let button = document.getElementById('slide-btn-input-' + slide_id).value
      let button_eng = document.getElementById('slide-btn-input-' + slide_id + '-eng').value
      let button_color = document.getElementById('slide-btn-color-' + slide_id).value
      let button_bg = document.getElementById('slide-btn-bg-' + slide_id).value
      let hidden = document.getElementById('hide-slide-' + slide_id).checked
      let overlay = document.getElementById('slide-bg-overlay-' + slide_id).value

      console.log(slide_id)

      let Data = {
        btn,
        section: 'slide',
        module_id,
        slide_id,
        module,
        bg: img,
        heading,
        heading_eng,
        content_pos,
        subHeadings,
        subHeadings_eng,
        text_size,
        text_color,
        button,
        button_eng,
        button_color,
        button_bg,
        hidden,
        overlay
      }
      postData(Data)
    })
  }

}

updateSaveSlideBtns('save-slide')

// UPDATE SLIDE PREVIEW
// update upon page load

// function for applying font-size style
const updateTextSize = (id) => {
  let sizeNum = document.getElementById('slide-text-size-' + id).value;
  let redSize = sizeNum - 30;
  document.getElementById('slide-heading-' + id).style.fontSize = sizeNum.toString() + '%'
  document.getElementById('1-slide-subheading-' + id).style.fontSize = redSize.toString() + '%'
  document.getElementById('2-slide-subheading-' + id).style.fontSize = redSize.toString() + '%'
  
  document.getElementById('slide-text-size-' + id).addEventListener('input', function () {
    // cap value
    let sizeNumEvent = this.value;
    
    // max 
    if (sizeNumEvent > parseInt(this.getAttribute('max'))) this.value = parseInt(this.getAttribute('max'))

    let redSizeEvent = sizeNumEvent - 30;

    document.getElementById('slide-heading-' + id).style.fontSize = sizeNumEvent.toString() + '%'
    document.getElementById('1-slide-subheading-' + id).style.fontSize = redSizeEvent.toString() + '%'
    document.getElementById('2-slide-subheading-' + id).style.fontSize = redSizeEvent.toString() + '%'
  })
  
}

// function for applying content font color style
const updateTextColor = (id) => {
  let startColor = document.getElementById('slide-text-color-' + id).value;
  document.getElementById('slide-heading-' + id).style.color = startColor
  document.getElementById('1-slide-subheading-' + id).style.color = startColor
  document.getElementById('2-slide-subheading-' + id).style.color = startColor
  
  document.getElementById('slide-text-color-' + id).addEventListener('input', function () {
    let newColor = this.value;

    document.getElementById('slide-heading-' + id).style.color = newColor
    document.getElementById('1-slide-subheading-' + id).style.color = newColor
    document.getElementById('2-slide-subheading-' + id).style.color = newColor
  })
  
}

// function for applying button text color style
const updateBtnTxtColor = (id) => {
  let startColor = document.getElementById('slide-btn-color-' + id).value;
  document.querySelector('.slide-button-' + id).style.color = startColor
  
  document.getElementById('slide-btn-color-' + id).addEventListener('input', function () {
    let newColor = this.value;
    document.querySelector('.slide-button-' + id).style.color = newColor
  })
  
}

// function for applying button bg color style
const updateBtnBg = (id) => {
  let startColor = document.getElementById('slide-btn-bg-' + id).value;
  document.querySelector('.slide-button-' + id).style.background = startColor
  
  document.getElementById('slide-btn-bg-' + id).addEventListener('input', function () {
    let newColor = this.value;
    document.querySelector('.slide-button-' + id).style.background = newColor
  })
  
}



const updateSlideLive = (className) => {
  let saveSlideButtons = document.getElementsByClassName(className)
  let ids = []
  for (let btn of saveSlideButtons) {
    ids.push(btn.getAttribute('data-id'))
  }
  for (let i = 0; i < ids.length; i++) {
    // OVERLAY RANGE SLIDER
    updateOverlay('slide-overlay-' + ids[i]);
    updateSlider('slide-bg-overlay-' + ids[i], 'slider-output-' + ids[i], 'slide-overlay-' + ids[i])

    // TEXT-CONTENT-POSITION
    document.getElementById('slide-content-pos-' + ids[i]).addEventListener('change', function () {
      let content = document.getElementById('slide-content-' + ids[i])
      let positions =  ['l', 'c', 'r'];
      for (let pos of positions) {
        content.classList.remove('abs-' + pos)
        content.classList.remove('txt-' + pos)
      }
      content.classList.add('abs-' + this.value.charAt(0))
      content.classList.add('txt-' + this.value.charAt(0))
    })

    // HEADING
    document.getElementById('slide-heading-input-' + ids[i]).addEventListener('input', function () {
      document.getElementById('slide-heading-' + ids[i]).innerHTML = this.value
    })

    // SUBHEADINGS
    document.getElementById('1-slide-subheading-input-' + ids[i]).addEventListener('input', function () {
      document.getElementById('1-slide-subheading-' + ids[i]).innerHTML = this.value
    })
    document.getElementById('2-slide-subheading-input-' + ids[i]).addEventListener('input', function () {
      document.getElementById('2-slide-subheading-' + ids[i]).innerHTML = this.value
    })

    // TEXT SIZE
    updateTextSize(ids[i])

    // TEXT COLOR
    updateTextColor(ids[i])

    // BUTTON TEXT
    document.getElementById('slide-btn-input-' + ids[i]).addEventListener('input', function () {
      document.querySelector('.slide-button-' + ids[i]).innerHTML = this.value
    })

    // BUTTON TEXT COLOR
    updateBtnTxtColor(ids[i])

    // BUTTON BG COLOR
    updateBtnBg(ids[i])
  }
}
updateSlideLive('save-slide')




/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////

/////////////////////////////////////
/////////// REMOVE SLIDE ////////////
/////////////////////////////////////

const updateRemoveSlideBtns = (className) => {
  let removeBtns = document.getElementsByClassName(className);

  for (let btn of removeBtns) {

    btn.addEventListener('click', function () {
      let slide_id = this.getAttribute('data-id')
      let btn = this;

      let Data = {
        btn,
        slide_id,
        section: 'remove-slide'
      }

      postData(Data)
    })
    


    //document.getElementById('slide-container-' + id).remove()
  }
}
updateRemoveSlideBtns('remove-slide')

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////


/////////////////////////////////////
///////////// ADD SLIDE /////////////
/////////////////////////////////////

document.getElementById('add-slide').addEventListener('click', function () {
  let btn = this;

  let Data = {
    btn,
    section: 'add-slide'
  }

  postData(Data)
})

let slideNum = 0
// CREATE SLIDE FUNCTION
const createSlide = (slide_id, modules) => {
  let slides_container = document.getElementById('slides-container');
  
  // create slide container
  let slide_container = document.createElement('DIV')
  slide_container.setAttribute('id', 'slide-container-' + slide_id)
  slide_container.classList.add('slide-container', 'edit-container', 'mb-2')

  // create slide preview & append to slide_container
  let slide = document.createElement('DIV');
  slide.setAttribute('id', 'slide-' + slide_id);
  slide.setAttribute('data-bg', '');
  slide.classList.add('slide-div', 'mt-1')
  slide_container.append(slide)

  // create slide overlay & append to slide
  let slide_overlay = document.createElement('DIV');
  slide_overlay.setAttribute('id', 'slide-overlay-' + slide_id);
  slide_overlay.setAttribute('data-overlay', '0');
  slide_overlay.classList.add('slide-overlay')
  slide.append(slide_overlay)

  // create slide content & append to slide
  let slide_content = document.createElement('DIV');
  slide_content.setAttribute('id', 'slide-content-' + slide_id);
  slide_content.classList.add('slide-content', 'abs-l', 'txt-l')
  slide.append(slide_content)

  // create slide content div & append to slide_content
  let slide_content_div = document.createElement('DIV');
  slide_content.append(slide_content_div)

  // create slide heading div & append to slide_content_div
  let slide_heading = document.createElement('DIV');
  let head_p = document.createElement('P')
  head_p.setAttribute('id', 'slide-heading-' + slide_id);
  head_p.classList.add('slide-heading')
  slide_heading.append(head_p)
  slide_content_div.append(slide_heading)

  // create slide subheading div & append to slide_content_div
  let slide_subheadings = document.createElement('DIV');
  let sub_p_1 = document.createElement('P')
  sub_p_1.setAttribute('id', '1-slide-subheading-' + slide_id);
  sub_p_1.classList.add('slide-subheading')
  let sub_p_2 = document.createElement('P')
  sub_p_2.setAttribute('id', '2-slide-subheading-' + slide_id);
  sub_p_2.classList.add('slide-subheading')
  slide_subheadings.append(sub_p_1)
  slide_subheadings.append(sub_p_2)
  slide_content_div.append(slide_subheadings)

  // create slide button div & append to slide_content_div
  let slide_button = document.createElement('DIV');
  let btn = document.createElement('BUTTON')
  btn.classList.add('slide-button', 'slide-button-' + slide_id)
  btn.innerHTML = 'Loe veel'
  slide_button.append(btn)
  slide_content_div.append(slide_button)

  /////////////////////////////////////
  //////////// EDIT SLIDE /////////////
  /////////////////////////////////////

  // create edit_slide_div & append to slide_container
  let edit_slide_div = document.createElement('DIV')
  edit_slide_div.classList.add('edit-slide-div', 'my-2')
  slide_container.append(edit_slide_div)

  // create edit_overlay & append to edit_slide_div
  let edit_overlay = document.createElement('DIV')
  edit_slide_div.append(edit_overlay)

  // create edit_overlay p & append to edit_overlay
  let overlay_p = document.createElement('P')
  overlay_p.innerHTML = '*Korrigeeri pildi heledust, et parandada teksti loetavust'
  edit_overlay.append(overlay_p)

  // create range_slider & append to edit_overlay
  let range_slider = document.createElement('DIV')
  range_slider.classList.add('range-slider-m')
  edit_overlay.append(range_slider)

  // create slider_label & append to range_slider
  let slider_label = document.createElement('LABEL')
  slider_label.setAttribute('for', 'slide-bg-overlay-' + slide_id)
  slider_label.innerHTML = 'Pildi heledus'
  range_slider.append(slider_label)

  // create slider_input & append to slider_label
  let slider_input = document.createElement('INPUT')
  slider_input.setAttribute('type', 'range')
  slider_input.setAttribute('min', '-100')
  slider_input.setAttribute('max', '100')
  slider_input.setAttribute('value', '0')
  slider_input.setAttribute('id', 'slide-bg-overlay-' + slide_id)
  slider_input.classList.add('slider')
  slider_label.append(slider_input)

  // create slider_output_div & append to range_slider
  let slider_output_div = document.createElement('DIV')
  range_slider.append(slider_output_div)

  // create slider_output p & append to slider_output_div
  let slider_output = document.createElement('P')
  slider_output.setAttribute('id', 'slider-output-' + slide_id)
  slider_output_div.append(slider_output)

  //////////// MODULES ////////////

  // create module_currently_div & append to edit_slide_div
  let module_currently_div = document.createElement('DIV')
  edit_slide_div.append(module_currently_div)

  // create module_currently_p & append to module_currently_div
  let module_currently_p = document.createElement('P')
  module_currently_p.innerHTML = "Aktiivne: <span id='active-module-" + slide_id + "'></span> - <span id='active-item-" + slide_id + "'></span>"
  module_currently_div.append(module_currently_p)

  // create edit_module_div & append to edit_slide_div
  let edit_module_div = document.createElement('DIV')
  edit_slide_div.append(edit_module_div)

  // create select_module_label & append to edit_module_div
  let select_module_label = document.createElement('LABEL')
  select_module_label.setAttribute('for', 'select-module-' + slide_id)
  select_module_label.innerHTML = 'Moodul '
  edit_module_div.append(select_module_label)

  // create select_module_select & append to edit_module_div
  let select_module_select = document.createElement('SELECT')
  select_module_select.classList.add('hover-pointer', 'select-module', 'select-module-new' + slideNum)
  select_module_select.setAttribute('id', 'select-module-' + slide_id)
  select_module_select.setAttribute('data-module', 'concerts')
  select_module_select.setAttribute('name', 'module')
  edit_module_div.append(select_module_select)

  // create module_options & append to select_module_select
  // #1
  let option_dis = document.createElement('OPTION');
  option_dis.innerHTML = 'Vali moodul'
  option_dis.setAttribute('value', '')
  option_dis.disabled = true
  option_dis.selected = true
  select_module_select.append(option_dis)
  // #...
  for (let module of modules) {
    let option_module = document.createElement('OPTION');
    option_module.innerHTML = module.name_est_plur
    option_module.setAttribute('data-module', module.name)
    option_module.setAttribute('value', module.name)
    select_module_select.append(option_module)
  }

  // create module_item_span & append to edit_module_div
  for (let i = 0; i < modules.length; i++) {
    
    //let d_none = i === 0 ? '' : 'd-none-admin';
    let module_item_span = document.createElement('SPAN');
    module_item_span.setAttribute('id', modules[i].name +'-items-' + slide_id)
    module_item_span.setAttribute('data-id', slide_id)
    module_item_span.classList.add(modules[i].name +'-items', modules[i].name +'-items-new'  + slideNum , 'd-none-admin')
    /*
    if (d_none === '') {
      module_item_span.classList.add(modules[i].name +'-items')
    } else {
      module_item_span.classList.add(modules[i].name +'-items', d_none)
    }
    */
    edit_module_div.append(module_item_span)

    // create module_item_span_label & append to module_item_span
    let module_item_span_label = document.createElement('LABEL');
    module_item_span_label.innerHTML = modules[i].name_est_sing + ':'
    module_item_span_label.classList.add('ml-1')
    module_item_span_label.setAttribute('for', 'select-' + modules[i].name_sing)
    module_item_span.append(module_item_span_label)

    // create module_item_span_select & append to module_item_span
    let module_item_span_select = document.createElement('SELECT')
    module_item_span_select.classList.add('hover-pointer', 'select-' + modules[i].name_sing, 'select-' + modules[i].name_sing + '-new'  + slideNum)
    module_item_span_select.setAttribute('id', 'select-' + modules[i].name_sing + '-' + slide_id)
    module_item_span_select.setAttribute('name', 'module')
    module_item_span.append(module_item_span_select)

    // create module_item_span_options & append to module_item_span_select
    for (let item of modules[i].items) {
      let module_item_span_option = document.createElement('OPTION');
      module_item_span_option.innerHTML = item.heading
      module_item_span_option.setAttribute('value', '')
      module_item_span_option.setAttribute('data-module-id', item.module_id)
      module_item_span_option.setAttribute('data-module', modules[i].name)
      module_item_span_option.setAttribute('data-slide-id', slide_id)
      module_item_span_option.setAttribute('data-img', item.img)
      module_item_span_option.setAttribute('data-heading', item.heading)
      module_item_span_option.setAttribute('data-heading-eng', item.heading_eng)

      module_item_span_select.append(module_item_span_option)
    }
  }
  
  //////////// CONTENT POSITION ////////////

  // create content_pos_div & append to edit_slide_div
  let content_pos_div = document.createElement('DIV')
  content_pos_div.classList.add('mt-2')
  edit_slide_div.append(content_pos_div)

  // create content_pos_label & append to content_pos_div
  let content_pos_label = document.createElement('LABEL');
  content_pos_label.innerHTML = 'Asetus '
  content_pos_label.setAttribute('for', 'slide-content-pos-' + slide_id)
  content_pos_div.append(content_pos_label)

  // create content_pos_select & append to content_pos_label
  let content_pos_select = document.createElement('SELECT')
  content_pos_select.classList.add('hover-pointer')
  content_pos_select.setAttribute('id', 'slide-content-pos-' + slide_id)
  content_pos_select.setAttribute('name', 'content_pos')
  content_pos_select.setAttribute('data-value', 'left')
  content_pos_label.append(content_pos_select)

  // create content_pos_options & append to content_pos_select
  let pos = ['Vasakul', 'Keskel', 'Paremal']
  let posValues = ['left', 'center', 'right']
  for (let i = 0; i < 3; i++) {
    let content_pos_option = document.createElement('OPTION');
      content_pos_option.innerHTML = pos[i]
      if (i === 0) content_pos_option.selected = true
      content_pos_option.setAttribute('value', posValues[i])
      content_pos_select.append(content_pos_option)
  }

  //////////// HEADING ////////////

  // create edit_heading_div & append to edit_slide_div
  let edit_heading_div = document.createElement('DIV')
  edit_heading_div.classList.add('my-3', 'edit-section')
  edit_slide_div.append(edit_heading_div)

  // create edit_heading_est & append to edit_heading_div
  let edit_heading_est = document.createElement('DIV')
  edit_heading_est.classList.add('mb-1', 'est')
  edit_heading_div.append(edit_heading_est)

  // create edit_heading_label & append to edit_heading_est
  let edit_heading_label = document.createElement('DIV')
  edit_heading_label.innerHTML = 'Pealkiri'
  edit_heading_label.setAttribute('for', 'slide-heading-input-' + slide_id)
  edit_heading_est.append(edit_heading_label)

  // create edit_heading_input & append to edit_heading_label
  let edit_heading_input = document.createElement('INPUT')
  edit_heading_input.setAttribute('id', 'slide-heading-input-' + slide_id)
  edit_heading_input.setAttribute('type', 'text')
  edit_heading_input.setAttribute('name', 'heading')
  edit_heading_input.setAttribute('data-preview', 'heading-preview')
  edit_heading_input.setAttribute('placeholder', 'Pealkiri')
  edit_heading_input.setAttribute('value', '')
  edit_heading_label.append(edit_heading_input)


  // create edit_heading_eng & append to edit_heading_div
  let edit_heading_eng = document.createElement('DIV')
  edit_heading_eng.classList.add('mb-1', 'est')
  edit_heading_div.append(edit_heading_eng)

  // create edit_heading_label_eng & append to edit_heading_eng
  let edit_heading_label_eng = document.createElement('DIV')
  edit_heading_label_eng.innerHTML = 'Title'
  edit_heading_label_eng.setAttribute('for', 'slide-heading-input-' + slide_id + '-eng')
  edit_heading_eng.append(edit_heading_label_eng)

  // create edit_heading_input_eng & append to edit_heading_label_eng
  let edit_heading_input_eng = document.createElement('INPUT')
  edit_heading_input_eng.setAttribute('id', 'slide-heading-input-' + slide_id + '-eng')
  edit_heading_input_eng.setAttribute('type', 'text')
  edit_heading_input_eng.setAttribute('name', 'heading_eng')
  edit_heading_input_eng.setAttribute('placeholder', 'Heading')
  edit_heading_input_eng.setAttribute('value', '')
  edit_heading_label_eng.append(edit_heading_input_eng)

  //////////// SUBHEADINGS ////////////

  // create edit_subheadings_div & append to edit_slide_div
  let edit_subheadings_div = document.createElement('DIV')
  edit_subheadings_div.classList.add('edit-section', 'my-3')
  edit_slide_div.append(edit_subheadings_div)

  // create 2 edit_subheadings & append to edit_subheadings_div
  for (let i = 1; i < 3; i++) {
    let mt_2 = i === 2 ? 'mt-2' : '';
    // est
    // create edit_subheading_est & append to edit_subheadings_div
    let edit_subheading_est = document.createElement('DIV')
    edit_subheading_est.classList.add('est', 'mb-1','mt_2')
    edit_subheadings_div.append(edit_subheading_est)
    // create edit_subheading_est_p & append to edit_subheading_est
    if (i === 1) {
      let edit_subheading_est_p = document.createElement('P')
      edit_subheading_est_p.innerHTML = 'Alapealkirja eemaldamiseks kustuta väli'
      edit_subheading_est.append(edit_subheading_est_p)
    }
    
    // create edit_subheading_est_label & append to edit_subheading_est
    let edit_subheading_est_label = document.createElement('LABEL')
    edit_subheading_est_label.innerHTML = 'Alapealkiri ' + i + ' '
    edit_subheading_est_label.setAttribute('for', i + '-slide-subheading-input-' + slide_id)
    edit_subheading_est.append(edit_subheading_est_label)
    // create edit_subheading_est_input & append to edit_subheading_est_label
    let edit_subheading_est_input = document.createElement('INPUT')
    edit_subheading_est_input.setAttribute('id', i + '-slide-subheading-input-' + slide_id)
    edit_subheading_est_input.setAttribute('type', 'text')
    edit_subheading_est_input.setAttribute('name', 'subheading')
    edit_subheading_est_input.setAttribute('data-preview', 'subheading-preview')
    edit_subheading_est_input.setAttribute('placeholder', 'Kava/esinejad/tsitaat jms')
    edit_subheading_est_input.setAttribute('value', '')
    edit_subheading_est_label.append(edit_subheading_est_input)

    // eng
    // create edit_subheading_eng & append to edit_subheadings_div
    let edit_subheading_eng = document.createElement('DIV')
    edit_subheading_eng.classList.add('eng', 'mb-1')
    edit_subheadings_div.append(edit_subheading_eng)
    // create edit_subheading_eng_label & append to edit_subheading_eng
    let edit_subheading_eng_label = document.createElement('LABEL')
    edit_subheading_eng_label.innerHTML = 'Subheading ' + i + ' '
    edit_subheading_eng_label.setAttribute('for', i + '-slide-subheading-input-' + slide_id + '-eng')
    edit_subheading_eng.append(edit_subheading_eng_label)
    // create edit_subheading_eng_input & append to edit_subheading_eng_label
    let edit_subheading_eng_input = document.createElement('INPUT')
    edit_subheading_eng_input.setAttribute('id', i + '-slide-subheading-input-' + slide_id + '-eng')
    edit_subheading_eng_input.setAttribute('type', 'text')
    edit_subheading_eng_input.setAttribute('name', 'subheading_eng')
    edit_subheading_eng_input.setAttribute('placeholder', 'Program/performers/quote etc')
    edit_subheading_eng_input.setAttribute('value', '')
    edit_subheading_eng_label.append(edit_subheading_eng_input)
  }

  //////////// TEXT SIZE ////////////

  // create edit_text_size_div & append to edit_slide_div
  let edit_text_size_div = document.createElement('DIV')
  edit_text_size_div.classList.add('mb-2')
  edit_slide_div.append(edit_text_size_div)

  // create edit_text_size_label & append to edit_text_size_div
  let edit_text_size_label = document.createElement('LABEL')
  edit_text_size_label.innerHTML = 'Teksti suurus '
  edit_text_size_label.setAttribute('for', 'slide-text-size-' + slide_id)
  edit_text_size_div.append(edit_text_size_label)

  // create edit_text_size_input & append to edit_text_size_label
  let edit_text_size_input = document.createElement('INPUT')
  edit_text_size_input.classList.add('number-input')
  edit_text_size_input.setAttribute('id', 'slide-text-size-' + slide_id)
  edit_text_size_input.setAttribute('type', 'number')
  edit_text_size_input.setAttribute('name', 'text_size')
  edit_text_size_input.setAttribute('value', '100')
  edit_text_size_input.setAttribute('min', '50')
  edit_text_size_input.setAttribute('max', '200')
  edit_text_size_label.append(edit_text_size_input)

  //////////// TEXT COLOR ////////////

  // create edit_text_color_div & append to edit_slide_div
  let edit_text_color_div = document.createElement('DIV')
  edit_text_color_div.classList.add('mb-1')
  edit_slide_div.append(edit_text_color_div)

  // create edit_text_color_label & append to edit_text_color_div
  let edit_text_color_label = document.createElement('LABEL')
  edit_text_color_label.innerHTML = 'Teksti värv '
  edit_text_color_label.setAttribute('for', 'slide-text-color-' + slide_id)
  edit_text_color_div.append(edit_text_color_label)

  // create edit_text_color_input & append to edit_text_color_label
  let edit_text_color_input = document.createElement('INPUT')
  edit_text_color_input.classList.add('hover-pointer')
  edit_text_color_input.setAttribute('id', 'slide-text-color-' + slide_id)
  edit_text_color_input.setAttribute('type', 'color')
  edit_text_color_input.setAttribute('name', 'text_color')
  edit_text_color_input.setAttribute('value', '#000000')
  edit_text_color_label.append(edit_text_color_input)


  //////////// TEXT COLOR ////////////

  // create edit_button_div & append to edit_slide_div
  let edit_button_div = document.createElement('DIV')
  edit_button_div.classList.add('my-3', 'edit-section')
  edit_slide_div.append(edit_button_div)

  // button text
  // est
  // create edit_button_text_est & append to edit_button_div
  let edit_button_text_est = document.createElement('DIV')
  edit_button_text_est.classList.add('est', 'mb-1')
  edit_button_div.append(edit_button_text_est)

  // create edit_button_text_est_label & append to edit_button_text_est
  let edit_button_text_est_label = document.createElement('LABEL')
  edit_button_text_est_label.innerHTML = 'Nupu tekst '
  edit_button_text_est_label.setAttribute('for', 'slide-btn-input-' + slide_id)
  edit_button_text_est.append(edit_button_text_est_label)

  // create edit_button_text_est_input & append to edit_button_text_est_label
  let edit_button_text_est_input = document.createElement('INPUT')
  edit_button_text_est_input.setAttribute('id', 'slide-btn-input-' + slide_id)
  edit_button_text_est_input.setAttribute('type', 'text')
  edit_button_text_est_input.setAttribute('name', 'button')
  edit_button_text_est_input.setAttribute('data-preview', 'button-preview')
  edit_button_text_est_input.setAttribute('placeholder', 'Loe lähemalt')
  edit_button_text_est_input.setAttribute('value', 'Loe lähemalt')
  edit_button_text_est_label.append(edit_button_text_est_input)

  // eng
  // create edit_button_text_eng & append to edit_button_div
  let edit_button_text_eng = document.createElement('DIV')
  edit_button_text_eng.classList.add('eng', 'mb-1')
  edit_button_div.append(edit_button_text_eng)

  // create edit_button_text_eng_label & append to edit_button_text_eng
  let edit_button_text_eng_label = document.createElement('LABEL')
  edit_button_text_eng_label.innerHTML = 'Button text '
  edit_button_text_eng_label.setAttribute('for', 'slide-btn-input-' + slide_id + '-eng')
  edit_button_text_eng.append(edit_button_text_eng_label)

  // create edit_button_text_eng_input & append to edit_button_text_eng_label
  let edit_button_text_eng_input = document.createElement('INPUT')
  edit_button_text_eng_input.setAttribute('id', 'slide-btn-input-' + slide_id + '-eng')
  edit_button_text_eng_input.setAttribute('type', 'text')
  edit_button_text_eng_input.setAttribute('name', 'button_eng')
  edit_button_text_eng_input.setAttribute('placeholder', 'Read more')
  edit_button_text_eng_input.setAttribute('value', 'Read more')
  edit_button_text_eng_label.append(edit_button_text_eng_input)

  // button text color
  // create edit_button_color_div & append to edit_button_div
  let edit_button_color_div = document.createElement('DIV')
  edit_button_color_div.classList.add('mb-1')
  edit_button_div.append(edit_button_color_div)

  // create edit_button_color_label & append to edit_button_color_div
  let edit_button_color_label = document.createElement('LABEL')
  edit_button_color_label.innerHTML = 'Nupu teksti värv '
  edit_button_color_label.setAttribute('for', 'slide-btn-color-' + slide_id)
  edit_button_color_div.append(edit_button_color_label)

  // create edit_button_color_input & append to edit_button_color_label
  let edit_button_color_input = document.createElement('INPUT')
  edit_button_color_input.classList.add('hover-pointer')
  edit_button_color_input.setAttribute('id', 'slide-btn-color-' + slide_id)
  edit_button_color_input.setAttribute('type', 'color')
  edit_button_color_input.setAttribute('name', 'button_color')
  edit_button_color_input.setAttribute('value', '#000000')
  edit_button_color_label.append(edit_button_color_input)

  // button bg color
  // create edit_button_bg_div & append to edit_button_div
  let edit_button_bg_div = document.createElement('DIV')
  edit_button_bg_div.classList.add('mb-1')
  edit_button_div.append(edit_button_bg_div)

  // create edit_button_bg_label & append to edit_button_bg_div
  let edit_button_bg_label = document.createElement('LABEL')
  edit_button_bg_label.innerHTML = 'Nupu taust '
  edit_button_bg_label.setAttribute('for', 'slide-btn-bg-' + slide_id)
  edit_button_bg_div.append(edit_button_bg_label)

  // create edit_button_bg_input & append to edit_button_bg_label
  let edit_button_bg_input = document.createElement('INPUT')
  edit_button_bg_input.classList.add('hover-pointer')
  edit_button_bg_input.setAttribute('id', 'slide-btn-bg-' + slide_id)
  edit_button_bg_input.setAttribute('type', 'color')
  edit_button_bg_input.setAttribute('name', 'button_bg')
  edit_button_bg_input.setAttribute('value', '#ffffff')
  edit_button_bg_label.append(edit_button_bg_input)

  ///////// SHOW/HIDE SLIDE /////////
  // create edit_slide_vis_div & append to edit_slide_div
  let edit_slide_vis_div = document.createElement('DIV')
  edit_slide_vis_div.classList.add('my-2', 'edit-section')
  edit_slide_div.append(edit_slide_vis_div)

  // create edit_slide_vis_label & append to edit_slide_vis_div
  let edit_slide_vis_label = document.createElement('LABEL')
  edit_slide_vis_label.classList.add('hover-pointer')
  edit_slide_vis_label.innerHTML = 'Peida slaid'
  edit_slide_vis_label.setAttribute('for', 'hide-slide-' + slide_id)
  edit_slide_vis_div.append(edit_slide_vis_label)

  // create edit_slide_vis_input & append to edit_slide_vis_label
  let edit_slide_vis_input = document.createElement('INPUT')
  edit_slide_vis_input.classList.add('hover-pointer')
  edit_slide_vis_input.setAttribute('id', 'hide-slide-' + slide_id)
  edit_slide_vis_input.setAttribute('type', 'checkbox')
  edit_slide_vis_input.setAttribute('name', 'hide')
  edit_slide_vis_input.checked = true
  edit_slide_vis_label.append(edit_slide_vis_input)

  // create slide_save_btn_div & append to edit_slide_div
  let slide_save_btn_div = document.createElement('DIV')
  slide_save_btn_div.classList.add('mt-3')
  edit_slide_div.append(slide_save_btn_div)

  // create slide_save_btn & append to slide_save_btn_div
  let slide_save_btn = document.createElement('BUTTON')
  slide_save_btn.innerHTML = 'Salvesta'
  slide_save_btn.classList.add('save-slide', 'save-slide-new'  + slideNum, 'hover-pointer')
  slide_save_btn.setAttribute('id', 'save-slide-' + slide_id)
  slide_save_btn.setAttribute('data-module-id', '')
  slide_save_btn.setAttribute('data-module', '')
  slide_save_btn.setAttribute('data-img', '')
  slide_save_btn.setAttribute('data-id', slide_id)

  slide_save_btn_div.append(slide_save_btn)


  // create remove_slide_btn_div & append to edit_slide_div
  let remove_slide_btn_div = document.createElement('DIV')
  remove_slide_btn_div.classList.add('mt-3')
  edit_slide_div.append(remove_slide_btn_div)

  // create remove_slide_btn & append to remove_slide_btn_div
  let remove_slide_btn = document.createElement('BUTTON')
  remove_slide_btn.innerHTML = 'Eemalda'
  remove_slide_btn.classList.add('remove-slide', 'remove-slide-new'  + slideNum, 'hover-pointer')
  remove_slide_btn.setAttribute('id', 'remove-slide-' + slide_id)
  remove_slide_btn.setAttribute('data-id', slide_id)
  remove_slide_btn_div.append(remove_slide_btn)

  // append slide_container to slides_container
  slides_container.prepend(slide_container)

  // update module & module item change live preview
  initSlides('select-module-new'  + slideNum, 'concerts-items-new'  + slideNum, 'news-items-new'  + slideNum, 'select-concert-new'  + slideNum, 'select-article-new'  + slideNum);

  // update save-slide(-new) btn
  updateSaveSlideBtns('save-slide-new'  + slideNum)

  // update slide edit sections
  updateSlideLive('save-slide-new'  + slideNum)

  // update remove slide btn
  updateRemoveSlideBtns('remove-slide-new'  + slideNum)

  slideNum++
}

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////