let maindiv = document.getElementById(`suggestion`);
let timerId;
async function searchNames(your_search_term) {
  let res = await fetch(
    `https://swapi.dev/api/people/?search=${your_search_term}`
  );
  let data = await res.json();
  return data.results;
}

function appnedSuggestion(el) {
  let p = document.createElement("p");
  el.forEach(({ name }) => {
    p.innerText = name;
    p.addEventListener("click", () => {
      appnedetails(el);
    });
    if (name === null) {
      return false;
    }
    maindiv.append(p);
  });
  if (el.length === 0) {
    document.getElementById(`suggestion`).style.display = "none";
    document.getElementById(`war`).style.display = "block";
  }
}

async function main() {
  let name = document.getElementById("input").value;
  if (name.length < 1) {
    return false;
  }
  let res = await searchNames(name);
  appnedSuggestion(res);
  //console.log(res.length)
}

function debounce(func, delay) {
  let name = document.getElementById("input").value;
  if (name.length < 1) {
    return false;
  }
  if (timerId) {
    clearInterval(timerId);
    document.getElementsByTagName("button")[0].style.backgroundColor = "";
    document.getElementById(`suggestion`).innerHTML = null;
    document.getElementById(`war`).innerHTML = null;
  }
  timerId = setTimeout(() => {
    document.getElementById(`suggestion`).style.display = "block";
    document.getElementsByTagName("button")[0].style.backgroundColor = "blue";
    /*     document.getElementById(`suggestion`).innerHTML = "";
    document.getElementById(`war`).innerHTML = ""; */
    func();
  }, delay);
}

function appnedetails(el) {
  //console.log(el);
  let data = el;
  let div = document.getElementById(`infoBox`);
  div.style.display = "block";
  el.forEach(({ name, height, mass, hair_color, birth_year, gender }) => {
    let names = document.getElementById(`name`);
    names.innerText = "name: " + name;
    let heights = document.getElementById(`height`);
    heights.innerText = "height: " + height;
    let masss = document.getElementById(`mass`);
    masss.innerText = "mass: " + mass;
    let hair_colors = document.getElementById(`hair_color`);
    hair_colors.innerText = "hair_color: " + hair_color;
    let birth_years = document.getElementById(`birth_year`);
    birth_years.innerHTML = "birth_year: " + birth_year;
    let genders = document.getElementById(`gender`);
    genders.innerHTML = "gender: " + gender;
  });
}

/* function handleclose(){
    document.getElementsByTagName("body")[0].addEventListener("click", function(){
        document.getElementById(`infoBox`).style.display="none"
    })
} */
//background

var mouseX = 0,
  mouseY = 0,
  windowHalfX = window.innerWidth / 2,
  windowHalfY = window.innerHeight / 2,
  SEPARATION = 200,
  AMOUNTX = 10,
  AMOUNTY = 10,
  camera,
  scene,
  renderer;

init();
animate();

function init() {
  var container,
    separation = 100,
    amountX = 50,
    amountY = 50,
    particle;

  container = document.createElement("div");
  document.body.appendChild(container);

  scene = new THREE.Scene();

  renderer = new THREE.CanvasRenderer({ alpha: true }); // gradient; this can be swapped for WebGLRenderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 100;

  // particles
  var PI2 = Math.PI * 2;
  var material = new THREE.SpriteCanvasMaterial({
    color: 0xffffff,
    program: function (context) {
      context.beginPath();
      context.arc(0, 0, 0.5, 0, PI2, true);
      context.fill();
    },
  });

  var geometry = new THREE.Geometry();

  for (var i = 0; i < 100; i++) {
    particle = new THREE.Sprite(material);
    particle.position.x = Math.random() * 2 - 1;
    particle.position.y = Math.random() * 2 - 1;
    particle.position.z = Math.random() * 2 - 1;
    particle.position.normalize();
    particle.position.multiplyScalar(Math.random() * 10 + 450);
    particle.scale.x = particle.scale.y = 10;
    scene.add(particle);
    geometry.vertices.push(particle.position);
  }

  // lines
  var line = new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5 })
  );
  scene.add(line);

  // mousey
  document.addEventListener("mousemove", onDocumentMouseMove, false);
  document.addEventListener("touchstart", onDocumentTouchStart, false);
  document.addEventListener("touchmove", onDocumentTouchMove, false);

  window.addEventListener("resize", onWindowResize, false);
} // end init();

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {
  if (event.touches.length > 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY + 200 - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
