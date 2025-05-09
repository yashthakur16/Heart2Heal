document.addEventListener('DOMContentLoaded', function() {
    // Animate stats counting
    const animateStats = () => {
      const statNumbers = document.querySelectorAll('.stat-number');
      
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCount = () => {
          current += step;
          if (current < target) {
            stat.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCount);
          } else {
            stat.textContent = target.toLocaleString();
          }
        };
        
        updateCount();
      });
    };
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('stats-grid')) {
            animateStats();
          }
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });
    
    // Observe elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    // Create additional floating elements
    const floatingContainer = document.querySelector('.floating-elements');
    
    function createFloatingElement() {
      const types = ['bubble', 'heart-shape'];
      const type = types[Math.floor(Math.random() * types.length)];
      const element = document.createElement('div');
      element.className = type;
      
      if (type === 'bubble') {
        const size = Math.random() * 30 + 20;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.backgroundColor = `rgba(255, 182, 193, ${Math.random() * 0.1 + 0.05})`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.animationDuration = `${Math.random() * 15 + 10}s`;
      } else {
        element.innerHTML = '❤';
        element.style.fontSize = `${Math.random() * 20 + 15}px`;
        element.style.color = `rgba(255, 102, 178, ${Math.random() * 0.2 + 0.1})`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.animationDuration = `${Math.random() * 12 + 8}s`;
      }
      
      floatingContainer.appendChild(element);
      
      // Remove element after animation completes
      setTimeout(() => {
        element.remove();
      }, 30000);
    }
    
    // Create initial floating elements
    for (let i = 0; i < 5; i++) {
      setTimeout(createFloatingElement, i * 1000);
    }

    // Add to your existing JS file
function createFloatingHearts() {
    const container = document.querySelector('.floating-elements');
    for (let i = 6; i <= 10; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart-shape';
      heart.innerHTML = '❤';
      heart.style.setProperty('--delay', `${Math.random() * 10}s`);
      heart.style.left = `${Math.random() * 100}%`;
      container.appendChild(heart);
    }
  }
  document.addEventListener('DOMContentLoaded', createFloatingHearts);
    
    // Continue creating floating elements
    setInterval(createFloatingElement, 3000);
  });
