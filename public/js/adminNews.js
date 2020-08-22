function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

let Sections = ['subHeading', 'paragraph']

let Placeholders = ['Pealkiri', 'Lõik']

let Placeholders_eng = ['Subtitle', 'Paragraph']


let nonLangSections = ['source']

let nonLangPlaceholders = ['Allikas']

let nonLangPlaceholders_eng = ['Source']

//let singleSections = ['description', 'tickets']

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
//////////// OPEN EDIT MODAL ////////////
/////////////////////////////////////////

let editSectionBtns = document.getElementsByClassName('edit-section-modal-button');

const updateOpenEditModalBtn = (editBtns) => {
  for (let editBtn of editBtns) {
    editBtn.addEventListener('click', function () {
      // GET DATA
      let id = this.getAttribute('data-id')
  
      // hidden
      let hidden = this.getAttribute('data-hidden')
      // heading
      let heading = this.getAttribute('data-heading')
      let heading_eng = this.getAttribute('data-heading-eng')
      // img
      let img = this.getAttribute('data-img')
      let img_pos = this.getAttribute('data-img-pos')
      // author
      let author = this.getAttribute('data-author')

      // subHeadings
      let subHeadings = [];
      let subHeadings_eng = []
      // est
      for (let subHdiv of document.getElementsByClassName(id + '-subHeading')) {
        subHeadings.push(subHdiv.innerHTML)
      }
      // eng
      for (let subHdivEng of document.getElementsByClassName(id + '-subHeadingEng')) {
        subHeadings_eng.push(subHdivEng.innerHTML)
      }
      
      // quotes
      // est
      
      let quotes = [];
      let quotes_eng = [];
      for (let i = 0; i < document.getElementsByClassName(id + '-quoteObj').length; i++) {
        let obj = {
          quote: document.getElementsByClassName(id + '-quote')[i].innerHTML,
          by: document.getElementsByClassName(id + '-by')[i].innerHTML
        }

        quotes.push(obj)
      }
      // eng
      for (let i = 0; i < document.getElementsByClassName(id + '-quoteObjEng').length; i++) {
        let obj = {
          quote: document.getElementsByClassName(id + '-quoteEng')[i].innerHTML,
          by: document.getElementsByClassName(id + '-byEng')[i].innerHTML
        }

        quotes_eng.push(obj)
      }
      
      // paragraphs
      // est
      let paragraphs = [];
      let paragraphs_eng = [];
      for (let paragraph of document.getElementsByClassName(id + '-paragraph')) {
        paragraphs.push(paragraph.innerHTML)
      }
      // eng
      for (let paragraph of document.getElementsByClassName(id + '-paragraphEng')) {
        paragraphs_eng.push(paragraph.innerHTML)
      }
      
      // sources
      // est
      let sources = [];
      for (let source of document.getElementsByClassName(id + '-source')) {
        sources.push(source.innerHTML)
      }
      
      // APPEND DATA TO MODAL INPUT FIELDS
      // id
      document.getElementById('update-section').setAttribute('data-id', id)
  
      //hidden
      //if (hidden === true) {
      hidden = hidden === 'true' ? true : false;
      document.getElementById('hide-section-item').checked = hidden;
      //} else {
      //  document.getElementById('hide-concert').checked = false;
      //}
  
      // heading
      document.getElementById('article-heading-input').value = heading
      document.getElementById('article-heading-input-eng').value = heading_eng
  
      // author
      document.getElementById('author').value = author;
  
      // tickets
      //document.getElementById('tickets').value = tickets
      //document.getElementById('tickets_eng').value = tickets_eng
  
      // empty appendable elements in the modal
      emptyEditModal();
  
      
      // subheadings
      for (let i = 0; i < Sections.length; i++) {
        
        let group;
        let group_eng;
  
        if (i === 0) {
          group = subHeadings;
          group_eng = subHeadings_eng;
        }
        if (i === 1) {
          group = paragraphs;
          group_eng = paragraphs_eng;
        }
        
        for (let j = 0; j < group.length; j++) {
          let num = getRandomIntInclusive(100000000, 9999999999)
          appendData(Sections[i], Placeholders[i], Placeholders_eng[i], group[j], group_eng[j], num)
        }
      }
  
      // img
      document.getElementById('img-input-data').setAttribute('data-name', img)
      if (img != '') {
        document.getElementById('about-img-preview').classList.remove('d-none')
        document.getElementById('img-position-div').classList.remove('d-none')
        document.getElementById('no-preview-img').classList.add('d-none')
        document.getElementById('about-img-preview').setAttribute('src', '/' + img)
      } 
      document.getElementById('pos-' + img_pos.trim()).checked = true;
      
      
      // QUOTES
      
      console.log(quotes)
      
      for (let i = 0; i < quotes.length; i++) {
        let num = getRandomIntInclusive(100000000, 9999999999)
        appendQuote(quotes[i].quote, quotes[i].by, quotes_eng[i].quote, quotes_eng[i].by, num)
      }

      // SOURCES nonlang
      for (let i = 0; i < sources.length; i++) {
        let num = getRandomIntInclusive(100000000, 9999999999)
        appendNonLang(sources[i], 'source', 'Allikas',  num)
      }
      
      // CORRECT MODAL CONFIRM BTN
      document.getElementById('update-section').innerHTML = 'Salvesta'
  
      openModal('edit-section-modal')
      updateEditModalEvents()
    })
  }
}

