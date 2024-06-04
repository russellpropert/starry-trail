const numberOfBoxes = Math.ceil(window.innerWidth * window.innerHeight / 1500);
const originalOpacity = .1;
const opacityIncreaseChange = .1;
const opacityDecreaseChange = .005;
const boxContainers = [];
const container = document.getElementById('container');
const eventListener = document.getElementById('eventListener');
let xMouseCoordinate;
let yMouseCoordinate;
let xMouseCoordinateOld;
let yMouseCoordinateOld;

window.document.onmousemove = (event) => {
  xMouseCoordinateOld = xMouseCoordinate;
  yMouseCoordinateOld = yMouseCoordinate;
  xMouseCoordinate = event.pageX;
  yMouseCoordinate = event.pageY;
}

const isOver = (boxContainer) => {
  const left = boxContainer.offsetLeft + container.offsetLeft;
  const right = left + boxContainer.clientWidth;
  const top = boxContainer.offsetTop + container.offsetTop;
  const bottom = top + boxContainer.clientHeight;

  return(xMouseCoordinate > left && xMouseCoordinate < right && yMouseCoordinate > top && yMouseCoordinate < bottom);
}

const increaseOpacity = (boxContainer, opacity) => {
  opacity += opacityIncreaseChange
  if (opacity > 1) opacity = 1
  boxContainer.style.opacity = opacity;
}

const decreaseOpacity = (boxContainer, opacity) => {
  opacity -= opacityDecreaseChange
  if (opacity < originalOpacity) opacity = originalOpacity;
  boxContainer.style.opacity = opacity;
}

const makeBoxAndContainer = () => {
  const boxContainer = document.createElement('div');
  boxContainer.classList.add('boxContainer');
  const box = document.createElement('div');
  box.classList.add('box');
  boxContainer.appendChild(box);
  
  const boxDimensions = Math.floor(Math.random() * 21) + 10;
  const hypotenuse = Math.ceil(Math.sqrt(boxDimensions ** 2 * 2));
  const containerWidth = container.clientWidth - hypotenuse;
  const containerHeight = container.clientHeight - hypotenuse;
  const boxContainerDimentions = 100

  boxContainer.style.width = `${boxContainerDimentions}px`;
  boxContainer.style.height = `${boxContainerDimentions}px`;
  boxContainer.style.left = `${Math.round(Math.random() * containerWidth - boxContainerDimentions / 2 + (hypotenuse / 2))}px`;
  boxContainer.style.top = `${Math.round(Math.random() * containerHeight - boxContainerDimentions / 2 + (hypotenuse / 2))}px`;
  boxContainer.style.opacity = originalOpacity

  box.style.width = `${boxDimensions}px`;
  box.style.height = `${boxDimensions}px`;

  container.appendChild(boxContainer);
  
  return boxContainer;
}

for (let i = 0; i < numberOfBoxes; i++) {
  boxContainers.push(makeBoxAndContainer());
}

const checkMouseOver = () => {
  boxContainers.forEach(
    (boxContainer) => {
      const opacity = parseFloat(boxContainer.style.opacity);
      if (isOver(boxContainer) && opacity < 1) {
        increaseOpacity(boxContainer, opacity);
      } else if (!isOver(boxContainer) && opacity > originalOpacity) {
        decreaseOpacity(boxContainer, opacity);
      }
    }
  );
}

setInterval(checkMouseOver, 20);