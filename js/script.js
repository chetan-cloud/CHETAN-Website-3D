



let i = 0;
const txt = 'Welcome, My name is Chetan Sidhu!';
const speed = 65;
typeWriter()
function typeWriter() {
  if (i < txt.length) {
    document.getElementById("welcome").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
    
  }
}











import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
const boxGeometry1 = new THREE.BoxGeometry(2, 2, 2);
const torusGeo = new THREE.TorusGeometry(5, 1.5, 8, 50)

const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

const cube = new THREE.Mesh(boxGeometry, material);
const cube1 = new THREE.Mesh(boxGeometry1, material);
const donut = new THREE.Mesh(torusGeo, material);
scene.add(cube);
scene.add(cube1);
scene.add(donut);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const WSU = new THREE.TextureLoader().load('image/wsu.jpg');

const WSUPic = new THREE.Mesh(new THREE.PlaneGeometry(1, 2), new THREE.MeshBasicMaterial({ map: WSU }));



function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar);

const spaceBackground = new THREE.TextureLoader().load('image/starsBackground.jpg');
scene.background = spaceBackground;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);



const render = (time) => {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    // changing the camera aspect to remove the strechy problem
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
   // Re-render the scene
   renderer.render(scene, camera);
   // loop
   requestAnimationFrame(render);
};
requestAnimationFrame(render);

WSUPic.position.x = -2;
WSUPic.position.y = -5;
WSUPic.position.z = -40;
cube1.position.y = -5;
cube1.position.x = 0;
cube1.position.z = -10;
cube.position.z = -10;
cube.position.x = -10;
donut.position.z = -90;
donut.position.x = -5;
donut.position.y = -25;
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;

  donut.rotation.x += 0.01;
  donut.rotation.y += 0.01;

  camera.position.z = t * 0.01;
  camera.position.x = t * 0.0002;
  camera.rotation.y = t * 0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
