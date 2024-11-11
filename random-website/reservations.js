document.addEventListener('DOMContentLoaded', function() {
    let reservationData = null;
    let selectedDate = null;
    let selectedTable = null;
    let selectedTime = null;
    let partySize = null;

    // Load reservation data
    fetch('reservations.json')
        .then(response => response.json())
        .then(data => {
            reservationData = data;
            initializeFloorPlan();
        })
        .catch(error => console.error('Error loading reservation data:', error));

    // Step 1: Date and Party Size Selection
    const datePartyForm = document.querySelector('.date-party-form');
    datePartyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        selectedDate = document.getElementById('date').value;
        partySize = parseInt(document.getElementById('party-size').value);

        goToStep(2);
        updateTableAvailability();
    });

    // Step 2: Table Selection
    function initializeFloorPlan() {
        const barSeats = document.querySelector('.bar-seats');
        const windowSeats = document.querySelector('.window-seats');
        const diningTables = document.querySelector('.dining-tables');

        // Generate bar seats
        Object.entries(reservationData.tables)
            .filter(([id, table]) => table.type === 'bar')
            .forEach(([id, table]) => {
                const seat = createTableElement(id, table, 'bar-seat');
                barSeats.appendChild(seat);
            });

        // Generate window tables
        Object.entries(reservationData.tables)
            .filter(([id, table]) => table.type === 'window')
            .forEach(([id, table]) => {
                const windowTable = createTableElement(id, table, 'window-table');
                windowSeats.appendChild(windowTable);
            });

        // Generate regular tables
        Object.entries(reservationData.tables)
            .filter(([id, table]) => table.type === 'regular')
            .forEach(([id, table]) => {
                const diningTable = createTableElement(id, table, 'dining-table');
                if (table.seats === 6) diningTable.classList.add('table-6');
                diningTables.appendChild(diningTable);
            });
    }

    function createTableElement(id, tableData, className) {
        const table = document.createElement('div');
        table.classList.add('table', className);
        table.setAttribute('data-table-id', id);
        table.innerHTML = `
            <div>${tableData.label}</div>
            <div>${tableData.seats} seats</div>
        `;

        table.addEventListener('click', handleTableClick);
        return table;
    }

    function handleTableClick(e) {
        const table = e.currentTarget;
        if (table.classList.contains('occupied')) return;

        // Remove previous selection
        document.querySelectorAll('.table.selected').forEach(t => {
            t.classList.remove('selected');
        });

        // Select new table
        table.classList.add('selected');
        selectedTable = table.getAttribute('data-table-id');

        // Enable continue button
        document.querySelector('#step2 .next-step').disabled = false;
    }

    // Time selection and availability checking
    document.getElementById('reservation-time').addEventListener('change', function(e) {
        selectedTime = e.target.value;
        updateTableAvailability();
    });

    function updateTableAvailability() {
        const currentTime = document.getElementById('reservation-time').value;
        const dayReservations = reservationData.reservations[selectedDate] || {};

        document.querySelectorAll('.table').forEach(table => {
            const tableId = table.getAttribute('data-table-id');
            const tableData = reservationData.tables[tableId];

            // Check if table has enough seats
            if (tableData.seats < partySize) {
                table.classList.remove('available', 'selected');
                table.classList.add('occupied');
                return;
            }

            // Check if table is reserved
            const tableReservations = dayReservations[tableId] || [];
            const isOccupied = tableReservations.includes(currentTime);

            table.classList.remove('occupied', 'available', 'selected');
            table.classList.add(isOccupied ? 'occupied' : 'available');

            // Deselect if currently selected table becomes unavailable
            if (isOccupied && tableId === selectedTable) {
                selectedTable = null;
                document.querySelector('#step2 .next-step').disabled = true;
            }
        });
    }

    // Step navigation
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.closest('.reservation-step').id.replace('step', ''));
            if (currentStep === 2) {
                updateConfirmationDetails();
            }
            goToStep(currentStep + 1);
        });
    });

    function goToStep(stepNumber) {
        // Update steps indicator
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.getAttribute('data-step')) <= stepNumber) {
                step.classList.add('active');
            }
        });

        // Show correct step content
        document.querySelectorAll('.reservation-step').forEach(step => {
            step.classList.remove('active');
        });
        document.getElementById(`step${stepNumber}`).classList.add('active');
    }

    function updateConfirmationDetails() {
        const tableData = reservationData.tables[selectedTable];
        document.getElementById('confirm-date').textContent = formatDate(selectedDate);
        document.getElementById('confirm-time').textContent = formatTime(selectedTime);
        document.getElementById('confirm-table').textContent = tableData.label;
        document.getElementById('confirm-party').textContent = `${partySize} people`;
    }

    // Helper functions
    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function formatTime(timeString) {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });
    }

    // Final form submission
    document.querySelector('.contact-details').addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the reservation data to your server
        alert('Reservation confirmed! A confirmation email will be sent shortly.');
        window.location.reload();
    });
});