/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */

const navbar = document.getElementById('navbar');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.pageYOffset;

  if (currentScrollPosition > 100) {
    navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 255, 136, 0.1)';
  } else {
    navbar.style.background = 'rgba(26, 26, 46, 0.7)';
    navbar.style.boxShadow = 'none';
  }

  lastScrollPosition = currentScrollPosition;
});

/* ============================================
   PROFILE ICON & LOGIN STATE
   ============================================ */

function checkLoginStatus() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const navbarButtons = document.getElementById('navbarButtons');
  const profileIconContainer = document.getElementById('profileIconContainer');

  if (token && user) {
    navbarButtons.style.display = 'none';
    profileIconContainer.style.display = 'flex';
  } else {
    navbarButtons.style.display = 'flex';
    profileIconContainer.style.display = 'none';
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', checkLoginStatus);
window.addEventListener('load', checkLoginStatus);

/* ============================================
   HAMBURGER MENU
   ============================================ */

const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');

hamburger.addEventListener('click', () => {
  navbarMenu.style.display = navbarMenu.style.display === 'flex' ? 'none' : 'flex';
  hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navbarMenu.style.display = 'none';
    hamburger.classList.remove('active');
  });
});

/* ============================================
   SMOOTH SCROLL BEHAVIOR
   ============================================ */

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

/* ============================================
   STAT COUNTER ANIMATION
   ============================================ */

const countUpStats = () => {
  const statCounters = document.querySelectorAll('.stat-counter');
  
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const element = entry.target;
        
        countUpAnimation(element, target, 2000);
        element.classList.add('counted');
      }
    });
  }, observerOptions);

  statCounters.forEach(counter => observer.observe(counter));
};

const countUpAnimation = (element, target, duration) => {
  let start = 0;
  const increment = target / (duration / 16);
  
  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = formatNumber(target);
      clearInterval(counter);
    } else {
      element.textContent = formatNumber(Math.floor(start));
    }
  }, 16);
};

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toString();
};

/* ============================================
   SCROLL ANIMATIONS FOR ELEMENTS
   ============================================ */

const observeElements = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe feature cards
  document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
  });

  // Observe stat cards
  document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
  });

  // Observe preview features
  document.querySelectorAll('.preview-feature').forEach(feature => {
    observer.observe(feature);
  });
};

/* ============================================
   BUTTON INTERACTIONS
   ============================================ */

const setupButtonInteractions = () => {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });

    button.addEventListener('click', function() {
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s ease-out';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
};

/* ============================================
   RIPPLE ANIMATION
   ============================================ */

const addRippleStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

/* ============================================
   PROGRESS BAR ANIMATION
   ============================================ */

const animateProgressBars = () => {
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressFill = entry.target.querySelector('.progress-fill');
        if (progressFill) {
          const width = progressFill.style.width;
          progressFill.style.width = '0';
          
          setTimeout(() => {
            progressFill.style.width = width;
          }, 100);
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.preview-stat-bar').forEach(bar => {
    observer.observe(bar);
  });
};

/* ============================================
   NOTIFICATION SYSTEM (Simple Alert)
   ============================================ */

const showNotification = (message, type = 'success') => {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#00ff88' : '#ff4757'};
    color: ${type === 'success' ? '#000' : '#fff'};
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideInRight 0.3s ease-out reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};

/* ============================================
   BUTTON CLICK HANDLERS
   ============================================ */

const setupClickHandlers = () => {
  // Get Started Button
  const getStartedBtn = document.querySelector('.hero-buttons .btn-primary');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      showNotification('Welcome! Ready to start your fitness journey? 🚀');
    });
  }

  // Explore Features Button
  const exploreFeaturesBtn = document.querySelector('.hero-buttons .btn-outline');
  if (exploreFeaturesBtn) {
    exploreFeaturesBtn.addEventListener('click', () => {
      const featuresSection = document.getElementById('features');
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Login Button
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      showNotification('Redirecting to login...', 'info');
      // setTimeout(() => window.location.href = '/login', 1000);
    });
  }

  // Signup Button
  const signupBtn = document.getElementById('signupBtn');
  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      showNotification('Redirecting to signup...', 'info');
      // setTimeout(() => window.location.href = '/signup', 1000);
    });
  }

  // CTA Buttons
  const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showNotification('Get ready to transform your fitness! 💪');
    });
  });
};

