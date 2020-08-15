const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');

const port = process.env.PORT || 3000;

// enable files upload
app.use(fileUpload({
  //createParentPath: true
}));

//routes
const homeRouter = require('./src/routers/home');
const adminRouter = require('./src/routers/admin')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

//include extras like css, __dirname is the current directory
app.use(express.static(__dirname + '/public/css/'));
app.use(express.static(__dirname + '/public/js/'));
app.use(express.static(__dirname + '/public/fonts/'));
app.use(express.static(__dirname + '/public/img/'));
app.use(express.static(__dirname + '/public/localdb/'));
app.use(express.static(__dirname + '/public/localdb_backup/'));

//auto-parse incoming JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//method override for using delete and put requests
app.use(methodOverride('_method'));



//user routers
app.use(homeRouter, adminRouter);
//http://localhost:3000
app.listen(port, function() {
  console.log('Server has started on ' + port);
});
