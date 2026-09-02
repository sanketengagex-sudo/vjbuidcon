/**
 * VISHAL JAMDHADE BUILDCON - PROJECT ESTIMATOR CALCULATOR
 * Dynamic computation of scope, deliverables, timeline and proposal prefill
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
    // Type buttons
    const typeBtns = document.querySelectorAll('.calc-type-btn');
    typeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        typeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentType = btn.dataset.type;
        this.calculate();
      });
    });

    // Range slider
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

    // Package radio items
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

    // Transfer estimate to lead form
    const applyEstimateBtn = document.getElementById('applyEstimateBtn');
    if (applyEstimateBtn) {
      applyEstimateBtn.addEventListener('click', () => {
        this.transferToContactForm();
      });
    }
  },

  calculate() {
    const typeConfig = this.rates[this.currentType] || this.rates.bungalow;
    const pkgConfig = typeConfig[this.currentPackage] || typeConfig.full;
    
    // Calculate estimated total & timeline
    const estimatedCost = Math.round(this.currentArea * pkgConfig.ratePerSqft);
    const minRange = Math.round(estimatedCost * 0.9);
    const maxRange = Math.round(estimatedCost * 1.1);
    
    // Timeline calculation based on area scale
    const scaleFactor = Math.max(1, Math.log10(this.currentArea / 1000));
    const finalDays = Math.round(pkgConfig.days * scaleFactor);

    // Update DOM
    const costElem = document.getElementById('estCostRange');
    const daysElem = document.getElementById('estDaysRange');
    const delivList = document.getElementById('estDeliverablesList');

    if (costElem) {
      costElem.textContent = `₹${minRange.toLocaleString()} - ₹${maxRange.toLocaleString()}`;
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
  },

  transferToContactForm() {
    // Populate form fields
    const formType = document.getElementById('formProjectType');
    const formArea = document.getElementById('formPlotArea');
    const formService = document.getElementById('formService');
    const formMsg = document.getElementById('formMessage');

    const typeLabels = {
      bungalow: 'Bungalow',
      rowhouse: 'Row House',
      commercial: 'Commercial',
      warehouse: 'Warehouse'
    };

    const serviceLabels = {
      plan2d: '2D Planning',
      plan3d: '3D Design',
      full: 'Full Turnkey (2D + 3D + RCC)'
    };

    if (formType) formType.value = typeLabels[this.currentType] || 'Bungalow';
    if (formArea) formArea.value = `${this.currentArea} sq.ft`;
    if (formService) formService.value = serviceLabels[this.currentPackage] || 'Full Turnkey';
    if (formMsg) {
      formMsg.value = `Hello Vishal Jamdhade Buildcon, I calculated an estimate for my ${typeLabels[this.currentType]} project (${this.currentArea} sq.ft) requiring ${serviceLabels[this.currentPackage]}. Please provide a formal engineering and design proposal.`;
    }

    // Smooth scroll to contact
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Trigger visual toast
    if (window.showToast) {
      window.showToast("Estimator details transferred to contact form below!");
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  projectEstimator.init();
});
