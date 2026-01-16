// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    disable: 'mobile'
  });

  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menuBtn');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.style.transform = 'translateX(0)';
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeMenu) {
    closeMenu.addEventListener('click', () => {
      mobileMenu.style.transform = 'translateX(100%)';
      document.body.style.overflow = 'auto';
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      mobileMenu.style.transform = 'translateX(100%)';
      document.body.style.overflow = 'auto';
    }
  });

  // Update year in footer
  const currentYear = document.getElementById('currentYear');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        mobileMenu.style.transform = 'translateX(100%)';
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBar = entry.target;
        const width = skillBar.getAttribute('data-width');
        skillBar.style.width = width;
        skillBar.classList.add('animate-progress');
      }
    });
  }, observerOptions);

  skillBars.forEach(bar => observer.observe(bar));

  // Interactive Project Viewer
  const techItems = document.querySelectorAll('.tech-item');
  const projectPreview = document.getElementById('projectPreview');
  
  const projectData = {
    1: {
      title: 'HTML5 Projects',
      description: 'Modern, semantic HTML5 websites with accessibility features and SEO optimization.',
      projects: ['Business Portfolio', 'E-commerce Landing Page', 'Restaurant Website'],
      color: '#e34c26'
    },
    2: {
      title: 'CSS3 Projects',
      description: 'Beautifully styled websites with animations, transitions, and responsive designs.',
      projects: ['Animated Portfolio', 'Creative Agency Site', 'Interactive Dashboard'],
      color: '#264de4'
    },
    3: {
      title: 'JavaScript Projects',
      description: 'Interactive web applications with modern JavaScript features and APIs.',
      projects: ['Task Manager App', 'Weather Dashboard', 'Interactive Games'],
      color: '#f0db4f'
    },
    4: {
      title: 'React Projects',
      description: 'Single Page Applications built with React, React Router, and state management.',
      projects: ['E-commerce Store', 'Social Media Dashboard', 'Real-time Chat App'],
      color: '#61dafb'
    },
    5: {
      title: 'Node.js Projects',
      description: 'Full-stack applications with Node.js, Express, and MongoDB.',
      projects: ['API Development', 'Authentication System', 'Real-time Applications'],
      color: '#68a063'
    }
  };

  techItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const projectId = this.getAttribute('data-project');
      const data = projectData[projectId];
      
      if (data && projectPreview) {
        projectPreview.innerHTML = `
          <div class="preview-content" style="color: ${data.color}">
            <h4 style="color: white">${data.title}</h4>
            <p>${data.description}</p>
            <div style="margin-top: 1rem;">
              <strong>Sample Projects:</strong>
              <ul style="list-style: none; padding-left: 0; margin-top: 0.5rem;">
                ${data.projects.map(project => `<li>• ${project}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
        
        projectPreview.style.background = `linear-gradient(135deg, ${data.color}20, rgba(15, 23, 42, 0.8))`;
        projectPreview.style.border = `1px solid ${data.color}40`;
      }
    });
    
    item.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      // You could add a modal or page navigation here
      console.log(`Viewing projects for technology: ${projectId}`);
    });
  });

  // Parallax Effect
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const particles = document.querySelector('#particles-js');
    
    if (particles) {
      particles.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animate-fade-in-up');
      }
    });
  });

  // Theme Toggle (Optional - can be added later)
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.className = 'theme-toggle';
  themeToggle.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(to right, #06b6d4, #3b82f6);
    border: none;
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
    transition: transform 0.3s;
  `;
  
  themeToggle.addEventListener('mouseenter', () => {
    themeToggle.style.transform = 'scale(1.1)';
  });
  
  themeToggle.addEventListener('mouseleave', () => {
    themeToggle.style.transform = 'scale(1)';
  });
  
  // Uncomment to add theme toggle functionality
  // document.body.appendChild(themeToggle);
  
  // Load animation for page elements
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500);

  // Add intersection observer for lazy loading
  const lazyLoadElements = document.querySelectorAll('.lazy-load');
  const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.classList.add('loaded');
        lazyLoadObserver.unobserve(element);
      }
    });
  });

  lazyLoadElements.forEach(element => lazyLoadObserver.observe(element));
});