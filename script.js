const container = document.querySelector(".container");
const input = document.querySelector(".input");
const createBtn = document.querySelector(".createBtn");
const reseteBtn = document.querySelector(".resetBtn");

function createSquareDivs() {
  const sqrDiv = document.createElement("div");
  sqrDiv.classList.add("square");
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
  for (let i = 0; i < gridCount; i++) {
    container.appendChild(createSquareDivs());
  }
  console.log(container.children.length);
}

createBtn.addEventListener("click", () => {
  let num = getUserDesiredDivs();
  appendNumOfDivs(num);
  calcContainerWidthHeight(num);
});

reseteBtn.addEventListener("click", () => {
  container.style.backgroundColor = "white";
  container
    .querySelectorAll(".square")
    .forEach((item) => (item.style.backgroundColor = "white"));
});

function calcContainerWidthHeight(num) {
  const h = container.clientHeight / num;
  const w = container.clientWidth / num;
  
  container.querySelectorAll(".square").forEach((item) => {
    item.style.height = h + "px";
    item.style.width = w + "px";
  });
}

container.addEventListener("mouseover", (e) => {
  let div = e.target.closest(".square");

  if (!div) return;
  div.style.backgroundColor = "cyan";
});

createBtn.dispatchEvent(new Event("click"));
