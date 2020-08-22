const express = require('express');
const router = new express.Router();
const ejsLint = require('ejs-lint');
var fs = require('fs');
const util = require('util')
const uniqid = require('uniqid');


///////////////////////////////////////////////////
/////////////// RETRIEVE LOCAL DATA ///////////////
///////////////////////////////////////////////////

const readFilePromise = util.promisify(fs.readFile)
const writeFilePromise = util.promisify(fs.writeFile)
const deleteFilePromise = util.promisify(fs.unlink)


const readData = function (fileName, arr, lang) { 
  return new Promise (( resolve , reject) => {
  if (lang === undefined) {
    readFilePromise('./public/localdb/' + fileName + '.json').then(data => {
      arr[fileName] = JSON.parse(data)
      resolve()
      })
      .catch(err => {
      console.log(err)
      reject(err)
      })
  } else {
    readFilePromise('./public/localdbENG/' + fileName + '_eng.json').then(data => {
      arr[fileName + '_eng'] = JSON.parse(data)
      resolve()
      })
      .catch(err => {
      console.log(err)
      reject(err)
      })
  }
})
}

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

const writeData = function (fileName, newData, lang) { 
  return new Promise (( resolve , reject) => {
  if (lang === undefined) {
    writeFilePromise('./public/localdb/' + fileName + '.json', newData).then(() => {
      //arr[fileName] = JSON.parse(data)
      
      resolve()
      })
      .catch(err => {
      console.log(err)
      reject(err)
      })
    } else {
      writeFilePromise('./public/localdbENG/' + fileName + '_eng.json', newData).then(() => {
        //arr[fileName] = JSON.parse(data)
        resolve()
        })
        .catch(err => {
        console.log(err)
        reject(err)
        })
    }
  })
}

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

const deleteFile = function (path) { 
  return new Promise (( resolve , reject) => {
    deleteFilePromise(path).then(() => {
      //arr[fileName] = JSON.parse(data)
      resolve()
      })
      .catch(err => {
      console.log(err)
      reject(err)
      })
  })
}

///////////////////////////////////////////////////
//////////// UPDDATE ADMIN MENU NAMES /////////////
///////////////////////////////////////////////////

const updateAdminMenu = function(hrefName, newValue, fileName) {
  for (let item of fileName.global.adminMenu) {
    if (item.href === hrefName) {
      item.title = newValue
      break;
    }
  }
}

///////////////////////////////////////////////////
////////////// ADDITIONAL FUNCTIONS ///////////////
///////////////////////////////////////////////////

const createIsoDate = (data, type) => {
  if (type === 'input_date') {
    //2020-08-07
    let year = data.slice(0, 4);
    year = parseInt(year)
    let month = data.slice(5, 7);
    month = parseInt(month)
    let day = data.slice(8, 10);
    day = parseInt(day)
    let date = new Date(year, month, day);
    return date;
  }
  
}

//get admin home page
router.get('/admin', function(req, res) {
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

    /*
    const readData = function (fileName, arr) { 
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
    */
    // READ LOCALDB DATA
    // Asynchronous read
    let promises = [
      readData('global', DATA),
      
      /*
      readData('about'),
      readData('carousel'),
      readData('concerts'),
      readData('contacts'),
      readData('media'),
      readData('members'),
      readData('news'),
      readData('saale')*/
    ]
    Promise.all(promises).then(() => {
      //console.log(DATA);
      DATA.language = language;
      
      res.render('../src/views/adminMain', DATA);
    }).catch(err => {
      if (err) console.log(err)
    })

} catch (e) {
  console.log(e)
}
  
});

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

///////////////////////////////////////////////////
////////////// ALL SECTION GET ROUTES /////////////
///////////////////////////////////////////////////

// LOOP ALL SECTIONS AND CREATE GET ROUTE FOR EACH

const sections = ['about', 'header', 'concerts', 'contacts', 'media', 'members', 'news', 'saale'];

for (let section of sections) {
  router.get('/admin/' + section , async (req, res) => {
    try {
      let DATA = {}
      let promises
      // READ LOCALDB DATA
      // Asynchronous read
      // menu on kõigile sama
  
      if (section === 'header') {
        promises = [
          readData('global', DATA),
          readData(section, DATA),
          readData(section, DATA, 'eng'),
          readData('concerts', DATA),
          readData('concerts', DATA, 'eng'),
          readData('news', DATA),
          readData('news', DATA, 'eng')
        ]
      } else {
        promises = [
          readData('global', DATA),
          readData(section, DATA),
          readData(section, DATA, 'eng')
        ]
      }

      Promise.all(promises).then(() => {
        //console.log(DATA);
        //DATA.language = language;
        let capSection = section.slice(0, 1).toUpperCase() + section.slice(1, section.length);
        if (section === 'header') {
          res.render('../src/views/admin' + capSection, DATA);
        } else {
          res.render('../src/views/admin' + capSection, DATA);
        }
        
      }).catch(err => {
        if (err) console.log(err)
      })
    } catch (e) {
      console.log(e)
    }
  })
}


//// GET IMAGES PAGE ////
router.get('/admin/images', async (req, res) => {
    try {
      let DATA = {}
      console.log('1')
      // READ LOCALDB DATA
      // Asynchronous read
      // menu on kõigile sama
      let promises = [
        readData('global', DATA),
        readData('media', DATA),
        readData('media', DATA, 'eng')
      ]
      console.log('2')
      Promise.all(promises).then(() => {

        console.log(req.body)
        if (req.query.xml) {

          console.log('got xml')
          // remove menu
          delete DATA.global;
          // remove ENGLISH media
          delete DATA.media_eng;
          // leave only name, format and onMedia
          for (let image of DATA.media.images) {
            delete image.date;
            delete image.location;
            delete image.author;
            delete image.description
          }
          console.log(DATA)
          console.log('3')
          res.status(200).send(DATA)
        } else {
          //console.log(DATA);
          //DATA.language = language;
          res.render('../src/views/adminMedia' , DATA);
        }

        
      }).catch(err => {
        if (err) console.log(err)
      })
    } catch {
      console.log(e)
    }
})

//////////// GET IMAGES NAME AND FORMAT /////////////
//router.get('/admin/images/names').get