/* ============================================
   MOUSE FOLLOW EFFECT (Optional)
   ============================================ */

const setupMouseFollowEffect = () => {
  const heroSection = document.querySelector('.hero');
  const heroBackground = document.querySelector('.hero-background');

  if (heroSection && heroBackground) {
    heroSection.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 20;
      const y = (e.clientY / window.innerHeight) * 20;
      
      heroBackground.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
};

/* ============================================
   PARALLAX EFFECT
   ============================================ */

const setupParallaxEffect = () => {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-parallax');
      const yPos = window.pageYOffset * speed;
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
};

/* ============================================
   INIT ALL FUNCTIONS
   ============================================ */

const initializeApp = () => {
  // Add animation styles
  addRippleStyles();

  // Setup all interactions
  countUpStats();
  observeElements();
  setupButtonInteractions();
  animateProgressBars();
  setupClickHandlers();
  setupMouseFollowEffect();
  setupParallaxEffect();

  console.log('🚀 Run Bangla AI - Initialization Complete!');
};

/* ============================================
   DOM CONTENT LOADED
   ============================================ */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

/* ============================================
   ADAPTIVE BACKGROUND (Dynamic)
   ============================================ */

const adaptiveBackground = () => {
  const hour = new Date().getHours();
  const isDark = hour < 6 || hour > 18;
  
  if (!isDark) {
    // Optional: Adjust for daytime viewing
    document.body.style.filter = 'brightness(0.95)';
  }
};

adaptiveBackground();

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Debounce function for scroll events
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Optimize scroll listeners
const optimizedScroll = debounce(() => {
  // Add optimized scroll logic here
}, 100);

window.addEventListener('scroll', optimizedScroll);

/* ============================================
   AUTHENTICATION MODALS
   ============================================ */

// Open/Close Modal Functions - REMOVED (using separate pages now)

// Close modals when clicking outside - REMOVED

// Handle Login Form - REMOVED

// Handle Signup Form - REMOVED

console.log('✅ Run Bangla AI Landing Page Loaded Successfully!');

/* ============================================
   MARATHON EVENTS SECTION
   ============================================ */

// Marathon Events Data with Real Images
const marathonEvents = [
  {
    id: 1,
    title: "Dhaka City Marathon 2026",
    icon: "🏙️",
    image: "https://images.pexels.com/photos/3775135/pexels-photo-3775135.jpeg?w=400&h=300&fit=crop",
    description: "Experience the vibrant streets of Dhaka in this exciting urban marathon event. Join thousands of runners for an unforgettable day filled with energy, community spirit, and fitness challenges.",
    date: "May 15, 2026",
    location: "Dhaka, Bangladesh",
    distance: "5K / 10K / 21K",
    startLat: 23.8103,
    startLng: 90.4125,
    endLat: 23.7808,
    endLng: 90.3621
  },
  {
    id: 2,
    title: "Cox's Bazar Beach Run",
    icon: "🏖️",
    image: "https://images.pexels.com/photos/3714903/pexels-photo-3714903.jpeg?w=400&h=300&fit=crop",
    description: "Run on the world's longest natural sea beach. Feel the sand beneath your feet and the sea breeze in your face in this unique beachside marathon experience.",
    date: "June 10, 2026",
    location: "Cox's Bazar, Bangladesh",
    distance: "5K / 10K",
    startLat: 21.4272,
    startLng: 91.9680,
    endLat: 21.4435,
    endLng: 92.0019
  },
  {
    id: 3,
    title: "Sundarbans Trail Run",
    icon: "🌳",
    image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?w=400&h=300&fit=crop",
    description: "Challenge yourself in nature's backyard. Run through the mystical trails of the Sundarbans mangrove forests. An adventure like no other.",
    date: "July 8, 2026",
    location: "Sundarbans, Bangladesh",
    distance: "10K / 21K",
    startLat: 22.3045,
    startLng: 89.1865,
    endLat: 22.2765,
    endLng: 89.2098
  },
  {
    id: 4,
    title: "Chattogram Hill Marathon",
    icon: "⛰️",
    image: "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?w=400&h=300&fit=crop",
    description: "Conquer the hills of Chattogram in this challenging mountain marathon. Test your endurance and strength against nature's toughest terrain.",
    date: "August 12, 2026",
    location: "Chattogram, Bangladesh",
    distance: "10K / 21K",
    startLat: 22.3384,
    startLng: 91.8143,
    endLat: 22.3598,
    endLng: 91.7832
  },
  {
    id: 5,
    title: "Sylhet Tea Garden Run",
    icon: "🌾",
    image: "https://images.pexels.com/photos/1194765/pexels-photo-1194765.jpeg?w=400&h=300&fit=crop",
    description: "Run through the lush green tea gardens of Sylhet. A unique running experience surrounded by nature's beauty and serene landscape.",
    date: "September 5, 2026",
    location: "Sylhet, Bangladesh",
    distance: "5K / 10K",
    startLat: 24.8951,
    startLng: 91.8734,
    endLat: 24.8767,
    endLng: 91.8896
  },
  {
    id: 6,
    title: "Rajshahi Heritage Run",
    icon: "🏛️",
    image: "https://images.pexels.com/photos/3638003/pexels-photo-3638003.jpeg?w=400&h=300&fit=crop",
    description: "Explore the historical heritage of Rajshahi while running. A perfect blend of fitness and cultural experience through the city's historic districts.",
    date: "October 20, 2026",
    location: "Rajshahi, Bangladesh",
    distance: "5K / 10K / 21K",
    startLat: 24.3745,
    startLng: 88.6042,
    endLat: 24.3652,
    endLng: 88.5891
  }
];

// Drag Scrolling State
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

// Smooth scroll to Marathon section
function smoothScrollToMarathon() {
  const marathonSection = document.getElementById('marathons');
  if (marathonSection) {
    marathonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Initialize Marathon Carousel
function initMarathonCarousel() {
  const carousel = document.getElementById('marathonCarousel');
  const container = document.getElementById('marathonContainer');
  
  if (!carousel || !container) return;
  
  // Clear previous content
  carousel.innerHTML = '';
  
  // Render initial cards
  marathonEvents.forEach(event => {
    carousel.appendChild(createMarathonCard(event));
  });
  
  // Duplicate cards for infinite loop effect
  marathonEvents.forEach(event => {
    carousel.appendChild(createMarathonCard(event));
  });
  
  // Add drag scroll listeners
  setupDragScroll();
}

// Create Marathon Card Element
function createMarathonCard(event) {
  const card = document.createElement('div');
  card.className = 'marathon-card';
  card.id = `marathon-card-${event.id}`;
  card.onclick = (e) => {
    // Only open modal if not dragging
    if (!isDragging) {
      openMarathonModal(event);
    }
  };
  
  card.innerHTML = `
    <div class="marathon-card-image-container">
      <img src="${event.image}" alt="${event.title}" class="marathon-card-image" loading="lazy">
    </div>
    <div class="marathon-card-content">
      <h3 class="marathon-card-title">${event.title}</h3>
      <p class="marathon-card-description">${event.description}</p>
      <div class="marathon-card-meta">
        <div class="marathon-meta-item">📅 ${event.date}</div>
        <div class="marathon-meta-item">📍 ${event.location}</div>
        <div class="marathon-meta-item">🏃 ${event.distance}</div>
      </div>
      <div class="marathon-card-buttons">
        <button class="marathon-card-btn btn-register" data-event-id="${event.id}">🏃 Register Now</button>
        <button class="marathon-card-btn btn-map" data-event-id="${event.id}">🗺️ Map</button>
      </div>
    </div>
  `;
  
  // Add click handlers
  const registerBtn = card.querySelector('.btn-register');
  const mapBtn = card.querySelector('.btn-map');
  
  registerBtn.onclick = (e) => {
    e.stopPropagation();
    registerMarathon();
  };
  
  mapBtn.onclick = (e) => {
    e.stopPropagation();
    openMarathonMap(event);
  };
  
  return card;
}

// Open Marathon Map Modal
function openMarathonMap(event) {
  // Create map modal if it doesn't exist
  let mapModal = document.getElementById('mapModal');
  if (!mapModal) {
    mapModal = document.createElement('div');
    mapModal.id = 'mapModal';
    mapModal.className = 'map-modal';
    mapModal.innerHTML = `
      <div class="map-modal-content">
        <button class="map-modal-close" onclick="closeMarathonMap()">✕</button>
        <h2 class="map-modal-title"></h2>
        <div class="map-modal-controls">
          <button class="map-control-btn" onclick="zoomMapIn()">🔍+ Zoom In</button>
          <button class="map-control-btn" onclick="zoomMapOut()">🔍- Zoom Out</button>
          <button class="map-control-btn" onclick="fitMapView()">📍 Fit View</button>
        </div>
        <div id="mapContainer" class="map-modal-map"></div>
      </div>
    `;
    document.body.appendChild(mapModal);
  }

  // Update title
  document.querySelector('.map-modal-title').textContent = event.title;

  // Store current event for controls
  window.currentMapEvent = event;

  // Show modal
  mapModal.style.display = 'flex';

  // Initialize map after modal is visible
  setTimeout(() => {
    initMapInModal(event);
  }, 300);
}

// Close Marathon Map Modal
function closeMarathonMap() {
  const mapModal = document.getElementById('mapModal');
  if (mapModal) {
    mapModal.style.display = 'none';
  }
  
  // Properly destroy the map instance
  if (window.marathonMap) {
    window.marathonMap.remove();
    window.marathonMap = null;
  }
}

// Initialize Map in Modal
function initMapInModal(event) {
  const mapContainer = document.getElementById('mapContainer');
  if (!mapContainer) return;

  // Destroy existing map if any
  if (window.marathonMap) {
    window.marathonMap.remove();
    window.marathonMap = null;
  }

  // Clear container
  mapContainer.innerHTML = '';

  // Calculate center point
  const centerLat = (event.startLat + event.endLat) / 2;
  const centerLng = (event.startLng + event.endLng) / 2;

  // Create new map instance
  window.marathonMap = L.map(mapContainer, {
    preferCanvas: true,
    zoomControl: false,
    attributionControl: true
  }).setView([centerLat, centerLng], 13);

  // Add tile layer (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(window.marathonMap);

  // Wait for map to be ready before continuing
  window.marathonMap.whenReady(() => {
    // Trigger map resize
    window.marathonMap.invalidateSize(false);

    // Add start marker (🟢 green)
    L.circleMarker([event.startLat, event.startLng], {
      radius: 10,
      fillColor: '#00ff88',
      color: '#ffffff',
      weight: 3,
      opacity: 1,
      fillOpacity: 0.9,
      className: 'map-marker-start'
    }).addTo(window.marathonMap).bindPopup('<div style="text-align:center; font-weight:bold;">🟢 START POINT</div>').openPopup();

    // Add end marker (🔴 red)
    L.circleMarker([event.endLat, event.endLng], {
      radius: 10,
      fillColor: '#ff4444',
      color: '#ffffff',
      weight: 3,
      opacity: 1,
      fillOpacity: 0.9,
      className: 'map-marker-end'
    }).addTo(window.marathonMap).bindPopup('<div style="text-align:center; font-weight:bold;">🔴 FINISH POINT</div>');

    // Draw line between start and end
    L.polyline([
      [event.startLat, event.startLng],
      [event.endLat, event.endLng]
    ], {
      color: '#00ff88',
      weight: 4,
      opacity: 0.8,
      dashArray: '5, 5',
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(window.marathonMap);

    // Fit map to markers
    window.marathonMap.fitBounds([
      [event.startLat, event.startLng],
      [event.endLat, event.endLng]
    ], {padding: [100, 100]});

    // Store bounds for later
    window.mapBounds = [
      [event.startLat, event.startLng],
      [event.endLat, event.endLng]
    ];
  });
}

// Map zoom controls
function zoomMapIn() {
  if (window.marathonMap) {
    window.marathonMap.zoomIn();
  }
}

function zoomMapOut() {
  if (window.marathonMap) {
    window.marathonMap.zoomOut();
  }
}

function fitMapView() {
  if (window.marathonMap && window.mapBounds) {
    window.marathonMap.fitBounds(window.mapBounds, {padding: [100, 100]});
  }
}

// Setup Drag Scroll Functionality
function setupDragScroll() {
  const carousel = document.getElementById('marathonCarousel');
  const container = document.getElementById('marathonContainer');
  
  if (!carousel || !container) return;
  
  // Mouse down - start dragging
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
    container.style.scrollBehavior = 'auto';
  });
  
  // Mouse move - drag the carousel
  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll multiplier for smoother feel
    container.scrollLeft = scrollLeft - walk;
  });
  
  // Mouse up - stop dragging
  document.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = 'grab';
    container.style.scrollBehavior = 'smooth';
  });
  
  // Touch support for mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });
  
  container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  });
  
  container.addEventListener('touchend', () => {
    isDragging = false;
  });
}

