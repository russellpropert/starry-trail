const numberOfBoxes = Math.ceil(window.innerWidth * window.innerHeight / 1500);
// const boxDimensionScale = Math.min(window.innerWidth, window.innerHeight) / 100;
const boxContainerDimentions = 100;
// const boxContainerDimentions = boxDimensionScale * 10;
const originalOpacity = .1;
const opacityIncreaseChange = .1;
const opacityDecreaseChange = .005;
const boxContainers = [];
const container = document.getElementById('container');
const eventListener = document.getElementById('eventListener');
let xCoordinate;
let yCoordinate;
let xCoordinateOld;
let yCoordinateOld;

window.document.onmousemove = (event) => {
  xCoordinate = event.pageX;
  yCoordinate = event.pageY;
}

document.addEventListener('touchmove', (event) => {
  xCoordinate = event.pageX;
  yCoordinate = event.pageY;
});

const isOver = (boxContainer) => {
  const left = boxContainer.offsetLeft + container.offsetLeft;
  const right = left + boxContainer.clientWidth;
  const top = boxContainer.offsetTop + container.offsetTop;
  const bottom = top + boxContainer.clientHeight;

  return(xCoordinate > left && xCoordinate < right && yCoordinate > top && yCoordinate < bottom);
}

const increaseOpacity = (boxContainer, opacity, mouseTravel) => {
  let opacityIncreaseChangeAdjustedForMouseTravel;
  mouseTravel < 20 ? opacityIncreaseChangeAdjustedForMouseTravel = Math.ceil(mouseTravel / 2) * opacityIncreaseChange : opacityIncreaseChangeAdjustedForMouseTravel = 1;
  opacity += opacityIncreaseChangeAdjustedForMouseTravel;
  if (opacity > 1) opacity = 1;
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
  
  // const boxDimensions = Math.floor(Math.random() * (boxDimensionScale * 2 + 1)) + boxDimensionScale;
  const boxDimensions = Math.floor(Math.random() * 21) + 10;
  const hypotenuse = Math.ceil(Math.sqrt(boxDimensions ** 2 * 2));
  const containerWidth = container.clientWidth - hypotenuse;
  const containerHeight = container.clientHeight - hypotenuse;

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
  let mouseTravel;

  if (xCoordinateOld && yCoordinateOld) {
    let x = xCoordinate - xCoordinateOld;
    let y = yCoordinate - yCoordinateOld;
    mouseTravel = Math.round(Math.sqrt(x ** 2 + y ** 2));
  }

  boxContainers.forEach(
    (boxContainer) => {
      const opacity = parseFloat(boxContainer.style.opacity);
      if (isOver(boxContainer) && opacity < 1 && xCoordinate !== xCoordinateOld && yCoordinate !== yCoordinateOld) {
        increaseOpacity(boxContainer, opacity, mouseTravel);
      } else if (!isOver(boxContainer) && opacity > originalOpacity || xCoordinate === xCoordinateOld && yCoordinate === yCoordinateOld) {
        decreaseOpacity(boxContainer, opacity);
      }
    }
  );

  let displayXCoordinate = document.getElementById('displayXCoordinate');
  let displayYCoordinate = document.getElementById('displayYCoordinate');

  // console.log(displayXCoordinate);

  displayXCoordinate.textContent = `X: ${xCoordinate}`;
  displayYCoordinate.textContent = `Y: ${yCoordinate}`;

  xCoordinateOld = xCoordinate;
  yCoordinateOld = yCoordinate;
}

setInterval(checkMouseOver, 20);