///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

///////////////////////////////////////////////////
/////////////// ADMIN POST REQUESTS ///////////////
///////////////////////////////////////////////////

// HEADER SECTION
router.post('/admin/header', async (req, res) => {
  try {
    console.log(req.body)
    let response;
    let section = req.body.section;
    // FIRST FETCH FILES
    let HEADER = {}
      // READ LOCALDB DATA
      // Asynchronous read
      // menu on kõigile sama
      let readPromises = [
        readData('header', HEADER),
        readData('header', HEADER, 'eng')
      ]

      Promise.all(readPromises).then(() => {
        
        // change data
        ///////////////////////////////////////////
        //              TITLE & BG               //
        ///////////////////////////////////////////
        if (section === 'title') {
          // hidden
          HEADER.header.hidden_bg = req.body.hidden;
          HEADER.header_eng.hidden_bg = req.body.hidden;

          /////// TITLE HEADING ///////

          // heading
          HEADER.header.bg.heading = req.body.heading;
          HEADER.header_eng.bg.heading = req.body.heading_eng;
          
          // heading position
          HEADER.header.bg.heading_pos = req.body.heading_pos;
          HEADER.header_eng.bg.heading_pos = req.body.heading_pos;

          // heading color
          HEADER.header.bg.heading_color = req.body.heading_color;
          HEADER.header_eng.bg.heading_color = req.body.heading_color;

          // heading size
          HEADER.header.bg.heading_size = req.body.heading_size;
          HEADER.header_eng.bg.heading_size = req.body.heading_size;

          /////// TITLE INTRODUCTION ///////

          // introduction
          HEADER.header.bg.introduction = req.body.introduction;
          HEADER.header_eng.bg.introduction = req.body.introduction_eng;
          
          // introduction position
          HEADER.header.bg.introduction_pos = req.body.introduction_pos;
          HEADER.header_eng.bg.introduction_pos = req.body.introduction_pos;

          // introduction color
          HEADER.header.bg.introduction_color = req.body.introduction_color;
          HEADER.header_eng.bg.introduction_color = req.body.introduction_color;

          // introduction size
          HEADER.header.bg.introduction_size = req.body.introduction_size;
          HEADER.header_eng.bg.introduction_size = req.body.introduction_size;

          // title section height
          HEADER.header.bg.height = req.body.height;
          HEADER.header_eng.bg.height = req.body.height;

          // title bg img
          HEADER.header.bg.img = req.body.img;
          HEADER.header_eng.bg.img = req.body.img;

          // title img overlay opacity
          HEADER.header.bg.overlay = req.body.overlay;
          HEADER.header_eng.bg.overlay = req.body.overlay;

          response = {
            status: 'Title updated'
          }
        }
        if (section === 'carousel') {
          // hide/show carousel section
          HEADER.header.hidden_car = req.body.hidden_car
          HEADER.header_eng.hidden_car = req.body.hidden_car

          response = {
            status: 'Carousel updated'
          }
        }
        
        if (section === 'slide') {


          response = {
            status: 'Slide updated'
          }
        }
        


        ///////////////////////////////////////////
        //                CAROUSEL               //
        ///////////////////////////////////////////

        

        // fetch stringified objects
        let header = JSON.stringify(HEADER.header)
        let header_eng = JSON.stringify(HEADER.header_eng)

        // collect both objects in one promise arr
        let writePromises = [
          writeData('header', header),
          writeData('header', header_eng, 'eng')
        ]
        
        // WRITE ALL ASYNC AND RETURN RESOLVE
        Promise.all(writePromises).then(() => {
          res.status(200).send(response)
        }).catch(err => {
          if (err) console.log(err)
        })
      }).catch(err => {
        if (err) console.log(err)
      })
  } catch(e) {
    console.log(e)
  }
})

// ABOUT SECTION
router.post('/admin/about' , async (req, res) => {
  try {
    console.log(req.body)
    let response;

    // FIRST FETCH FILES
    let ABOUT = {}
    let GLOBAL = {}
      // READ LOCALDB DATA
      // Asynchronous read
      // menu on kõigile sama
      let readPromises = [
        readData('global', GLOBAL),
        readData('about', ABOUT),
        readData('about', ABOUT, 'eng')
      ]

      Promise.all(readPromises).then(() => {
        
        // change data
        // heading
        if (ABOUT.about.heading != req.body.heading) {
          updateAdminMenu('about', req.body.heading, GLOBAL)
        }
        ABOUT.about.heading = req.body.heading;
        ABOUT.about_eng.heading = req.body.heading_eng;
        
        // heading position
        ABOUT.about.heading_pos = req.body.heading_pos;
        ABOUT.about_eng.heading_pos = req.body.heading_pos;
        //hidden
        ABOUT.about.hidden = req.body.hidden;
        ABOUT.about_eng.hidden = req.body.hidden;
        //paragraphs
        ABOUT.about.paragraphs = req.body.paragraphs;
        ABOUT.about_eng.paragraphs = req.body.paragraphsENG
        // img
        ABOUT.about.img = req.body.img
        ABOUT.about_eng.img = req.body.img
        // img_pos
        ABOUT.about.img_pos = req.body.img_pos;
        ABOUT.about_eng.img_pos = req.body.img_pos;
        
        // fetch stringified objects
        let about = JSON.stringify(ABOUT.about)
        let about_eng = JSON.stringify(ABOUT.about_eng)
        let global = JSON.stringify(GLOBAL.global)

        response = {
          status: 'Saved',
          heading: req.body.heading
        }

        // collect both objects in one promise arr
        let writePromises = [
          writeData('about', about),
          writeData('about', about_eng, 'eng'),
          writeData('global', global)
        ]
        
        // WRITE ALL ASYNC AND RETURN RESOLVE
        Promise.all(writePromises).then(() => {
          res.status(200).send(response)
        }).catch(err => {
          if (err) console.log(err)
        })
      }).catch(err => {
        if (err) console.log(err)
      })
  } catch (e) {
    console.log(e)
  }
})