// Open Marathon Modal
function openMarathonModal(event) {
  const modal = document.getElementById('marathonModal');
  
  document.getElementById('modalImage').src = event.image;
  document.getElementById('modalTitle').textContent = event.title;
  document.getElementById('modalDescription').textContent = event.description;
  document.getElementById('modalDate').textContent = event.date;
  document.getElementById('modalLocation').textContent = event.location;
  document.getElementById('modalDistance').textContent = event.distance;
  
  // Store event data for registration
  modal.dataset.currentEvent = JSON.stringify(event);
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close Marathon Modal
function closeMarathonModal() {
  const modal = document.getElementById('marathonModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Register for Marathon
function registerMarathon() {
  // Redirect to the new React registration app
  window.location.href = 'http://localhost:3000';
  return;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const marathonModal = document.getElementById('marathonModal');
  
  // Close modal when clicking outside
  if (marathonModal) {
    marathonModal.addEventListener('click', (e) => {
      if (e.target === marathonModal) {
        closeMarathonModal();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMarathonModal();
    }
  });
  
  // Initialize carousel
  setTimeout(() => {
    initMarathonCarousel();
  }, 100);
});

/* ============================================
   REGISTRATION FORM MODAL
   ============================================ */

let currentRegistrationStep = 1;
let registrationFormData = {};
let registrationCurrentEvent = null;

// Category prices
const categoryPrices = {
  "5K": 500,
  "10K": 800,
  "21K": 1200
};

// Open Registration Form
function openRegistrationForm(event) {
  registrationCurrentEvent = event;
  currentRegistrationStep = 1;
  registrationFormData = {
    name: '',
    email: '',
    phone: '',
    emergencyContact: '',
    tshirtSize: 'M',
    category: '5K',
    medicalCondition: '',
    paymentMethod: 'credit_card',
    discountCode: ''
  };
  
  // Populate event information
  document.getElementById('eventNameReg').textContent = event.title;
  document.getElementById('eventDateReg').textContent = event.date;
  document.getElementById('eventLocationReg').textContent = event.location;
  
  const modal = document.getElementById('registrationModal');
  if (modal) {
    modal.style.display = 'flex';
    updateRegistrationStep();
  }
}

// Close Registration Form
function closeRegistrationForm() {
  const modal = document.getElementById('registrationModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Update Registration Step Display
function updateRegistrationStep() {
  const modal = document.getElementById('registrationModal');
  if (!modal) return;
  
  // Update step indicator
  for (let i = 1; i <= 3; i++) {
    const stepElement = document.getElementById(`regStep${i}`);
    if (stepElement) {
      if (i <= currentRegistrationStep) {
        stepElement.classList.add('active');
      } else {
        stepElement.classList.remove('active');
      }
    }
  }
  
  // Update content visibility
  document.getElementById('regStepContent1').style.display = currentRegistrationStep === 1 ? 'block' : 'none';
  document.getElementById('regStepContent2').style.display = currentRegistrationStep === 2 ? 'block' : 'none';
  document.getElementById('regStepContent3').style.display = currentRegistrationStep === 3 ? 'block' : 'none';
  
  // Update button states
  const prevBtn = document.getElementById('regPrevBtn');
  const nextBtn = document.getElementById('regNextBtn');
  const closeBtn = document.getElementById('regCloseBtn');
  
  if (prevBtn) prevBtn.style.display = currentRegistrationStep > 1 ? 'block' : 'none';
  
  if (currentRegistrationStep === 3) {
    // Success step
    if (nextBtn) nextBtn.style.display = 'none';
    if (closeBtn) closeBtn.style.display = 'block';
  } else {
    // Details or Payment step
    if (nextBtn) {
      nextBtn.textContent = currentRegistrationStep === 2 ? 'Complete Payment' : 'Next: Payment →';
      nextBtn.style.display = 'block';
    }
    if (closeBtn) closeBtn.style.display = 'none';
  }
  
  if (currentRegistrationStep === 2) {
    updatePriceBreakdown();
  }
}

// Handle Registration Input Change
function handleRegistrationInput(fieldName, value) {
  registrationFormData[fieldName] = value;
  
  if (fieldName === 'discountCode' && currentRegistrationStep === 2) {
    updatePriceBreakdown();
  }
}

// Update Price Breakdown
function updatePriceBreakdown() {
  const basePrice = categoryPrices[registrationFormData.category] || 500;
  const discountCode = registrationFormData.discountCode?.toUpperCase();
  
  const promoCodes = {
    "RUN10": 10,
    "RUN20": 20,
    "BANGLA5": 5,
    "FITLIFE15": 15
  };
  
  const discountPercentage = promoCodes[discountCode] || 0;
  const discountAmount = (basePrice * discountPercentage) / 100;
  const finalAmount = basePrice - discountAmount;
  
  document.getElementById('basePriceDisplay').textContent = `${basePrice} Tk`;
  
  if (discountPercentage > 0) {
    document.getElementById('discountDisplay').style.display = 'flex';
    document.getElementById('discountPercentageDisplay').textContent = `${discountPercentage}%`;
    document.getElementById('discountAmountDisplay').textContent = `-${Math.round(discountAmount)} Tk`;
  } else {
    document.getElementById('discountDisplay').style.display = 'none';
  }
  
  document.getElementById('finalAmountDisplay').textContent = `${Math.round(finalAmount)} Tk`;
}

// Validate Registration Step 1
function validateRegistrationStep1() {
  const { name, email, phone, emergencyContact } = registrationFormData;
  
  if (!name.trim()) {
    alert('❌ Name is required');
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim() || !emailRegex.test(email)) {
    alert('❌ Valid email is required');
    return false;
  }
  
  if (!phone.trim() || !/^\d{10,11}$/.test(phone.replace(/[\s\-]/g, ''))) {
    alert('❌ Phone number must be 10-11 digits');
    return false;
  }
  
  if (!emergencyContact.trim()) {
    alert('❌ Emergency contact is required');
    return false;
  }
  
  return true;
}

// Handle Registration Next
function handleRegistrationNext() {
  if (currentRegistrationStep === 1) {
    if (!validateRegistrationStep1()) return;
    currentRegistrationStep = 2;
  } else if (currentRegistrationStep === 2) {
    submitRegistration();
    return;
  }
  
  updateRegistrationStep();
}

// Handle Registration Previous
function handleRegistrationPrevious() {
  if (currentRegistrationStep > 1) {
    currentRegistrationStep--;
    updateRegistrationStep();
  }
}

// Submit Registration
async function submitRegistration() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const basePrice = categoryPrices[registrationFormData.category] || 500;
    
    const registrationData = {
      userId: user?._id || null,
      eventId: registrationCurrentEvent.id,
      eventName: registrationCurrentEvent.title,
      name: registrationFormData.name,
      email: registrationFormData.email,
      phone: registrationFormData.phone,
      emergencyContact: registrationFormData.emergencyContact,
      tshirtSize: registrationFormData.tshirtSize,
      category: registrationFormData.category,
      medicalCondition: registrationFormData.medicalCondition,
      paymentMethod: registrationFormData.paymentMethod,
      amount: basePrice,
      discountCode: registrationFormData.discountCode || undefined
    };
    
    console.log('📤 Sending registration:', registrationData);
    
    const response = await fetch('http://localhost:5000/api/registration/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registrationData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      currentRegistrationStep = 3;
      displayRegistrationSuccess(result.data);
      updateRegistrationStep();
    } else {
      alert(`❌ ${result.message}`);
    }
  } catch (error) {
    console.error('❌ Registration error:', error);
    alert('❌ Registration failed. Please try again.');
  }
}

// Display Registration Success
function displayRegistrationSuccess(data) {
  document.getElementById('ticketIdDisplay').textContent = data.ticketId;
  document.getElementById('eventNameDisplay').textContent = data.eventName;
  document.getElementById('registrantNameDisplay').textContent = data.name;
  document.getElementById('categoryDisplay').textContent = data.category;
  document.getElementById('tshirtSizeDisplay').textContent = data.tshirtSize;
  document.getElementById('finalAmountPaidDisplay').textContent = `${data.finalAmount} Tk`;
  
  if (data.discountPercentage > 0) {
    document.getElementById('discountBadge').style.display = 'inline-block';
    document.getElementById('discountBadge').textContent = `${data.discountPercentage}% OFF`;
  }
  
  if (data.qrCode) {
    document.getElementById('qrCodeImage').src = data.qrCode;
  }
}
