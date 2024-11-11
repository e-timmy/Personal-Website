<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reservations - Thin Jimmy's</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="reservations-styles.css">
</head>
<body>
<?php include 'header.php'; ?>
<div class="container">
    <h1 class="main-title">Make a Reservation</h1>
    <div class="reservation-content">
        <div class="reservation-steps">
            <div class="step active" data-step="1">
                <span class="step-number">1</span>
                <span class="step-label">Select Date & Party Size</span>
            </div>
            <div class="step" data-step="2">
                <span class="step-number">2</span>
                <span class="step-label">Choose Table</span>
            </div>
            <div class="step" data-step="3">
                <span class="step-number">3</span>
                <span class="step-label">Confirm Details</span>
            </div>
        </div>

        <div class="reservation-form-container">
            <!-- Step 1: Initial Selection -->
            <div class="reservation-step active" id="step1">
                <form class="date-party-form">
                    <div class="form-group">
                        <label for="date">Date:</label>
                        <input type="date" id="date" name="date" required min="<?php echo date('Y-m-d'); ?>">
                    </div>
                    <div class="form-group">
                        <label for="party-size">Number of Guests:</label>
                        <select id="party-size" name="party-size" required>
                            <option value="">Select party size</option>
                            <option value="1">1 person</option>
                            <option value="2">2 people</option>
                            <option value="3">3 people</option>
                            <option value="4">4 people</option>
                            <option value="5">5 people</option>
                            <option value="6">6 people</option>
                        </select>
                    </div>
                    <button type="submit" class="next-step">Find Tables</button>
                </form>
            </div>

            <!-- Step 2: Table Selection -->
            <div class="reservation-step" id="step2">
                <div class="floor-plan">
                    <div class="floor-plan-controls">
                        <div class="legend">
                            <span class="legend-item"><span class="color-box available"></span> Available</span>
                            <span class="legend-item"><span class="color-box occupied"></span> Occupied</span>
                            <span class="legend-item"><span class="color-box selected"></span> Selected</span>
                        </div>
                        <div class="time-selector">
                            <label for="reservation-time">Time:</label>
                            <select id="reservation-time">
                                <option value="17:00">5:00 PM</option>
                                <option value="17:30">5:30 PM</option>
                                <option value="18:00">6:00 PM</option>
                                <option value="18:30">6:30 PM</option>
                                <option value="19:00">7:00 PM</option>
                                <option value="19:30">7:30 PM</option>
                                <option value="20:00">8:00 PM</option>
                            </select>
                        </div>
                    </div>
                    <div class="restaurant-layout">
                        <div class="bar-area">
                            <h3>Bar Seating</h3>
                            <div class="bar-seats"></div>
                        </div>
                        <div class="main-area">
                            <div class="window-area">
                                <h3>Window Seating</h3>
                                <div class="window-seats"></div>
                            </div>
                            <div class="table-area">
                                <h3>Main Dining</h3>
                                <div class="dining-tables"></div>
                            </div>
                        </div>
                    </div>
                    <button class="next-step" disabled>Continue to Details</button>
                </div>
            </div>

            <!-- Step 3: Confirmation -->
            <div class="reservation-step" id="step3">
                <div class="confirmation-details">
                    <h2>Confirm Your Reservation</h2>
                    <div class="reservation-summary">
                        <p><strong>Date:</strong> <span id="confirm-date"></span></p>
                        <p><strong>Time:</strong> <span id="confirm-time"></span></p>
                        <p><strong>Table:</strong> <span id="confirm-table"></span></p>
                        <p><strong>Party Size:</strong> <span id="confirm-party"></span></p>
                    </div>
                    <form class="contact-details">
                        <div class="form-group">
                            <label for="name">Name:</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone:</label>
                            <input type="tel" id="phone" name="phone" required>
                        </div>
                        <div class="form-group">
                            <label for="notes">Special Requests:</label>
                            <textarea id="notes" name="notes"></textarea>
                        </div>
                        <button type="submit" class="confirm-reservation">Confirm Reservation</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include 'footer.php'; ?>
<script src="script.js"></script>
<script src="reservations.js"></script>
</body>
</html>