// SAALE SECTION
router.post('/admin/saale' , async (req, res) => {
  try {
    console.log(req.body)
    let response;

    // FIRST FETCH FILES
    let SAALE = {}
    let GLOBAL = {}
      // READ LOCALDB DATA
      // Asynchronous read
      // menu on kõigile sama
      let readPromises = [
        readData('global', GLOBAL),
        readData('saale', SAALE),
        readData('saale', SAALE, 'eng')
      ]

      Promise.all(readPromises).then(() => {
        //console.log(DATA);
        
        // change data
        // heading
        if (SAALE.saale.heading != req.body.heading) {
          updateAdminMenu('saale', req.body.heading, GLOBAL)
        }
        SAALE.saale.heading = req.body.heading;
        SAALE.saale_eng.heading = req.body.heading_eng;
        // heading position
        SAALE.saale.heading_pos = req.body.heading_pos;
        SAALE.saale_eng.heading_pos = req.body.heading_pos;
        //hidden
        SAALE.saale.hidden = req.body.hidden;
        SAALE.saale_eng.hidden = req.body.hidden;
        //paragraphs
        SAALE.saale.paragraphs = req.body.paragraphs;
        SAALE.saale_eng.paragraphs = req.body.paragraphsENG
        // img
        SAALE.saale.img = req.body.img
        SAALE.saale_eng.img = req.body.img
        // img_pos
        SAALE.saale.img_pos = req.body.img_pos;
        SAALE.saale_eng.img_pos = req.body.img_pos;

        response = {
          status: 'Saved',
          heading: req.body.heading
        }
        
        // fetch stringified objects
        let saale = JSON.stringify(SAALE.saale)
        let saale_eng = JSON.stringify(SAALE.saale_eng)
        let global = JSON.stringify(GLOBAL.global)

        // collect both objects in one promise arr
        let writePromises = [
          writeData('saale', saale),
          writeData('saale', saale_eng, 'eng'),
          writeData('global', global)
        ]
        
        // WRITE ALL ASYNC AND RETURN RESOLVE
        Promise.all(writePromises).then(() => {
          res.status(200).send(response)
        }).catch(err => {
          if (err) console.log(err)
        })
      }).catch(err => {
        if (err) console.log(err)
      })
  } catch (e) {
    console.log(e)
  }
})


//// UPLOAD IMAGES ////
router.post('/admin/images' , async (req, res) => {
  try {
    //let DATA = {}

    // READ LOCALDB DATA
    // Asynchronous read
    // menu on kõigile sama
    /*
    
    */
    /*
    
    */

   if(!req.files) {
    res.send({
        status: false,
        message: 'No file uploaded'
    });
    } else {
        // use the name of the input field (i.e. "avatar") 
        // to retrieve the uploaded file


        //let image = req.files.image;
        let uploadedImages = req.files.images;
        // if no array present..
        if (!Array.isArray(uploadedImages)) {
          uploadedImages = [uploadedImages]
        }
        let newData = []
        

      
        ////////////// GET IMAGE FORMAT ///////////////
        let formats = ['jpeg', 'jpg', 'png', 'bmp', 'gif', 'vnd.microsoft.icon', 'svg+xml', 'tiff', 'webp']
        
        for (let image of uploadedImages) {
          let imgFormat;
          for (let format of formats) {
            if (image.mimetype.includes(format)) {
              imgFormat = '.' + format;
            }
          }
          ///////////////////////////////////////////////
          ///////// GEN UNIQUE ID FOR IMG NAME //////////
          let imgID = uniqid();
          ///////////////////////////////////////////////

          // use the mv() method to place the file in 
          image.mv('./public/img/' + imgID + imgFormat);

          ///////////////////////////////////////////////

          /////////// SAVE NEW IMAGE OBJECT /////////////


          let newImage = {
            id: imgID,
            format: imgFormat,
            date: '',
            location: '',
            description: 'Uus pilt',
            author: '',
            onMedia: true
          }

          newData.push(newImage)

        }
        
        

        
        

        


        

        

        ///////////////////////////////////////////////

        

        /////////////// GET JSON FILES ////////////////
        let DATA = {};
        let readpPromises = [
          readData('media', DATA),
          readData('media', DATA, 'eng')
        ]

        
        Promise.all(readpPromises).then(() => {
          
          // change data
          // heading
          for (let newImg of newData) {
            DATA.media.images.push(newImg)
            DATA.media_eng.images.push(newImg)
          }
          
          
          
          // fetch stringified objects
          let media = JSON.stringify(DATA.media)
          let media_eng = JSON.stringify(DATA.media_eng)

          // collect both objects in one promise arr
          let writePromises = [
            writeData('media', media),
            writeData('media', media_eng, 'eng')
          ]
          
          // WRITE ALL ASYNC AND RETURN RESOLVE
          Promise.all(writePromises).then(() => {
            //res.status(200).send('OK')

            

            //send response
            res.status(200).send({
                status: true,
                message: 'File is uploaded'
            });
          }).catch(err => {
            if (err) console.log(err)
          })

        }).catch(err => {
          if (err) console.log(err)
        })

        ///////////////////////////////////////////////

        
    }
    
  } catch (e){
    console.log(e)
  }
})

// EDIT IMAGES 
router.post('/admin/images/edit' , async (req, res) => {
  try {
    console.log(req.body)


    // FIRST FETCH FILES
    let DATA = {}
  
      // READ LOCALDB DATA
      // Asynchronous read
      // menu on kõigile sama
      let readPromises = [
        readData('media', DATA),
        readData('media', DATA, 'eng')
      ]

      Promise.all(readPromises).then(() => {
        //console.log(DATA);
        
        // GET IMAGE BY ID AND REPLACE DATA
        for (let i = 0; i < DATA.media.images.length; i++) {
          if (DATA.media.images[i].id === req.body.id) {
            // description
            DATA.media.images[i].description = req.body.desc;
            // author
            DATA.media.images[i].author = req.body.author;
            // date
            DATA.media.images[i].date = req.body.date;
            // enable/disable
            DATA.media.images[i].onMedia = req.body.onMedia
            break;
          }
        }
        // ENG
        for (let i = 0; i < DATA.media_eng.images.length; i++) {
          if (DATA.media_eng.images[i].id === req.body.id) {
            // description
            DATA.media_eng.images[i].description = req.body.desc_eng;
            // author
            DATA.media_eng.images[i].author = req.body.author;
            // date
            DATA.media_eng.images[i].date = req.body.date;
            // enable/disable
            DATA.media_eng.images[i].onMedia = req.body.onMedia
            break;
          }
        }

        // fetch stringified objects
        let media = JSON.stringify(DATA.media)
        let media_eng = JSON.stringify(DATA.media_eng)

        // collect both objects in one promise arr
        let writePromises = [
          writeData('media', media),
          writeData('media', media_eng, 'eng')
        ]
        
        // WRITE ALL ASYNC AND RETURN RESOLVE
        Promise.all(writePromises).then(() => {
          res.status(200).send('IMAGE UPDATED')
        }).catch(err => {
          if (err) console.log(err)
        })
      }).catch(err => {
        if (err) console.log(err)
      })
  } catch (e) {
    console.log(e)
  }
})



