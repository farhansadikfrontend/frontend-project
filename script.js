let elems = document.querySelectorAll(".elem");
let fullElem = document.querySelectorAll(".full_elem");
let close = document.querySelectorAll(".close");

elems.forEach((e) => {
  e.addEventListener("click", function () {
    fullElem[e.id].style.display = "block";
  });
});
close.forEach((e) => {
  e.addEventListener("click", function () {
    fullElem[e.id].style.display = "none";
  });
});