updateOpenEditModalBtn(editSectionBtns);


/////////// EMPTY EDIT MODAL ////////////
const emptyEditModal = () => {
  let arr = ['subHeading', 'quote', 'paragraph', 'source']
  for (let section of arr) {
    let sectionName = document.querySelectorAll('.edit-' + section + '-div')
    for (let data of sectionName) {
      data.remove();
    }
  }

  // quotes
  /*
  let quotes = document.querySelectorAll('.edit-loc-date-div');
  for (let index of loc_date) {
    index.remove();
  }
  */
  
  //img
  document.getElementById('img-input-data').setAttribute('data-name', '')
  document.getElementById('about-img-preview').setAttribute('src', '')
  let imgArr = ['about-img-preview', 'img-position-div']
  for (let i of imgArr) {
    if (!document.getElementById(i).classList.contains('d-none')) {
      document.getElementById(i).classList.add('d-none')
    }
  }
  document.getElementById('no-preview-img').classList.remove('d-none')
}

///// UPDATE EDIT MODAL BTN EVENTS //////

function removeSubHeading(el, el_eng) {
  el.remove()
  el_eng.remove()
  //document.getElementsByClassName('subHeading-div-' + num)[0].remove();
  //document.getElementsByClassName('subHeading-div-eng-' + num)[0].remove();
}


const updateEditModalEvents = () => {
  // update 'remove subheadinh/program/artist'
  let arr = ['subHeading', 'quote', 'paragraph', 'source']

  for (let section of arr) {
    let sectionName = document.getElementsByClassName('remove-' + section);

    for (let btn of sectionName) {
      let num = btn.getAttribute('data-num')
  
      let data = document.getElementsByClassName(section + '-div-' + num)[0]
      
      
      //if (section != 'source') {
      let data_eng = document.getElementsByClassName(section + '-div-eng-' + num)[0]
      //}
      
      
      btn.removeEventListener('click', function () {
        data.remove()
        if (data_eng != undefined) data_eng.remove()
        
      })
  
      btn.addEventListener('click', function () {
        data.remove()
        if (data_eng != undefined) data_eng.remove()
      })
    }
  }

  /*
  // update remove loc & date
  let remLocDate = document.getElementsByClassName('remove-loc-date');
  for (let btn of remLocDate) {
    let num = btn.getAttribute('data-num')

    let loc = document.getElementsByClassName(section + '-div-' + num)[0]
    let loc_eng = document.getElementsByClassName(section + '-div-eng-' + num)[0]
    
    btn.removeEventListener('click', function () {
      data.remove()
      data_eng.remove()
    })

    btn.addEventListener('click', function () {
      data.remove()
      data_eng.remove()
    })
  }
  */
}

