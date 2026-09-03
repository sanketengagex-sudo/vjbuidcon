/**
 * VISHAL JAMDHADE BUILDCON — MASTER CONTROLLER APPLICATION
 * Coordinates Navigation, 3D WebGL, Estimator, Case Studies, FAQs, and WhatsApp
 */

// Showcase Phase Configuration
const showcasePhases = {
  'phase-2d': {
    tag: 'STAGE 01 • BLUEPRINT',
    title: '2D Architectural Floor Plan & Space Design',
    desc: 'Every successful structure begins with meticulous 2D architectural drafting. We calibrate room dimensions, circulation airflow, natural lighting, and Vaastu compliance down to the millimeter.',
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
    title: '3D Photorealistic Exterior & Facade Elevations',
    desc: 'Experience your building before breaking ground. We generate hyper-realistic 3D visualizations with authentic solar angles, material textures, dusk illumination, and landscape integrations.',
    specs: [
      { key: 'Resolution', val: '4K Ultra-HD Photorealistic Renders' },
      { key: 'Deliverable', val: '3 Elevation Views + Materials' },
      { key: 'Material Specs', val: 'Full Exterior Finishes Palette' },
      { key: 'Turnaround', val: '5 - 7 Business Days' }
    ],
    image: 'assets/images/elevation_3d.jpg'
  },
  'phase-rcc': {
    tag: 'STAGE 03 • ENGINEERING',
    title: 'RCC Structural Analysis & Ductile Rebar Skeleton',
    desc: 'The backbone of safety. Our structural engineers model the entire load-bearing system, computing earthquake and wind stresses to specify safe, economical column, beam, and footing schedules.',
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
    desc: 'With our precision Good-For-Construction drawings and on-site consultation, the finished structure mirrors the 3D model with 100% structural integrity and exceptional craftsmanship.',
    specs: [
      { key: 'Execution Quality', val: 'Exact Translation of 3D Model' },
      { key: 'Deliverable', val: 'Completed Dream Structure' },
      { key: 'Client Rating', val: '5.0 ★★★★★ Trust Verified' },
      { key: 'Legacy', val: 'Built to Last Generations' }
    ],
    image: 'assets/images/completed_bungalow.jpg'
  }
};

class BuildconMasterApp {
  constructor() {
    this.currentLang = localStorage.getItem('vjb_lang') || 'en';
    this.init();
  }

  init() {
    this.setupHeaderScroll();
    this.setupMobileMenu();
    this.setupLanguageSwitcher();
    this.setupShowcaseTabs();
    this.setupPortfolioFilters();
    this.setupFaqAccordion();
    this.setupContactForm();
    this.setupFileUpload();
    this.setupWhatsAppButtons();
    this.setupSmoothScrollLinks();

    // Initialize sub-modules
    if (typeof caseStudyModal !== 'undefined') caseStudyModal.init();
    if (typeof projectEstimator !== 'undefined') projectEstimator.init();
    if (window.initArch3DViewer) window.initArch3DViewer();

    // Apply active language
    this.applyLanguage(this.currentLang);
  }

