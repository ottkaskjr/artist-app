const retVal = (id) => {
  return document.getElementById(id).value;
}

document.getElementById('save-contacts').addEventListener('click', function () {
  let Data = {}
  let btn = this;

  //let hidden = document.getElementById('hide-section').checked

  Data.btn = btn;

  Data.name = retVal('name')
  Data.companyName = retVal('company-name')
  Data.tel = retVal('tel')
  Data.email = retVal('email')

  Data.country = retVal('country')
  Data.province = retVal('province')
  Data.city = retVal('city')
  Data.street1 = retVal('street1')
  Data.street2 = retVal('street2')
  Data.postal = retVal('postal')
  Data.mainHeading = retVal('main-heading-input')
  Data.mainHeading_eng = retVal('main-heading-input-eng')
  Data.mainHeading_pos = retVal('main-heading-pos')
  Data.hidden = document.getElementById('hide-section').checked

  postData(Data)
})


const postData = (Data) => {
  let btn = Data.btn;
  delete Data.btn;
  let json = JSON.stringify(Data);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/admin/contacts", true);
  // set header content type to json
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let res = JSON.parse(xhr.responseText)
        console.log(res);
        // update main heading
        document.getElementById('main-heading').innerHTML = res.mainHeading;

        btn.innerHTML = 'Salvesta';
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