// DELETE IMAGES 
router.post('/admin/images/delete' , async (req, res) => {
  try {
    console.log(req.body)
    let id = req.body.id;
    let name = req.body.name
    let respnse;

    // FIRST FETCH FILES
    let DATA = {}
  
      // READ LOCALDB DATA
      // Asynchronous read
      // menu on kõigile sama
      let readPromises = [
        readData('media', DATA),
        readData('media', DATA, 'eng')
      ]

      Promise.all(readPromises).then(() => {
        //console.log(DATA);
        
        // GET IMAGE BY ID AND DELETE IT
        for (let i = 0; i < DATA.media.images.length; i++) {
          if (DATA.media.images[i].id === req.body.id) {
            // delete img
            DATA.media.images.splice(i, 1)
            break;
          }
        }
        // ENG
        for (let i = 0; i < DATA.media_eng.images.length; i++) {
          if (DATA.media_eng.images[i].id === req.body.id) {
            // delete eng img
            DATA.media_eng.images.splice(i, 1)
            break;
          }
        }

        // fetch stringified objects
        let media = JSON.stringify(DATA.media)
        let media_eng = JSON.stringify(DATA.media_eng)

        // set path
        let path = './public/img/' + name

        // collect both objects in one promise arr
        let writePromises = [
          writeData('media', media),
          writeData('media', media_eng, 'eng'),
          deleteFile(path)
        ]
        
        // WRITE ALL ASYNC AND RETURN RESOLVE
        Promise.all(writePromises).then(() => {
          res.status(200).send('IMAGE DELETED AND LOCAL DB UPDATED')
        }).catch(err => {
          if (err) console.log(err)
        })
      }).catch(err => {
        if (err) console.log(err)
      })
  } catch (e) {
    console.log(e)
  }
})

// EDIT VIDEOS 
router.post('/admin/videos/edit' , async (req, res) => {
  try {
    console.log(req.body)
    const action = req.body.action;
    const id = req.body.id;

    // FIRST FETCH FILES
    let DATA = {}
    let GLOBAL = {}
      // READ LOCALDB DATA
      // Asynchronous read
      // menu on kõigile sama
      let readPromises = [
        readData('global', GLOBAL),
        readData('media', DATA),
        readData('media', DATA, 'eng')
      ]

      Promise.all(readPromises).then(() => {
        console.log(DATA);
        let response;
        if (action === 'update') {
          // GET VIDEO BY ID AND REPLACE DATA
        
          for (let i = 0; i < DATA.media.videos.length; i++) {
            if (DATA.media.videos[i].id === id) {
              // description
              DATA.media.videos[i].description = req.body.description;
              // author
              DATA.media.videos[i].author = req.body.author;
              // date
              DATA.media.videos[i].date = req.body.date;
              // enable/disable
              DATA.media.videos[i].onMedia = req.body.onMedia
              break;
            }
          }
          // ENG
          for (let i = 0; i < DATA.media_eng.videos.length; i++) {
            if (DATA.media_eng.videos[i].id === id) {
              // description
              DATA.media_eng.videos[i].description = req.body.description_eng;
              // author
              DATA.media_eng.videos[i].author = req.body.author;
              // date
              DATA.media_eng.videos[i].date = req.body.date;
              // enable/disable
              DATA.media_eng.videos[i].onMedia = req.body.onMedia
              break;
            }
          }
          response = {
            status: 'video ' + id + ' updated',
            videoData: {
              id,
              description: req.body.description,
              description_eng: req.body.description_eng,
              date: req.body.date,
              author: req.body.author,
              onMedia: req.body.onMedia
            }
          }

        }

        if (action === 'create') {
          let newID = uniqid();

          // handle youtube link
          let videoID = req.body.videoID
          if (!videoID.includes('youtube.com')) throw new Error('Wrong youtube link')

          videoID = videoID.slice(videoID.indexOf('v=') + 2, videoID.length)

          let newVideo = {
            id: newID,
            link: videoID,
            date:'',
            location: '',
            description: '',
            author:'',
            onMedia : false
          }
          // unshift new video
          DATA.media.videos.unshift(newVideo)
          DATA.media_eng.videos.unshift(newVideo)
          response = {
            status: 'video ' + newID + ' created',
            videoData: {
              id: newVideo.id,
              link: newVideo.link,
              onMedia: newVideo.onMedia
            }
          }
        }

        if (action === 'remove') {
          // GET VIDEO BY ID AND REMOVE
        
          for (let i = DATA.media.videos.length - 1; i >= 0; i--) {
            if (DATA.media.videos[i].id === id) {
              DATA.media.videos.splice(i, 1)
              break;
            }
          }
          // ENG
          for (let i = DATA.media_eng.videos.length - 1; i >= 0; i--) {
            if (DATA.media_eng.videos[i].id === id) {
              DATA.media_eng.videos.splice(i, 1)
              break;
            }
          }

          response = {
            status: 'video ' + id + ' removed',
            videoData: {
              id
            }
          }

        }
        
        // HIDE/SHOW WHOLE MEDIA SECTIONS
        if (action === 'editMedia') {
          DATA.media.hidden_img = req.body.hidden_img
          DATA.media.hidden_vid = req.body.hidden_vid
          DATA.media.hidden_snd = req.body.hidden_snd

          DATA.media_eng.hidden_img = req.body.hidden_img
          DATA.media_eng.hidden_vid = req.body.hidden_vid
          DATA.media_eng.hidden_snd = req.body.hidden_snd

          response = {
            status: 'section visibilities updated'
          }
        }
        if (action === 'mainHeading') {
          updateAdminMenu('media', req.body.mainHeading, GLOBAL)

          DATA.media.heading = req.body.mainHeading;
          DATA.media_eng.heading = req.body.mainHeading_eng

          DATA.media.heading_pos = req.body.mainHeading_pos;
          DATA.media_eng.heading_pos = req.body.mainHeading_pos

          response = {
            status: 'mainHeading',
            mainHeading: req.body.mainHeading
          }
        }

        // fetch stringified objects
        let media = JSON.stringify(DATA.media)
        let media_eng = JSON.stringify(DATA.media_eng)
        let global = JSON.stringify(GLOBAL.global)
        // collect both objects in one promise arr
        
        let writePromises = [
          writeData('media', media),
          writeData('media', media_eng, 'eng'),
          writeData('global', global)
        ]
        
        // WRITE ALL ASYNC AND RETURN RESOLVE
        Promise.all(writePromises).then(() => {
          res.status(200).send(response)
        }).catch(err => {
          if (err) console.log(err)
        })
        
      }).catch(err => {
        if (err) console.log(err)
      })
  } catch (e) {
    console.log(e)
  }
})