  // 1. Header Scroll Effect
  setupHeaderScroll() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 2. Mobile Menu
  setupMobileMenu() {
    const toggle = document.getElementById('mobileNavToggle');
    const drawer = document.getElementById('mobileNavDrawer');
    const links = document.querySelectorAll('.mobile-drawer-link');

    if (!toggle || !drawer) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      drawer.classList.toggle('active');
      document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        drawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Bilingual Switching (EN | मराठी)
  setupLanguageSwitcher() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        this.currentLang = lang;
        localStorage.setItem('vjb_lang', lang);
        this.applyLanguage(lang);
      });
    });
  }

  applyLanguage(lang) {
    const dict = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : (translations ? translations.en : {});

    // Update switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict && dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update input placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict && dict[key]) {
        el.placeholder = dict[key];
      }
    });
  }

  // 4. Interactive Showcase Tabs
  setupShowcaseTabs() {
    const tabs = document.querySelectorAll('.showcase-tab-btn');
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

        if (showcaseImg) {
          showcaseImg.style.opacity = '0';
          showcaseImg.style.transform = 'scale(0.98)';
          setTimeout(() => {
            showcaseImg.src = data.image;
            showcaseImg.alt = data.title;
            showcaseImg.style.opacity = '1';
            showcaseImg.style.transform = 'scale(1)';
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

  // 5. Portfolio Filter System
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
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. FAQ Accordion
  setupFaqAccordion() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close others
        items.forEach(other => {
          other.classList.remove('active');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 35 + 'px';
          }
        }
      });
    });
  }

  // 7. Contact Form Handling with WhatsApp Redirection
  setupContactForm() {
    const form = document.getElementById('projectLeadForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const email = document.getElementById('formEmail').value.trim() || 'Not specified';
      const type = document.getElementById('formProjectType').value;
      const location = document.getElementById('formLocation').value.trim() || 'Maharashtra';
      const area = document.getElementById('formPlotArea').value.trim() || 'Not specified';
      const selectedServices = Array.from(document.querySelectorAll('.contact-service-check:checked'))
        .map(cb => cb.value);
      const service = selectedServices.length > 0 ? selectedServices.join(', ') : (document.getElementById('formService').value || 'Full Turnkey (2D + 3D + RCC)');
      const message = document.getElementById('formMessage').value.trim() || 'Preliminary architectural enquiry';

      if (!name || !phone) {
        alert("Please provide your Name and Contact Phone Number.");
        return;
      }

      // Format WhatsApp Message
      const waText = encodeURIComponent(
        `*New Architectural & Structural Enquiry - Vishal Jamdhade Buildcon*\n\n` +
        `👤 *Client Name:* ${name}\n` +
        `📞 *Contact Number:* ${phone}\n` +
        `✉️ *Email:* ${email}\n` +
        `🏢 *Project Type:* ${type}\n` +
        `📍 *Site Location:* ${location}\n` +
        `📐 *Plot / Built-up Area:* ${area}\n` +
        `🛠️ *Required Disciplines:* ${service}\n` +
        `📝 *Project Details:* ${message}\n\n` +
        `_Submitted via Vishal Jamdhade Buildcon Official Web Portal_`
      );

      const waUrl = `https://wa.me/919923438373?text=${waText}`;

      this.showToast("Thank you! Your enquiry has been recorded. Redirecting to WhatsApp for instant engineer response...");

      setTimeout(() => {
        window.open(waUrl, '_blank');
        form.reset();
      }, 1200);
    });

    // Update 3D checkbox count badge on selection change
    const contactCbs = document.querySelectorAll('.contact-service-check');
    const badge = document.getElementById('formServiceCountBadge');
    contactCbs.forEach(cb => {
      cb.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('.contact-service-check:checked').length;
        if (badge) {
          badge.textContent = `${checkedCount} Selected`;
        }
      });
    });
  }

  // 8. File Dropzone Handler
  setupFileUpload() {
    const dropzone = document.getElementById('fileDropzone');
    const input = document.getElementById('fileUploadInput');
    const text = document.getElementById('fileDropText');

    if (!dropzone || !input || !text) return;

    dropzone.addEventListener('click', () => input.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--gold-primary)';
      dropzone.style.backgroundColor = 'rgba(201, 168, 106, 0.08)';
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = '';
      dropzone.style.backgroundColor = '';
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = '';
      dropzone.style.backgroundColor = '';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        input.files = e.dataTransfer.files;
        this.displaySelectedFile(e.dataTransfer.files[0], text);
      }
    });

    input.addEventListener('change', () => {
      if (input.files && input.files[0]) {
        this.displaySelectedFile(input.files[0], text);
      }
    });
  }

  displaySelectedFile(file, textElement) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    textElement.innerHTML = `<strong>Selected:</strong> ${file.name} (${sizeMb} MB)`;
    textElement.style.color = 'var(--gold-primary)';
  }

  // 9. WhatsApp Button Tracking
  setupWhatsAppButtons() {
    const waButtons = document.querySelectorAll('.wa-action-btn');
    waButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const msg = encodeURIComponent(
          "Hello Vishal Jamdhade Buildcon, I am interested in your architectural and structural engineering consultancy services. I would like to discuss my project requirements."
        );
        window.open(`https://wa.me/919923438373?text=${msg}`, '_blank');
      });
    });
  }

  // 10. Smooth Scroll for internal navigation links
  setupSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerHeight = document.getElementById('siteHeader')?.offsetHeight || 70;
          const targetPos = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  showToast(message) {
    let toast = document.getElementById('siteGlobalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'siteGlobalToast';
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

// Global helper for toast
window.showSiteToast = (msg) => {
  if (window.vjbApp) {
    window.vjbApp.showToast(msg);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.vjbApp = new BuildconMasterApp();
});