////// NON-UPDATE EDIT MODAL EVENTS //////

// add subheading, quote, paragraph or source
for (let i = 0; i < Sections.length; i++) {
  document.getElementById('add-new-' + Sections[i]).addEventListener('click', function () {
  
    let num = getRandomIntInclusive(100000000, 9999999999);

    appendData(Sections[i], Placeholders[i], Placeholders_eng[i], '', '', num)
    
  
    updateEditModalEvents()
  })
}

// add quote OBJECT

document.getElementById('add-new-quote').addEventListener('click', function () {
  
  let num = getRandomIntInclusive(100000000, 9999999999);

  appendQuote('', '', '', '', num)
    
  
  updateEditModalEvents()
})

// add source NON-LANG
document.getElementById('add-new-source').addEventListener('click', function () {
  
  let num = getRandomIntInclusive(100000000, 9999999999);

  appendNonLang('', 'source', 'Allikas', num)
    
  
  updateEditModalEvents()
})

/////////////////////////////////////////
////////// APPENDING FUNCTIONS //////////
/////////////////////////////////////////

const appendData = (section, placeholder, placeholder_eng, value = '', eng_value = '', iteration) => {
  if (section != 'paragraph') {
    // est
    document.querySelector('#edit-article-' + section + '-section .est').innerHTML += "<div class='mb-1 " + section + "-div-" + iteration + " edit-" + section + "-div'><input class='article-" + section + "-input' type='text' name='" + section + "' placeholder='" + placeholder + "' value='" + value + "'><button class='remove-" + section + " ml-1' data-num='" + iteration + "'>&#9587;</button></div>"
    // eng
    if (document.querySelector('#edit-article-' + section + '-section .eng') != undefined) {
      document.querySelector('#edit-article-' + section + '-section .eng').innerHTML += "<div class='mb-1 " + section + "-div-eng-" + iteration + " edit-" + section + "-div'><input class='article-" + section + "-input-eng' type='text' name='" + section + "Eng' placeholder='" + placeholder_eng + "' value='" + eng_value + "'></div>"
    }
  } else {
    // est
    document.querySelector('#edit-article-' + section + '-section .est').innerHTML += "<div class='mb-1 mx-3 " + section + "-div-" + iteration + " edit-" + section + "-div'><textarea class='article-" + section + "-input' type='text' name='" + section + "' placeholder='" + placeholder + "' rows='8'>" + value + "</textarea><div class='mb-3'><button class='remove-" + section + "' data-num='" + iteration + "'>&#9587;</button></div></div>"
    // eng
    if (document.querySelector('#edit-article-' + section + '-section .eng') != undefined) {
      document.querySelector('#edit-article-' + section + '-section .eng').innerHTML += "<div class='mb-1 mx-3 " + section + "-div-eng-" + iteration + " edit-" + section + "-div'><textarea class='article-" + section + "-input-eng' type='text' name='" + section + "Eng' placeholder='" + placeholder_eng + "' rows='8'>" + eng_value + "</textarea>"
    }
  }
  
  
}


const appendQuote = (quote, by, quote_eng, by_eng, iteration) => {
  // est
  document.querySelector('#edit-article-quotes-section .est').innerHTML += "<div class='mb-1 quote-div-" + iteration + " edit-quote-div'><input class='article-quote-input mr-1' type='text' name='quote' placeholder='Tsitaat' value='" + quote + "'><input class='article-by-input' type='text' name='by' placeholder='Nimi' value='" + by + "'><button class='remove-quote ml-1' data-num='" + iteration + "'>&#9587;</button></div>"
  // eng
  document.querySelector('#edit-article-quotes-section .eng').innerHTML += "<div class='mb-1 quote-div-eng-" + iteration + " edit-quote-div'><input class='article-quote-input-eng mr-1' type='text' name='quote_eng' placeholder='Quote' value='" + quote_eng + "'><input class='article-by-input-eng' type='text' name='by_eng' placeholder='By' value='" + by_eng + "'><button class='remove-quote ml-1' data-num='" + iteration + "'>&#9587;</button></div>"
}

