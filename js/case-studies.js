/**
 * VISHAL JAMDHADE BUILDCON — CASE STUDY DATABASE & MODAL CONTROLLER
 * 10-Step Architectural & Engineering Deep Dive
 */

const caseStudiesData = {
  1: {
    id: 1,
    title: "Skyline Grandeur Luxury Villa",
    category: "Residential Bungalow",
    location: "Baner, Pune",
    plotArea: "4,500 Sq.Ft",
    builtupArea: "6,200 Sq.Ft",
    floors: "G + 2 Floors",
    image: "assets/images/elevation_3d.jpg",
    client: "Dr. R. Kulkarni & Family",
    overview: "A contemporary multi-generational luxury bungalow blending natural stone textures, cantilevered balconies, and floor-to-ceiling panoramic glass.",
    requirement: "Spacious 5-BHK bungalow with private elevator, home theatre, open terrace garden, and double-height living foyer with complete Vastu alignment.",
    siteInfo: "East-facing 60' x 75' plot with a gentle slope toward the north road. Soil investigation revealed hard murrum at 2.4m depth.",
    concept: "Biophilic architectural design integrating interior courtyards with exterior greenery to maximize cross-ventilation and reduce air conditioning loads.",
    planning2D: "Zoned into active entertaining, private family suites, and terrace recreational areas. 100% compliant with Pune Municipal Corporation (PMC) bylaws.",
    vis3D: "Hyper-realistic twilight elevation renderings developed with customized louver detailing, warm facade accent lighting, and infinity plunge pool.",
    structuralDesign: "Seismic Zone III resistant RCC framed structure (IS 1893:2016). Raft-isolated combined footings, slender 300x600mm columns, and cantilevered slab beams.",
    workingDrawings: "45 comprehensive GFC drawings including plumbing schematics, HVAC ducting, automated electrical loops, and structural bar schedules.",
    execution: "Continuous site coordination with structural inspections at footing casting, column reinforcement tying, and slab pre-pour verification.",
    finalResult: "Flawlessly delivered 3 weeks ahead of schedule. Achieved 12% structural steel savings through finite element rebar optimization."
  },
  2: {
    id: 2,
    title: "City Crossing Commercial Arcade",
    category: "Commercial Complex",
    location: "Chhatrapati Sambhajinagar",
    plotArea: "12,000 Sq.Ft",
    builtupArea: "28,500 Sq.Ft",
    floors: "B + G + 4 Floors",
    image: "assets/images/commercial_complex.jpg",
    client: "Apex Properties & Retailers (Mr. Manoj Shinde)",
    overview: "A high-visibility mixed-use commercial complex featuring ground-floor flagship retail showrooms, corporate office suites, and basement parking.",
    requirement: "Maximized street frontage, column-free retail display layouts, high-capacity passenger elevators, and energy-efficient double-glazed curtain walls.",
    siteInfo: "Corner plot facing a 100-foot main arterial road. High pedestrian footfall and stringent fire setback guidelines.",
    concept: "Iconic tilted roof geometry with vertical acoustic louvers providing solar shading while creating an unmistakable commercial landmark.",
    planning2D: "Open floor plates with central core utilities (fire stairs, elevators, AHU rooms) allowing flexible tenant partitioning.",
    vis3D: "3D architectural visualizations under daylight and evening illumination to support investor leasing presentations.",
    structuralDesign: "Heavy-duty RCC frame designed for commercial live loads (4.0 kN/m²). Post-tensioned beam system for 9-meter clear column spans.",
    workingDrawings: "Complete fire-fighting layouts, basement mechanical ventilation plans, curtain wall mounting details, and facade engineering sets.",
    execution: "Rigorous quality control with ultrasonic pulse testing and ready-mix concrete cube strength certifications.",
    finalResult: "100% pre-leased prior to structural completion, yielding superior commercial ROI for the developer."
  },
  3: {
    id: 3,
    title: "LogiTech PEB Mega Warehouse",
    category: "Industrial Steel Structure",
    location: "Chakan Industrial Zone, Pune",
    plotArea: "45,000 Sq.Ft",
    builtupArea: "32,000 Sq.Ft",
    floors: "Single Span Clear Height (11m)",
    image: "assets/images/industrial_warehouse.jpg",
    client: "Global Logistics & Supply Chain Ltd. (Vikram Patil)",
    overview: "A state-of-the-art Pre-Engineered Building (PEB) warehouse and logistics center engineered for high-density heavy pallet racking.",
    requirement: "Clear span steel portal frames with zero interior columns, 6 hydraulic dock levelers, heavy-duty VNA forklift laser-leveled flooring (FM2).",
    siteInfo: "Expansive industrial terrain requiring extensive cut-and-fill grading and storm water retention pond planning.",
    concept: "Optimized tapered steel rigid frames with standing seam insulated roof panels and continuous polycarbonate daylight ridge monitors.",
    planning2D: "Logistics vehicle turning radius simulations (WB-20 trucks), one-way internal loop roads, and separate executive admin mezzanine office.",
    vis3D: "Complete industrial visualization showing truck bay dock sequences, fire hydrant ring mains, and internal warehouse racking views.",
    structuralDesign: "Steel design conforming to IS 800:2007 and IS 875 Part 3 (Wind load 44 m/s). High-strength Grade 8.8 bolted moment connections.",
    workingDrawings: "Anchor bolt setting templates, fabrication shop drawings, cold-formed Z-purlin schedules, and crane gantry girder detailing.",
    execution: "Supervised foundation pedestal casting and torque verification for all high-strength friction grip (HSFG) structural bolts.",
    finalResult: "Completed in 5 months. Lightweight high-tensile steel reduced overall superstructure weight by 18% compared to conventional trusses."
  },
  4: {
    id: 4,
    title: "Anand Nilayam Luxury Bungalow",
    category: "Residential Bungalow",
    location: "Nashik, Maharashtra",
    plotArea: "3,800 Sq.Ft",
    builtupArea: "4,400 Sq.Ft",
    floors: "G + 1 Floor",
    image: "assets/images/completed_bungalow.jpg",
    client: "Mr. S. Patil",
    overview: "A serene, eco-conscious bungalow designed with local basalt stone, warm teak accents, and expansive cantilevered roof canopies.",
    requirement: "A peaceful retreat home with seamless indoor-outdoor connection, open courtyard, and structural provision for rooftop solar array.",
    siteInfo: "West-facing rectangular plot in a quiet residential colony with existing mature neem and mango trees.",
    concept: "Preserved all mature trees through custom architectural massing and created an internal courtyard that acts as a natural thermal buffer.",
    planning2D: "Split-level living layout with minimal corridor waste, allowing every bedroom to open directly onto private landscaped garden verandas.",
    vis3D: "Photorealistic twilight renders highlighting warm accent sconces, wood-polymer composite pergolas, and landscape lighting.",
    structuralDesign: "Slender RCC frame with inverted beam ceiling details for flush, seamless architectural plaster finishes.",
    workingDrawings: "Detailed stonemasonry jointing patterns, concealed rainwater harvesting conduits, and structural rebar bend diagrams.",
    execution: "Regular bi-weekly site audits ensuring structural drawings were faithfully executed by the local masonry teams.",
    finalResult: "Winner of regional architectural commendation for environmentally integrated residential architecture."
  }
};

