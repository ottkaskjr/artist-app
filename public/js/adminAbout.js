////////////////////////////////////////////////////
////////////////// ABOUT AJAX //////////////////////
////////////////////////////////////////////////////



/*
document.getElementById('ajax-test').addEventListener('input', function () {
  console.log(this.value)
})
*/
document.getElementById('save-data').addEventListener('click', function () {
  let btn = this
  let heading = document.getElementById('about-heading-input').value;
  let heading_eng = document.getElementById('about-heading-input-eng').value;
  let heading_pos = document.getElementById('about-heading-pos').value;
  let hidden = document.getElementById('hide-about-section').checked;
  let textareas = document.querySelectorAll('.paragraph');
  let img = document.getElementById('img-input-data').getAttribute('data-name')
  let img_pos = document.querySelectorAll("input[name=img_pos]:checked")[0].value
  

  let paragraphs = []
  let paragraphsENG = []
  for (let i = 0; i < textareas.length; i++) {
    if (textareas[i].getAttribute('data-lang') === 'est') {
      paragraphs.push({
        body: textareas[i].value
      })
    } else {
      paragraphsENG.push({
        body: textareas[i].value
      })
    }
  }
  //console.log(paragraphs)
  //console.log(paragraphsENG)
  // post req
  postData(btn, heading, heading_eng, heading_pos, hidden, paragraphs, paragraphsENG, img, img_pos)
})

// TESTING CHECKBOX
  /*
document.getElementById('hide-about-section').addEventListener('change', function (e) {
  //console.log(e)
  let el = this
  console.log(el.checked)

})
*/
/*
  let formData = new FormData(); // creates an object, optionally fill from <form>
  formData.append('mydata', value); // appends a field
*/

const postData = (btn, heading, heading_eng, heading_pos, hidden, paragraphs, paragraphsENG, img, img_pos) => {
  let json = JSON.stringify({
    heading,
    heading_eng,
    heading_pos,
    hidden,
    paragraphs,
    paragraphsENG,
    img,
    img_pos
  });

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/admin/about", true);
  // set header content type to json
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let res = JSON.parse(xhr.responseText);
        if (res.status === 'Saved') {
          document.getElementById('main-heading').innerHTML = res.heading
          btn.innerHTML = 'Salvesta';
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

/////////////////////////////////////////////////
/////////////// REMOVE PARAGRAPH ////////////////
/////////////////////////////////////////////////

const updateParagraphBtn = (className) => {
  let btns = document.getElementsByClassName(className);

  for (let btn of btns) {
    btn.addEventListener('click', function () {
      let paragraphDiv = this.closest('.paragraph-div')

      paragraphDiv.remove()
    })
  }
}
updateParagraphBtn('remove-paragraph-btn')

/////////////////////////////////////////////////
///////////////// ADD PARAGRAPH /////////////////
/////////////////////////////////////////////////

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

document.getElementById('add-paragraph').addEventListener('click', function () {
  // parent element
  let parContainer = document.getElementById('edit-about-paragraphs')

  // paragraph div
  let paragraphDiv = document.createElement('DIV')
  paragraphDiv.classList.add('paragraph-div', 'mt-3')

  // create additional div and append to paragraphDiv
  let div = document.createElement('DIV');
  paragraphDiv.appendChild(div);

  // eesti div + append to div
  let divEst = document.createElement('DIV')
  divEst.innerHTML = 'Eesti'
  div.appendChild(divEst);

  // eng div + append to div
  let divEng = document.createElement('DIV')
  divEng.innerHTML = 'English'
  div.appendChild(divEng);

  // textarea est + append to divEst
  let textEst = document.createElement('TEXTAREA');
  textEst.setAttribute('name', 'paragraph')
  textEst.setAttribute('data-lang', 'est')
  textEst.classList.add('paragraph')
  textEst.setAttribute('rows', '10')
  textEst.setAttribute('placeholder', 'Eestikeelne tekst')
  let num1 = getRandomIntInclusive(100000000, 999999999)
  textEst.setAttribute('id', 'paragraph-' + num1)
  divEst.appendChild(textEst)

  // textarea eng + append to divEng
  let textEng = document.createElement('TEXTAREA');
  textEng.setAttribute('name', 'paragraphENG')
  textEng.setAttribute('data-lang', 'eng')
  textEng.classList.add('paragraph')
  textEng.setAttribute('rows', '10')
  textEng.setAttribute('placeholder', 'Text in english')
  let num2 = getRandomIntInclusive(100000000, 999999999)
  textEng.setAttribute('id', 'paragraphENG-' + num2)
  divEng.appendChild(textEng)

  // btn div + append to paragraphDiv
  let btnDiv = document.createElement('DIV');
  paragraphDiv.appendChild(btnDiv)

  // remBtn + append to btnDiv
  let remBtn = document.createElement('BUTTON');
  remBtn.classList.add('remove-paragraph-btn-' + num1, 'hover-pointer')
  remBtn.innerHTML = 'Eemalda lõik'
  btnDiv.appendChild(remBtn)

  // append paragraphDiv to parContainer
  parContainer.appendChild(paragraphDiv)

  // update remBtn
  updateParagraphBtn('remove-paragraph-btn-' + num1)
})