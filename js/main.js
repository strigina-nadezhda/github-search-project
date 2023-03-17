let items = [];

// поиск запрос
async function fetchLinkJSON(str) {
  // показываем loading
  document.querySelector("#preloader").style.display = "block";

  let out = "";
  let query = `q=` + encodeURIComponent(str);
  let url = `https://api.github.com/search/repositories?${query}&sort=created&order=asc`;
  const response = await fetch(url, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const data = await response.json();

  items = data.items.splice(0, 10);

  for (key in items) {
    out += `<li>`;
    out += `<a href="${items[key]["url"]}" target='_blank'>`;
    out += `<div>Имя: <b>${items[key]["name"]}</b> </div>`;
    out += `</a>`;
    out += `<div>Описание: <b class="description">${items[key]["description"]}</b> </div>`;
    if (items[key]["archived"] === true) {
      out += `<div class="arhive">В архиве: </div>`;
    } else {
      out += `<div class="no-arhive">В архиве: </div>`;
    }
    out += `</li>`;
  }
  document.getElementById("list").innerHTML = out;
  if (items.length == 0) {
    document.getElementById("empty").style.display = "initial";
    setTimeout(() => {
      document.getElementById("empty").style.display = "none";
    }, "6000");
  }

  // убираем loading
  document.querySelector("#preloader").style.display = "none";

  // показываем список
  show();
  console.log("lists", items);

  return items;
}

const searchInput = document.getElementById("search");
const searchList = document.getElementById("drop");
searchInput.addEventListener("focus", show, false);
searchInput.addEventListener("blur", hide, false);
searchList.addEventListener("click", dropSelect, false);

// прячем список
function hide() {
  setTimeout(() => searchList.classList.remove("visible"), 300);
}

// отображаем список
function show() {
  if (items.length > 1) {
    setTimeout(() => searchList.classList.add("visible"), 300);
  }
}

// выбор селекта
function dropSelect(e) {
  searchInput.value = e.target.textContent;
  hide();
}

// поиск по кнопке Enter
searchInput.addEventListener("keyup", function (e) {
  if (e.code === "Enter") {
    event.preventDefault();
    document.getElementById("submit").click();
  }
});

// поиск по кноке
document.getElementById("submit").onclick = function (e) {
  let str = document.getElementById("search").value;

  fetchLinkJSON(str);
};
