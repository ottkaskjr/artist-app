function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// single-value

let singleSections = ['heading', 'description', 'tickets']

// multi-language 

let Sections = ['subHeading', 'program', 'artists']

let Placeholders = ['Pealkiri', 'Teos', 'Esineja']

let Placeholders_eng = ['Subtitle', 'Piece', 'Artist']

// objects

let objSections = ['loc-date']

let objPlaceholders = ['Koht']

let objPlaceholders_eng = ['Place']


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
      // desc
      let description = this.getAttribute('data-description')
      let description_eng = this.getAttribute('data-description-eng')
      // tickets
      let tickets = this.getAttribute('data-tickets')
      let tickets_eng = this.getAttribute('data-tickets-eng')
      
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
      
      // program
      // est
      let program = [];
      let program_eng = []
      for (let piece of document.getElementsByClassName(id + '-piece')) {
        program.push(piece.innerHTML)
      }
      // eng
      for (let piece of document.getElementsByClassName(id + '-pieceEng')) {
        program_eng.push(piece.innerHTML)
      }
      
      // artists
      // est
      let artists = [];
      let artists_eng = [];
      for (let artist of document.getElementsByClassName(id + '-artist')) {
        artists.push(artist.innerHTML)
      }
      // eng
      for (let artist of document.getElementsByClassName(id + '-artistEng')) {
        artists_eng.push(artist.innerHTML)
      }
      
      // loc_date
      // est
      let loc_date = [];
      let loc_date_eng = [];
      let loc_date_div = document.getElementsByClassName(id + '-loc-date')
      let loc_date_div_eng = document.getElementsByClassName(id + '-loc-date-eng')
      for (let i = 0; i < loc_date_div.length; i++) {
        loc_date.push({
          location: document.getElementsByClassName(id + '-loc')[i].innerHTML,
          date: document.getElementsByClassName(id + '-date')[i].innerHTML
        })
      }
      // eng
      for (let i = 0; i < loc_date_div_eng.length; i++) {
        loc_date_eng.push({
          location: document.getElementsByClassName(id + '-locEng')[0].innerHTML,
          date: document.getElementsByClassName(id + '-dateEng')[0].innerHTML
        })
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
      document.getElementById('concert-heading-input').value = heading
      document.getElementById('concert-heading-input-eng').value = heading_eng
  
      // description
      document.getElementById('description').innerHTML = description;
      document.getElementById('description_eng').innerHTML = description_eng;
  
      // tickets
      document.getElementById('tickets').value = tickets
      document.getElementById('tickets_eng').value = tickets_eng
  
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
          group = program;
          group_eng = program_eng;
        }
        if (i === 2) {
          group = artists;
          group_eng = artists_eng;
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
      
      
      // LOCATION AND DATE
      console.log(loc_date)
      for (let i = 0; i < loc_date.length; i++) {
        let num = getRandomIntInclusive(100000000, 9999999999)
        appendLocDate(loc_date[i].location, loc_date[i].date, loc_date_eng[i].location, loc_date_eng[i].date, num)
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
  let arr = ['subHeading', 'program', 'artists']
  for (let section of arr) {
    let sectionName = document.querySelectorAll('.edit-' + section + '-div')
    for (let data of sectionName) {
      data.remove();
    }
  }

  // loc and date
  let loc_date = document.querySelectorAll('.edit-loc-date-div');
  for (let index of loc_date) {
    index.remove();
  }
  
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
  let arr = ['subHeading', 'program', 'artists', 'loc-date']

  for (let section of arr) {
    let sectionName = document.getElementsByClassName('remove-' + section);

    for (let btn of sectionName) {
      let num = btn.getAttribute('data-num')
  
      let data = document.getElementsByClassName(section + '-div-' + num)[0]
      let data_eng = document.getElementsByClassName(section + '-div-eng-' + num)[0]
      
      btn.removeEventListener('click', function () {
        data.remove()
        data_eng.remove()
      })
  
      btn.addEventListener('click', function () {
        data.remove()
        data_eng.remove()
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

// add subheading, program & artists
for (let i = 0; i < Sections.length; i++) {
  document.getElementById('add-new-' + Sections[i]).addEventListener('click', function () {
    //let iteration = document.getElementsByClassName('concert-subHeading-input').length;
  
    let num = getRandomIntInclusive(100000000, 9999999999);

    appendData(Sections[i], Placeholders[i], Placeholders_eng[i], '', '', num)
    
  
    updateEditModalEvents()
  })
}

// add location & date
document.getElementById('add-new-loc-date').addEventListener('click', function () {
  //let iteration = document.getElementsByClassName('concert-subHeading-input').length;
  
  let num = getRandomIntInclusive(100000000, 9999999999);

  appendLocDate('', '', '', '', num)
    
  
  updateEditModalEvents()
})
/////////////////////////////////////////
////////// APPENDING FUNCTIONS //////////
/////////////////////////////////////////

const appendData = (section, placeholder, placeholder_eng, value = '', eng_value = '', iteration) => {
  // est
  document.querySelector('#edit-concert-' + section + '-section .est').innerHTML += "<div class='mb-1 " + section + "-div-" + iteration + " edit-" + section + "-div'><input class='concert-" + section + "-input' type='text' name='" + section + "' placeholder='" + placeholder + "' value='" + value + "'><button class='remove-" + section + " ml-1' data-num='" + iteration + "'>&#9587;</button></div>"
  // eng
  document.querySelector('#edit-concert-' + section + '-section .eng').innerHTML += "<div class='mb-1 " + section + "-div-eng-" + iteration + " edit-" + section + "-div'><input class='concert-" + section + "-input-eng' type='text' name='" + section + "Eng' placeholder='" + placeholder_eng + "' value='" + eng_value + "'></div>"
}

const appendLocDate = (loc, date, loc_eng, date_eng, iteration) => {
  // est
  document.querySelector('#edit-concert-loc-date-section .est').innerHTML += "<div class='mb-1 loc-date-div-" + iteration + " edit-loc-date-div'><input class='concert-loc-input mr-1' type='text' name='loc' placeholder='Koht' value='" + loc + "'><input class='concert-date-input' type='text' name='date' placeholder='mm:hh dd.mm.yy' value='" + date + "'><button class='remove-loc-date ml-1' data-num='" + iteration + "'>&#9587;</button></div>"
  // eng
  document.querySelector('#edit-concert-loc-date-section .eng').innerHTML += "<div class='mb-1 loc-date-div-eng-" + iteration + " edit-loc-date-div'><input class='concert-loc-input-eng mr-1' type='text' name='loc_eng' placeholder='Place' value='" + loc_eng + "'><input class='concert-date-input-eng' type='text' name='date_eng' placeholder='mm:hh dd.mm.yy' value='" + date_eng + "'><button class='remove-loc-date ml-1' data-num='" + iteration + "'>&#9587;</button></div>"
}

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////





/////////////////////////////////////////
//////////// UPDATE CONCERT /////////////
/////////////////////////////////////////

document.getElementById('update-section').addEventListener('click', function () {
  
  let Data = {
    btn : this,
    id : this.getAttribute('data-id'),
    action : 'update',
    heading : document.getElementById('concert-heading-input').value,
    heading_eng : document.getElementById('concert-heading-input-eng').value,
    hidden : document.getElementById('hide-section-item').checked,
    description : document.getElementById('description').value,
    description_eng : document.getElementById('description_eng').value,
    img : document.getElementById('img-input-data').getAttribute('data-name'),
    img_pos : document.querySelectorAll("input[name=img_pos]:checked")[0].value,
    tickets : document.getElementById('tickets').value,
    tickets_eng : document.getElementById('tickets_eng').value
  } 

  // subHeadings, program, artists
  let singleSections = ['subHeading', 'program', 'artists']
  let subHeadings = [];
  let subHeadings_eng = []
  let program = [];
  let program_eng = []
  let artists = [];
  let artists_eng = [];
  let arrays = [subHeadings, program, artists]
  let arrays_eng = [subHeadings_eng, program_eng, artists_eng]
  let arrays_str = ['subHeadings', 'program', 'artists']
  let arrays_eng_str = ['subHeadings_eng', 'program_eng', 'artists_eng']
  for (let i = 0; i < singleSections.length; i++) {
    let inputs = document.getElementsByClassName('concert-' + singleSections[i] + '-input')
    let inputs_eng = document.getElementsByClassName('concert-' + singleSections[i] + '-input-eng')
    for (let j = 0; j < inputs.length; j++) {
      arrays[i].push(inputs[j].value)
      arrays_eng[i].push(inputs_eng[j].value)
    }
    Data[arrays_str[i]] = arrays[i]
    Data[arrays_eng_str[i]] = arrays_eng[i]
  }
  
  
  // loc_date
  // est
  let loc_date = [];
  let loc_date_eng = [];
  let loc = document.getElementsByClassName('concert-loc-input')
  let loc_eng = document.getElementsByClassName('concert-loc-input-eng')
  let date = document.getElementsByClassName('concert-date-input')
  let date_eng = document.getElementsByClassName('concert-date-input-eng')
  for (let i = 0; i < loc.length; i++) {
    loc_date.push({
      location: loc[i].value,
      date: date[i].value
    })
    loc_date_eng.push({
      location: loc_eng[i].value,
      date: date_eng[i].value
    })
   
  }
  Data.loc_date = loc_date;
  Data.loc_date_eng = loc_date_eng;

  console.log(Data)

  // post req
  postData(Data)
})

const postData = (Data) => {
  let btn = Data.btn;
  delete Data.btn;
  let json = JSON.stringify(Data);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/admin/concerts", true);
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

          // update concert-pre-div
          updateSectionPreDiv(res.id, res.concertEst, res.concertEng)
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
          addNewTable(res.concertEst, res.concertEng)
        }
        // removing a concert
        if (res.status.includes('removed')) {
          btn.innerHTML = 'Kinnita';
          closeModal('remove-confirm-modal')
          // remove concert div
          document.getElementById('section-pre-' + res.id).remove()
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
//////////// ADD NEW CONCERT ////////////
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

const addNewTable = (concertEst, concertEng) => {
  let container = document.getElementById('section-pre-divs-container')
  //let containerHTML = container.innerHTML
  // vist ikkagi ei toimi nii, TEE korrektne variant ikkagi 

  // parent div
  let sectionPreParent = document.createElement('DIV');
  sectionPreParent.setAttribute('id', 'section-pre-' + concertEst.id);
  sectionPreParent.classList.add('section-pre-parent', 'mb-2')

  // sub-parent div + append to sectionPreParent
  let sectionPreDiv = document.createElement('DIV')
  sectionPreDiv.classList.add('section-pre-div')
  sectionPreParent.appendChild(sectionPreDiv);
  

  //item1 heading and subheadings + append to sectionPreDiv
  let item1 = document.createElement('DIV');
  item1.classList.add('item1', 'test-border', 'pre-heading-div')
  let item1_p = document.createElement('P')
  item1_p.innerHTML = concertEst.heading;
  item1.appendChild(item1_p)
  sectionPreDiv.appendChild(item1)

  
  //item2 program + append to sectionPreDiv
  let item2 = document.createElement('DIV');
  item2.classList.add('item2', 'test-border', 'pre-program-div')
  let item2_p = document.createElement('P')
  item2_p.innerHTML = 'Info puudub'
  item2.appendChild(item2_p)
  sectionPreDiv.appendChild(item2)

  //item3 artists + append to sectionPreDiv
  let item3 = document.createElement('DIV');
  item3.classList.add('item3', 'test-border', 'pre-artists-div')
  let item3_p = document.createElement('P')
  item3_p.innerHTML = 'Info puudub'
  item3.appendChild(item3_p)
  sectionPreDiv.appendChild(item3)

  //item4 loc_date + append to sectionPreDiv
  let item4 = document.createElement('DIV');
  item4.classList.add('item4', 'test-border', 'pre-loc-date-div')
  let item4_p = document.createElement('P')
  item4_p.innerHTML = 'Info puudub'
  item4.appendChild(item4_p)
  sectionPreDiv.appendChild(item4)

  // controls + append to sectionPreParent
  let controls = document.createElement('DIV');
  controls.classList.add('section-controls', 'pt-1', 'mb-1')
  sectionPreParent.appendChild(controls)

  // buttons + append to controls
  
  let editBtn = document.createElement('BUTTON');
  editBtn.classList.add('edit-section-modal-button', 'mr-1', 'new-edit-btn-' + concertEst.id)
  editBtn.setAttribute('data-id', concertEst.id);
  editBtn.setAttribute('data-heading', concertEst.heading);
  editBtn.setAttribute('data-heading-eng', concertEng.heading);
  editBtn.setAttribute('data-img', concertEst.img);
  editBtn.setAttribute('data-img-pos', concertEst.img_pos);
  editBtn.setAttribute('data-tickets', concertEst.tickets);
  editBtn.setAttribute('data-tickets-eng', concertEng.tickets);
  editBtn.setAttribute('data-description', concertEst.description);
  editBtn.setAttribute('data-description-eng',concertEng.description);
  editBtn.setAttribute('data-hidden', concertEst.hidden);
  editBtn.innerHTML = 'Halda'
  controls.appendChild(editBtn)

  let removeBtn = document.createElement('BUTTON');
  removeBtn.classList.add('remove-section-modal-button', 'new-remove-btn-' + concertEst.id)
  removeBtn.setAttribute('data-id', concertEst.id)
  removeBtn.innerHTML = 'Eemalda'
  controls.appendChild(removeBtn)
  

  // final append
  container.prepend(sectionPreParent)

  // SIIN LISA KA EVENT HANDLER UUTELE NUPPUDELE
  let newArr = []
  let newEditBtn = document.querySelector('.new-edit-btn-' + concertEst.id)
  newArr.push(newEditBtn)
  updateOpenEditModalBtn(newArr);
  newArr = []
  let newRemoveBtn = document.querySelector('.new-remove-btn-' + concertEst.id)
  newArr.push(newRemoveBtn)
  removeSectionBtn(newArr)
}

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////


/////////////////////////////////////////
//////////// REMOVE CONCERT /////////////
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
//////// UPDATE CONCERT-PRE-DIV /////////
/////////////////////////////////////////

const defaultText = (data) => {
  return data === '' ? 'Info puudub': data
}

updateSectionPreDiv = (id, concertEst, concertEng) => {
  
  let preDiv = document.getElementById('section-pre-' + id);
  let heading_subHeadings = document.querySelector('#section-pre-' + id+ ' .pre-heading-div')
  let program = document.querySelector('#section-pre-' + id+ ' .pre-program-div')
  let artists = document.querySelector('#section-pre-' + id+ ' .pre-artists-div')
  let loc_date = document.querySelector('#section-pre-' + id+ ' .pre-loc-date-div')

  let btn = document.querySelector('#section-pre-' + id + ' .edit-section-modal-button');
  console.log(btn, 'HEY')
  // UPDATE BTN DATA ATTRIBUTES
  btn.setAttribute('data-heading', concertEst.heading)
  btn.setAttribute('data-heading-eng', concertEng.heading)
  btn.setAttribute('data-img', concertEst.img)
  btn.setAttribute('data-img-pos', concertEst.img_pos)
  btn.setAttribute('data-tickets', concertEst.tickets)
  btn.setAttribute('data-tickets-eng', concertEng.tickets)
  btn.setAttribute('data-description', concertEst.description)
  btn.setAttribute('data-description-eng', concertEng.description)
  btn.setAttribute('data-hidden', concertEst.hidden)
  // UPDATE FLEXBOX TABLES ==== SIIN POOLELI ====
  // HEADING + SUBHEADINGS
  heading_subHeadings.innerHTML = ''
  heading_subHeadings.innerHTML += "<p>" + defaultText(concertEst.heading) + "</p>"
  for (let subh of concertEst.subHeadings) {
    heading_subHeadings.innerHTML += "<p class='" + concertEst.id + "-subHeading d-none'>" + subh + "</p>"
  }
  for (let subh_eng of concertEng.subHeadings) {
    heading_subHeadings.innerHTML += "<p class='" + concertEng.id + "-subHeadingEng d-none'>" + subh_eng + "</p>"
  }
  //concertEst.
  // PROGRAM
  program.innerHTML = ''
  if (concertEst.program.length > 0) {
    for (let piece of concertEst.program) {
      program.innerHTML += "<p class='" + concertEst.id + "-piece'>" + piece + "</p>"
    }
    for (let piece_eng of concertEng.program) {
      program.innerHTML += "<p class='" + concertEng.id + "-pieceEng d-none'>" + piece_eng + "</p>"
    }
  } else {
    program.innerHTML += "<p>Info puudub</p>"
  }
  
  // ARTISTS
  artists.innerHTML = ''
  if (concertEst.artists.length > 0) {
    for (let artist of concertEst.artists) {
      artists.innerHTML += "<p class='" + concertEst.id + "-artist'>" + artist + "</p>"
    }
    for (let artist_eng of concertEng.artists) {
      artists.innerHTML += "<p class='" + concertEng.id + "-artistEng d-none'>" + artist_eng + "</p>"
    }
  } else {
    artists.innerHTML += "<p>Info puudub</p>"
  }
  // LOC-DATE
  loc_date.innerHTML = ''
  if (concertEst.loc_date.length > 0) {
    for (let obj of concertEst.loc_date) {
      loc_date.innerHTML += "<p class='" + concertEst.id + "-loc-date'><span class='" + concertEst.id + "-loc'>" + obj.location + "</span>&emsp;<span class='" + concertEst.id + "-date'>" + obj.date + "</span></p>"
    }
    for (let obj_eng of concertEng.loc_date) {
      loc_date.innerHTML += "<p class='" + concertEst.id + "-loc-date-eng d-none'><span class='" + concertEst.id + "-locEng'>" + obj_eng.location + "</span>&emsp;<span class='" + concertEst.id + "-dateEng'>" + obj_eng.date + "</span></p>"
    }
  } else {
    loc_date.innerHTML += "<p>Info puudub</p>"
  }
}

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////



