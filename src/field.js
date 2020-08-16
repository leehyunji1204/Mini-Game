"ues strict";

import * as sound from "./sound.js";

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrout: "carrot",
  bug: "bug",
});

export class Field {
  constructor(carrotCount, bugConet) {
    this.carrotCount = carrotCount;
    this.bugConet = bugConet;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", (event) => this.onClick(event));
  }

  init() {
    this.field.innerHTML = "";
    this._addItem("carrot", this.carrotCount, "img/carrot.png");
    this._addItem("bug", this.bugConet, "img/bug.png");
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick(event) {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrout);
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
