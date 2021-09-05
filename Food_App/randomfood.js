async function randomfood() {
  let res = fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  let data = await (await res).json();
  let { meals } = data;
 appenddetails(meals);
 console.log(meals)
}
randomfood();

function appenddetails(d) {
  let miandiv = document.getElementById(`showramdowfood`);
  d.forEach((element) => {
    let img = document.createElement(`img`);
    img.src = element.strMealThumb;
    let instruction = document.createElement(`p`)
    instruction.innerHTML = element.strInstructions
    let h1 = document.createElement(`h1`)
    h1.innerHTML = 'Instructions'
    miandiv.append(img,h1,instruction)
  });
}
