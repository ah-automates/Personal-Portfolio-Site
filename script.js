(function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navLinkItems = navLinks ? navLinks.querySelectorAll(".nav-link") : [];
  const copyRight = document.getElementById("copy-id");
  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("open");
      navLinks.classList.toggle("active", isOpen);
    });
  }
    // Active nav link indicator
const navLinkItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Function to set active link
// NEW - Better scroll detection
function setActiveLink() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Check if we're in the middle of this section
    if (scrollY >= (sectionTop - 150) && scrollY < (sectionTop + sectionHeight - 150)) {
      current = section.getAttribute('id');
    }
  });

  navLinkItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Set active on scroll
window.addEventListener('scroll', setActiveLink);

// Set active on click
navLinkItems.forEach(link => {
  link.addEventListener('click', function() {
    navLinkItems.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Set initial active link on page load
setActiveLink();
  
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
  copyRight.textContent = new Date().getFullYear();
})();
