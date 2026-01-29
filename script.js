(function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navLinkItems = navLinks ? navLinks.querySelectorAll(".nav-link") : [];

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("open");
      navLinks.classList.toggle("active", isOpen);
    });
  }

  navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && navLinks && hamburger) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("open");
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks && hamburger) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("open");
    }
  });

  // Smooth typing effect for hero title
  const typingText = document.querySelector('.typing-text');
  const typingCursor = document.querySelector('.typing-cursor');
  
  if (typingText) {
    const text = typingText.textContent.trim();
    typingText.textContent = ''; // Clear the text initially
    
    let charIndex = 0;
    const typingSpeed = 180; // milliseconds per character
    
    function typeCharacter() {
      if (charIndex < text.length) {
        typingText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeCharacter, typingSpeed);
      } else {
        // Typing complete - hide cursor immediately
        if (typingCursor) {
          typingCursor.style.opacity = '0';
          typingCursor.style.visibility = 'hidden';
        }
        // Trigger underline animation
        setTimeout(() => {
          const underline = document.querySelector('.hero-text .underline');
          if (underline) {
            underline.classList.add('active');
          }
        }, 200);
      }
    }
    
    // Start typing after greeting animation completes (1000ms delay for smoother sequence)
    setTimeout(typeCharacter, 1000);
  }

  // Scroll animations for underlines and cards
  const observerOptions = { threshold: 0.15 };
  const animateOnScroll = (elements, activeClass = "active") => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(activeClass);
          obs.unobserve(entry.target); // animate once
        }
      });
    }, observerOptions);

    elements.forEach((el) => observer.observe(el));
  };

  // Animate other underlines (not the hero one, as it's triggered after typing)
  const underlines = document.querySelectorAll(".underline:not(.hero-text .underline)");
  animateOnScroll(underlines);

  const cards = document.querySelectorAll(".card, .projects-card, .testimonial-card, .contact-card");
  animateOnScroll(cards);
})();
