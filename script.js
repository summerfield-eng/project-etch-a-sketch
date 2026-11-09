const container = document.querySelector(".container");
const input = document.querySelector(".input");
const createBtn = document.querySelector(".createBtn");
const resetBtn = document.querySelector(".resetBtn");
const randomizeBtn = document.querySelector(".enableRandColorBtn");
const showGridLines = document.querySelector(".showGridLines");

let controllers = {
  randomizedColors: false,
  showGrid: false,
};

function toggleRandomColor() {
  controllers.randomizedColors
    ? (controllers.randomizedColors = false)
    : (controllers.randomizedColors = true);

  console.log(controllers.randomizedColors);
}

function createSquareDivs() {
  const sqrDiv = document.createElement("div");
  sqrDiv.classList.add("square");

  if (controllers.showGrid) {
    sqrDiv.classList.add("showGrid");
  }

  return sqrDiv;
}

function getUserDesiredDivs() {
  let userDefineDivs = Number(input.value);
  input.value = "";
  if (userDefineDivs < 0) return;
  if (userDefineDivs === 0) return 16;
  if (userDefineDivs > 100) return 100;

  return userDefineDivs;
}

function appendNumOfDivs(num) {
  container.innerHTML = "";
  let gridCount = num * num;
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < gridCount; i++) {
    fragment.appendChild(createSquareDivs());
  }
  container.appendChild(fragment);
}

function calcContainerWidthHeight(num) {
  const h = container.clientHeight / num;
  const w = container.clientWidth / num;

  container.querySelectorAll(".square").forEach((item) => {
    item.style.height = h + "px";
    item.style.width = w + "px";
  });
}

function getRandomRgbColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function toggleGridLines() {
  controllers.showGrid
    ? (controllers.showGrid = false)
    : (controllers.showGrid = true);

  controllers.showGrid
    ? container.querySelectorAll(".square").forEach((item) => {
        item.classList.add("showGrid");
      })
    : container.querySelectorAll(".square").forEach((item) => {
        item.classList.remove("showGrid");
      });
}

container.addEventListener("mouseover", (e) => {
  let div = e.target.closest(".square");

  if (!div) return;
  if (controllers.randomizedColors) {
    div.style.backgroundColor = getRandomRgbColor();
  } else {
    div.style.backgroundColor = "cyan";
  }
});

createBtn.addEventListener("click", () => {
  let num = getUserDesiredDivs();
  appendNumOfDivs(num);
  calcContainerWidthHeight(num);
});

resetBtn.addEventListener("click", () => {
  container.style.backgroundColor = "white";
  container
    .querySelectorAll(".square")
    .forEach((item) => (item.style.backgroundColor = "white"));
});

randomizeBtn.addEventListener("click", toggleRandomColor);
showGridLines.addEventListener("click", toggleGridLines);

createBtn.dispatchEvent(new Event("click"));