// EDIT VIDEOS 
router.post('/admin/sound/edit' , async (req, res) => {
  try {
    console.log(req.body)
    const action = req.body.action;
    const id = req.body.id;

    // FIRST FETCH FILES
    let DATA = {}
  
      // READ LOCALDB DATA
      // Asynchronous read
      // menu on kõigile sama
      let readPromises = [
        readData('media', DATA),
        readData('media', DATA, 'eng')
      ]

      Promise.all(readPromises).then(() => {
        console.log(DATA);
        let response;
        if (action === 'update') {
          // GET VIDEO BY ID AND REPLACE DATA
        
          for (let i = 0; i < DATA.media.sound.length; i++) {
            if (DATA.media.sound[i].id === id) {
              // enable/disable
              DATA.media.sound[i].onMedia = req.body.onMedia
              break;
            }
          }
          // ENG
          for (let i = 0; i < DATA.media_eng.sound.length; i++) {
            if (DATA.media_eng.sound[i].id === id) {
              // enable/disable
              DATA.media_eng.sound[i].onMedia = req.body.onMedia
              break;
            }
          }
          response = {
            status: 'sound ' + id + ' updated',
            soundData: {
              id,
              onMedia: req.body.onMedia
            }
          }

        }

        if (action === 'create') {
          let newID = uniqid();

          // handle youtube link
          let embed = req.body.embed
          if (!embed.includes('soundcloud.com')) throw new Error('Wrong soundcloud link')

          //videoID = videoID.slice(videoID.indexOf('v=') + 2, videoID.length)

          let newSound = {
            id: newID,
            link: embed,
            onMedia : false
          }
          // unshift new sound
          DATA.media.sound.unshift(newSound)
          DATA.media_eng.sound.unshift(newSound)
          response = {
            status: 'sound ' + newID + ' created',
            soundData: {
              id: newSound.id,
              link: newSound.link,
              onMedia: newSound.onMedia
            }
          }
        }

        if (action === 'remove') {
          // GET VIDEO BY ID AND REMOVE
        
          for (let i = DATA.media.sound.length - 1; i >= 0; i--) {
            if (DATA.media.sound[i].id === id) {
              DATA.media.sound.splice(i, 1)
              break;
            }
          }
          // ENG
          for (let i = DATA.media_eng.sound.length - 1; i >= 0; i--) {
            if (DATA.media_eng.sound[i].id === id) {
              DATA.media_eng.sound.splice(i, 1)
              break;
            }
          }

          response = {
            status: 'sound ' + id + ' removed',
            soundData: {
              id
            }
          }

        }
        
        

        // fetch stringified objects
        let media = JSON.stringify(DATA.media)
        let media_eng = JSON.stringify(DATA.media_eng)
        
        // collect both objects in one promise arr
        
        let writePromises = [
          writeData('media', media),
          writeData('media', media_eng, 'eng')
        ]
        
        // WRITE ALL ASYNC AND RETURN RESOLVE
        Promise.all(writePromises).then(() => {
          res.status(200).send(response)
        }).catch(err => {
          if (err) console.log(err)
        })
        
      }).catch(err => {
        if (err) console.log(err)
      })
  } catch (e) {
    console.log(e)
  }
})

