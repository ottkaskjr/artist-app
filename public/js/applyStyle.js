let customStyle = document.getElementById('custom-style')
let titleColor = customStyle.getAttribute('data-title-color')
let titleSize = customStyle.getAttribute('data-title-size')
let introColor = customStyle.getAttribute('data-intro-color')
let introSize = customStyle.getAttribute('data-intro-size')
let titleBg = customStyle.getAttribute('data-img')
let titleOverlay = customStyle.getAttribute('data-overlay')

let w_Height = window.innerHeight;
let perc = customStyle.getAttribute('data-height')
perc = parseInt(perc)
//let height = ((w_Height / 100) * perc)
let height = w_Height / 100
height = height * perc

// init overlay
let titleOverlayTxt = ''
if (titleBg != '') {
titleOverlay = parseInt(titleOverlay)
console.log(titleOverlay)
let bgColor = '#fff';
bgOpac = titleOverlay/100;
console.log(bgOpac)
if (titleOverlay < 0) {
  bgColor = '#000'
  bgOpac = - bgOpac;
}
titleOverlayTxt = '#bg-div-overlay { background: ' + bgColor + '; opacity: ' + bgOpac + ';}'
}
// main title color
//document.getElementById('master-heading').style.color = titleColor
titleBgTxt = ''
if (titleBg != '') {
  titleBgTxt = "background: url('/" +  titleBg + "'); background-repeat: no-repeat; background-size: cover;"
}
let styleTxt = "#master-heading { color: " + titleColor + " !important; font-size: " + titleSize + "px ;} #master-introduction { color: " + introColor + " !important; font-size: " + introSize + "px ;} #bg-div { height: " + height + "px !important; " + titleBgTxt + "} " + titleOverlayTxt

// create style element
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = styleTxt;
document.getElementsByTagName('head')[0].appendChild(style);