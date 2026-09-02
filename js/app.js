/**
 * VISHAL JAMDHADE BUILDCON - MAIN APPLICATION LOGIC
 * Navigation, Bilingual Language Switching, Interactive Showcase,
 * Portfolio Filters, Case Study Modal, FAQ Accordion, Lead Generation
 */

// Case Study Database for Modal
const caseStudiesData = {
  1: {
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
    title: "City Crossing Commercial Arcade",
    category: "Commercial Complex",
    location: "Aurangabad / Sambhajinagar",
    plotArea: "12,000 Sq.Ft",
    builtupArea: "28,500 Sq.Ft",
    floors: "B + G + 4 Floors",
    image: "assets/images/commercial_complex.jpg",
    client: "Apex Properties & Retailers",
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
    title: "LogiTech PEB Mega Warehouse",
    category: "Industrial Steel Structure",
    location: "Chakan Industrial Zone, Pune",
    plotArea: "45,000 Sq.Ft",
    builtupArea: "32,000 Sq.Ft",
    floors: "Single Span Clear Height (11m)",
    image: "assets/images/industrial_warehouse.jpg",
    client: "Global Logistics & Supply Chain Ltd.",
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

// Showcase Phase Data
const showcasePhases = {
  'phase-2d': {
    tag: 'STAGE 01 • BLUEPRINT',
    title: '2D Architectural Floor Plan & Space Design',
    desc: 'Every successful structure begins with meticulous 2D architectural drafting. We calibrate room sizes, circulation flow, door/window openings, and Vastu compliance down to the millimeter.',
    specs: [
      { key: 'Drafting Scale', val: '1:100 Metric Precision' },
      { key: 'Deliverable', val: 'Full Dimensioned CAD Blueprint' },
      { key: 'Compliance', val: 'Local Municipal Bylaws & FAR' },
      { key: 'Turnaround', val: '4 - 6 Business Days' }
    ],
    image: 'assets/images/cad_floor_plan.jpg'
  },
  'phase-3d': {
    tag: 'STAGE 02 • VISUALIZATION',
    title: '3D Photorealistic Exterior & Interior Elevations',
    desc: 'Experience your building before breaking ground. We generate hyper-realistic 3D visualizations with authentic daylight angles, material textures, landscaping, and night lighting schemes.',
    specs: [
      { key: 'Resolution', val: '4K Ultra-HD Photorealistic Renders' },
      { key: 'Deliverable', val: '3 Elevation Views + Walkthrough' },
      { key: 'Material Specs', val: 'Full Exterior Finishes Palette' },
      { key: 'Turnaround', val: '5 - 7 Business Days' }
    ],
    image: 'assets/images/elevation_3d.jpg'
  },
  'phase-rcc': {
    tag: 'STAGE 03 • ENGINEERING',
    title: 'RCC Structural Analysis & Rebar Skeleton',
    desc: 'The backbone of safety. Our structural engineers model the entire load-bearing system, computing earthquake and wind stresses to specify safe, economical column, beam, and footing details.',
    specs: [
      { key: 'Engineering Codes', val: 'IS 456:2000 & IS 1893:2016' },
      { key: 'Deliverable', val: 'Structural Analysis & Rebar Schedules' },
      { key: 'Steel Optimization', val: '10% - 15% Cost Savings' },
      { key: 'Safety Factor', val: '100% Seismic Resistant' }
    ],
    image: 'assets/images/rcc_structural_model.jpg'
  },
  'phase-built': {
    tag: 'STAGE 04 • REALITY',
    title: 'Flawlessly Built Construction Reality',
    desc: 'With our precision working drawings and on-site consultation, the finished structure mirrors the 3D design with 100% structural integrity and exquisite craftsmanship.',
    specs: [
      { key: 'Execution Quality', val: 'Exact Translation of 3D Model' },
      { key: 'Deliverable', val: 'Completed Dream Home' },
      { key: 'Client Rating', val: '5.0 ★★★★★ Trust Verified' },
      { key: 'Legacy', val: 'Built to Last Generations' }
    ],
    image: 'assets/images/completed_bungalow.jpg'
  }
};

// Main App Controller
class BuildconApp {
  constructor() {
    this.currentLang = localStorage.getItem('vjb_lang') || 'en';
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupLanguageSwitcher();
    this.setupShowcaseTabs();
    this.setupPortfolioFilters();
    this.setupCaseStudyModal();
    this.setupFaqAccordion();
    this.setupContactForm();
    this.setupFileUpload();
    this.setupWhatsAppTracking();
    this.applyLanguage(this.currentLang);
  }

  // 1. Navigation & Scroll Spy
  setupNavigation() {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileDrawer.classList.toggle('active');
      });

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileToggle.classList.remove('active');
          mobileDrawer.classList.remove('active');
        });
      });
    }
  }

  // 2. Language Switching (English / Marathi)
  setupLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedLang = btn.dataset.lang;
        this.currentLang = selectedLang;
        localStorage.setItem('vjb_lang', selectedLang);
        this.applyLanguage(selectedLang);
      });
    });
  }

  applyLanguage(lang) {
    const dict = translations[lang] || translations.en;

    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Replace all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Replace input placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });
  }

  // 3. Interactive Showcase Tabs
  setupShowcaseTabs() {
    const tabs = document.querySelectorAll('.showcase-tab');
    const stageTag = document.getElementById('showcaseStageTag');
    const stageTitle = document.getElementById('showcaseStageTitle');
    const stageDesc = document.getElementById('showcaseStageDesc');
    const specsContainer = document.getElementById('showcaseSpecsContainer');
    const showcaseImg = document.getElementById('showcaseMainImg');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const phaseKey = tab.dataset.phase;
        const data = showcasePhases[phaseKey];
        if (!data) return;

        // Smooth transition
        if (showcaseImg) {
          showcaseImg.classList.remove('active');
          setTimeout(() => {
            showcaseImg.src = data.image;
            showcaseImg.alt = data.title;
            showcaseImg.classList.add('active');
          }, 150);
        }

        if (stageTag) stageTag.textContent = data.tag;
        if (stageTitle) stageTitle.textContent = data.title;
        if (stageDesc) stageDesc.textContent = data.desc;

        if (specsContainer) {
          specsContainer.innerHTML = data.specs.map(spec => `
            <div class="showcase-spec-item">
              <span class="spec-key">${spec.key}</span>
              <span class="spec-val">${spec.val}</span>
            </div>
          `).join('');
        }
      });
    });
  }

  // 4. Portfolio Filter System
  setupPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          const category = card.dataset.category;
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.35s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Case Study Modal (10-Step Deep Dive)
  setupCaseStudyModal() {
    const modalOverlay = document.getElementById('caseStudyModal');
    const modalCloseBtn = document.getElementById('closeModalBtn');
    const viewCaseBtns = document.querySelectorAll('.btn-view-case');

    viewCaseBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const caseId = btn.dataset.caseId;
        const data = caseStudiesData[caseId] || caseStudiesData[1];
        this.populateModal(data);
        if (modalOverlay) modalOverlay.classList.add('active');
      });
    });

    if (modalCloseBtn && modalOverlay) {
      modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
      });

      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove('active');
        }
      });
    }
  }

  populateModal(data) {
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
  }

  // 6. FAQ Accordion
  setupFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close others
        faqItems.forEach(other => {
          other.classList.remove('active');
          other.querySelector('.faq-answer').style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
        }
      });
    });
  }

  // 7. Contact Form Handling
  setupContactForm() {
    const form = document.getElementById('projectContactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('formName').value;
      const phone = document.getElementById('formPhone').value;
      const email = document.getElementById('formEmail').value || 'Not provided';
      const type = document.getElementById('formProjectType').value;
      const location = document.getElementById('formLocation').value;
      const area = document.getElementById('formPlotArea').value;
      const service = document.getElementById('formService').value;
      const message = document.getElementById('formMessage').value;

      if (!name || !phone) {
        alert("Please provide your Name and Contact Phone Number.");
        return;
      }

      // Pre-format WhatsApp Message
      const waText = encodeURIComponent(
        `*New Project Enquiry - Vishal Jamdhade Buildcon*\n\n` +
        `👤 *Client Name:* ${name}\n` +
        `📞 *Contact:* ${phone}\n` +
        `✉️ *Email:* ${email}\n` +
        `🏢 *Project Type:* ${type}\n` +
        `📍 *Location:* ${location}\n` +
        `📐 *Plot/Built-up Area:* ${area}\n` +
        `🛠️ *Required Service:* ${service}\n` +
        `📝 *Message:* ${message}\n\n` +
        `_Sent via Vishal Jamdhade Buildcon Portal_`
      );

      const waUrl = `https://wa.me/919923438373?text=${waText}`;

      // Show confirmation toast
      this.showToast("Thank you! Your enquiry has been received. Redirecting to WhatsApp for instant response...");

      // Option to open WhatsApp directly
      setTimeout(() => {
        window.open(waUrl, '_blank');
        form.reset();
      }, 1200);
    });
  }

  // 8. File Dropzone Handler
  setupFileUpload() {
    const fileInput = document.getElementById('fileUploadInput');
    const dropText = document.getElementById('fileDropText');
    if (!fileInput || !dropText) return;

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        dropText.innerHTML = `<strong>Selected:</strong> ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
        dropText.style.color = 'var(--accent-gold)';
      }
    });
  }

  // 9. WhatsApp Button Tracking
  setupWhatsAppTracking() {
    const waBtns = document.querySelectorAll('.wa-trigger');
    waBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const defaultMsg = encodeURIComponent(
          "Hello Vishal Jamdhade Buildcon, I am interested in your architectural and structural design services. I would like to discuss my project requirements."
        );
        window.open(`https://wa.me/919923438373?text=${defaultMsg}`, '_blank');
      });
    });
  }

  showToast(message) {
    let toast = document.getElementById('siteToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'siteToast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#22C55E">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
      <span>${message}</span>
    `;
    toast.style.display = 'flex';

    setTimeout(() => {
      toast.style.display = 'none';
    }, 4500);
  }
}

// Global toast helper for estimator
window.showToast = (msg) => {
  if (window.appInstance) {
    window.appInstance.showToast(msg);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.appInstance = new BuildconApp();
});
