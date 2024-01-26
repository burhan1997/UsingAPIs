'use strict';

const STEP_INTERVAL_MS = 50;
const STEP_SIZE_PX = 10;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    let currentPos = startPos;

    function step(){
      if(currentPos < stopPos){
        currentPos += STEP_SIZE_PX;
        img.style.left = currentPos + 'px';

        setTimeout(step, STEP_INTERVAL_MS);
      }else{
        resolve();
      }
    }
    setTimeout(step, 0);
  });
}

function dance(img) {
  return new Promise((resolve) => {
    let originalSrc = img.src;
    img.src = DANCING_CAT_URL;

    setTimeout(() => {
      img.src = originalSrc;
      resolve()
    }, DANCE_TIME_MS);
  });
}

async function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  
  while (true) {
    // Walk the cat from off-screen to the center
    await walk(img, startPos, centerPos);

    // Dance for a while
    await dance(img);

    // Walk the cat to the other side of the screen
    await walk(img, centerPos, stopPos);
  }
}

window.addEventListener('load', catWalk);