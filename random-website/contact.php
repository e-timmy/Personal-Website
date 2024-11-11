<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - Thin Jimmy's</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="contact-styles.css">
</head>
<body>
<?php include 'header.php'; ?>
<div class="container">
    <h1 class="main-title">Contact Us</h1>
    <div class="contact-content">
        <div class="interactive-map">
            <div class="map-container">
                <img src="map-placeholder.jpg" alt="Map of Thin Jimmy's location" class="map-image">
                <div class="map-overlay">
                    <div class="map-pin location-pin" data-info="location">
                        <span class="pin-icon">📍</span>
                    </div>
                    <div class="map-pin parking-pin" data-info="parking">
                        <span class="pin-icon">🅿️</span>
                    </div>
                    <div class="map-pin transport-pin" data-info="transport">
                        <span class="pin-icon">🚇</span>
                    </div>
                    <div class="map-pin hours-pin" data-info="hours">
                        <span class="pin-icon">🕒</span>
                    </div>
                </div>
            </div>
            <div class="info-panel">
                <div class="info-content" id="location-info">
                    <h3>Our Location</h3>
                    <p>123 High Street<br>Preston, Victoria 3072</p>
                    <p>Phone: (03) 1234 5678</p>
                    <p>Email: info@thinjimmys.com.au</p>
                </div>
                <div class="info-content" id="parking-info">
                    <h3>Parking Information</h3>
                    <p>Free street parking available on High Street and surrounding side streets.</p>
                    <p>Paid parking lot located 100m south of the restaurant.</p>
                </div>
                <div class="info-content" id="transport-info">
                    <h3>Public Transport</h3>
                    <p>Bell Station: 5 minute walk</p>
                    <p>Bus Routes: 250, 251 stop directly in front</p>
                    <p>Tram 86: Preston stop, 2 minute walk</p>
                </div>
                <div class="info-content" id="hours-info">
                    <h3>Opening Hours</h3>
                    <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
                    <p>Saturday: 10:00 AM - 11:00 PM</p>
                    <p>Sunday: 10:00 AM - 9:00 PM</p>
                </div>
            </div>
        </div>
        <div class="contact-form">
            <h2>Send us a message</h2>
            <form id="contact-form">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="subject">Subject:</label>
                    <select id="subject" name="subject" required>
                        <option value="">Select a subject</option>
                        <option value="reservation">Reservation Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="catering">Catering Services</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit" class="submit-button">Send Message</button>
            </form>
        </div>
    </div>
</div>
<?php include 'footer.php'; ?>
<script src="script.js"></script>
<script src="contact.js"></script>
</body>
</html>