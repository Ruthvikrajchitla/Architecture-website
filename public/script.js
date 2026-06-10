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
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-img-src');

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgEl = item.querySelector('.portfolio-image-wrapper img');
      if (imgEl) {
        // Populate modal details directly from the DOM image
        modalImg.src = imgEl.src;
        modalImg.alt = imgEl.alt || 'Project Design';

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
      alert(`Thank you for subscribing! We've registered ${email} for HUMYNEX STUDIO Weekly Insights.`);
      newsletterForm.reset();
    }
  });

});
