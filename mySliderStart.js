let slider = function(localController) {
  return function() {
    let sliderItem = localController.sliderItem;
    let slider = localController.sliderContainer;
    let i = 0;
    let trfRegExp = /[-0-9.]+(?=px)/;
    let sliderWindowWidth = +Math.min(window.innerWidth, window.outerWidth);
    let slideThreshold = 0.3*sliderWindowWidth;
    let sliderX = function() {return +sliderItem[0].style.transform.match(trfRegExp)};
    let timeThersold =200;

    endTransform = (sliderItem, i) => {
      sliderItem.forEach(item => {
        let style = item.currentStyle || window.getComputedStyle(item);
        let itemMarginRight = +style.marginRight.match(trfRegExp)[0];
        item.style.transform = `translate3d(${-(item.offsetWidth+itemMarginRight)*i}px, 0px, 0px)`;
        item.style.transition = 'transform .5s';
      });
    };

    startSlide = (e) => {
      slidestartTime = Date.now();
      getEvent = (e) => {
        return (e.type.search('touch') !== -1) ? e.touches[0] : e;
      };
      let event = getEvent(e);
      let startX = event.clientX;
      let sliderXStart = sliderX();
      sliderTransform = (e) => {
        sliderItem.forEach(item => {
          let event = getEvent(e);

          item.style.transform = `translate3d(${sliderXStart + event.clientX - startX}px, 0px, 0px)`;
          item.style.transition = 'transform 0s';
          item.style.cursor = 'grabbing';
        });
      };

      endSlide = () => {
        slideEndTime = Date.now();
        deltaTime = slideEndTime - slidestartTime;
        let deltaJ = 0;
        if(deltaTime < timeThersold && deltaTime > 2) {
          deltaJ = Math.round(timeThersold/deltaTime);
        } else {deltaJ = 0};
        document.removeEventListener('mousemove', sliderTransform);
        document.removeEventListener('touchmove', sliderTransform);
        let sliderXEnd = sliderX();
        let sliderXChange = sliderXEnd - sliderXStart;
        let isThersoldRiched = Math.abs(sliderXChange) >= slideThreshold;

        isOutOfList = (i) => {
          let j = i - isThersoldRiched*(1+deltaJ)*(sliderXChange)/Math.abs(sliderXChange);
          if (j < 0 || j > sliderItem.length - 1) {
          } else {
            i = isNaN(j) ? i : j;
          };
          return i;
        };

        i = isOutOfList(i);
        endTransform(sliderItem, i);
        sliderItem.forEach(item => item.style.cursor = 'grab');
        document.removeEventListener('mouseup', endSlide);
        document.removeEventListener('touchend', endSlide);
      };
      document.addEventListener('mousemove', sliderTransform);
      document.addEventListener('touchmove', sliderTransform);
      document.addEventListener('mouseup', endSlide);
      document.addEventListener('touchend', endSlide);
    };
    slider.addEventListener('mousedown', startSlide);
    slider.addEventListener('touchstart', startSlide);

    if("arrows" in localController) {
      localController.arrows.forEach(item => {
        item.addEventListener('click', () => {
          let target = event.target;
          if (target.name == localController.buttonNames.prev) {
            i++;
            if (i > sliderItem.length -1) i--;
          } else if (target.name == localController.buttonNames.next) {
            i--;
            if(i<0) i++;
          } else {
            return;
          }
          endTransform(sliderItem, i);
        });
      });
    };

  };

};
