// set main color from localStorage
let colorsBullets = Array.from(document.querySelectorAll(".settings .colors ul li"));
let colors = {
  yellow: "#FF9800",
  pink: "#E91E63",
  main: "#009688",
  blue: "#03A9F4",
  green: "#4CAF50",
};

if (window.localStorage.getItem("choosenColor")) {
  changeColor(window.localStorage.getItem("choosenColor"));
}

//Save Choosen Color In LocalStorage
function saveColor(color) {
  window.localStorage.choosenColor = color;
}

//Change Color
function changeColor(choosenColor) {
  colorsBullets.forEach((color) => {
    color.classList.remove("active");
    if (color.getAttribute("color-data") === choosenColor) {
      color.classList.add("active");
    }
  });
  document.styleSheets[4].rules[1].style.setProperty("--main-color", `${colors[choosenColor]}`);
  saveColor(choosenColor);
}

colorsBullets.forEach((color) => {
  color.onclick = function () {
    changeColor(color.getAttribute("color-data"));
  };
});

// S-bullets
// set bullets display from localStorage
let linksBullets = document.querySelector("body .bullets");
let bulletsState = document.querySelectorAll(".settings .show-bullets .set span");

if (window.localStorage.getItem("display")) {
  if (window.localStorage.getItem("display") == "shown") {
    bulletsvisibilty("shown");
  } else {
    bulletsvisibilty(window.localStorage.getItem("display"));
  }
}

function bulletsvisibilty(state) {
  if (state == "shown") {
    linksBullets.style.display = "block";
    bulletsState[1].classList.add("unchoosen");
    bulletsState[0].classList.remove("unchoosen");
    window.localStorage.display = "shown";
  } else {
    linksBullets.style.display = "none";
    bulletsState[0].classList.add("unchoosen");
    bulletsState[1].classList.remove("unchoosen");
    window.localStorage.display = "not-shown";
  }
}

savedState(bulletsState);

// E-bullets
//shuffle
let shuffle = document.querySelectorAll(".settings .shuffle .set span");

let landing = document.querySelector(".landing");
let overLayImgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let index = 0;
let shuffleActive = true;
// set shuffle from localStorage
if (window.localStorage.getItem("shuffleState")) {
  if (window.localStorage.getItem("shuffleState") == "true") {
    shuffleActive = true;
    shuffleImgs();
  } else {
    shuffleActive = false;
    shuffleImgs();
  }
}

function shuffleImgs() {
  window.localStorage.shuffleState = shuffleActive;
  if (shuffleActive === false) {
    shuffle[0].classList.add("unchoosen");
    shuffle[1].classList.remove("unchoosen");
  } else {
    shuffle[1].classList.add("unchoosen");
    shuffle[0].classList.remove("unchoosen");
  }
  function getImgs() {
    if (shuffleActive === false) {
      clearInterval(counter);
    } else {
      if (index === 5) {
        index = 0;
      }

      landing.style.backgroundImage = `url('../imgs/${overLayImgs[index]}')`;

      index += 1;
    }
  }

  let counter = setInterval(getImgs, 6000);
}
shuffleImgs();

savedState(shuffle);

// E-Shuffle

function savedState(array) {
  array.forEach((choice) => {
    choice.onclick = function () {
      array.forEach((button) => {
        if (choice != button) {
          button.classList.add("unchoosen");
        }
      });

      choice.classList.remove("unchoosen");
      if (array == shuffle) {
        if (choice == array[0]) {
          shuffleActive = true;
          shuffleImgs();
        } else {
          shuffleActive = false;
          shuffleImgs();
        }
      } else if (array == bulletsState) {
        if (choice == array[0]) {
          bulletsvisibilty(choice.getAttribute("display-show"));
        } else {
          bulletsvisibilty(choice.getAttribute("display-show"));
        }
      }
    };
  });
}

// S-reset
let defaultSettings = {
  color: "main",
  shuffle: true,
  bullets: "shown",
};

