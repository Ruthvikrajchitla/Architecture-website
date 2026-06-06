/* ==========================================
   PREMIUM ARCHITECTURE & INTERIOR DESIGN
   INTERACTIVITY SCRIPT (script.js)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. NAVIGATION SCROLL TRACKING
     ========================================== */
  const header = document.getElementById('header');
  const scrollThreshold = 50;

  function checkScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Initial check in case of page reload halfway down


  /* ==========================================
     2. MOBILE NAVIGATION BURGER MENU
     ========================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });


  /* ==========================================
     3. SMOOTH REVEAL SCROLL ANIMATIONS
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  /* ==========================================
     4. PORTFOLIO FILTERING LOGIC
     ========================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });


  /* ==========================================
     5. PROJECT DETAIL MODAL POPUP
     ========================================== */
  const projectDetails = {
    p1: {
      title: 'The Horizon Villa',
      category: 'Residential Architecture',
      location: 'Malibu, CA',
      type: 'Luxury Residential Villa',
      desc: 'The Horizon Villa is a private coastal retreat designed to maximize panoramic ocean vistas. Featuring double-height structural glass facades, natural teak panels, and an open layout that flows seamlessly onto an infinity pool deck, it blends architecture with the coastal horizon. Customized bronze detailing and low-profile structural concrete form the foundation of this luxury residence.',
      img: 'images/project_villas.png'
    },
    p2: {
      title: 'Synergy Hub',
      category: 'Office Interiors',
      location: 'Seattle, WA',
      type: 'Corporate Headquarters',
      desc: 'Synergy Hub redefines the modern workplace through human-centric design. This biophilic office interior balances open collaboration zones with acoustically insulated focus pods. Meticulously matched charcoal wood paneling, live foliage columns, and smart indirect LED channels create a workspace environment that inspires cognitive health, productivity, and corporate culture.',
      img: 'images/project_office.png'
    },
    p3: {
      title: 'Aura Boutique Hotel',
      category: 'Hospitality Project',
      location: 'Milan, Italy',
      type: 'Boutique Hotel Lobby',
      desc: 'Aura Boutique Hotel lobby acts as a sensory portal. Integrating soft velvet seating in dark, rich charcoal, gold-accented partitions, and custom lighting fixtures, it creates a moody yet comforting hospitality environment. The reception design is characterized by floating slab marble counters and tailored brass profiles that reflect Italian luxury.',
      img: 'images/project_hospitality.png'
    },
    p4: {
      title: 'Glasshouse Penthouse',
      category: 'Luxury Apartment',
      location: 'Manhattan, NY',
      type: 'Luxury Apartment Penthouse',
      desc: 'Hovering above Manhattan, the Glasshouse Penthouse represents minimalist luxury at its peak. Using rare Statuario marble slabs, automated panel walls, and custom-commissioned metallic furniture units, the design offers spacious luxury. Spatial zoning was optimized to frame dramatic cityscape views from every perspective.',
      img: 'images/project_villas.png'
    },
    p5: {
      title: 'Apex Suites',
      category: 'Corporate Workspace',
      location: 'Austin, TX',
      type: 'Corporate Executive Suites',
      desc: 'Apex Suites blends corporate prestige with industrial design elements. The layout features polished concrete floors, custom gold-accented privacy screens, and integrated acoustic ceiling systems. The spatial flow supports private executive meetings while keeping work areas open and sun-drenched.',
      img: 'images/project_office.png'
    },
    p6: {
      title: 'The Velvet Lounge',
      category: 'Retail & Remodeling',
      location: 'London, UK',
      type: 'Premium Cocktail Lounge',
      desc: 'The Velvet Lounge is a premium design intervention of an underground heritage cellar. Retaining historic brick vaults, the design installs luxurious velvet booths, a custom brass back-lit bar counter, and sophisticated gold accents. The space offers a moody, high-end hospitality environment with optimized bar circulation.',
      img: 'images/project_hospitality.png'
    }
  };

  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-img-src');
  const modalCat = document.getElementById('modal-cat-text');
  const modalTitle = document.getElementById('modal-title-text');
  const modalLoc = document.getElementById('modal-loc-text');
  const modalType = document.getElementById('modal-type-text');
  const modalDesc = document.getElementById('modal-desc-text');

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-project-id');
      const data = projectDetails[id];

      if (data) {
        // Populate modal details
        modalImg.src = data.img;
        modalImg.alt = data.title;
        modalCat.textContent = data.category;
        modalTitle.textContent = data.title;
        modalLoc.textContent = data.location;
        modalType.textContent = data.type;
        modalDesc.textContent = data.desc;

        // Open modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scroll
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });


  /* ==========================================
     6. STUDIO COUNTERS SCROLL ANIMATION
     ========================================== */
  const statsSection = document.querySelector('.studio');
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function runCounters() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = target === 150 ? '+' : target === 18 ? '+' : '+';
      let count = 0;
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // ~60fps

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          stat.textContent = target + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(count) + suffix;
        }
      }, 16);
    });
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        runCounters();
      }
    });
  }, { threshold: 0.3 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }


  /* ==========================================
     7. INTERACTIVE DESIGN PROCESS TIMELINE
     ========================================== */
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const progressLine = document.getElementById('timeline-progress');

  function updateTimeline(activeStepIndex) {
    const totalSteps = timelineSteps.length;
    // Calculate progress percentage:
    // Step 1: 0%, Step 6: 100%
    const progressPercent = (activeStepIndex / (totalSteps - 1)) * 90; // offset bounds
    progressLine.style.width = `${progressPercent}%`;

    timelineSteps.forEach((step, idx) => {
      if (idx <= activeStepIndex) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }

  timelineSteps.forEach((step, index) => {
    step.addEventListener('click', () => {
      updateTimeline(index);
    });
  });

  // Initialize progress bar
  updateTimeline(0);


  /* ==========================================
     8. CLIENT TESTIMONIALS SLIDER
     ========================================== */
  const track = document.getElementById('testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  const dotsContainer = document.getElementById('slider-dots');
  
  let currentSlideIndex = 0;
  const slideCount = slides.length;
  let autoPlayTimer;

  // Create dots
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateSlider() {
    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, idx) => {
      if (idx === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function goToSlide(index) {
    currentSlideIndex = index;
    updateSlider();
    resetAutoPlay();
  }

  function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slideCount;
    updateSlider();
  }

  function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slideCount) % slideCount;
    updateSlider();
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
  });

  // Auto-play timer
  function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 6000); // every 6s
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  startAutoPlay();


  /* ==========================================
     9. LEAD CAPTURE CONSULTATION FORM VALIDATION
     ========================================== */
  const form = document.getElementById('consultation-form');
  const formAlert = document.getElementById('form-alert');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Fetch values
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const mobile = document.getElementById('form-mobile').value.trim();
    const projectType = document.getElementById('form-project-type').value;
    const location = document.getElementById('form-location').value.trim();
    const budget = document.getElementById('form-budget').value;
    const message = document.getElementById('form-message').value.trim();

    // Preform basic validations
    if (!name || !email || !mobile || !projectType || !location || !budget) {
      alert('Please fill out all required fields.');
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Mobile validation (simple digits count check)
    const mobileRegex = /^[0-9+\s-]{8,15}$/;
    if (!mobileRegex.test(mobile)) {
      alert('Please enter a valid mobile number.');
      return;
    }

    // Success response simulation
    formAlert.classList.add('success');
    form.reset();

    // Scroll to alert
    formAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Hide success message after 8 seconds
    setTimeout(() => {
      formAlert.classList.remove('success');
    }, 8000);
  });


  /* ==========================================
     10. FOOTER NEWSLETTER SUBSCRIPTION
     ========================================== */
  const newsletterForm = document.getElementById('newsletter-form');

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('.newsletter-input');
    const email = input.value.trim();

    if (email) {
      alert(`Thank you for subscribing! We've registered ${email} for HAUS & CO. Weekly Insights.`);
      newsletterForm.reset();
    }
  });

});
