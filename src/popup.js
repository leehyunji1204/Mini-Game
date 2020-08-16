"use strict";

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".popup");
    this.popUpText = document.querySelector(".popup__message");
    this.popUpRefresh = document.querySelector(".popup__refresh");
    this.popUpRefresh.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpText.innerHTML = text;
    this.popUp.classList.remove("hide");
  }

  hide() {
    this.popUp.classList.add("hide");
  }
}
