let data;
const buttons = document.querySelectorAll("[data-carousel-button]");

async function getMemes() {
  const url = "https://api.imgflip.com/get_memes";
  const response = await fetch(url);
  const json = await response.json();
  return json.data.memes;
}

function init(data) {
  const memes = data;

  for (let i = 0; i < 99; i++) {
    const ul = document.getElementById("memesList");
    const li = document.createElement("li");
    const img = document.createElement("img");
    const p = document.createElement("p");
    let meme = memes[i];

    img.src = meme.url;
    img.id = `img${i}`;

    img.addEventListener("load", function () {
      // console.log("Width:", img.naturalWidth);
      // console.log("Height:", img.naturalHeight);

      if (img.naturalHeight > 1200) {
        img.classList.add("large-image");
      } else if (img.naturalHeight > 400) {
        img.classList.add("medium-image");
      } else {
        img.classList.add("small-image");
      }
    });

    p.innerText = meme.name;
    p.id = `p${i}`;
    li.id = `li${i}`;
    li.className = "slide";
    li.appendChild(img);
    li.appendChild(p);

    if (i === 0) {
      li.setAttribute("data-active", "");
    }

    ul.appendChild(li);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loaderDiv = document.getElementById("loader");
  const div = document.querySelector(".carousel");

  function showLoader() {
    loaderDiv.style.display = "block";
  }

  function hideLoader() {
    loaderDiv.style.display = "none";
    div.style.display = "block";
  }

  async function getPosts() {
    showLoader();
    try {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      data = await getMemes();
      hideLoader();
      init(data);
    } catch (err) {
      console.log("There was an error while processing your request: " + err);
    }
  }
  getPosts();
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});
