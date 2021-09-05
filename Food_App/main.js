const nav = (id) => {
  let trgt = document.getElementById(id);
  trgt.innerHTML = `
  <i id="logo" class="fa fa-cutlery" aria-hidden="true">  recipe </i>
  </i>

  <i id="receipeByday" class="fa fa-fire" aria-hidden="true"> Trending</i>
  <i id="random" class="fa fa-random" aria-hidden="true"> Random</i>
`;
};
nav.routing = () => {
  document.getElementById(`logo`).addEventListener("click", function () {
    window.location.href = "index.html";
  });
  document
    .getElementById(`receipeByday`)
    .addEventListener(`click`, function () {
      window.location.href = "receipeByday.html";
    });

  document.getElementById(`random`).addEventListener("click", function () {
    window.location.href = "Random.html";
  });
};

