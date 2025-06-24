


import {createParticleCloud } from './Particle.js'; 
/*
const text = "Welcome to my website"
let index = 0 
const speed = 150 // 100ms per character

function typeWriter() {
    if (index < text.length) {
        document.getElementById("typewriter").textContent += text.charAt(index); 
        index++; 
        setTimeout(typeWriter, speed)
    }
}

window.onload = typeWriter; 

*/ 


const phrases = [
    "I build websites", 
    "I create dynamic UIs", 
    "I am looking for a challenge"
]


let typewriter = document.getElementById("typewriter"); 
let phraseIndex = 0; 
let index = 0 

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    typewriter.textContent = currentPhrase.slice(0, index); 

    if (index < currentPhrase.length){
        index++
        setTimeout(typeWriter, 100)
    } else {
        setTimeout(() => {
            index = 0 
            phraseIndex = (phraseIndex + 1) % phrases.length
            typeWriter(); 
        }, 2000)
    }
}

let block_c = document.getElementById("block-c")
let block_i = 0; 

function createBlocks() {
    if (block_i < 20) {
        const newBlock = document.createElement("div")
        newBlock.classList.add("block")
        block_c.appendChild(newBlock); 
        block_i++ 
        
        setTimeout(createBlocks, 100)
    }
}








const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const particles = createParticleCloud(300, canvas.width, canvas.height);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw(ctx);
  });
  requestAnimationFrame(animate);
}





createBlocks() 
typeWriter()
animate();



import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("canvas-bear"), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create particle material
const material = new THREE.PointsMaterial({ color: 0xfff555, size: 0.6 });

// Function to generate point cloud from shape
function generatePoints(shape) {
  const positions = [];

  if (shape === 'cube') {
    for (let i = 0; i < 1000; i++) {
      positions.push(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
    }
  } else if (shape === 'sphere') {
    for (let i = 0; i < 1000; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 20;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      positions.push(x, y, z);
    }
  }

  return new Float32Array(positions);
}

// Create geometry
const geometry = new THREE.BufferGeometry();
let cubePoints = generatePoints('cube');
let spherePoints = generatePoints('sphere');
let currentPoints = cubePoints.slice();

geometry.setAttribute('position', new THREE.BufferAttribute(currentPoints, 3));
const points = new THREE.Points(geometry, material);
scene.add(points);

let morphingToSphere = true;

function animateAll() {
  requestAnimationFrame(animateAll);

  // Morph logic
  const position = geometry.attributes.position.array;
  const target = morphingToSphere ? spherePoints : cubePoints;

  for (let i = 0; i < position.length; i++) {
    position[i] += (target[i] - position[i]) * 0.05; // simple lerp
  }

  geometry.attributes.position.needsUpdate = true;

  // Rotate the whole system
  points.rotation.y += 0.002;
  renderer.render(scene, camera);
}

animateAll();

// Switch between shapes every 5 seconds
setInterval(() => {
  morphingToSphere = !morphingToSphere;
}, 5000);



