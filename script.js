let data;
const changeButton = document.getElementById("changeImages");
changeButton.addEventListener("click", ChangeMemes);

async function getMemes() {
  const url = "https://api.imgflip.com/get_memes";
  const response = await fetch(url);
  const json = await response.json();
  return json.data.memes;
}

function init(data) {
  const element = document.getElementById("imgflip");
  const memes = data;
  const set = new Set();

  for (let i = 0; i < 3; i++) {
    let randomNum = Math.floor(Math.random() * memes.length);
    while (set.has(randomNum)) {
      randomNum = Math.floor(Math.random() * memes.length);
    }
    let meme = memes[randomNum];

    const div = document.createElement("div");
    const img = document.createElement("img");
    const p = document.createElement("p");

    div.id = "container";
    img.id = `img${i + 1}`;
    p.id = `text${i + 1}`;

    div.style.width = "300px";
    img.src = meme.url;
    img.width = "300";
    p.innerText = meme.name;

    div.appendChild(img);
    div.appendChild(p);
    element.appendChild(div);
    set.add(randomNum);
  }
}

async function ChangeMemes() {
  const memes = data;
  const set = new Set();
  let meme;

  for (let i = 0; i < 3; i++) {
    const img = document.getElementById(`img${i + 1}`);
    const text = document.getElementById(`text${i + 1}`);
    let randomNum = Math.floor(Math.random() * memes.length);
    while (set.has(randomNum)) {
      randomNum = Math.floor(Math.random() * memes.length);
    }
    meme = memes[randomNum];
    set.add(randomNum);
    img.src = meme.url;
    text.innerText = meme.name;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loaderDiv = document.getElementById("loader");

  function showLoader() {
    loaderDiv.style.display = "block";
  }

  function hideLoader() {
    loaderDiv.style.display = "none";
  }

  async function getPosts() {
    showLoader();
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      data = await getMemes();
      hideLoader();
      init(data);
    } catch (err) {
      console.log("There was an error while processing your request: " + err);
    }
  }
  getPosts();
});
