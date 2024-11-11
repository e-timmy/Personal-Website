document.addEventListener('DOMContentLoaded', function() {
    const ingredientsContainer = document.querySelector('.ingredients-container');
    const burgerBuilder = document.getElementById('burger-builder');
    const bunTop = document.querySelector('.bun-top');
    const bunBottom = document.querySelector('.bun-bottom');
    const emptyState = document.querySelector('.empty-state');

    let burgerIngredients = [];
    const INGREDIENT_HEIGHT = 34; // 30px height + 2px margin top + 2px margin bottom
    let draggedElement = null;

    function updateBurgerHeight() {
        const totalHeight = burgerIngredients.length * INGREDIENT_HEIGHT;
        ingredientsContainer.style.height = `${totalHeight}px`;

        // Move buns apart based on ingredients
        bunTop.style.transform = `translateY(-${totalHeight/2 + INGREDIENT_HEIGHT/2}px)`;
        bunBottom.style.transform = `translateY(${totalHeight/2 + INGREDIENT_HEIGHT/2}px)`;
    }

    function updateBurgerVisual(action = 'update', index = -1) {
        // Clear existing ingredients
        ingredientsContainer.innerHTML = '';

        // Add each ingredient in order
        burgerIngredients.forEach((ingredientData, i) => {
            const ingredient = document.createElement('div');
            ingredient.classList.add('ingredient');
            ingredient.setAttribute('data-ingredient', ingredientData.name);
            ingredient.style.backgroundColor = ingredientData.color;
            ingredient.style.top = `${i * INGREDIENT_HEIGHT}px`;

            if (action === 'add' && i === index) {
                ingredient.style.transform = 'translateX(-100%)';
                ingredientsContainer.appendChild(ingredient);

                // Trigger animation
                requestAnimationFrame(() => {
                    ingredient.style.transition = 'transform 0.3s ease';
                    ingredient.style.transform = 'translateX(0)';
                });
            } else if (action === 'remove' && i >= index) {
                ingredient.style.transition = 'transform 0.3s ease, top 0.3s ease';
                ingredient.style.top = `${(i + 1) * INGREDIENT_HEIGHT}px`;
                ingredientsContainer.appendChild(ingredient);

                requestAnimationFrame(() => {
                    ingredient.style.top = `${i * INGREDIENT_HEIGHT}px`;
                });
            } else {
                ingredientsContainer.appendChild(ingredient);
            }
        });

        updateBurgerHeight();
    }

    function removeIngredient(index) {
        burgerIngredients.splice(index, 1);
        updateBuilderList();
        updateBurgerVisual('remove', index);
    }

    function updateBuilderList() {
        // Clear builder area except empty state message
        Array.from(burgerBuilder.children).forEach(child => {
            if (!child.classList.contains('empty-state')) {
                child.remove();
            }
        });

        // Show/hide empty state message
        emptyState.style.display = burgerIngredients.length ? 'none' : 'block';

        // Add initial drop indicator
        const initialIndicator = document.createElement('div');
        initialIndicator.classList.add('drop-indicator', 'top-indicator');
        burgerBuilder.appendChild(initialIndicator);

        // Add current ingredients to builder
        burgerIngredients.forEach((ingredientData, index) => {
            const builderIngredient = document.createElement('div');
            builderIngredient.classList.add('builder-ingredient');
            builderIngredient.setAttribute('draggable', 'true');
            builderIngredient.setAttribute('data-index', index);

            builderIngredient.innerHTML = `
                <span class="ingredient-color" style="background-color: ${ingredientData.color}"></span>
                <span>${ingredientData.name}</span>
                <span class="remove-ingredient" title="Remove ingredient">×</span>
            `;

            // Add remove button listener
            const removeBtn = builderIngredient.querySelector('.remove-ingredient');
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeIngredient(index);
            });

            // Add drag event listeners
            builderIngredient.addEventListener('dragstart', handleDragStart);
            builderIngredient.addEventListener('dragend', handleDragEnd);

            burgerBuilder.appendChild(builderIngredient);

            // Add drop indicator after each ingredient
            const indicator = document.createElement('div');
            indicator.classList.add('drop-indicator');
            burgerBuilder.appendChild(indicator);
        });
    }

    function updateDropIndicator(e) {
        const indicators = document.querySelectorAll('.drop-indicator');
        indicators.forEach(indicator => indicator.classList.remove('active'));

        if (!draggedElement) return;

        const closestIndicator = getClosestDropIndicator(e.clientY);
        if (closestIndicator) {
            closestIndicator.classList.add('active');
        }
    }

    function getClosestDropIndicator(y) {
        const indicators = Array.from(document.querySelectorAll('.drop-indicator'));
        let closest = null;
        let closestDistance = Infinity;

        indicators.forEach(indicator => {
            const rect = indicator.getBoundingClientRect();
            const distance = Math.abs(y - (rect.top + rect.height / 2));
            if (distance < closestDistance) {
                closestDistance = distance;
                closest = indicator;
            }
        });

        return closest;
    }

    // Drag and Drop Event Handlers
    function handleDragStart(e) {
        draggedElement = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';

        // Store the source type and relevant data
        const sourceData = {
            type: this.classList.contains('ingredient-item') ? 'ingredient' : 'builder',
            ingredient: this.dataset.ingredient,
            color: this.dataset.color,
            index: this.dataset.index
        };

        e.dataTransfer.setData('application/json', JSON.stringify(sourceData));
    }

    function handleDragEnd(e) {
        draggedElement = null;
        this.classList.remove('dragging');
        document.querySelectorAll('.drag-over').forEach(element => {
            element.classList.remove('drag-over');
        });
        document.querySelectorAll('.drop-indicator').forEach(indicator => {
            indicator.classList.remove('active');
        });
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.classList.add('drag-over');
        updateDropIndicator(e);
    }

    function handleDragLeave(e) {
        this.classList.remove('drag-over');
    }

    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');

        const sourceData = JSON.parse(e.dataTransfer.getData('application/json'));
        const closestIndicator = getClosestDropIndicator(e.clientY);
        let dropIndex = Array.from(document.querySelectorAll('.drop-indicator')).indexOf(closestIndicator);

        if (sourceData.type === 'ingredient') {
            // Adding new ingredient
            burgerIngredients.splice(dropIndex, 0, {
                name: sourceData.ingredient,
                color: sourceData.color
            });
            updateBuilderList();
            updateBurgerVisual('add', dropIndex);
        } else if (sourceData.type === 'builder') {
            // Reordering existing ingredient
            const oldIndex = parseInt(sourceData.index);
            if (oldIndex < dropIndex) dropIndex--;
            const [ingredient] = burgerIngredients.splice(oldIndex, 1);
            burgerIngredients.splice(dropIndex, 0, ingredient);
            updateBuilderList();
            updateBurgerVisual('update');
        }
    }

    // Initialize drag and drop event listeners
    document.querySelectorAll('.ingredient-item').forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    burgerBuilder.addEventListener('dragover', handleDragOver);
    burgerBuilder.addEventListener('dragleave', handleDragLeave);
    burgerBuilder.addEventListener('drop', handleDrop);

    const INGREDIENT_PRICES = {
        beef: 5.00,
        cheese: 1.00,
        lettuce: 0.50,
        tomato: 0.50,
        pickle: 0.50,
        onion: 0.50,
        bacon: 2.00
    };

    function addPreviewButton() {
        const previewButton = document.createElement('button');
        previewButton.classList.add('preview-button');
        previewButton.textContent = 'Preview Order';
        burgerBuilder.appendChild(previewButton);

        const modal = createPreviewModal();
        document.body.appendChild(modal);

        previewButton.addEventListener('click', () => {
            updatePreviewModal();
            modal.classList.add('active');
        });
    }

    function createPreviewModal() {
        const modal = document.createElement('div');
        modal.classList.add('preview-modal');

        modal.innerHTML = `
        <div class="preview-content">
            <button class="preview-close">×</button>
            <h2>Your Custom Burger</h2>
            <div class="burger-preview-illustration"></div>
            <div class="preview-total">
                <span>Total:</span>
                <span class="total-price">$0.00</span>
            </div>
        </div>
    `;

        const closeButton = modal.querySelector('.preview-close');
        closeButton.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        return modal;
    }

    function updatePreviewModal() {
        const illustration = document.querySelector('.burger-preview-illustration');
        illustration.innerHTML = '';

        let totalPrice = 0;
        let verticalPosition = 20; // Starting position from top

        // Add top bun
        addPreviewLayer('Bun (top)', '#f4a460', verticalPosition);
        verticalPosition += 30;

        // Add ingredients
        burgerIngredients.forEach(ingredient => {
            const price = INGREDIENT_PRICES[ingredient.name] || 0;
            totalPrice += price;

            addPreviewLayer(
                `${ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)} ($${price.toFixed(2)})`,
                ingredient.color,
                verticalPosition
            );
            verticalPosition += 25;
        });

        // Add bottom bun
        addPreviewLayer('Bun (bottom)', '#f4a460', verticalPosition);

        // Update total price
        const totalElement = document.querySelector('.total-price');
        totalElement.textContent = `$${(totalPrice + 3.00).toFixed(2)}`; // Add $3 for buns
    }

    function addPreviewLayer(label, color, top) {
        const illustration = document.querySelector('.burger-preview-illustration');

        const layer = document.createElement('div');
        layer.classList.add('preview-ingredient');
        layer.style.top = `${top}px`;
        layer.innerHTML = `
        <span>${label}</span>
        <div class="ingredient-color" style="background-color: ${color}"></div>
    `;

        illustration.appendChild(layer);
    }
});