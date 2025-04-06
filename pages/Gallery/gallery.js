class Gallery {
    constructor() {
        this.container = document.getElementById('gallery-container');
        this.grid = this.container.querySelector('.gallery-grid');
        this.galleryItems = this.grid.querySelector('.gallery-items');
        this.pagination = this.container.querySelector('.pagination');
        this.prevBtn = this.pagination.querySelector('.prev');
        this.nextBtn = this.pagination.querySelector('.next');
        this.pageNumbers = this.pagination.querySelector('.page-numbers');
        this.showMoreBtn = this.grid.querySelector('.show-more-btn');
        this.searchInput = document.getElementById('search-input');
        this.cityFilter = document.getElementById('city-filter');
        this.priceFilter = document.getElementById('price-filter');
        this.roomsFilter = document.getElementById('rooms-filter');
        this.sortBy = document.getElementById('sort-by');
        this.itemsPerPage = 10;
        this.currentPage = 1;
        this.totalPages = 0;
        this.allApartments = [];
        this.filteredApartments = [];
        this.noResultsMessage = this.grid.querySelector('.no-results-message');
        this.init();
    }

    async init() {
        try {
            const response = await fetch('../../apartments.json');
            const data = await response.json();
            this.allApartments = data.apartments;
            this.filteredApartments = [...this.allApartments];
            this.setupEventListeners();
            this.updateGallery();
        } catch (error) {
            console.error('Error loading gallery data:', error);
        }
    }

    setupEventListeners() {
        // Search input
        this.searchInput.addEventListener('input', () => this.filterAndUpdate());

        // Filters
        this.cityFilter.addEventListener('change', () => this.filterAndUpdate());
        this.priceFilter.addEventListener('change', () => this.filterAndUpdate());
        this.roomsFilter.addEventListener('change', () => this.filterAndUpdate());

        // Sort
        this.sortBy.addEventListener('change', () => this.filterAndUpdate());

        // Pagination
        this.prevBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updateGallery();
            }
        });

        this.nextBtn.addEventListener('click', () => {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.updateGallery();
            }
        });

        this.pageNumbers.addEventListener('click', (e) => {
            const pageNumber = e.target.closest('.page-number');
            if (pageNumber) {
                this.currentPage = parseInt(pageNumber.dataset.page);
                this.updateGallery();
            }
        });

        // Show more button
        this.showMoreBtn.addEventListener('click', () => {
            this.itemsPerPage += 10;
            this.updateGallery();
        });
    }

    filterAndUpdate() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const city = this.cityFilter.value;
        const priceRange = this.priceFilter.value;
        const rooms = this.roomsFilter.value;
        
        this.filteredApartments = this.allApartments.filter(apartment => {
            const matchesSearch = 
                apartment.city.toLowerCase().includes(searchTerm) || 
                apartment.district.toLowerCase().includes(searchTerm);
            const matchesCity = !city || apartment.city === city;
            const matchesPrice = !priceRange || this.matchesPriceRange(apartment.price, priceRange);
            const matchesRooms = !rooms || apartment.rooms === parseInt(rooms);
            
            return matchesSearch && matchesCity && matchesPrice && matchesRooms;
        });
        
        this.sortApartments();
        this.currentPage = 1;
        this.updateGallery();
    }

    matchesPriceRange(price, range) {
        if (range === '1200000+') return price >= 1200000;
        const [min, max] = range.split('-').map(Number);
        return price >= min && price <= max;
    }

    sortApartments() {
        const [field, direction] = this.sortBy.value.split('-');

        this.filteredApartments.sort((a, b) => {
            let valueA = a[field];
            let valueB = b[field];

            if (field === 'price') {
                valueA = parseFloat(valueA);
                valueB = parseFloat(valueB);
            }

            if (direction === 'asc') {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        });
    }

    createApartmentCard(apartment) {
        const card = document.createElement('div');
        card.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = apartment.images[0];
        img.alt = apartment.title;
        img.loading = 'lazy';
        img.classList.add('loading');

        img.onload = () => {
            img.classList.remove('loading');
        };

        const info = document.createElement('div');
        info.className = 'apartment-info';
        info.innerHTML = `
            <h3>${apartment.city}</h3>
            <p>${apartment.district}</p>
            <div class="apartment-details">
                <span>$${apartment.price}</span>
                <span>${apartment.rooms} Rooms</span>
                <span>${apartment.propertySize} m2</span>
            </div>
        `;

        card.appendChild(img);
        card.appendChild(info);
        return card;
    }

    updateGallery() {
        this.galleryItems.innerHTML = '';
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const currentApartments = this.filteredApartments.slice(startIndex, endIndex);

        if (this.filteredApartments.length === 0) {
            this.noResultsMessage.style.display = 'block';
            this.showMoreBtn.style.display = 'none';
            this.pagination.style.display = 'none';
        } else {
            this.noResultsMessage.style.display = 'none';
            this.pagination.style.display = 'flex';
            
            currentApartments.forEach(apartment => {
                const card = this.createApartmentCard(apartment);
                this.galleryItems.appendChild(card);
            });

            this.updatePagination();
            this.updateShowMoreButton();
        }
    }

    updatePagination() {
        this.totalPages = Math.ceil(this.filteredApartments.length / this.itemsPerPage);
        this.pageNumbers.innerHTML = '';

        // Previous button state
        this.prevBtn.disabled = this.currentPage === 1;

        // Page numbers
        for (let i = 1; i <= this.totalPages; i++) {
            const pageNumber = document.createElement('span');
            pageNumber.className = `page-number ${i === this.currentPage ? 'active' : ''}`;
            pageNumber.textContent = i;
            pageNumber.dataset.page = i;
            this.pageNumbers.appendChild(pageNumber);
        }

        // Next button state
        this.nextBtn.disabled = this.currentPage === this.totalPages;
    }

    updateShowMoreButton() {
        const hasMoreItems = this.filteredApartments.length > this.currentPage * this.itemsPerPage;
        this.showMoreBtn.style.display = hasMoreItems ? 'block' : 'none';
    }
}

// Initialize the gallery when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Gallery();
});