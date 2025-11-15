// Veilig: alleen updaten als element bestaat
(function () {
  'use strict';

  // Update jaar in footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Navigatie functionaliteit
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('navMenu');
  const overlay = document.getElementById('navOverlay');

  if (btn && menu && overlay) {
    const closeMenu = () => { 
      menu.classList.remove('open'); 
      overlay.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    };
    
    const openMenu = () => {
      menu.classList.add('open');
      overlay.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    };

    btn.addEventListener('click', () => {
      if (menu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    overlay.addEventListener('click', closeMenu);
    
    document.querySelectorAll('.nav-menu a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    // Sluit menu met Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // Preloader en animaties
  const hidePreloader = () => {
    const pre = document.getElementById('preloader');
    if (pre) {
      pre.classList.add('preloader--hide');
      
      // Start animaties na preloader
      setTimeout(() => {
        const fadeElements = document.querySelectorAll('.content-fade');
        fadeElements.forEach(el => {
          el.classList.add('content-visible');
        });
        
        const staggerElements = document.querySelectorAll('.stagger-item');
        staggerElements.forEach(el => {
          el.classList.add('stagger-visible');
        });
      }, 300);
    }
  };

  // Laad event listeners
  window.addEventListener('load', hidePreloader);
  
  // Fallback voor preloader
  setTimeout(hidePreloader, 4000);

  // Smooth scroll voor anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer voor fade-in animaties bij scroll
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('content-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observeer alle fade elementen
    document.querySelectorAll('.content-fade').forEach(el => {
      observer.observe(el);
    });
  }

  // Verbeterde focus management voor toegankelijkheid
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('user-is-tabbing');
  });

  // Performance: Lazy loading voor images
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  }

  // Error handling voor gebroken links
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('http')) {
        // Externe links openen in nieuw tabblad
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  });

  // Console log voor development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Amsterdam Service website geladen met verbeterde functionaliteiten');
  }

})();