/**
 * VISHAL JAMDHADE BUILDCON — 3D WEBGL ARCHITECTURAL ENGINE
 * Three.js Interactive Building Viewer with 4 Visual Modes:
 * 1. BLUEPRINT (CAD Cyan Wireframe & Grid)
 * 2. 3D MODEL (Architectural Clay Volume & Shadows)
 * 3. REALISTIC (Materials, Glass, Dusk Lighting)
 * 4. STRUCTURAL (RCC Columns, Beams, Footings & Ductile Rebar)
 */

class Arch3DViewer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.currentMode = 'realistic'; // 'blueprint' | 'clay' | 'realistic' | 'structural'
    this.autoRotate = true;
    this.hotspots = [];
    this.buildingGroup = null;
    this.structuralGroup = null;
    this.blueprintLinesGroup = null;
    this.gridHelper = null;
    this.materials = {};

    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.warn("Three.js not loaded yet. Retrying in 200ms...");
      setTimeout(() => this.init(), 200);
      return;
    }

    this.setupScene();
    this.setupLights();
    this.buildArchitecturalModel();
    this.setupHotspots();
    this.setupControls();
    this.bindEvents();
    this.animate();

    // Set initial mode
    this.setMode(this.currentMode);
  }

  setupScene() {
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 520;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0e1117);

    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    this.camera.position.set(22, 14, 26);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.canvasWrapper = this.container.querySelector('.three-canvas-container') || this.container;
    this.canvasWrapper.appendChild(this.renderer.domElement);

    // Orbit Controls
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below ground
      this.controls.minDistance = 12;
      this.controls.maxDistance = 55;
      this.controls.target.set(0, 5, 0);
    }

    // CAD Ground Grid
    this.gridHelper = new THREE.GridHelper(50, 50, 0x38BDF8, 0x1f2937);
    this.gridHelper.position.y = 0;
    this.scene.add(this.gridHelper);
  }

  setupLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(this.ambientLight);

    // Main Sun/Key Light
    this.sunLight = new THREE.DirectionalLight(0xffecd2, 1.2);
    this.sunLight.position.set(25, 35, 20);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.sunLight.shadow.bias = -0.001;
    this.scene.add(this.sunLight);

    // Secondary Cool Fill Light
    this.fillLight = new THREE.DirectionalLight(0x536B78, 0.5);
    this.fillLight.position.set(-20, 20, -15);
    this.scene.add(this.fillLight);

    // Warm Interior Point Lights
    this.interiorLight1 = new THREE.PointLight(0xffaa44, 1.5, 12);
    this.interiorLight1.position.set(0, 3, 0);
    this.scene.add(this.interiorLight1);

    this.interiorLight2 = new THREE.PointLight(0xffcc66, 1.2, 12);
    this.interiorLight2.position.set(2, 8, 1);
    this.scene.add(this.interiorLight2);
  }

  buildArchitecturalModel() {
    this.buildingGroup = new THREE.Group();
    this.structuralGroup = new THREE.Group();
    this.blueprintLinesGroup = new THREE.Group();

    // 1. Base / Plinth
    const plinthGeo = new THREE.BoxGeometry(18, 0.8, 14);
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0x222429, roughness: 0.8 });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = 0.4;
    plinth.receiveShadow = true;
    this.buildingGroup.add(plinth);

    // 2. Ground Floor Living Volume
    const gfGeo = new THREE.BoxGeometry(15, 4.2, 11);
    const gfMat = new THREE.MeshStandardMaterial({ color: 0xe8e5de, roughness: 0.6 });
    const gfMesh = new THREE.Mesh(gfGeo, gfMat);
    gfMesh.position.set(-0.5, 2.9, 0);
    gfMesh.castShadow = true;
    gfMesh.receiveShadow = true;
    this.buildingGroup.add(gfMesh);

    // 3. Ground Floor Glass Facade (Panoramic window)
    const glassGeo = new THREE.PlaneGeometry(10, 3.4);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transmission: 0.7,
      opacity: 0.8,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1
    });
    const glassFront = new THREE.Mesh(glassGeo, glassMat);
    glassFront.position.set(-0.5, 2.8, 5.55);
    this.buildingGroup.add(glassFront);

    // 4. First Floor Cantilevered Slab
    const slab1Geo = new THREE.BoxGeometry(17, 0.5, 13);
    const slab1Mat = new THREE.MeshStandardMaterial({ color: 0x33363d, roughness: 0.5 });
    const slab1 = new THREE.Mesh(slab1Geo, slab1Mat);
    slab1.position.set(0, 5.25, 0.5);
    slab1.castShadow = true;
    this.buildingGroup.add(slab1);

    // 5. First Floor Master Volume (Set back asymmetrically)
    const ffGeo = new THREE.BoxGeometry(12, 3.8, 9);
    const ffMat = new THREE.MeshStandardMaterial({ color: 0xd8d4cc, roughness: 0.5 });
    const ffMesh = new THREE.Mesh(ffGeo, ffMat);
    ffMesh.position.set(1.5, 7.4, 0);
    ffMesh.castShadow = true;
    ffMesh.receiveShadow = true;
    this.buildingGroup.add(ffMesh);

    // 6. First Floor Balcony Glass
    const balconyGlassGeo = new THREE.BoxGeometry(7, 1.1, 0.1);
    const balconyGlass = new THREE.Mesh(balconyGlassGeo, glassMat);
    balconyGlass.position.set(-3.5, 6.1, 5.8);
    this.buildingGroup.add(balconyGlass);

    // 7. Roof Terrace Cantilevered Canopy (Modern Floating Roof)
    const roofGeo = new THREE.BoxGeometry(14, 0.4, 11);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x222428, roughness: 0.4 });
    const roofMesh = new THREE.Mesh(roofGeo, roofMat);
    roofMesh.position.set(1.5, 9.5, 0.5);
    roofMesh.castShadow = true;
    this.buildingGroup.add(roofMesh);

    // 8. Teak Architectural Louvers (Wood Accents)
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.7 });
    for (let i = 0; i < 7; i++) {
      const louverGeo = new THREE.BoxGeometry(0.12, 3.8, 0.4);
      const louver = new THREE.Mesh(louverGeo, woodMat);
      louver.position.set(-4.2 + i * 0.4, 7.4, 4.6);
      louver.castShadow = true;
      this.buildingGroup.add(louver);
    }

    // --- STRUCTURAL SKELETON (RCC Footings, Columns, Beams, Slabs) ---
    const colGeo = new THREE.BoxGeometry(0.5, 9.5, 0.5);
    const colMat = new THREE.MeshStandardMaterial({ color: 0x536B78, roughness: 0.7 });
    const footingGeo = new THREE.BoxGeometry(1.6, 0.6, 1.6);
    const footingMat = new THREE.MeshStandardMaterial({ color: 0x3d4f59, roughness: 0.9 });

    // Grid Coordinates for Columns
    const colCoords = [
      [-6, -4], [0, -4], [6, -4],
      [-6, 0],  [0, 0],  [6, 0],
      [-6, 4],  [0, 4],  [6, 4]
    ];

    colCoords.forEach(([x, z]) => {
      // Column
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.set(x, 5.15, z);
      this.structuralGroup.add(col);

      // Footing below
      const footing = new THREE.Mesh(footingGeo, footingMat);
      footing.position.set(x, 0.3, z);
      this.structuralGroup.add(footing);

      // Rebar wireframe cage inside column
      const rebarGeo = new THREE.BoxGeometry(0.35, 9.4, 0.35);
      const rebarWire = new THREE.WireframeGeometry(rebarGeo);
      const rebarLine = new THREE.LineSegments(rebarWire, new THREE.LineBasicMaterial({ color: 0xC9A86A }));
      rebarLine.position.set(x, 5.15, z);
      this.structuralGroup.add(rebarLine);
    });

    // Horizontal RCC Beams at GF and FF
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x5a7382 });
    [5.0, 9.3].forEach(y => {
      // X-beams
      [-4, 0, 4].forEach(z => {
        const beamX = new THREE.Mesh(new THREE.BoxGeometry(12.5, 0.45, 0.45), beamMat);
        beamX.position.set(0, y, z);
        this.structuralGroup.add(beamX);
      });
      // Z-beams
      [-6, 0, 6].forEach(x => {
        const beamZ = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 8.5), beamMat);
        beamZ.position.set(x, y, 0);
        this.structuralGroup.add(beamZ);
      });
    });

    // --- BLUEPRINT CAD WIREFRAME LINES ---
    const allMeshes = [];
    this.buildingGroup.traverse(child => {
      if (child.isMesh && child.geometry) {
        allMeshes.push(child);
      }
    });

    allMeshes.forEach(mesh => {
      const edges = new THREE.EdgesGeometry(mesh.geometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x38BDF8, linewidth: 1.5 }));
      line.position.copy(mesh.position);
      line.rotation.copy(mesh.rotation);
      this.blueprintLinesGroup.add(line);
    });

    // Add groups to scene
    this.scene.add(this.buildingGroup);
    this.scene.add(this.structuralGroup);
    this.scene.add(this.blueprintLinesGroup);

    // Initial visibility
    this.structuralGroup.visible = false;
    this.blueprintLinesGroup.visible = false;
  }

  setupHotspots() {
    this.hotspotDefs = [
      {
        id: 'hotspot1',
        title: 'Roof Terrace & Solar Provision',
        code: 'ELEV +9.60m • IS 875 WIND LOAD',
        desc: 'Reinforced concrete cantilevered slab engineered for rooftop terrace garden loads and future solar PV panel arrays.',
        pos: new THREE.Vector3(2.5, 9.6, 2)
      },
      {
        id: 'hotspot2',
        title: 'Cantilevered Balcony (PT Beam)',
        code: 'SPAN 3.2m • IS 456 COMPLIANT',
        desc: 'Post-tensioned slender beam section providing seamless column-free architectural overhang and expansive glass facade view.',
        pos: new THREE.Vector3(-4.5, 5.5, 5.2)
      },
      {
        id: 'hotspot3',
        title: 'Double-Height Living Foyer',
        code: 'CLEAR 6.2m • PMC BYLAW COMPLIANT',
        desc: 'Integrated open-concept space planning maximizing natural sunlight penetration and cross-ventilation airflow.',
        pos: new THREE.Vector3(-1.0, 3.0, 4.5)
      },
      {
        id: 'hotspot4',
        title: 'Seismic Isolated Raft Footing',
        code: 'IS 1893:2016 • SEISMIC ZONE III',
        desc: 'Heavy-duty combined concrete foundation engineered specifically for regional soil bearing capacity and seismic ductility.',
        pos: new THREE.Vector3(6.0, 0.4, 4.0)
      },
      {
        id: 'hotspot5',
        title: 'Ductile Column Rebar Cage',
        code: 'IS 13920 • Fe500D TMT REBAR',
        desc: 'Computerized rebar detailing with seismic tie hooks and 10-15% optimized steel consumption.',
        pos: new THREE.Vector3(0.0, 5.0, -4.0)
      }
    ];

    // Create 2D HTML pins on top of 3D canvas
    const pinContainer = this.container.querySelector('.three-hotspot-layer') || this.container;
    this.hotspotElements = [];

    this.hotspotDefs.forEach((def, index) => {
      const pinEl = document.createElement('div');
      pinEl.className = 'hotspot-pin';
      pinEl.id = def.id;
      pinEl.innerHTML = `
        <div class="hotspot-dot"></div>
        <div class="hotspot-label">${def.title}</div>
      `;

      pinEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectHotspot(def);
      });

      pinContainer.appendChild(pinEl);
      this.hotspotElements.push({ def, el: pinEl });
    });
  }

  selectHotspot(def) {
    const card = document.getElementById('hotspotDetailCard');
    if (!card) return;

    document.getElementById('hotspotCardTitle').textContent = def.title;
    document.getElementById('hotspotCardCode').textContent = def.code;
    document.getElementById('hotspotCardDesc').textContent = def.desc;
    card.classList.add('active');

    // Smoothly focus camera on hotspot
    if (this.controls) {
      const targetPos = def.pos.clone();
      targetPos.y += 1;
      this.controls.target.copy(targetPos);
    }
  }

  setMode(mode) {
    this.currentMode = mode;

    // Update buttons
    const btns = this.container.querySelectorAll('.three-mode-btn');
    btns.forEach(btn => {
      if (btn.dataset.mode === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Mode visual configuration
    if (mode === 'blueprint') {
      this.scene.background = new THREE.Color(0x0a101d);
      this.buildingGroup.visible = false;
      this.structuralGroup.visible = false;
      this.blueprintLinesGroup.visible = true;
      this.gridHelper.visible = true;
      this.gridHelper.material.color.setHex(0x38BDF8);
      this.ambientLight.intensity = 0.8;
      this.sunLight.intensity = 0.2;
      this.updateHudStandard('IS 456:2000 • CAD SCALE 1:100');
    } else if (mode === 'clay') {
      this.scene.background = new THREE.Color(0x1a1c22);
      this.buildingGroup.visible = true;
      this.structuralGroup.visible = false;
      this.blueprintLinesGroup.visible = false;
      this.gridHelper.visible = true;
      this.gridHelper.material.color.setHex(0x536B78);
      this.ambientLight.intensity = 0.6;
      this.sunLight.intensity = 1.3;
      this.setBuildingClay(true);
      this.updateHudStandard('ARCHITECTURAL MASSING & SHADOW STUDY');
    } else if (mode === 'realistic') {
      this.scene.background = new THREE.Color(0x0e1117);
      this.buildingGroup.visible = true;
      this.structuralGroup.visible = false;
      this.blueprintLinesGroup.visible = false;
      this.gridHelper.visible = true;
      this.gridHelper.material.color.setHex(0x334155);
      this.ambientLight.intensity = 0.65;
      this.sunLight.intensity = 1.2;
      this.setBuildingClay(false);
      this.updateHudStandard('PHOTOREALISTIC TWILIGHT ELEVATION');
    } else if (mode === 'structural') {
      this.scene.background = new THREE.Color(0x0c0e12);
      this.buildingGroup.visible = true;
      // Make building semi-transparent so skeleton shines through
      this.setBuildingTransparent(true);
      this.structuralGroup.visible = true;
      this.blueprintLinesGroup.visible = false;
      this.gridHelper.visible = true;
      this.gridHelper.material.color.setHex(0xC9A86A);
      this.ambientLight.intensity = 0.5;
      this.sunLight.intensity = 0.8;
      this.updateHudStandard('RCC FRAME & SEISMIC REBAR (IS 1893:2016)');
    }
  }

  setBuildingClay(isClay) {
    this.buildingGroup.traverse(child => {
      if (child.isMesh && child.material) {
        if (!child.userData.origMaterial) {
          child.userData.origMaterial = child.material;
        }
        if (isClay) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xefede8,
            roughness: 0.9,
            metalness: 0.0
          });
        } else {
          child.material = child.userData.origMaterial;
          child.material.transparent = false;
          child.material.opacity = 1.0;
        }
      }
    });
  }

  setBuildingTransparent(isTransparent) {
    this.buildingGroup.traverse(child => {
      if (child.isMesh && child.material) {
        if (isTransparent) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x22242a,
            roughness: 0.8,
            transparent: true,
            opacity: 0.28,
            wireframe: false
          });
        }
      }
    });
  }

  updateHudStandard(text) {
    const hudStd = document.getElementById('threeHudStandard');
    if (hudStd) hudStd.textContent = text;
  }

  setupControls() {
    // Mode Buttons Click
    const modeBtns = this.container.querySelectorAll('.three-mode-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.setMode(btn.dataset.mode);
      });
    });

    // Auto-Rotate Button
    const rotateBtn = document.getElementById('threeToggleRotate');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', () => {
        this.autoRotate = !this.autoRotate;
        rotateBtn.style.color = this.autoRotate ? 'var(--gold-primary)' : '#FFFFFF';
      });
    }

    // Reset Camera Button
    const resetBtn = document.getElementById('threeResetView');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.camera.position.set(22, 14, 26);
        if (this.controls) {
          this.controls.target.set(0, 5, 0);
        }
      });
    }

    // Close Hotspot Card
    const closeCard = document.getElementById('hotspotCardClose');
    if (closeCard) {
      closeCard.addEventListener('click', () => {
        document.getElementById('hotspotDetailCard').classList.remove('active');
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize());

    // Stop auto-rotation when user manually drags
    if (this.canvasWrapper) {
      this.canvasWrapper.addEventListener('pointerdown', () => {
        this.isUserDragging = true;
      });
      window.addEventListener('pointerup', () => {
        this.isUserDragging = false;
      });
    }
  }

  onResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  updateHotspotPositions() {
    if (!this.hotspotElements || this.hotspotElements.length === 0) return;

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    this.hotspotElements.forEach(({ def, el }) => {
      const vector = def.pos.clone();
      vector.project(this.camera);

      // Check if behind camera
      if (vector.z > 1) {
        el.style.display = 'none';
        return;
      }

      el.style.display = 'block';
      const x = (vector.x * halfWidth) + halfWidth;
      const y = -(vector.y * halfHeight) + halfHeight;

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Orbit auto-rotation
    if (this.autoRotate && !this.isUserDragging) {
      if (this.controls) {
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.8;
      }
    } else if (this.controls) {
      this.controls.autoRotate = false;
    }

    if (this.controls) {
      this.controls.update();
    }

    this.updateHotspotPositions();
    this.renderer.render(this.scene, this.camera);
  }
}

// Global initialization helper
window.initArch3DViewer = () => {
  if (document.getElementById('threeArchitecturalViewer')) {
    window.archViewerInstance = new Arch3DViewer('threeArchitecturalViewer');
  }
};