let reset = document.querySelector(".settings .reset-button");
reset.onclick = function () {
  changeColor(defaultSettings.color);

  shuffleActive = defaultSettings.shuffle;
  shuffleImgs();

  bulletsvisibilty(defaultSettings.bullets);
};
// E-reset
// links bullets
let bullets = document.querySelectorAll("body .bullets li");

// toggle
let linksUL = document.querySelector("header .container ul");
let toggle = document.querySelector("header .container .toggle");
let toggles = document.querySelectorAll("header .container .toggle span");
toggle.onclick = function (e) {
  e.stopPropagation();

  this.classList.toggle("open");

  linksUL.classList.toggle("opened");
};
linksUL.onclick = function (e) {
  e.stopPropagation();
};
document.addEventListener("click", (e) => {
  if (e.target != toggle && e.target.className != "opened") {
    if (linksUL.className === "opened") {
      toggle.classList.remove("open");

      linksUL.classList.remove("opened");
    }
  }
});

let settings = document.querySelector(".settings");
let gear = document.querySelector(".gear");
let gearI = document.querySelector(".gear i");

gearI.onclick = function () {
  gearI.classList.toggle("rotate");

  settings.classList.toggle("opened");
};

// Skills Progress
let languagesProgress = new Map([
  ["html", "90%"],
  ["css", "70%"],
  ["javascript", "80%"],
  ["python", "90%"],
  ["php", "50%"],
  ["mysql", "35%"],
]);
let skillsSec = document.querySelector("#skills");
let skills = skillsSec.querySelectorAll(".skill .progress");
let boxesSec = document.querySelector(".test");
let boxes = boxesSec.querySelectorAll(".box");
let testimonials = document.querySelector(".testimonials");
let testimonialsBoxes = testimonials.querySelectorAll(".box");
let fireTestimonialsAnimation = true;
let fire = true;
window.onscroll = function () {
  if (window.scrollY >= skillsSec.offsetTop - 130 && fire) {
    skills.forEach((skill) => (skill.style.width = languagesProgress.get(skill.getAttribute("data-progress"))));
    fire = false;
  }
  if (window.scrollY >= boxesSec.offsetTop) {
    boxes.forEach((box) => (box.style.cssText = "left:0; opacity:1"));
  }
  if (window.scrollY >= testimonials.offsetTop - (this.innerHeight - testimonials.offsetHeight) && fireTestimonialsAnimation) {
    testimonialsBoxes.forEach((box) => (box.style.cssText = "left: 0; opacity: 1"));
    fireTestimonialsAnimation = false;
  }
};

// Show images in gallery
let images = document.querySelectorAll(".gallery .images img");
images.forEach((image) => {
  image.onclick = function () {
    let imgOverLay = document.createElement("div");
    imgOverLay.classList.add("img-over");
    document.body.appendChild(imgOverLay);
    let shownImg = document.createElement("div");
    shownImg.classList.add("show-img");
    let close = document.createElement("span");
    close.classList.add("close");
    close.textContent = "X";
    shownImg.appendChild(close);
    let img = document.createElement("img");
    img.src = image.src;
    shownImg.appendChild(img);
    setTimeout(() => {
      imgOverLay.style.opacity = 1;
      shownImg.style.opacity = 1;
    }, 100);
    document.body.appendChild(shownImg);
  };
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    e.target.parentElement.style.opacity = 0;
    document.querySelector(".img-over").style.opacity = 0;

    setTimeout(() => {
      e.target.parentElement.remove();
      let imgOverLay = document.querySelector(".img-over").remove();
    }, 200);
  }
});

// UP button
let upButton = document.querySelector("body .up");
document.onscroll = function () {
  if (window.scrollY > 1500) {
    upButton.style.display = "block";
  } else {
    upButton.style.display = "none";
  }

  if (window.scrollY > 1501) {
    upButton.style.opacity = 1;
  }
  if (window.scrollY < 1800) {
    upButton.style.opacity = 0;
  }
};
upButton.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
  });
};