// CONCERTS SECTION
router.post('/admin/concerts' , async (req, res) => {
  try {
    console.log(req.body)
    let action = req.body.action;
    let sectionHidden = req.body.status
    let concertEst;
    let concertEng;
    if (action === 'update') {
      console.log('update')
      concertEst = {
        id: req.body.id,
        heading: req.body.heading,
        hidden: req.body.hidden,
        description: req.body.description,
        img: req.body.img,
        img_pos: req.body.img_pos,
        subHeadings: req.body.subHeadings,
        program: req.body.program,
        artists: req.body.artists,
        loc_date: req.body.loc_date,
        tickets: req.body.tickets
      }

      concertEng = {
        id: req.body.id,
        heading: req.body.heading_eng,
        hidden: req.body.hidden,
        description: req.body.description_eng,
        img: req.body.img,
        img_pos: req.body.img_pos,
        subHeadings: req.body.subHeadings_eng,
        program: req.body.program_eng,
        artists: req.body.artists_eng,
        loc_date: req.body.loc_date_eng,
        tickets: req.body.tickets_eng
      }
      
    }
    // create new concert
    if (action === 'new') {
      console.log('new')
      let newID = uniqid()
      concertEst = {
        id: newID,
        heading: 'Uus kontsert',
        hidden: true,
        description: '',
        img: '',
        img_pos: 'left',
        subHeadings: [],
        program: [],
        artists: [],
        loc_date: [],
        tickets: ''
      }

      concertEng = {
        id: newID,
        heading: 'New concert',
        hidden: true,
        description: '',
        img: '',
        img_pos: 'left',
        subHeadings: [],
        program: [],
        artists: [],
        loc_date: [],
        tickets: ''
      } 
    }
    //console.log(NEW)
    //console.log(concertEst)
    //console.log(concertEng)
    
    
    // FIRST FETCH FILES
    let CONCERTS = {}
    let GLOBAL = {}
      
      // READ LOCALDB DATA
      // Asynchronous read
      // menu on kõigile sama
      let readPromises = [
        readData('concerts', CONCERTS),
        readData('concerts', CONCERTS, 'eng'),
        readData('global', GLOBAL)
      ]

      Promise.all(readPromises).then(() => {
        //console.log(DATA);
        
        if (action === 'update') { // update concert
          console.log('update 2')
          // overwrite concert
          // find by id
          // est
          for (let i = CONCERTS.concerts.concerts.length - 1; i >= 0; i--) {
            if (CONCERTS.concerts.concerts[i].id === concertEst.id) {
              console.log('found match')
              CONCERTS.concerts.concerts.splice(i, 1, concertEst)
              break;
            }
          }
          // eng
          for (let i = CONCERTS.concerts_eng.concerts.length - 1; i >= 0; i--) {
            if (CONCERTS.concerts_eng.concerts[i].id === concertEng.id) {
              console.log('found match')
              CONCERTS.concerts_eng.concerts.splice(i, 1, concertEng)
              break;
            }
          }
          response = {
            status: 'updated',
            concertEst,
            concertEng,
            id: req.body.id
          }
        } else if (action === 'hidden') {
          // show/hide section from the homepage
          CONCERTS.concerts.hidden = sectionHidden;
          CONCERTS.concerts_eng.hidden = sectionHidden;
          //let hiddenVal = sectionHidden === true ? 'hidden' : 'visible';
          response = {
            status: 'hidden',
            value: req.body.status
          }
        } else if (action === 'new') {
          console.log('new 2')
          // add new concert
          CONCERTS.concerts.concerts.unshift(concertEst)
          CONCERTS.concerts_eng.concerts.unshift(concertEng)
          response = {
            status: 'created',
            concertEst,
            concertEng
          }
        } else if (action === 'remove') {
          // remove concert
          // find by id
          let id = req.body.id;
          // est
          for (let i = CONCERTS.concerts.concerts.length - 1; i >= 0; i--) {
            if (CONCERTS.concerts.concerts[i].id === id) {
              CONCERTS.concerts.concerts.splice(i, 1)
              break;
            }
          }
          // eng
          for (let i = CONCERTS.concerts_eng.concerts.length - 1; i >= 0; i--) {
            if (CONCERTS.concerts_eng.concerts[i].id === id) {
              CONCERTS.concerts_eng.concerts.splice(i, 1)
              break;
            }
          }
          response = {
            status: 'removed',
            id: req.body.id
          }
        }
        if (action === 'mainHeading') {
          updateAdminMenu('concerts', req.body.mainHeading, GLOBAL)

          CONCERTS.concerts.heading = req.body.mainHeading;
          CONCERTS.concerts_eng.heading = req.body.mainHeading_eng

          CONCERTS.concerts.heading_pos = req.body.mainHeading_pos;
          CONCERTS.concerts_eng.heading_pos = req.body.mainHeading_pos

          response = {
            status: 'mainHeading',
            mainHeading: req.body.mainHeading
          }
        }
        
        // fetch stringified objects
        let concerts = JSON.stringify(CONCERTS.concerts)
        let concerts_eng = JSON.stringify(CONCERTS.concerts_eng)
        let global = JSON.stringify(GLOBAL.global)
        // collect both objects in one promise arr
        
        let writePromises = [
          writeData('concerts', concerts),
          writeData('concerts', concerts_eng, 'eng'),
          writeData('global', global)
        ]
        
        // WRITE ALL ASYNC AND RETURN RESOLVE
        Promise.all(writePromises).then(() => {
          res.status(200).send(response)
        }).catch(err => {
          if (err) console.log(err)
        })
      }).catch(err => {
        if (err) console.log(err)
      })
      
  } catch (e) {
    console.log(e)
  }
})

