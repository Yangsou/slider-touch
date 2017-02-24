window.addEventListener('load', () => {
  var slideItem = document.querySelectorAll('.slide_menus .menu');
  var numberSlideItem = slideItem.length || 1;

  var $ = document.querySelector.bind(document),
      slider = $('#slider'),
      holder = $('#holder'),
      menus = $('#menus');
  menus.style.width = 300 * numberSlideItem + "px";

  preventDefault = (e) => {
    e.preventDefault();
  }

  startX = undefined,
  endX = undefined,
  slideIndex = 0,
  moveX = undefined,
  touchMoveX = undefined,
  longTouch = undefined,
  slideWidth = slider.clientWidth;

  holder.addEventListener('mousedown', (e) => {
    preventDefault(e);
    startX = e.x;
    holder.addEventListener('mousemove',mouseMoveHandle);
    menus.classList.remove('animation');
  });

  holder.addEventListener('mouseup', (e) => {
    mouseUpHandle(e);
    holder.removeEventListener('mousemove', mouseMoveHandle);
  });

  var mouseUpHandle = (e) => {
    e.preventDefault();
    var absMove = Math.abs(slideIndex*slideWidth - moveX);
    if (absMove > slideWidth/3) {
        if (moveX > slideIndex*slideWidth && slideIndex < numberSlideItem - 1) {
          slideIndex++;
        } else if (moveX < slideIndex*slideWidth && slideIndex > 0) {
          slideIndex--;
        }
      }
    menus.classList.add('animation');
    slideTranslateWhenTouch(-slideIndex*slideWidth);
  }
  var mouseMoveHandle = (e) => {
    touchMoveX =  e.pageX;
     // Calculate distance to translate holder.
     moveX = slideIndex*slideWidth + (startX - touchMoveX);
     slideTranslateWhenTouch(-moveX);
  }
  var slideTranslateWhenTouch = (s) => {
    menus.style.transform = "translateX(" + s +"px)";
    menus.style.WebkitTransform = "translateX(" + s +"px)";
    menus.style.msTransform = "translateX(" + s +"px)";
  }

  holder.addEventListener('touchstart', (e) =>{
    // e.preventDefault();
    longTouch = false;
      setTimeout(function() {
        window.slider.longTouch = true;
      }, 250);

    startX = e.changedTouches[0].pageX;
    menus.classList.remove('animation');
  });
  holder.addEventListener('touchmove', (e) => {
    // e.preventDefault();
    touchMoveX = e.changedTouches[0].pageX;
    moveX = slideIndex*slideWidth + (startX - touchMoveX);
    slideTranslateWhenTouch(-moveX);
  });

  holder.addEventListener('touchend', (e) => {
    mouseUpHandle(e);
  });
});
