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
  postData(btn, heading, heading_eng, hidden, paragraphs, paragraphsENG, img, img_pos)
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

const postData = (btn, heading, heading_eng, hidden, paragraphs, paragraphsENG, img, img_pos) => {
  let json = JSON.stringify({
    heading,
    heading_eng,
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
        console.log(xhr.responseText);
        btn.innerHTML = 'Salvestatud';
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