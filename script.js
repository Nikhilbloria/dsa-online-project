// Navigation highlight on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Plagiarism check simulation with file reading
document.getElementById('plagiarismForm').addEventListener('submit', function(e){
  e.preventDefault();
  let text = document.getElementById('inputText').value.trim();
  let fileInput = document.getElementById('inputFile');
  let file = fileInput.files[0];
  let resultBox = document.getElementById('resultBox');
  if (file) {
    let reader = new FileReader();
    reader.onload = function(event) {
      let content = event.target.result;
      let percent = Math.floor(Math.random() * 30) + 70;
      resultBox.innerHTML = `<span style="color:#1a73e8;font-size:1.2rem;">${percent}% Unique</span><br> No significant plagiarism detected.`;
      resultBox.style.display = 'block';
    };
    // Only read as text if it's a text-based file
    if (file.type === "application/pdf") {
      resultBox.innerHTML = `<span style="color:#1a73e8;font-size:1.2rem;">PDF file uploaded.</span><br>Simulated check: No significant plagiarism detected.`;
      resultBox.style.display = 'block';
    } else {
      reader.readAsText(file);
    }
  } else if (text.length > 0) {
    let percent = Math.floor(Math.random() * 30) + 70;
    resultBox.innerHTML = `<span style="color:#1a73e8;font-size:1.2rem;">${percent}% Unique</span><br> No significant plagiarism detected.`;
    resultBox.style.display = 'block';
  } else {
    resultBox.innerHTML = '<span style="color:red;">Please enter text or upload a file.</span>';
    resultBox.style.display = 'block';
  }
});

// 3D scene with Three.js for hero section
let scene, camera, renderer, group;
function init3D() {
  const container = document.getElementById('three-container');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  camera.position.z = 7;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // 3D group of floating spheres
  group = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    let geometry = new THREE.SphereGeometry(Math.random() * 0.35 + 0.3, 32, 32);
    let material = new THREE.MeshPhongMaterial({
      color: i % 2 === 0 ? 0x1a73e8 : 0x34a853,
      shininess: 80,
      transparent: true,
      opacity: 0.85
    });
    let sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(
      Math.sin((i / 12) * Math.PI * 2) * 2,
      Math.cos((i / 12) * Math.PI * 2) * 2,
      Math.random() * 2 - 1
    );
    group.add(sphere);
  }
  scene.add(group);

  // Lighting
  let light = new THREE.PointLight(0xffffff, 1.2, 100);
  light.position.set(0, 0, 10);
  scene.add(light);
  let ambient = new THREE.AmbientLight(0x404040, 1.5);
  scene.add(ambient);

  animate();
  window.addEventListener('resize', onWindowResize, false);
}
function animate() {
  requestAnimationFrame(animate);
  group.rotation.y += 0.004;
  group.rotation.x += 0.002;
  renderer.render(scene, camera);
}
function onWindowResize() {
  const container = document.getElementById('three-container');
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.offsetWidth, container.offsetHeight);
}
window.addEventListener('DOMContentLoaded', init3D);

// Soft Neon Glow Clicker
const glowSelectors = [
  '.feature-card',
  '.team-card',
  '.checker-card',
  '.cta-btn',
  '.hero-title',
  '.logo',
  'nav ul li a'
];

let lastGlowed = null;

function removeGlow() {
  if (lastGlowed) {
    lastGlowed.classList.remove('neon-soft');
    lastGlowed = null;
  }
}

// Add click listener to each glowable element
glowSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('click', function(e) {
      removeGlow();
      this.classList.add('neon-soft');
      lastGlowed = this;
      e.stopPropagation();
    });
    el.addEventListener('mouseleave', function() {
      this.classList.remove('neon-soft');
      lastGlowed = null;
    });
  });
});

// If user clicks outside, remove any glow
document.body.addEventListener('click', function(e) {
  if (!e.target.classList.contains('neon-soft')) {
    removeGlow();
  }
});
