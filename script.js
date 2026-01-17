// Get DOM elements
  const homeView = document.getElementById('home-view');
  const moduleView = document.getElementById('module-view');

  // Add click listeners to all cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      loadModule(category);
    });
  });

  function loadModule(category) {
    // Hide home, show module
    homeView.style.display = 'none';
    moduleView.style.display = 'block';

    // For now, just show the category name
    moduleView.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)} Converter</h2>
                            <button id="back-btn">← Back</button>    
                            `;

    // Back button listener
    document.getElementById('back-btn').addEventListener('click', () => {
    moduleView.style.display = 'none';
    homeView.style.display = 'block';
    });
  }

  