const appendNonLang = (value, section, placeholder, iteration) => {
  document.querySelector('#edit-article-' + section + '-section .est').innerHTML += "<div class='mb-1 " + section + "-div-" + iteration + " edit-" + section + "-div'><input class='article-" + section + "-input' type='text' name='" + section + "' placeholder='" + placeholder + "' value='" + value + "'><button class='remove-" + section + " ml-1' data-num='" + iteration + "'>&#9587;</button></div>"
}

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////





/////////////////////////////////////////
//////////// UPDATE ARTICLE /////////////
/////////////////////////////////////////

document.getElementById('update-section').addEventListener('click', function () {
  
  let Data = {
    btn : this,
    id : this.getAttribute('data-id'),
    action : 'update',
    heading : document.getElementById('article-heading-input').value,
    heading_eng : document.getElementById('article-heading-input-eng').value,
    hidden : document.getElementById('hide-section-item').checked,
    author : document.getElementById('author').value,
    //description_eng : document.getElementById('description_eng').value,
    img : document.getElementById('img-input-data').getAttribute('data-name'),
    img_pos : document.querySelectorAll("input[name=img_pos]:checked")[0].value,
  } 

  // subHeadings, quotes, paragraphs, sources
  let singleSections = ['subHeading', 'paragraph']
  let subHeadings = [];
  let subHeadings_eng = []
  
  let paragraphs = [];
  let paragraphs_eng = [];
  
  let arrays = [subHeadings, paragraphs]
  let arrays_eng = [subHeadings_eng, paragraphs_eng]
  let arrays_str = ['subHeadings', 'paragraphs']
  let arrays_eng_str = ['subHeadings_eng', 'paragraphs_eng']
  for (let i = 0; i < singleSections.length; i++) {
    let inputs = document.getElementsByClassName('article-' + singleSections[i] + '-input')

    let inputs_eng = document.getElementsByClassName('article-' + singleSections[i] + '-input-eng')

    for (let j = 0; j < inputs.length; j++) {
      arrays[i].push(inputs[j].value)
      arrays_eng[i].push(inputs_eng[j].value)
    }
    Data[arrays_str[i]] = arrays[i]
    Data[arrays_eng_str[i]] = arrays_eng[i]
  }

  let nonLang = ['source']
  let sources = [];
  let nonLangArrays = [sources]
  let nonLangarrays_str = ['sources']
  for (let i = 0; i < nonLang.length; i++) {
    let inputs = document.getElementsByClassName('article-' + nonLang[i] + '-input')

    for (let j = 0; j < inputs.length; j++) {
      nonLangArrays[i].push(inputs[j].value)
    }
    Data[nonLangarrays_str[i]] = nonLangArrays[i]
  }
  
  // QUOTES object
  // est
  let objSections = [{first: 'quote', second: 'by'}]
  let quotes = [];
  let quotes_eng = []
  let objArrays = [quotes]
  let objArrays_eng = [quotes_eng]
  let objArrays_str = ['quotes']
  let objArrays_eng_str = ['quotes_eng']

  
  for (let i = 0; i < objSections.length; i++) {
    console.log(objSections[i].first)
    let quote = document.getElementsByClassName('article-' + objSections[i].first + '-input')
    let quote_eng = document.getElementsByClassName('article-' + objSections[i].first + '-input-eng')
    let by = document.getElementsByClassName('article-' + objSections[i].second + '-input')
    let by_eng = document.getElementsByClassName('article-' + objSections[i].second + '-input-eng')
    
    for (let j = 0; j < quote.length; j++) {
      quotes.push({
        quote: quote[j].value,
        by: by[j].value
      })
      quotes_eng.push({
        quote: quote_eng[j].value,
        by: by_eng[j].value
      })
    
    }
  }
  Data.quotes = quotes;
  Data.quotes_eng = quotes_eng;
  

  console.log(Data)

  // post req
  postData(Data)
})

