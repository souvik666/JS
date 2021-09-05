let timerid;
async function getTheData(input) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}
    `
  );
  let data = await res.json();
  handleSuggestions(data);
}

function handleSuggestions(d) {
  let miandiv = document.getElementById(`suggestion`);
  let names = d.meals;
  for (let i of names) {
    let p = document.createElement("p");
    p.innerHTML = i.strMeal;
    miandiv.append(p);
  }
}
getTheData();

function getinp() {
  let inp = document.getElementById(`input`).value;
  getTheData(inp);
}

function debounce(func, delay) {
  if (timerid) {
    clearInterval(timerid);
  } else {
    timerid = setTimeout(() => {
      document.getElementById(`suggestion`).style.display = "block";
      func();
    }, delay);
  }
}
