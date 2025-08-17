const images = [
    // Sunsets
    {name: "Golden Horizon", category: "sunsets", src: "sunset1.jpeg", date: "2024-01-15", size: 245},
    {name: "River Sunset", category: "sunsets", src: "sunset2.jpeg", date: "2024-01-20", size: 312},
    {name: "Mountain View", category: "sunsets", src: "sunset3.jpeg", date: "2024-01-25", size: 278},
    {name: "Desert Dawn", category: "sunsets", src: "sunset4.jpeg", date: "2024-02-01", size: 198},
    
    // Cats
    {name: "Curious Kitten", category: "cats", src: "cat1.jpeg", date: "2024-01-18", size: 356},
    {name: "Sleepy ", category: "cats", src: "cat2.jpeg", date: "2024-01-22", size: 289},
    {name: "Small", category: "cats", src: "cat3.jpeg", date: "2024-01-28", size: 234},
    {name: "Autumn", category: "cats", src: "cat4.jpeg", date: "2024-02-01", size: 267},
    {name: "Grey Cat", category: "cats", src: "cat5.jpeg", date: "2024-02-03", size: 267},
    {name: "Orange Beauty", category: "cats", src: "cat6.jpeg", date: "2024-02-10", size: 267},
    
    // Food
    {name: "Waffles and Ice-cream", category: "food", src: "food1.jpg", date: "2024-01-12", size: 445},
    {name: "Bedroom Pasta", category: "food", src: "food2.jpg", date: "2024-01-19", size: 324},
    
    // Sketches
    {name: "Portrait Study", category: "sketches", src: "sketch1.jpeg", date: "2024-01-14", size: 189},
    {name: "Character Drawing", category: "sketches", src: "sketch2.jpeg", date: "2024-01-21", size: 234},
    {name: "Digital Art", category: "sketches", src: "sketch3.jpeg", date: "2024-01-27", size: 156},
    {name: "Nature Sketch", category: "sketches", src: "sketch4.jpeg", date: "2024-02-04", size: 278},
    {name: "Eye Shading", category: "sketches", src: "sketch5.jpeg", date: "2024-02-04", size: 278},
    
];

let favorites = [];
let currentCategory = 'all';
let currentSort = 'date';
let currentImageIndex = 0;
let filteredImages = [];

function renderGallery() {
    const gallery = document.getElementById('gallery');
    filteredImages = currentCategory === 'all' ? images : 
                   currentCategory === 'favorites' ? favorites : 
                   images.filter(img => img.category === currentCategory);

    // Sort images
    filteredImages.sort((a, b) => {
        if (currentSort === 'name') return a.name.localeCompare(b.name);
        if (currentSort === 'size') return b.size - a.size;
        return new Date(b.date) - new Date(a.date);
    });

    gallery.innerHTML = filteredImages.map((img, index) => `
        <div class="gallery-item" onclick="openLightbox(${index})">
            <img src="${img.src}" alt="${img.name}" loading="lazy">
            <div class="item-overlay">
                <div class="item-info">
                    <div class="item-details">
                        <h4>${img.name}</h4>
                        <h6>${img.date}</h6>
                        <p>${img.category}</p>
                    </div>
                    <button class="heart-btn ${favorites.includes(img) ? 'favorited' : ''}" 
                            onclick="toggleFavorite(event, ${images.indexOf(img)})">
                        ${favorites.includes(img) ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleFavorite(event, imgIndex) {
    event.stopPropagation();
    const img = images[imgIndex];
    const index = favorites.indexOf(img);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(img);
    }
    renderGallery();
}

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    lightboxImg.src = filteredImages[index].src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    document.getElementById('lightboxImg').src = filteredImages[currentImageIndex].src;
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    document.getElementById('lightboxImg').src = filteredImages[currentImageIndex].src;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Category navigation
    document.querySelectorAll('.category-list li').forEach(li => {
        li.addEventListener('click', () => {
            document.querySelector('.category-list li.active').classList.remove('active');
            li.classList.add('active');
            currentCategory = li.dataset.category;
            renderGallery();
        });
    });

    // Sort functionality
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderGallery();
    });

    // Lightbox controls
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('lightbox').classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        }
    });

    // Initialize gallery
    renderGallery();
});