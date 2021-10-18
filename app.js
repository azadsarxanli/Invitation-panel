"use strict";
const form = document.querySelector("#inviteForm");
const input = document.querySelector("input");
const ul = document.querySelector("#invitedList");
const main = document.querySelector(".main");

/* 
 1. "LI" yaradırıq
*/
function createLi() {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = input.value;

  const label = document.createElement("label");
  label.textContent = "Təsdiqlənmiş";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Düzəlt";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Sil";

  li.appendChild(span);
  li.appendChild(label);
  label.appendChild(checkbox);
  li.appendChild(editBtn);
  li.appendChild(removeBtn);

  return li;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const li = createLi();

  if (input.value === "" || input.value === null) {
    alert("Bir şeylər daxil et!");
  } else {
    ul.appendChild(li);
  }
  input.value = "";
});

/* 2. Respond classı əlavə etmək */

ul.addEventListener("change", (event) => {
  const checkbox = event.target;
  const checked = checkbox.checked;
  const li = checkbox.parentNode.parentNode;
  if (checked) {
    li.className = "responded";
  } else {
    li.className = "";
  }
});

/* 3. Düyməyə tıklandıqda ediləcəklər */

ul.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const button = event.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    if (button.textContent === "Sil") {
      ul.removeChild(li);
    } else if (button.textContent === "Düzəlt") {
      const span = li.firstElementChild;
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
      button.textContent = "Yadda saxla!";
    } else if (button.textContent === "Yadda saxla!") {
      const input = li.firstElementChild;
      const span = document.createElement("span");
      span.textContent = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);
      button.textContent = "Düzəlt";
    }
  }
});

/* 4. Seçili olmayanları gizlətmək. */

const div = document.createElement("div");
div.className = "showHide";
const filterLabel = document.createElement("label");
filterLabel.textContent = "Təsdiqlənməyənləri gizlət";
const filterCheckbox = document.createElement("input");
filterCheckbox.type = "checkbox";

div.appendChild(filterLabel);
filterLabel.appendChild(filterCheckbox);
main.insertBefore(div, ul);

filterCheckbox.addEventListener("change", (event) => {
  const isChecked = event.target.checked;
  const lis = ul.children;
  let i = 0;
  if (isChecked) {
    // Seçilibsə, bir neçə şey edəcəyik
    for (i = 0; i < lis.length; i++) {
      var li = lis[i];
      if (li.className === "responded") {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }
    }
  } else {
    for (let i = 0; i < lis.length; i++) {
      var li = lis[i];
      li.style.display = "";
    }
  }
});
