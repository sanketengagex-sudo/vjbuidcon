/**
 * VISHAL JAMDHADE BUILDCON — ESTIMATOR ENGINE
 * Authentic rates, dynamic timeline, scope computation, and contact prefill
 */

const projectEstimator = {
  currentType: 'bungalow',
  currentArea: 2500,
  currentPackage: 'full',

  rates: {
    bungalow: {
      plan2d: { ratePerSqft: 4, days: 6 },
      plan3d: { ratePerSqft: 9, days: 10 },
      full: { ratePerSqft: 18, days: 16 }
    },
    rowhouse: {
      plan2d: { ratePerSqft: 3.5, days: 5 },
      plan3d: { ratePerSqft: 8, days: 9 },
      full: { ratePerSqft: 16, days: 14 }
    },
    commercial: {
      plan2d: { ratePerSqft: 5, days: 8 },
      plan3d: { ratePerSqft: 12, days: 14 },
      full: { ratePerSqft: 24, days: 22 }
    },
    warehouse: {
      plan2d: { ratePerSqft: 3, days: 7 },
      plan3d: { ratePerSqft: 7, days: 12 },
      full: { ratePerSqft: 15, days: 18 }
    }
  },

  deliverables: {
    plan2d: [
      "Precision 2D Architectural Floor Plans",
      "Vastu-Compliant Space & Room Layouts",
      "Dimensioned Wall & Opening Schedules",
      "Basic Furniture Layout Planning"
    ],
    plan3d: [
      "All 2D Architectural Floor Plans",
      "Photorealistic 3D Exterior Elevation (Dusk & Day)",
      "High-Resolution 3D Render Views (3 Angles)",
      "Exterior Color & Material Specification Sheet"
    ],
    full: [
      "Complete 2D Architectural & Sanction Drawings",
      "Photorealistic 3D Elevations & Landscape Modeling",
      "Complete RCC Structural Design (IS 456 / IS 1893)",
      "Footing, Column, Beam & Slab Reinforcement Schedules",
      "Good-For-Construction (GFC) Working Drawings Set",
      "Quantity Estimation & Bill of Quantities (BOQ)"
    ]
  },

  init() {
    this.bindEvents();
    this.calculate();
  },

  bindEvents() {
    // Project Type Buttons
    const typeBtns = document.querySelectorAll('.calc-type-btn');
    typeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        typeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentType = btn.dataset.type;
        this.calculate();
      });
    });

    // Area Slider
    const slider = document.getElementById('calcAreaSlider');
    const areaValDisplay = document.getElementById('calcAreaValue');
    if (slider) {
      slider.addEventListener('input', (e) => {
        this.currentArea = parseInt(e.target.value, 10);
        if (areaValDisplay) {
          areaValDisplay.textContent = `${this.currentArea.toLocaleString()} Sq.Ft`;
        }
        this.calculate();
      });
    }

    // Package Selector Items
    const pkgItems = document.querySelectorAll('.service-option-item');
    pkgItems.forEach(item => {
      item.addEventListener('click', () => {
        pkgItems.forEach(i => i.classList.remove('selected'));
        const radio = item.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          this.currentPackage = radio.value;
        }
        item.classList.add('selected');
        this.calculate();
      });
    });

    // 3D Checkbox Deliverable Add-ons
    const addonCheckboxes = document.querySelectorAll('.est-addon-check');
    addonCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        this.updateAddonCount();
      });
    });

    // Transfer button
    const applyEstimateBtn = document.getElementById('applyEstimateBtn');
    if (applyEstimateBtn) {
      applyEstimateBtn.addEventListener('click', () => {
        this.transferToContactForm();
      });
    }
  },

  updateAddonCount() {
    const addonCheckboxes = document.querySelectorAll('.est-addon-check:checked');
    const badge = document.getElementById('addonCountBadge');
    if (badge) {
      badge.textContent = `${addonCheckboxes.length} Active`;
    }
  },

  calculate() {
    const typeConfig = this.rates[this.currentType] || this.rates.bungalow;
    const pkgConfig = typeConfig[this.currentPackage] || typeConfig.full;

    const estimatedCost = Math.round(this.currentArea * pkgConfig.ratePerSqft);
    const minRange = Math.round(estimatedCost * 0.9);
    const maxRange = Math.round(estimatedCost * 1.1);

    const scaleFactor = Math.max(1, Math.log10(this.currentArea / 1000));
    const finalDays = Math.round(pkgConfig.days * scaleFactor);

    const costElem = document.getElementById('estCostRange');
    const daysElem = document.getElementById('estDaysRange');
    const delivList = document.getElementById('estDeliverablesList');

    if (costElem) {
      costElem.textContent = `₹${minRange.toLocaleString('en-IN')} - ₹${maxRange.toLocaleString('en-IN')}`;
    }

    if (daysElem) {
      daysElem.textContent = `${finalDays} - ${finalDays + 4} Business Days`;
    }

    if (delivList) {
      const items = this.deliverables[this.currentPackage] || this.deliverables.full;
      delivList.innerHTML = items.map(item => `
        <li>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <span>${item}</span>
        </li>
      `).join('');
    }

    this.updateAddonCount();
  },

  transferToContactForm() {
    const formType = document.getElementById('formProjectType');
    const formArea = document.getElementById('formPlotArea');
    const formService = document.getElementById('formService');
    const formMsg = document.getElementById('formMessage');

    const typeLabels = {
      bungalow: 'Bungalow',
      rowhouse: 'Row House',
      commercial: 'Commercial Complex',
      warehouse: 'Warehouse / PEB'
    };

    const serviceLabels = {
      plan2d: '2D Architectural Planning',
      plan3d: '3D Architectural Visualization',
      full: 'Full Turnkey (2D + 3D + RCC)'
    };

    if (formType) formType.value = typeLabels[this.currentType] || 'Bungalow';
    if (formArea) formArea.value = `${this.currentArea} sq.ft`;
    if (formService) formService.value = serviceLabels[this.currentPackage] || 'Full Turnkey (2D + 3D + RCC)';

    // Synchronize 3D checkboxes in contact form
    const contactCbs = document.querySelectorAll('.contact-service-check');
    contactCbs.forEach(cb => {
      if (this.currentPackage === 'plan2d') {
        cb.checked = (cb.value.includes('2D') || cb.value.includes('Working'));
      } else if (this.currentPackage === 'plan3d') {
        cb.checked = (cb.value.includes('2D') || cb.value.includes('3D'));
      } else {
        cb.checked = true;
      }
    });

    if (formMsg) {
      formMsg.value = `Hello Vishal Jamdhade Buildcon, I calculated an estimate for my ${typeLabels[this.currentType]} project (${this.currentArea} sq.ft) requiring ${serviceLabels[this.currentPackage]}. Please provide an official architectural and structural engineering proposal.`;
    }

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (window.showSiteToast) {
      window.showSiteToast("Estimator details transferred to enquiry form below!");
    }
  }
};
