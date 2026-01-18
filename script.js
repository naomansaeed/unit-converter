// Get DOM elements
  const homeView = document.getElementById('home-view');
  const moduleView = document.getElementById('module-view');

  let currentCategory = null;

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

    currentCategory = category;

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

    // Attach category-specific logic
  /*  if (category === 'length' || category === 'mass' ...) {
        document.getElementById('convert-btn')?.addEventListener('click', () => {
            convertValue(category);
        });
    } */

    //Calling the conver value function with mouse click
    document.getElementById('convert-btn').addEventListener('click', convertValue);

    // Calling the conver value function by pressing the enter button
    document.getElementById('input-value').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') convertValue();
    });
  }

  function convertValue() {
    // 1. Get input value
    const inputEl = document.getElementById('input-value');
    const inputValue = parseFloat(inputEl.value);
  
    // 2. Validate
    if (isNaN(inputValue) || inputValue < 0) {
            alert("Please enter a valid positive number");
        return;
    }

    // 3. Choose converter based on current category
    let result;
    switch (currentCategory) {
        case 'length':
            result = convertLength(inputValue);
        break;
        case 'mass':
            result = convertMass(inputValue);
        break;
        case 'volume':
            result = convertVolume(inputValue);
        break;
        default:
            console.error("Unknown category:", currentCategory);
        return;
    }

    // 4. Update the DOM
    document.getElementById('imperial-value').textContent = result.imperial.toFixed(3);
    document.getElementById('metric-value').textContent = result.metric.toFixed(3);
  }

  //Converting the length value
  function convertLength(value) {
        // Assume input is in inches → convert to cm
        const imperial = value;
        const metric = value * 2.54;
        return { imperial, metric };
  }

  function convertMass(value) {
     // Assume input is in pounds → convert to kg
    const imperial = value;
    const metric = value * 0.453592;
    return { imperial, metric };
  }

  function convertVolume(value) {
    // Assume input is in gallons → convert to liters
   const imperial = value;
   const metric = value * 3.78541;
   return { imperial, metric };
  }