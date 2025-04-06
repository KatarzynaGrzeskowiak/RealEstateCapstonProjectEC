class ImageSlider {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.currentSlide = 0;
        this.allImages = this.getAllImages();
        this.init();
    }

    getAllImages() {
        return this.data.apartments.reduce((acc, apartment) => {
            return [...acc, ...apartment.images];
        }, []);
    }

    init() {
        this.createSlider();
        this.createNavigation();
        this.createArrows();
        this.startAutoSlide();
        this.addEventListeners();
    }

    createSlider() {
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';

        const slider = document.createElement('div');
        slider.className = 'slider';

        this.allImages.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;

            const img = document.createElement('img');
            img.src = image;
            img.alt = `Apartment Image ${index + 1}`;

            slide.appendChild(img);
            slider.appendChild(slide);
        });

        sliderContainer.appendChild(slider);
        this.container.appendChild(sliderContainer);
    }

    createNavigation() {
        const navContainer = document.createElement('div');
        navContainer.className = 'slider-nav';

        this.allImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `nav-dot ${index === 0 ? 'active' : ''}`;
            dot.dataset.index = index;
            navContainer.appendChild(dot);
        });

        this.container.querySelector('.slider-container').appendChild(navContainer);
    }

    createArrows() {
        const sliderContainer = this.container.querySelector('.slider-container');

        const prevArrow = document.createElement('div');
        prevArrow.className = 'slider-arrow prev';
        prevArrow.innerHTML = '&lt;';

        const nextArrow = document.createElement('div');
        nextArrow.className = 'slider-arrow next';
        nextArrow.innerHTML = '&gt;';

        sliderContainer.appendChild(prevArrow);
        sliderContainer.appendChild(nextArrow);
    }

    updateSlides() {
        const slides = this.container.querySelectorAll('.slide');
        const dots = this.container.querySelectorAll('.nav-dot');

        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.allImages.length;
        this.updateSlides();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.allImages.length) % this.allImages.length;
        this.updateSlides();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlides();
    }

    startAutoSlide() {
        this.interval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoSlide() {
        clearInterval(this.interval);
    }

    addEventListeners() {
        const dots = this.container.querySelectorAll('.nav-dot');
        const prevArrow = this.container.querySelector('.slider-arrow.prev');
        const nextArrow = this.container.querySelector('.slider-arrow.next');

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index);
                this.goToSlide(index);
            });
        });

        prevArrow.addEventListener('click', () => {
            this.prevSlide();
            this.stopAutoSlide();
            this.startAutoSlide();
        });

        nextArrow.addEventListener('click', () => {
            this.nextSlide();
            this.stopAutoSlide();
            this.startAutoSlide();
        });

        // Pause auto-slide on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.container.addEventListener('mouseleave', () => this.startAutoSlide());
    }
}

// Initialize the slider when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetch('../../apartments.json')
        .then(response => response.json())
        .then(data => {
            new ImageSlider('home-container', data);
        })
        .catch(error => console.error('Error loading apartments data:', error));
});