// NEWS SECTION
router.post('/admin/news' , async (req, res) => {
  try {
    console.log(req.body)
    let action = req.body.action;
    let sectionHidden = req.body.status;
    let articleEst;
    let articleEng;


    if (action === 'update') {
      

      console.log('update')
      articleEst = {
        id: req.body.id,
        heading: req.body.heading,
        hidden: req.body.hidden,
        paragraphs: req.body.paragraphs,
        img: req.body.img,
        img_pos: req.body.img_pos,
        subHeadings: req.body.subHeadings,
        sources: req.body.sources,
        quotes: req.body.quotes,
        author: req.body.author
      }

      articleEng = {
        id: req.body.id,
        heading: req.body.heading_eng,
        hidden: req.body.hidden,
        paragraphs: req.body.paragraphs_eng,
        img: req.body.img,
        img_pos: req.body.img_pos,
        subHeadings: req.body.subHeadings_eng,
        sources: req.body.sources,
        quotes: req.body.quotes_eng,
        author: req.body.author
      }
      
    }
    // create new concert
    if (action === 'new') {

      // get date
      let isoDate = new Date();
      let day = isoDate.getDate()
      if (day < 10) {
        day = '0' + day.toString()
      } else day = day.toString()
      let month = isoDate.getMonth()
      if (month < 10) {
        month = '0' + month.toString()
      } else month = month.toString()
      let year = isoDate.getFullYear();
      finalDate = `${day}.${month}.${year}`

      console.log('new')
      let newID = uniqid()
      articleEst = {
        id: newID,
        heading: 'Uus lugu',
        hidden: true,
        paragraphs: [],
        img: '',
        img_pos: 'left',
        subHeadings: [],
        sources: [],
        quotes: [],
        author: '',
        isoDate,
        date: finalDate
      }

      articleEng = {
        id: newID,
        heading: 'New story',
        hidden: true,
        paragraphs: [],
        img: '',
        img_pos: 'left',
        subHeadings: [],
        sources: [],
        quotes: [],
        author: '',
        isoDate,
        date: finalDate
      } 
    }
    //console.log(NEW)
    //console.log(concertEst)
    //console.log(concertEng)
    
    
    // FIRST FETCH FILES
    let NEWS = {}
    let GLOBAL = {}
      
      // READ LOCALDB DATA
      // Asynchronous read
      // menu on kõigile sama
      let readPromises = [
        readData('news', NEWS),
        readData('news', NEWS, 'eng'),
        readData('global', GLOBAL)
      ]

      Promise.all(readPromises).then(() => {
        //console.log(DATA);
        
        if (action === 'update') { // update concert
          console.log('update 2')
          // overwrite concert
          // find by id
          // est
          for (let i = NEWS.news.articles.length - 1; i >= 0; i--) {
            if (NEWS.news.articles[i].id === articleEst.id) {
              console.log('found match')
              
              articleEst.isoDate = NEWS.news.articles[i].isoDate

              articleEst.date = NEWS.news.articles[i].date

              NEWS.news.articles.splice(i, 1, articleEst)
              break;
            }
          }
          // eng
          for (let i = NEWS.news_eng.articles.length - 1; i >= 0; i--) {
            if (NEWS.news_eng.articles[i].id === articleEng.id) {
              console.log('found match')

              articleEng.isoDate = NEWS.news_eng.articles[i].isoDate

              articleEng.date = NEWS.news_eng.articles[i].date

              NEWS.news_eng.articles.splice(i, 1, articleEng)
              break;
            }
          }
          response = {
            status: 'updated',
            articleEst,
            articleEng,
            id: req.body.id
          }
        } else if (action === 'hidden') {
          // show/hide section from the homepage
          console.log(NEWS.news)
          console.log(sectionHidden)
          NEWS.news.hidden = sectionHidden;
          NEWS.news_eng.hidden = sectionHidden;
          //let hiddenVal = sectionHidden === true ? 'hidden' : 'visible';
          response = {
            status: 'hidden',
            value: req.body.status
          }
        } else if (action === 'new') {
          // add new concert
          NEWS.news.articles.unshift(articleEst)
          NEWS.news_eng.articles.unshift(articleEng)
          response = {
            status: 'created',
            articleEst,
            articleEng
          }
        } else if (action === 'remove') {
          // remove concert
          // find by id
          let id = req.body.id;
          // est
          for (let i = NEWS.news.articles.length - 1; i >= 0; i--) {
            if (NEWS.news.articles[i].id === id) {
              NEWS.news.articles.splice(i, 1)
              break;
            }
          }
          // eng
          for (let i = NEWS.news_eng.articles.length - 1; i >= 0; i--) {
            if (NEWS.news_eng.articles[i].id === id) {
              NEWS.news_eng.articles.splice(i, 1)
              break;
            }
          }
          response = {
            status: 'removed',
            id: req.body.id
          }
        }
        if (action === 'mainHeading') {
          updateAdminMenu('news', req.body.mainHeading, GLOBAL)

          NEWS.news.heading = req.body.mainHeading;
          NEWS.news_eng.heading = req.body.mainHeading_eng

          NEWS.news.heading_pos = req.body.mainHeading_pos;
          NEWS.news_eng.heading_pos = req.body.mainHeading_pos

          response = {
            status: 'mainHeading',
            mainHeading: req.body.mainHeading
          }
        }
        
        // fetch stringified objects
        let news = JSON.stringify(NEWS.news)
        let news_eng = JSON.stringify(NEWS.news_eng)
        let global = JSON.stringify(GLOBAL.global)
        // collect both objects in one promise arr
        
        let writePromises = [
          writeData('news', news),
          writeData('news', news_eng, 'eng'),writeData('global', global)
        ]
        
        // WRITE ALL ASYNC AND RETURN RESOLVE
        Promise.all(writePromises).then(() => {
          res.status(200).send(response)
        }).catch(err => {
          if (err) console.log(err)
        })
      }).catch(err => {
        if (err) console.log(err)
      })
      
  } catch (e) {
    console.log(e)
  }
})