const caseStudyModal = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    const overlay = document.getElementById('caseStudyModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const triggerBtns = document.querySelectorAll('.btn-view-case');

    triggerBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const caseId = btn.dataset.caseId || 1;
        this.open(caseId);
      });
    });

    if (closeBtn && overlay) {
      closeBtn.addEventListener('click', () => this.close());
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  },

  open(caseId) {
    const data = caseStudiesData[caseId] || caseStudiesData[1];
    const overlay = document.getElementById('caseStudyModal');
    if (!overlay) return;

    document.getElementById('modalProjectTitle').textContent = data.title;
    document.getElementById('modalProjectBadge').textContent = `${data.category} • ${data.location}`;
    document.getElementById('modalClientName').textContent = data.client;
    document.getElementById('modalPlotArea').textContent = data.plotArea;
    document.getElementById('modalBuiltupArea').textContent = data.builtupArea;
    document.getElementById('modalFloors').textContent = data.floors;
    document.getElementById('modalProjectImg').src = data.image;

    // 10 Steps
    document.getElementById('step1Overview').textContent = data.overview;
    document.getElementById('step2Requirement').textContent = data.requirement;
    document.getElementById('step3SiteInfo').textContent = data.siteInfo;
    document.getElementById('step4Concept').textContent = data.concept;
    document.getElementById('step5Planning').textContent = data.planning2D;
    document.getElementById('step6Visualization').textContent = data.vis3D;
    document.getElementById('step7Structural').textContent = data.structuralDesign;
    document.getElementById('step8Drawings').textContent = data.workingDrawings;
    document.getElementById('step9Execution').textContent = data.execution;
    document.getElementById('step10Result').textContent = data.finalResult;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  close() {
    const overlay = document.getElementById('caseStudyModal');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
};
