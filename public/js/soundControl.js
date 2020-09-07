var SC=SC||{};SC.Widget=function(n){function t(r){if(e[r])return e[r].exports;var o=e[r]={exports:{},id:r,loaded:!1};return n[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var e={};return t.m=n,t.c=e,t.p="",t(0)}([function(n,t,e){function r(n){return!!(""===n||n&&n.charCodeAt&&n.substr)}function o(n){return!!(n&&n.constructor&&n.call&&n.apply)}function i(n){return!(!n||1!==n.nodeType||"IFRAME"!==n.nodeName.toUpperCase())}function a(n){var t,e=!1;for(t in b)if(b.hasOwnProperty(t)&&b[t]===n){e=!0;break}return e}function s(n){var t,e,r;for(t=0,e=I.length;t<e&&(r=n(I[t]),r!==!1);t++);}function u(n){var t,e,r,o="";for("//"===n.substr(0,2)&&(n=window.location.protocol+n),r=n.split("/"),t=0,e=r.length;t<e&&t<3;t++)o+=r[t],t<2&&(o+="/");return o}function c(n){return n.contentWindow?n.contentWindow:n.contentDocument&&"parentWindow"in n.contentDocument?n.contentDocument.parentWindow:null}function l(n){var t,e=[];for(t in n)n.hasOwnProperty(t)&&e.push(n[t]);return e}function d(n,t,e){e.callbacks[n]=e.callbacks[n]||[],e.callbacks[n].push(t)}function E(n,t){var e,r=!0;return t.callbacks[n]=[],s(function(t){if(e=t.callbacks[n]||[],e.length)return r=!1,!1}),r}function f(n,t,e){var r,o,i=c(e);return!!i.postMessage&&(r=e.getAttribute("src").split("?")[0],o=JSON.stringify({method:n,value:t}),"//"===r.substr(0,2)&&(r=window.location.protocol+r),r=r.replace(/http:\/\/(w|wt).soundcloud.com/,"https://$1.soundcloud.com"),void i.postMessage(o,r))}function p(n){var t;return s(function(e){if(e.instance===n)return t=e,!1}),t}function h(n){var t;return s(function(e){if(c(e.element)===n)return t=e,!1}),t}function v(n,t){return function(e){var r=o(e),i=p(this),a=!r&&t?e:null,s=r&&!t?e:null;return s&&d(n,s,i),f(n,a,i.element),this}}function S(n,t,e){var r,o,i;for(r=0,o=t.length;r<o;r++)i=t[r],n[i]=v(i,e)}function R(n,t,e){return n+"?url="+t+"&"+g(e)}function g(n){var t,e,r=[];for(t in n)n.hasOwnProperty(t)&&(e=n[t],r.push(t+"="+("start_track"===t?parseInt(e,10):e?"true":"false")));return r.join("&")}function m(n,t,e){var r,o,i=n.callbacks[t]||[];for(r=0,o=i.length;r<o;r++)i[r].apply(n.instance,e);(a(t)||t===L.READY)&&(n.callbacks[t]=[])}function w(n){var t,e,r,o,i;try{e=JSON.parse(n.data)}catch(a){return!1}return t=h(n.source),r=e.method,o=e.value,(!t||A(n.origin)===A(t.domain))&&(t?(r===L.READY&&(t.isReady=!0,m(t,C),E(C,t)),r!==L.PLAY||t.playEventFired||(t.playEventFired=!0),r!==L.PLAY_PROGRESS||t.playEventFired||(t.playEventFired=!0,m(t,L.PLAY,[o])),i=[],void 0!==o&&i.push(o),void m(t,r,i)):(r===L.READY&&T.push(n.source),!1))}function A(n){return n.replace(Y,"")}var _,y,O,D=e(1),b=e(2),P=e(3),L=D.api,N=D.bridge,T=[],I=[],C="__LATE_BINDING__",k="http://wt.soundcloud.test:9200/",Y=/^http(?:s?)/;window.addEventListener?window.addEventListener("message",w,!1):window.attachEvent("onmessage",w),n.exports=O=function(n,t,e){if(r(n)&&(n=document.getElementById(n)),!i(n))throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.");t&&(e=e||{},n.src=R(k,t,e));var o,a,s=h(c(n));return s&&s.instance?s.instance:(o=T.indexOf(c(n))>-1,a=new _(n),I.push(new y(a,n,o)),a)},O.Events=L,window.SC=window.SC||{},window.SC.Widget=O,y=function(n,t,e){this.instance=n,this.element=t,this.domain=u(t.getAttribute("src")),this.isReady=!!e,this.callbacks={}},_=function(){},_.prototype={constructor:_,load:function(n,t){if(n){t=t||{};var e=this,r=p(this),o=r.element,i=o.src,a=i.substr(0,i.indexOf("?"));r.isReady=!1,r.playEventFired=!1,o.onload=function(){e.bind(L.READY,function(){var n,e=r.callbacks;for(n in e)e.hasOwnProperty(n)&&n!==L.READY&&f(N.ADD_LISTENER,n,r.element);t.callback&&t.callback()})},o.src=R(a,n,t)}},bind:function(n,t){var e=this,r=p(this);return r&&r.element&&(n===L.READY&&r.isReady?setTimeout(t,1):r.isReady?(d(n,t,r),f(N.ADD_LISTENER,n,r.element)):d(C,function(){e.bind(n,t)},r)),this},unbind:function(n){var t,e=p(this);e&&e.element&&(t=E(n,e),n!==L.READY&&t&&f(N.REMOVE_LISTENER,n,e.element))}},S(_.prototype,l(b)),S(_.prototype,l(P),!0)},function(n,t){t.api={LOAD_PROGRESS:"loadProgress",PLAY_PROGRESS:"playProgress",PLAY:"play",PAUSE:"pause",FINISH:"finish",SEEK:"seek",READY:"ready",OPEN_SHARE_PANEL:"sharePanelOpened",CLICK_DOWNLOAD:"downloadClicked",CLICK_BUY:"buyClicked",ERROR:"error"},t.bridge={REMOVE_LISTENER:"removeEventListener",ADD_LISTENER:"addEventListener"}},function(n,t){n.exports={GET_VOLUME:"getVolume",GET_DURATION:"getDuration",GET_POSITION:"getPosition",GET_SOUNDS:"getSounds",GET_CURRENT_SOUND:"getCurrentSound",GET_CURRENT_SOUND_INDEX:"getCurrentSoundIndex",IS_PAUSED:"isPaused"}},function(n,t){n.exports={PLAY:"play",PAUSE:"pause",TOGGLE:"toggle",SEEK_TO:"seekTo",SET_VOLUME:"setVolume",NEXT:"next",PREV:"prev",SKIP:"skip"}}]);

let sndIframeParents = document.getElementsByClassName('sound-iframe')
let sndIframes = []
for (let i = 0; i < sndIframeParents.length; i++) {
  sndIframes.push(sndIframeParents[i].getElementsByTagName('iframe')[0])
  // set id for the sound iframe
  sndIframes[i].setAttribute('id', 'snd-iframe-' + sndIframeParents[i].getAttribute('data-id'))
  //let widget = SC.Widget(sndIframes[i]);
  
  
}

// initialize play/pause buttons
// change playPos pos
function movePlaybar(id, btn) {
  let playPos = document.getElementById('play-pos-' + id);
  let playBar = document.getElementById('playbar-' + id)
  
  //let width = 0;
  let interval = setInterval(frame, 30);
  function frame() {
    // stop if pause button has been pressed
    if (btn.getAttribute('data-action') === 'play') {
      clearInterval(interval);
      
    
    } else {
      SC.Widget(document.getElementById('snd-iframe-' + id)).getPosition(function (pos)  {
        //console.log(pos)
        playBar.setAttribute('data-pos', pos)
        //let dur = parseInt(document.getElementById('playbar-' + id).getAttribute('data-dur'))

        let currentPos = playBar.getAttribute('data-pos')
        let dur = playBar.getAttribute('data-dur')
        //console.log(currentPos)
        //console.log(dur)
        // or stop if song position has reached song duration 
        if (parseInt(currentPos) >= parseInt(dur)-50) {
          clearInterval(interval);
          console.log('stopped')
          //console.log(document.getElementById('toggle-sound-' + id))
          //btn.setAttribute('data-action', 'play')
          //btn.click()
          //SC.Widget(sndIframe).getPosition(function (pos)  {
          playBar.setAttribute('data-pos', pos)
    
          // pause song
          SC.Widget(document.getElementById('snd-iframe-' + id)).pause()
          // reveal play symb
          togPlayHide(id)
          // set song position
          setPlayPos(id, playBar.getAttribute('data-pos'), playBar.getAttribute('data-dur'))
          // set action attribute to play
          btn.setAttribute('data-action', 'play')
          //})
        } else {

          let percent = pos / dur * 100
          playPos.style.width = percent + '%'
        }


        
      })
      //console.log('moving')
      //width++;
      //playPos.width = playPos.width + 1 + '%';
    }
  }
}

let toggleSounds = document.getElementsByClassName('toggle-sound')
for (let snd of toggleSounds) {
  snd.addEventListener('click', function () {
    console.log('clicked')

    let sndID = this.getAttribute('data-id')
    let action = this.getAttribute('data-action')
    let playBar = document.getElementById('playbar-' + sndID)
    let sndIframe = document.getElementById('snd-iframe-' + sndID)

    if (action === 'play') {

      // GET SONG DURATION IF NOT PRESENT
      if (playBar.getAttribute('data-dur') === '') {
        SC.Widget(sndIframe).getDuration(function (dur)  {
          playBar.setAttribute('data-dur', dur)
        })
      }

      // play song
      SC.Widget(sndIframe).play()
      
      // jump to milliseconds
      SC.Widget(sndIframe).seekTo(parseInt(playBar.getAttribute('data-pos')))

      //get & set volume
      SC.Widget(sndIframe).setVolume(playBar.getAttribute('data-vol'))
      
      // reveal pause symb
      togPlayHide(sndID)
      // set action attribute to pause
      this.setAttribute('data-action', 'pause')

      // move play position
      movePlaybar(sndID, this)
    } else {
      // GET SONG POSITION
      SC.Widget(sndIframe).getPosition(function (pos)  {
        playBar.setAttribute('data-pos', pos)

        // pause song
        SC.Widget(sndIframe).pause()
        // reveal play symb
        togPlayHide(sndID)
        // set song position
        setPlayPos(sndID, playBar.getAttribute('data-pos'), playBar.getAttribute('data-dur'))
        // set action attribute to play
        snd.setAttribute('data-action', 'play')
      })
    }
  })
}


const togPlayHide = (id) => {
  let play = document.getElementById('play-' + id)
  let pause = document.getElementById('pause-' + id)
  if (play.classList.contains('fadeOut')) {
    play.classList.add('fadeIn')
    play.classList.remove('fadeOut')
    pause.classList.remove('fadeIn')
    pause.classList.add('fadeOut')
  } else {
    pause.classList.add('fadeIn')
    pause.classList.remove('fadeOut')
    play.classList.remove('fadeIn')
    play.classList.add('fadeOut')
  }
}

const setPlayPos = (id, pos, duration) => {
  let posBar = document.getElementById('play-pos-' + id)
  //console.log(posBar)
  //console.log(pos)
  //console.log(duration)

  let percent = pos / duration * 100

  // round percent to 1 decimal
  //console.log(percent.toFixed(1))
  
  // set playpos length
  posBar.style.width = percent + '%'

}

// INIT PLAYBAR EVENTS
let activeElement = null;
let activePlayBar = null;
let positionInProgress = false;
let playBars = document.getElementsByClassName('playbar-parent');
for (let bar of playBars) {
  // MOUSE DOWN
  bar.addEventListener('mousedown', function (e) {
    positionInProgress = true;
    //console.log(e.clientX)
    //let event = e
    let id = this.getAttribute('data-id')
    activeElement = document.getElementById('play-pos-' + id)
    activePlayBar = document.getElementById('playbar-' + id)
    //console.log('mousedown')

    
    // GET SONG DURATION IF NOT PRESENT
    if (activePlayBar.getAttribute('data-dur') === '') {
      SC.Widget(document.getElementById('snd-iframe-' + id)).getDuration(function (dur) {
        activePlayBar.setAttribute('data-dur', dur)
      })
    }
    
    // mouse move event to window object
    window.addEventListener('mousemove', mouseMove)
    
  })

}
// MOUSE RELEASED
window.addEventListener('mouseup', function (e) {
  if (positionInProgress === true) {
    //console.log('mouseup')

    let mouseX = e.clientX
    changePlayPos(mouseX)
    // remove move event to window object
    window.removeEventListener('mousemove', mouseMove)
    positionInProgress = false;
  }
  
})

const changePlayPos = (mouseX) => {
  //console.log(mouseX)
  let elementXPosLeft = activeElement.getBoundingClientRect().left
  let elementXPosRight = activePlayBar.clientWidth
  let playPosition = mouseX - elementXPosLeft
  // min
  if (playPosition < activeElement.style.left) playPosition = activeElement.style.left;
  // max
  if (playPosition > elementXPosRight) playPosition = elementXPosRight;
  
  activeElement.style.width = playPosition + 'px'

  // set new song position
  // get song duration in milliseconds
  let dur = parseInt(activePlayBar.getAttribute('data-dur'))
  dur = parseInt(dur)
  // get current play position in percent
  let playBarLength = elementXPosRight;
  let currentPlayPos = activeElement.clientWidth
  let playPercent = currentPlayPos / playBarLength * 100;
  playPercent = playPercent.toFixed(2)

  // find current play position in milliseconds
  let millPosition = dur / 100 * playPercent;

  // set data-pos
  activePlayBar.setAttribute('data-pos', millPosition)

  // jump to milliseconds
  SC.Widget(document.getElementById('snd-iframe-' + activePlayBar.getAttribute('data-id'))).seekTo(parseInt(activePlayBar.getAttribute('data-pos')))
  
}

// MOUSE MOVE FUNCTION
let mouseMove = (e) => {
  let mouseX = e.clientX
  changePlayPos(mouseX)
}

// VOULUME CONTROL
let volRanges = document.getElementsByClassName('vol-range');
for (let range of volRanges) {
  range.addEventListener('change', function () {
    //console.log('change')
    let id = this.getAttribute('data-id');
    let val = this.value;
    setVol(id, val)
  })
}

// SET NEW VOLUME
const setVol = (id, val) => {
  let el = document.getElementById('snd-iframe-' + id)
  // set new volume value
  document.getElementById('playbar-' + id).setAttribute('data-vol', val)
  //get & set volume
  SC.Widget(el).setVolume(parseInt(val))
}