const postData = (Data) => {
  let btn = Data.btn;
  delete Data.btn;
  let json = JSON.stringify(Data);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/admin/news", true);
  // set header content type to json
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        
        let res = JSON.parse(xhr.responseText)

        console.log(res);

        // update
        if (res.status.includes('updated')) {
          btn.innerHTML = 'Salvestatud';

          // update article-pre-div
          updateSectionPreDiv(res.id, res.articleEst, res.articleEng)
        }
        // changing section hidden value
        if (res.status.includes('hidden')) {
          btn.innerHTML = 'Salvesta';
          btn.classList.add('d-none')
          document.getElementById('hide-section').setAttribute('data-status', res.value)
        }
        // creating a new
        if (res.status.includes('created')) {
          btn.innerHTML = 'Lisa uus';
          addNewTable(res.articleEst, res.articleEng)
        }
        // removing an article
        if (res.status.includes('removed')) {
          btn.innerHTML = 'Kinnita';
          closeModal('remove-confirm-modal')
          // remove article div
          document.getElementById('section-pre-' + res.id).remove()
        }
        // update main heading
        if (res.status.includes('mainHeading')) {
          btn.innerHTML = 'Salvesta';
          document.getElementById('main-heading').innerHTML = res.mainHeading;
        }
        
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
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////


/////////////////////////////////////////
///////////// HIDE SECTION //////////////
/////////////////////////////////////////
let saveBtb = document.getElementById('hide-section-btn');
document.getElementById('hide-section').addEventListener('click', function () {
  
  let status = this.getAttribute('data-status') === 'true' ? true : false;

  // switch d-none from save btn
  if (status === false) {
    if (status != this.checked) {
      if (saveBtb.classList.contains('d-none')) {
        saveBtb.classList.remove('d-none')
      }
    } else {
      if (!saveBtb.classList.contains('d-none')) {
        saveBtb.classList.add('d-none')
      }
    }
  } else {
    console.log('here')
    if (status === this.checked) {
      if (!saveBtb.classList.contains('d-none')) {
        saveBtb.classList.add('d-none')
      }
    } else {
      if (saveBtb.classList.contains('d-none')) {
        saveBtb.classList.remove('d-none')
      }
    }
  }
})

/// SIIN POOLELI
document.getElementById('hide-section-btn').addEventListener('click', function () {
  let status = document.getElementById('hide-section').checked
  console.log(status)
  let Data = {
    action: 'hidden',
    status,
    btn: this
  }

  postData(Data)
})

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////


/////////////////////////////////////////
//////////// ADD NEW ARTICLE ////////////
/////////////////////////////////////////

// OPEN MODAL
document.getElementById('add-new-section-modal-btn').addEventListener('click', function () {
  console.log('click')
  let btn = this
  let Data = {
    btn,
    action: 'new'
  }
  postData(Data)
})

const addNewTable = (articleEst, articleEng) => {
  let container = document.getElementById('section-pre-divs-container')
  //let containerHTML = container.innerHTML
  // vist ikkagi ei toimi nii, TEE korrektne variant ikkagi 

  // parent div
  let sectionPreParent = document.createElement('DIV');
  sectionPreParent.setAttribute('id', 'section-pre-' + articleEst.id);
  sectionPreParent.classList.add('section-pre-parent', 'mb-2')

  // sub-parent div + append to sectionPreParent
  let sectionPreDiv = document.createElement('DIV')
  sectionPreDiv.classList.add('section-pre-div')
  sectionPreParent.appendChild(sectionPreDiv);
  // SIIN POOLELI 

  //item1 heading and subheadings + append to sectionPreDiv
  let item1 = document.createElement('DIV');
  item1.classList.add('item1', 'test-border', 'pre-heading-div')
  let item1_p = document.createElement('P')
  item1_p.innerHTML = articleEst.heading;
  item1.appendChild(item1_p)
  sectionPreDiv.appendChild(item1)

  
  //item2 author + append to sectionPreDiv
  let item2 = document.createElement('DIV');
  item2.classList.add('item2', 'test-border', 'pre-author-div')
  let item2_p = document.createElement('P')
  item2_p.innerHTML = 'Info puudub'
  item2.appendChild(item2_p)
  sectionPreDiv.appendChild(item2)

  //item3 sources + append to sectionPreDiv
  let item3 = document.createElement('DIV');
  item3.classList.add('item3', 'test-border', 'pre-sources-div')
  let item3_p = document.createElement('P')
  item3_p.innerHTML = 'Info puudub'
  item3.appendChild(item3_p)
  sectionPreDiv.appendChild(item3)

  //item4 date + append to sectionPreDiv
  let item4 = document.createElement('DIV');
  item4.classList.add('item4', 'test-border', 'pre-date-div')
  let item4_p = document.createElement('P')
  item4_p.innerHTML = articleEst.date
  item4.appendChild(item4_p)
  sectionPreDiv.appendChild(item4)

  // controls + append to sectionPreParent
  let controls = document.createElement('DIV');
  controls.classList.add('section-controls', 'pt-1', 'mb-1')
  sectionPreParent.appendChild(controls)

  // buttons + append to controls
  
  let editBtn = document.createElement('BUTTON');
  editBtn.classList.add('edit-section-modal-button', 'mr-1', 'new-edit-btn-' + articleEst.id)
  editBtn.setAttribute('data-id', articleEst.id);
  editBtn.setAttribute('data-heading', articleEst.heading);
  editBtn.setAttribute('data-heading-eng', articleEng.heading);
  editBtn.setAttribute('data-img', articleEst.img);
  editBtn.setAttribute('data-img-pos', articleEst.img_pos);
  editBtn.setAttribute('data-author', articleEst.author);
  editBtn.setAttribute('data-date', articleEst.date);
  editBtn.setAttribute('data-hidden', articleEst.hidden);
  editBtn.innerHTML = 'Halda'
  controls.appendChild(editBtn)

  let removeBtn = document.createElement('BUTTON');
  removeBtn.classList.add('remove-section-modal-button', 'new-remove-btn-' + articleEst.id)
  removeBtn.setAttribute('data-id', articleEst.id)
  removeBtn.innerHTML = 'Eemalda'
  controls.appendChild(removeBtn)
  

  // final append
  container.prepend(sectionPreParent)

  // SIIN LISA KA EVENT HANDLER UUTELE NUPPUDELE
  let newArr = []
  let newEditBtn = document.querySelector('.new-edit-btn-' + articleEst.id)
  newArr.push(newEditBtn)
  updateOpenEditModalBtn(newArr);
  newArr = []
  let newRemoveBtn = document.querySelector('.new-remove-btn-' + articleEst.id)
  newArr.push(newRemoveBtn)
  removeSectionBtn(newArr)
}

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////


/////////////////////////////////////////
//////////// REMOVE ARTICLE /////////////
/////////////////////////////////////////

// OPEN MODAL
let removeSectionBtn = (btns) => {
    for (let Btn of btns) {
      Btn.addEventListener('click', function () {
        let id = this.getAttribute('data-id')
        document.getElementById('confirm-remove-btn').setAttribute('data-id', id)
        openModal('remove-confirm-modal')
        
      })
    }
}
let removeButtons = document.getElementsByClassName('remove-section-modal-button');
removeSectionBtn(removeButtons)

// CONFIRM REMOVE
document.getElementById('confirm-remove-btn').addEventListener('click', function () {
  let btn = this
  let Data = {
    action: 'remove',
    id: this.getAttribute('data-id'),
    btn
  }
  console.log('click')
  postData(Data)
})

// CANCEL REMOVE
document.getElementById('cancel-remove-btn').addEventListener('click', () => {
  closeModal('remove-confirm-modal')
})

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////


/////////////////////////////////////////
//////// UPDATE ARTICLE-PRE-DIV /////////
/////////////////////////////////////////

const defaultText = (data) => {
  return data === '' ? 'Info puudub': data
}

updateSectionPreDiv = (id, articleEst, articleEng) => {
  
  let preDiv = document.getElementById('section-pre-' + id);
  let heading_subHeadings = document.querySelector('#section-pre-' + id + ' .pre-heading-div')
  let author = document.querySelector('#section-pre-' + id + ' .pre-author-div')
  let sources = document.querySelector('#section-pre-' + id + ' .pre-sources-div')
  let date = document.querySelector('#section-pre-' + id + ' .pre-date-div')

  let btn = document.querySelector('#section-pre-' + id + ' .edit-section-modal-button');
  console.log(btn)
  // UPDATE BTN DATA ATTRIBUTES

  btn.setAttribute('data-heading', articleEst.heading);
  btn.setAttribute('data-heading-eng', articleEng.heading);
  btn.setAttribute('data-img', articleEst.img);
  btn.setAttribute('data-img-pos', articleEst.img_pos);
  btn.setAttribute('data-author', articleEst.author);
  btn.setAttribute('data-date', articleEst.date);
  btn.setAttribute('data-hidden', articleEst.hidden);

  // UPDATE FLEXBOX TABLES 
  // HEADING + SUBHEADINGS
  heading_subHeadings.innerHTML = ''
  heading_subHeadings.innerHTML += "<p>" + defaultText(articleEst.heading) + "</p>"
  for (let subh of articleEst.subHeadings) {
    heading_subHeadings.innerHTML += "<p class='" + articleEst.id + "-subHeading d-none'>" + subh + "</p>"
  }
  for (let subh_eng of articleEng.subHeadings) {
    heading_subHeadings.innerHTML += "<p class='" + articleEst.id + "-subHeadingEng d-none'>" + subh_eng + "</p>"
  }

  // QUOTES
  
  if (articleEst.quotes.length > 0) {
    for (let obj of articleEst.quotes) {
      heading_subHeadings.innerHTML += "<p class='" + articleEst.id + "-quoteObj d-none'><span class='" + articleEst.id + "-quote'>" + obj.quote + "</span>&emsp;<span class='" + articleEst.id + "-by'>" + obj.by + "</span></p>"
    }
    for (let obj_eng of articleEng.quotes) {
      heading_subHeadings.innerHTML += "<p class='" + articleEst.id + "-quoteObjEng d-none'><span class='" + articleEst.id + "-quoteEng'>" + obj_eng.quote + "</span>&emsp;<span class='" + articleEst.id + "-byEng'>" + obj_eng.by + "</span></p>"
    }
  }

  // PARAGRAPHS

  for (let paragraph of articleEst.paragraphs) {
    heading_subHeadings.innerHTML += "<p class='" + articleEst.id + "-paragraph d-none'>" + paragraph + "</p>"
  }
  for (let paragraph_eng of articleEng.paragraphs) {
    heading_subHeadings.innerHTML += "<p class='" + articleEst.id + "-paragraphEng d-none'>" + paragraph_eng + "</p>"
  }
  
  // AUTHOR
  author.innerHTML = ''
  if (articleEst.author != '') {
    author.innerHTML += "<p>" + articleEst.author + "</p>"
  } else {
    author.innerHTML += "<p>Info puudub</p>"
  }
  
  // SOURCES
  sources.innerHTML = ''
  if (articleEst.sources.length > 0) {
    for (let source of articleEst.sources) {
      sources.innerHTML += "<p class='" + articleEst.id + "-source'>" + source + "</p>"
    }
  } else {
    sources.innerHTML += "<p>Info puudub</p>"
  }

  // DATE
  date.innerHTML = ''
  date.innerHTML += "<p>" + articleEst.date + "</p>" 
   // SIIN POOLELI - TESTI
}

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////


/////////////////////////////////////////
/////////// SAVE MAIN HEADING ///////////
/////////////////////////////////////////

document.getElementById('save-main-heading').addEventListener('click', function () {
  
  let mainHeading = document.getElementById('main-heading-input').value;
  let mainHeading_eng = document.getElementById('main-heading-input-eng').value;
  let mainHeading_pos = document.getElementById('main-heading-pos').value;
  let btn = this;
  let Data = {
    action: 'mainHeading',
    mainHeading,
    mainHeading_eng,
    mainHeading_pos,
    btn
  }
  postData(Data)
})

