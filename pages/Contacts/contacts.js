class Contacts {
    constructor() {
        this.map = null;
        this.marker = null;
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        this.initMap();
        this.setupForm();
    }

    initMap() {
        // Initialize the map centered on Warszawa
        this.map = L.map('map').setView([52.2297, 21.0122], 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Add a marker for the office location
        this.marker = L.marker([52.2297, 21.0122]).addTo(this.map);
        this.marker.bindPopup('EstateFinder Office<br>123 Main Street, Warszawa').openPopup();
    }

    setupForm() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: this.form.querySelector('#name').value,
                email: this.form.querySelector('#email').value,
                message: this.form.querySelector('#message').value
            };

            // Here you would typically send the form data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset the form
            this.form.reset();
        });
    }
}

// Initialize the contacts page when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Contacts();
}); 