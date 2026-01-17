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

    // Generate shared UI (back button + title)
    const title = category.charAt(0).toUpperCase() + category.slice(1) + ' Converter';
    // category-specific inputs/results
    let contentHTML = ''; 

    

    // 3. Add category-specific content
    if (category === 'length') {
        contentHTML = `
            <input type="number" id="input-value" placeholder="Enter value (e.g., inches)">
            <div class="conversion-result">
                <div>
                    <span id="imperial-value">0.000</span> <span id="imperial-unit">in</span>
                </div>
                <div class="separator">↔</div>
                    <div>
                        <span id="metric-value">0.000</span> <span id="metric-unit">cm</span>
                    </div>
                </div>
            <button id="convert-btn">Convert</button>
        `;
    } 
    else if (category === 'mass') {
        contentHTML = `
            <input type="number" id="input-value" placeholder="Enter value (e.g., pounds)">
            <div class="conversion-result">
                <div>
                    <span id="imperial-value">0.000</span> <span id="imperial-unit">lb</span>
                </div>
            <div class="separator">↔</div>
                <div>
                    <span id="metric-value">0.000</span> <span id="metric-unit">kg</span>
                </div>
            </div>
            <button id="convert-btn">Convert</button>
        `;
    }

    else if (category === 'volume') {
        contentHTML = `
            <input type="number" id="input-value" placeholder="Enter value (e.g., gallons)">
            <div class="conversion-result">
                <div>
                    <span id="imperial-value">0.000</span>
                    <span id="imperial-unit">gallons</span>
                </div>
            <div class="separator">↔</div>
                <div>
                    <span id="metric-value">0.000</span>
                    <span id="metric-unit">liters</span>
                </div>
            </div>
            <button id="convert-btn">Convert to Metric</button>
        `;
    }

    // For now, just show the category name
    moduleView.innerHTML = `<div id="loop-back">
                                <button id="back-btn">← Back</button>
                            </div>
                            <h2>${title}</h2>
                            
                            ${contentHTML} 
                                
                            `;

    // Back button listener
    document.getElementById('back-btn').addEventListener('click', () => {
    moduleView.style.display = 'none';
    homeView.style.display = 'block';
    });

    // 6. Attach category-specific logic
    if (category === 'length' || category === 'mass' /* etc */) {
        document.getElementById('convert-btn')?.addEventListener('click', () => {
            convertValue(category);
        });
    }
  }

  