// NEWS SECTION
router.post('/admin/members' , async (req, res) => {
  try {
    console.log(req.body)
    let action = req.body.action;
    let sectionHidden = req.body.status;
    let memberEst;
    let memberEng;

    


    if (action === 'update') {
      
      let isoDate = '';
      if (req.body.birthDay != '') {
        isoDate = isoDate = createIsoDate(req.body.birthDay, 'input_date')
      }
      console.log(req.body.contacts)
      console.log('update')
      memberEst = {
        id: req.body.id,
        name: req.body.name,
        hidden: req.body.hidden,
        birthDay: req.body.birthDay,
        img: req.body.img,
        img_pos: req.body.img_pos,
        instruments: req.body.instruments,
        bio: req.body.bio,
        contacts: req.body.contacts,
        isoDate
      }

      memberEng = {
        id: req.body.id,
        name: req.body.name,
        hidden: req.body.hidden,
        birthDay: req.body.birthDay,
        img: req.body.img,
        img_pos: req.body.img_pos,
        instruments: req.body.instruments_eng,
        bio: req.body.bio_eng,
        contacts: req.body.contacts,
        isoDate
      }
      
    }
    // create new concert
    if (action === 'new') {
      let isoDate = '';
      
      console.log('new')
      let newID = uniqid()
      memberEst = {
        id: newID,
        name: 'Nimi puudub',
        hidden: true,
        birthDay: '',
        img: '',
        img_pos: 'left',
        instruments: 'Eriala puudub',
        bio: '',
        contacts: {
          phone: {
            public: true,
            number: ""
          },
          email: {
            public: true,
            address: ""
          }
        },
        isoDate
      }

      memberEng = {
        id: newID,
        name: 'No name',
        hidden: true,
        birthDay: '',
        img: '',
        img_pos: 'left',
        instruments: 'No profession',
        bio: '',
        contacts: {
          phone: {
            public: true,
            number: ""
          },
          email: {
            public: true,
            address: ""
          }
        },
        isoDate
      } 
    }
    //console.log(NEW)
    //console.log(concertEst)
    //console.log(concertEng)
    
    
    // FIRST FETCH FILES
    let MEMBERS = {}
    let GLOBAL = {}
      
      // READ LOCALDB DATA
      // Asynchronous read
      // menu on kõigile sama
      let readPromises = [
        readData('global', GLOBAL),
        readData('members', MEMBERS),
        readData('members', MEMBERS, 'eng')
      ]

      Promise.all(readPromises).then(() => {
        //console.log(DATA);
        
        if (action === 'update') { // update concert
          console.log('update 2')
          // overwrite concert
          // find by id
          // est
          for (let i = MEMBERS.members.members.length - 1; i >= 0; i--) {
            if (MEMBERS.members.members[i].id === memberEst.id) {
              console.log('found match')
              
              MEMBERS.members.members.splice(i, 1, memberEst)
              break;
            }
          }
          // eng
          for (let i = MEMBERS.members_eng.members.length - 1; i >= 0; i--) {
            if (MEMBERS.members_eng.members[i].id === memberEng.id) {
              console.log('found match')

               MEMBERS.members_eng.members.splice(i, 1, memberEng)
              break;
            }
          }
          response = {
            status: 'updated',
            memberEst,
            memberEng,
            id: req.body.id
          }
        } else if (action === 'hidden') {
          // show/hide section from the homepage
          console.log(sectionHidden)
          MEMBERS.members.hidden = sectionHidden;
          MEMBERS.members_eng.hidden = sectionHidden;
          //let hiddenVal = sectionHidden === true ? 'hidden' : 'visible';
          response = {
            status: 'hidden',
            value: req.body.status
          }
        } else if (action === 'new') {
          // add new concert
          MEMBERS.members.members.unshift(memberEst)
          MEMBERS.members_eng.members.unshift(memberEng)
          response = {
            status: 'created',
            memberEst,
            memberEng
          }
        } else if (action === 'remove') {
          // remove concert
          // find by id
          let id = req.body.id;
          // est
          for (let i = MEMBERS.members.members.length - 1; i >= 0; i--) {
            if (MEMBERS.members.members[i].id === id) {
              MEMBERS.members.members.splice(i, 1)
              break;
            }
          }
          // eng
          for (let i = MEMBERS.members_eng.members.length - 1; i >= 0; i--) {
            if (MEMBERS.members_eng.members[i].id === id) {
              MEMBERS.members_eng.members.splice(i, 1)
              break;
            }
          }
          response = {
            status: 'removed',
            id: req.body.id
          }
        }
        if (action === 'mainHeading') {
          updateAdminMenu('members', req.body.mainHeading, GLOBAL)

          MEMBERS.members.heading = req.body.mainHeading;
          MEMBERS.members_eng.heading = req.body.mainHeading_eng

          MEMBERS.members.heading_pos = req.body.mainHeading_pos;
          MEMBERS.members_eng.heading_pos = req.body.mainHeading_pos

          response = {
            status: 'mainHeading',
            mainHeading: req.body.mainHeading
          }
        }
        
        // fetch stringified objects
        let members = JSON.stringify(MEMBERS.members)
        let members_eng = JSON.stringify(MEMBERS.members_eng)
        let global = JSON.stringify(GLOBAL.global)
        // collect both objects in one promise arr
        
        let writePromises = [
          writeData('members', members),
          writeData('members', members_eng, 'eng'),
          writeData('global', global)
        ]
        
        // WRITE ALL ASYNC AND RETURN RESOLVE
        Promise.all(writePromises).then(() => {
          res.status(200).send(response)
        }).catch(err => {
          if (err) console.log(err)
        })
      }).catch(err => {
        if (err) console.log(err)
      })
      
  } catch (e) {
    console.log(e)
  }
})

// ABOUT SECTION
router.post('/admin/contacts' , async (req, res) => {
  try {
    console.log(req.body)
    let response;

    // FIRST FETCH FILES
    let CONTACTS = {}
    let GLOBAL = {}
      // READ LOCALDB DATA
      // Asynchronous read
      // menu on kõigile sama
      let readPromises = [
        readData('global', GLOBAL),
        readData('contacts', CONTACTS),
        readData('contacts', CONTACTS, 'eng')
      ]

      Promise.all(readPromises).then(() => {
        //console.log(DATA);
        console.log(CONTACTS.contacts.contacts[0])
        // change data
        let address = ['country', 'province', 'city', 'street1', 'street2', 'postal']
        let keys = ['name', 'companyName', 'tel', 'email']


        for (let key of keys) {
          CONTACTS.contacts.contacts[0][key] = req.body[key];
          CONTACTS.contacts_eng.contacts[0][key] = req.body[key];
        }
        for (let add of address) {
          CONTACTS.contacts.contacts[0].address[add] = req.body[add];
          CONTACTS.contacts_eng.contacts[0].address[add] = req.body[add];
        }

        // init heading separately
        if (CONTACTS.contacts.heading != req.body.mainHeading) {
          updateAdminMenu('contacts', req.body.mainHeading, GLOBAL)
        }
        CONTACTS.contacts.heading = req.body.mainHeading;
        CONTACTS.contacts_eng.heading = req.body.mainHeading_eng;
        CONTACTS.contacts.heading_pos = req.body.mainHeading_pos;
        CONTACTS.contacts_eng.heading_pos = req.body.mainHeading_pos;

        // hidden
        CONTACTS.contacts.hidden = req.body.hidden;
        CONTACTS.contacts_eng.hidden = req.body.hidden;

        response = {
          status: 'updated',
          mainHeading: req.body.mainHeading
        }
        
        // fetch stringified objects
        
        let contacts = JSON.stringify(CONTACTS.contacts)
        let contacts_eng = JSON.stringify(CONTACTS.contacts_eng)
        let global = JSON.stringify(GLOBAL.global)
        // collect both objects in one promise arr
        
        let writePromises = [
          writeData('contacts', contacts),
          writeData('contacts', contacts_eng, 'eng'),
          writeData('global', global)
        ]
        
        
        // WRITE ALL ASYNC AND RETURN RESOLVE
        Promise.all(writePromises).then(() => {
          res.status(200).send(response)
        }).catch(err => {
          if (err) console.log(err)
        })
        
      }).catch(err => {
        if (err) console.log(err)
      })
  } catch (e) {
    console.log(e)
  }
})

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

module.exports = router;
