const express = require('express');
const router = new express.Router();
const util = require('util')
const ejsLint = require('ejs-lint');
const uniqid = require('uniqid')
var fs = require('fs');

const readFilePromise = util.promisify(fs.readFile)


//const readData = (fileName, dataArr) => {
  /*
  let data = fs.readFileSync('./public/localdb/' + fileName + '.json', function (err, data) {
    if (err) {
      return console.error(err);
    }
    let str = data.toString();
    //console.log(JSON.parse(str))
    return str
  });
  return data
  */
 /*
  let Data;
  readFilePromise('./public/localdb/' + fileName + '.json').then(data => {
    console.log(JSON.parse(data))
    console.log('got here')
    Data = data
  })
  .catch(err => {
    console.log(err)
  });
  return Data
  */
 /*
 readFilePromise('./public/localdb/' + fileName + '.json').then(data => {
   if (Array.isArray(dataArr)) dataArr.push(JSON.parse(data))
  
  })
  .catch(err => {
  console.log(err)
  })
}
*/

//get landing page
router.get('/', async (req, res) => {
  try {
    let lang = '';
    let folder = 'localdb';
    let language = 'est';
    if (req.query.lang) {
      lang = '_' + req.query.lang.toLowerCase();
      folder = 'localdbENG';
      language = 'eng';
    }

    //console.log(uniqid(), uniqid());


    // KOGU JSON DATA ARR
    let DATA = {}

    const readData = function (fileName) { 
      return new Promise (( resolve , reject) => {
      
      readFilePromise('./public/' + folder + '/' + fileName + lang + '.json').then(data => {
        DATA[fileName] = JSON.parse(data)
        resolve()
        })
        .catch(err => {
        console.log(err)
        reject(err)
        })

      })
    }
    // READ LOCALDB DATA
    // Asynchronous read
    let promises = [
      readData('about'),
      readData('calendar'),
      readData('carousel'),
      readData('concerts'),
      readData('contacts'),
      readData('media'),
      readData('members'),
      readData('menu'),
      readData('news'),
      readData('saale')
    ]
    Promise.all(promises).then(() => {
      //console.log(DATA);
      DATA.language = language;
      
      res.render('../src/views/home', DATA);
    }).catch(err => {
      if (err) console.log(err)
    })
    
    
  } catch (e) {
    console.log(e)
  }
});

// GET IMAGE (EI TÖÖTA)//
router.get('/img/:id', async (req, res) => {
  try {
    //set response method
    res.set('Content-Type', 'image/jpg');
    //res.send(user.gallery[num].pic);
    
    //res.send('./public/img/' +  req.params.id + '.jpg')
    //res.send('/' + req.params.id)
  } catch (e) {
    console.log(e)
  }
  
})

router.get('/error', async (req, res) => {
  try {

    res.render('../src/views/errorPage');

  } catch (e) {

  }
})




module.exports = router;
