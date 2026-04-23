// ==========================================
// 1. FIREBASE CONFIGURATION
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyCovLgAcmIcf8Zt-c8q5c3hbPrnCa-c-PI",
    authDomain: "smartfinder-f0df9.firebaseapp.com",
    projectId: "smartfinder-f0df9",
    storageBucket: "smartfinder-f0df9.firebasestorage.app",
    messagingSenderId: "443553537029",
    appId: "1:443553537029:web:8784b24995a1496470d06c"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// ==========================================
// 2. PG DATABASE
// ==========================================
const pgData = [
    {
        id: 1, name: "The Vesu Loft", area: "Vesu", rent: 12000, type: "AC", capacity: 2,
        wifi: true, mess: true, isVeg: true,
        img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
        lat: 21.1503, lng: 72.7765,
        address: "12, Silver Oak Society, Vesu, Surat - 395007",
        desc: "A modern, fully-furnished AC PG with 24/7 security, high-speed WiFi and tasty vegetarian mess. Perfect for UTU and SVNIT students looking for comfort.",
        amenities: ["WiFi", "AC", "Mess", "Hot Water", "Laundry", "CCTV", "Power Backup", "Parking"],
        owner: { name: "Ramesh Patel", phone: "+91 98765 11001", initials: "R" },
        roommates: [
            { name: "Arjun Shah", college: "UTU", sem: "5th", city: "Ahmedabad", gender: "Male" },
            { name: "", college: "", sem: "", city: "", gender: "" }
        ]
    },
    {
        id: 2, name: "Bardoli Manor", area: "Bardoli", rent: 4500, type: "Non-AC", capacity: 3,
        wifi: false, mess: true, isVeg: true,
        img: "https://images.unsplash.com/photo-1555854817-5b2247a8175f?w=800",
        lat: 21.1200, lng: 73.1100,
        address: "Opp. Bardoli College, Station Road, Bardoli - 394601",
        desc: "Budget-friendly PG near Bardoli College. Spacious triple rooms with veg mess included. Ideal for first-year students.",
        amenities: ["Mess", "Hot Water", "Study Room", "CCTV"],
        owner: { name: "Suresh Desai", phone: "+91 94270 22002", initials: "S" },
        roommates: [
            { name: "Vivek Modi", college: "Bardoli College", sem: "3rd", city: "Surat", gender: "Male" },
            { name: "Jay Solanki", college: "Bardoli College", sem: "3rd", city: "Bharuch", gender: "Male" },
            { name: "", college: "", sem: "", city: "", gender: "" }
        ]
    },
    {
        id: 3, name: "The Residence", area: "Piplod", rent: 15000, type: "AC", capacity: 1,
        wifi: true, mess: true, isVeg: true,
        img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
        lat: 21.1699, lng: 72.7804,
        address: "3rd Floor, Shyam Residency, Piplod Main Road, Surat - 395007",
        desc: "Luxury single occupancy AC rooms for students who value privacy. Premium amenities including housekeeping and daily tiffin service.",
        amenities: ["WiFi", "AC", "Mess", "Housekeeping", "Hot Water", "Laundry", "CCTV", "Power Backup", "Gym"],
        owner: { name: "Nilesh Shah", phone: "+91 99250 33003", initials: "N" },
        roommates: []
    },
    {
        id: 4, name: "Social Hub PG", area: "Adajan", rent: 6000, type: "Non-AC", capacity: 2,
        wifi: true, mess: false, isVeg: false,
        img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
        lat: 21.1920, lng: 72.7968,
        address: "Near Adajan Circle, Bhatar Road, Surat - 395009",
        desc: "Social and vibrant PG community with fast WiFi. No mess but a well-equipped kitchen is shared. Ideal for those who cook or order food.",
        amenities: ["WiFi", "Kitchen", "Hot Water", "CCTV", "Power Backup"],
        owner: { name: "Kiran Trivedi", phone: "+91 90676 44004", initials: "K" },
        roommates: [
            { name: "Rohan Jain", college: "VNSGU", sem: "7th", city: "Navsari", gender: "Male" },
            { name: "", college: "", sem: "", city: "", gender: "" }
        ]
    },
    {
        id: 5, name: "Urban Nest", area: "Palsana", rent: 9000, type: "AC", capacity: 2,
        wifi: true, mess: true, isVeg: true,
        img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
        lat: 21.0780, lng: 72.9640,
        address: "Main Market, Palsana, Surat District - 394315",
        desc: "Comfortable AC sharing rooms with home-style vegetarian food. Calm locality ideal for students wanting peace and focus.",
        amenities: ["WiFi", "AC", "Mess", "Hot Water", "CCTV", "Study Room"],
        owner: { name: "Bhavesh Raval", phone: "+91 98988 55005", initials: "B" },
        roommates: [
            { name: "Dhruv Patel", college: "ITI Palsana", sem: "2nd", city: "Surat", gender: "Male" },
            { name: "", college: "", sem: "", city: "", gender: "" }
        ]
    },
    {
        id: 6, name: "Prime Student Living", area: "Vesu", rent: 11000, type: "AC", capacity: 2,
        wifi: true, mess: true, isVeg: true,
        img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        lat: 21.1480, lng: 72.7790,
        address: "Prime Avenue, Vesu-Bhatar Road, Surat - 395007",
        desc: "Purposefully designed for students. High-speed fibre, AC rooms, and a dedicated study lounge. 5-min walk from SVNIT.",
        amenities: ["WiFi", "AC", "Mess", "Study Lounge", "Hot Water", "Laundry", "CCTV", "Power Backup"],
        owner: { name: "Alpesh Gajjar", phone: "+91 70162 66006", initials: "A" },
        roommates: [
            { name: "Parth Mehta", college: "SVNIT", sem: "5th", city: "Vadodara", gender: "Male" },
            { name: "Krish Vora", college: "SVNIT", sem: "5th", city: "Rajkot", gender: "Male" }
        ]
    },
    {
        id: 7, name: "The Bardoli Hub", area: "Bardoli", rent: 3800, type: "Non-AC", capacity: 4,
        wifi: true, mess: false, isVeg: true,
        img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
        lat: 21.1230, lng: 73.1120,
        address: "Near Sarojini Naidu Garden, Bardoli - 394601",
        desc: "Super budget quad-sharing rooms. WiFi included, self-cooking allowed. Great for groups of friends who want to room together.",
        amenities: ["WiFi", "Kitchen", "Hot Water", "CCTV"],
        owner: { name: "Mahesh Bhatt", phone: "+91 86900 77007", initials: "M" },
        roommates: [
            { name: "Karan Patel", college: "Bardoli Engineering College", sem: "1st", city: "Tapi", gender: "Male" },
            { name: "Aman Shah", college: "Bardoli Engineering College", sem: "1st", city: "Valsad", gender: "Male" },
            { name: "Raj Desai", college: "Bardoli Engineering College", sem: "1st", city: "Navsari", gender: "Male" },
            { name: "", college: "", sem: "", city: "", gender: "" }
        ]
    },
    {
        id: 8, name: "Surat Skyline PG", area: "Adajan", rent: 7500, type: "AC", capacity: 2,
        wifi: true, mess: true, isVeg: true,
        img: "https://images.unsplash.com/photo-1512918766674-ed62b996386e?w=800",
        lat: 21.1950, lng: 72.8010,
        address: "7th Floor, Skyline Tower, Adajan Patiya, Surat - 395009",
        desc: "High-rise AC PG with a breathtaking city view. Full-time mess, security and friendly management. Very popular among girls.",
        amenities: ["WiFi", "AC", "Mess", "Hot Water", "Laundry", "CCTV", "Power Backup", "Balcony"],
        owner: { name: "Heena Thakkar", phone: "+91 95125 88008", initials: "H" },
        roommates: [
            { name: "Riya Joshi", college: "VNSGU", sem: "3rd", city: "Surat", gender: "Female" },
            { name: "", college: "", sem: "", city: "", gender: "" }
        ]
    },
    {
        id: 9, name: "University Residency", area: "Bardoli", rent: 5000, type: "Non-AC", capacity: 2,
        wifi: true, mess: true, isVeg: true,
        img: "https://images.unsplash.com/photo-1555854817-5b2247a8175f?w=800",
        lat: 21.1190, lng: 73.1080,
        address: "100 Feet Road, Near Degree College, Bardoli - 394601",
        desc: "Well-maintained PG with consistent mess service. 2-min walk to the university gate. Very safe locality.",
        amenities: ["WiFi", "Mess", "Hot Water", "CCTV", "Study Room"],
        owner: { name: "Gopal Nair", phone: "+91 91730 99009", initials: "G" },
        roommates: [
            { name: "Siddhant Rana", college: "Bardoli University", sem: "4th", city: "Ahmedabad", gender: "Male" },
            { name: "", college: "", sem: "", city: "", gender: "" }
        ]
    },
    {
        id: 10, name: "Luxury Piplod PG", area: "Piplod", rent: 18000, type: "AC", capacity: 1,
        wifi: true, mess: true, isVeg: true,
        img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        lat: 21.1720, lng: 72.7830,
        address: "Piplod Green Boulevard, Near L'Amour Party Plot, Surat - 395007",
        desc: "Ultra-premium private room with king-size bed, wardrobe and personal AC. Daily housekeeping, gourmet mess and rooftop terrace.",
        amenities: ["WiFi", "AC", "Mess", "Housekeeping", "Hot Water", "Laundry", "CCTV", "Power Backup", "Gym", "Terrace", "Parking"],
        owner: { name: "Devang Kapadia", phone: "+91 98240 10010", initials: "D" },
        roommates: []
    }
];

// ==========================================
// 3. STATE VARIABLES
// ==========================================
let favorites = new Set();
let isLoginView = true;
let isEditMode = false;
let currentDetailMap = null;

// ==========================================
// 4. TOAST NOTIFICATION
// ==========================================
function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.innerText = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3200);
}

// ==========================================
// 5. MODAL HELPERS
// ==========================================
function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
}

function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
}

// ==========================================
// 6. RENDER PG CARDS
// ==========================================
function renderPGs() {
    const maxRent  = parseInt(document.getElementById('priceRange')?.value || 20000);
    const selCap   = document.getElementById('capacityFilter')?.value || 'All';
    const sortType = document.getElementById('sortFilter')?.value || 'default';
    const search   = (document.getElementById('searchInput')?.value || '').toLowerCase();

    const needsWifi = document.getElementById('wifiFilter')?.checked  || document.getElementById('wifiFilter2')?.checked  || false;
    const needsMess = document.getElementById('messFilter')?.checked  || document.getElementById('messFilter2')?.checked  || false;
    const needsVeg  = document.getElementById('vegFilter')?.checked   || document.getElementById('vegFilter2')?.checked   || false;
    const needsAC   = document.getElementById('acFilter')?.checked    || false;

    let filtered = (typeof allPGs !== "undefined" ? allPGs : pgData).filter(pg => {
        return (
            pg.rent <= maxRent &&
            (selCap === 'All' || pg.capacity == selCap) &&
            (pg.name.toLowerCase().includes(search) || pg.area.toLowerCase().includes(search)) &&
            (!needsWifi || pg.wifi === true) &&
            (!needsMess || pg.mess === true) &&
            (!needsVeg  || pg.isVeg === true) &&
            (!needsAC   || pg.type === 'AC')
        );
    });

    if (sortType === 'lowToHigh') filtered.sort((a, b) => a.rent - b.rent);
    else if (sortType === 'highToLow') filtered.sort((a, b) => b.rent - a.rent);

    const container = document.getElementById('pgContainer');
    if (!container) return;

    // Update favorites counter in nav
    const counter = document.getElementById('wishlistCounter');
    if (counter) counter.innerText = favorites.size > 0 ? '❤️ ' + favorites.size : '';

    if (filtered.length === 0) {
        container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 0;font-size:14px;color:rgba(255,255,255,0.2);font-weight:800;text-transform:uppercase;letter-spacing:0.1em;">No matching PGs found</div>';
        return;
    }

    container.innerHTML = filtered.map(pg => {
        const split = Math.round(pg.rent / pg.capacity);
        const isFav = favorites.has(pg.id);

        // Bed availability dots
        const beds = Array.from({ length: pg.capacity }, (_, i) => {
            return (pg.roommates && pg.roommates[i] && pg.roommates[i].name) ? '🟢' : '🔴';
        }).join(' ');

        return `
        <div class="pg-card" onclick="openPGDetail(${pg.id})">
            <div class="card-img-wrap">
                <button class="fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${pg.id})">
                    <svg viewBox="0 0 24 24" fill="${isFav ? '#ef4444' : 'none'}" stroke="${isFav ? '#ef4444' : 'white'}" stroke-width="2">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.364-1.364a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                </button>
                <img src="${pg.img}" alt="${pg.name}" loading="lazy">
            </div>
            <div class="card-body">
                <h4 class="card-name">${pg.name}</h4>
                <div class="card-badges">
                    ${pg.type === 'AC' ? '<span class="badge badge-ac">AC</span>'   : ''}
                    ${pg.wifi          ? '<span class="badge badge-wifi">WiFi</span>' : ''}
                    ${pg.mess          ? '<span class="badge badge-mess">Mess</span>' : ''}
                    ${pg.isVeg         ? '<span class="badge badge-veg">Veg</span>'   : ''}
                </div>
                <div style="font-size:10px;color:rgba(255,255,255,0.3);margin-bottom:8px;">${beds} ${pg.capacity}-sharing</div>
                <div class="card-meta">
                    <div>
                        <div class="card-area">${pg.area}</div>
                        <div class="card-type">${pg.type}</div>
                    </div>
                    <div style="text-align:right;">
                        <div class="card-rent">&#8377;${pg.rent.toLocaleString()}</div>
                        <div class="card-split">&#8377;${split.toLocaleString()} / split</div>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');
}

// ==========================================
// 7. PG DETAIL MODAL
// ==========================================
function openPGDetail(id) {
    const pg = (typeof allPGs !== "undefined" ? allPGs : pgData).find(p => p.id === id);
    if (!pg) return;

    // Hero image & basic info
    document.getElementById('detailHeroImg').src      = pg.img;
    document.getElementById('detailName').innerText   = pg.name;
    document.getElementById('detailArea').innerText   = pg.area + ', Surat';
    document.getElementById('detailRent').innerText   = '\u20B9' + pg.rent.toLocaleString();
    document.getElementById('detailSplit').innerText  = '\u20B9' + Math.round(pg.rent / pg.capacity).toLocaleString() + ' / person (split)';
    document.getElementById('detailDesc').innerText   = pg.desc;
    document.getElementById('detailAddress').innerText = '\uD83D\uDCCD ' + pg.address;

    // Badges
    const badges = [];
    if (pg.type === 'AC') badges.push('<span class="badge badge-ac">AC</span>');
    if (pg.wifi)          badges.push('<span class="badge badge-wifi">WiFi</span>');
    if (pg.mess)          badges.push('<span class="badge badge-mess">Mess</span>');
    if (pg.isVeg)         badges.push('<span class="badge badge-veg">Veg Only</span>');
    badges.push('<span class="info-chip">\uD83D\uDC65 ' + pg.capacity + '-sharing</span>');
    document.getElementById('detailBadges').innerHTML = badges.join('');

    // Amenities
    const amenIcons = {
        'WiFi': '\uD83D\uDCF6', 'AC': '\u2744\uFE0F', 'Mess': '\uD83C\uDF71',
        'Hot Water': '\uD83D\uDEBF', 'Laundry': '\uD83D\uDC55', 'CCTV': '\uD83D\uDCF9',
        'Power Backup': '\u26A1', 'Parking': '\uD83C\uDD7F\uFE0F', 'Gym': '\uD83D\uDCAA',
        'Terrace': '\uD83C\uDF05', 'Kitchen': '\uD83C\uDF73', 'Study Room': '\uD83D\uDCDA',
        'Housekeeping': '\uD83E\uDDF9', 'Balcony': '\uD83C\uDF07', 'Study Lounge': '\uD83D\uDCD6'
    };
    document.getElementById('detailAmenities').innerHTML = (pg.amenities || []).map(a =>
        '<span class="info-chip">' + (amenIcons[a] || '\u2714\uFE0F') + ' ' + a + '</span>'
    ).join('');

    // Owner contact
    document.getElementById('ownerAvatar').innerText = pg.owner.initials;
    document.getElementById('ownerName').innerText   = pg.owner.name;
    document.getElementById('ownerPhone').innerText  = pg.owner.phone;
    document.getElementById('ownerCallBtn').href     = 'tel:' + pg.owner.phone.replace(/\s/g, '');
    var waNumber = pg.owner.phone.replace(/[\s\+]/g, '').replace(/^0/, '91');
    document.getElementById('ownerWhatsBtn').href    = 'https://wa.me/' + waNumber + '?text=Hi%2C%20I%20found%20your%20PG%20' + encodeURIComponent(pg.name) + '%20on%20SmartFinder.%20Is%20it%20available%3F';

    // Roommates
    const occupied = (pg.roommates || []).filter(r => r.name);
    const vacant   = pg.capacity - occupied.length;
    const rContainer = document.getElementById('roommatesContainer');

    if (occupied.length > 0) {
        rContainer.innerHTML = occupied.map(r =>
            '<div class="roommate-card">' +
                '<div class="roommate-avatar">' + r.name[0] + '</div>' +
                '<div>' +
                    '<div style="font-weight:700;font-size:13px;">' + r.name + '</div>' +
                    '<div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:2px;">' + r.college + ' \u00B7 Sem ' + r.sem + '</div>' +
                    '<div style="font-size:11px;color:rgba(255,255,255,0.3);">from ' + r.city + '</div>' +
                '</div>' +
            '</div>'
        ).join('');
    } else {
        rContainer.innerHTML = '<p style="font-size:12px;color:rgba(255,255,255,0.3);">No current roommates listed.</p>';
    }

    document.getElementById('roommateNote').innerText = vacant > 0
        ? '\uD83D\uDD34 ' + vacant + ' bed' + (vacant > 1 ? 's' : '') + ' available'
        : '\uD83D\uDFE2 Fully occupied \u2014 join waitlist';

    // Open modal
    openModal('pgDetailModal');

    // Render Leaflet map after modal is visible
    setTimeout(function () {
        var mapEl = document.getElementById('pgDetailMap');
        if (!mapEl) return;
        mapEl.innerHTML = '';

        if (currentDetailMap) {
            currentDetailMap.remove();
            currentDetailMap = null;
        }

        try {
            var map = L.map('pgDetailMap', { zoomControl: true }).setView([pg.lat, pg.lng], 16);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '\u00A9 OpenStreetMap contributors'
            }).addTo(map);
            L.marker([pg.lat, pg.lng])
                .addTo(map)
                .bindPopup('<b>' + pg.name + '</b><br>' + pg.area)
                .openPopup();
            currentDetailMap = map;
        } catch (err) {
            console.warn('Map render error:', err);
            mapEl.innerHTML = '<p style="padding:20px;color:rgba(255,255,255,0.3);font-size:12px;">Map unavailable offline.</p>';
        }
    }, 250);
}

// ==========================================
// 8. FAVORITES
// ==========================================
function toggleFavorite(id) {
    if (favorites.has(id)) {
        favorites.delete(id);
        showToast('Removed from favorites');
    } else {
        favorites.add(id);
        showToast('\u2764\uFE0F Added to favorites!');
    }
    renderPGs();
}

function renderFavorites() {
    var items = (typeof allPGs !== "undefined" ? allPGs : pgData).filter(function (p) { return favorites.has(p.id); });
    var container = document.getElementById('favoritesContainer');
    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = '<p style="font-size:12px;color:rgba(255,255,255,0.2);">No favorites saved yet.</p>';
        return;
    }

    container.innerHTML = items.map(function (p) {
        return '<div style="display:flex;align-items:center;gap:10px;background:rgba(0,0,0,0.2);border-radius:12px;padding:12px;cursor:pointer;" onclick="closeModal(\'profileModal\'); openPGDetail(' + p.id + ')">' +
            '<img src="' + p.img + '" style="width:40px;height:40px;border-radius:8px;object-fit:cover;flex-shrink:0;" alt="' + p.name + '">' +
            '<div>' +
                '<div style="font-size:11px;font-weight:800;text-transform:uppercase;color:#CEDC00;">' + p.name + '</div>' +
                '<div style="font-size:10px;color:rgba(255,255,255,0.4);">\u20B9' + p.rent.toLocaleString() + ' \u00B7 ' + p.area + '</div>' +
            '</div>' +
        '</div>';
    }).join('');
}

// ==========================================
// 9. HERO SLIDER
// ==========================================
function startHeroSlider() {
    var slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    var idx = 0;
    setInterval(function () {
        slides[idx].classList.remove('active');
        idx = (idx + 1) % slides.length;
        slides[idx].classList.add('active');
    }, 5000);
}

// ==========================================
// 10. FILTER RESET
// ==========================================
function clearFilters() {
    var priceRange = document.getElementById('priceRange');
    var priceValue = document.getElementById('priceValue');
    if (priceRange) priceRange.value = 20000;
    if (priceValue) priceValue.innerText = '\u20B920000';

    var cap  = document.getElementById('capacityFilter');
    var sort = document.getElementById('sortFilter');
    var srch = document.getElementById('searchInput');
    if (cap)  cap.value  = 'All';
    if (sort) sort.value = 'default';
    if (srch) srch.value = '';

    ['wifiFilter', 'messFilter', 'vegFilter', 'wifiFilter2', 'messFilter2', 'vegFilter2', 'acFilter'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.checked = false;
    });

    renderPGs();
}

// ==========================================
// 11. CONTACT FORM
// ==========================================
async function submitContact() {
    var name  = (document.getElementById('contactName')?.value  || '').trim();
    var email = (document.getElementById('contactEmail')?.value || '').trim();
    var topic = document.getElementById('contactTopic')?.value  || 'General Inquiry';
    var msg   = (document.getElementById('contactMsg')?.value   || '').trim();

    if (!name || !email || !msg) {
        showToast('\u26A0\uFE0F Please fill all fields');
        return;
    }

    try {
        await db.collection('contactRequests').add({
            name: name,
            email: email,
            topic: topic,
            message: msg,
            submittedAt: new Date().toISOString()
        });
        showToast('\u2705 Message sent! We\'ll reply within 24h.');
        document.getElementById('contactName').value  = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMsg').value   = '';
    } catch (e) {
        console.warn('Firestore write failed:', e);
        showToast('\u2705 Message received!');
    }
}

// ==========================================
// 12. AUTHENTICATION
// ==========================================
function handleAuthClick() {
    if (auth.currentUser) {
        renderFavorites();
        openModal('profileModal');
    } else {
        openModal('authModal');
    }
}

function switchAuth(view) {
    isLoginView = (view === 'login');
    var userNameEl = document.getElementById('userName');
    var authTitle  = document.getElementById('authTitle');
    var loginTab   = document.getElementById('loginTab');
    var signupTab  = document.getElementById('signupTab');

    if (userNameEl) userNameEl.style.display = isLoginView ? 'none' : 'block';
    if (authTitle)  authTitle.innerText       = isLoginView ? 'Welcome Back' : 'Create Account';
    if (loginTab)   loginTab.className        = 'auth-tab' + (isLoginView  ? ' active' : '');
    if (signupTab)  signupTab.className       = 'auth-tab' + (!isLoginView ? ' active' : '');
}

async function handleEmailAuth(e) {
    e.preventDefault();
    var email = document.getElementById('userEmail')?.value    || '';
    var pass  = document.getElementById('userPassword')?.value || '';
    var name  = document.getElementById('userName')?.value     || '';

    try {
        if (isLoginView) {
            await auth.signInWithEmailAndPassword(email, pass);
        } else {
            var res = await auth.createUserWithEmailAndPassword(email, pass);
            await db.collection('users').doc(res.user.uid).set({
                fullName: name,
                email: email,
                joinedAt: new Date().toISOString(),
                isProfileComplete: false
            });
        }
        closeModal('authModal');
        showToast('\u2705 Logged in successfully!');
    } catch (err) {
        showToast('\u26A0\uFE0F ' + err.message);
    }
}

async function handleGoogleLogin() {
    try {
        var result = await auth.signInWithPopup(googleProvider);
        var user   = result.user;
        var snap   = await db.collection('users').doc(user.uid).get();
        if (!snap.exists) {
            await db.collection('users').doc(user.uid).set({
                fullName: user.displayName,
                email: user.email,
                joinedAt: new Date().toISOString(),
                isProfileComplete: false
            });
        }
        closeModal('authModal');
        showToast('\u2705 Signed in with Google!');
    } catch (e) {
        showToast('\u26A0\uFE0F ' + e.message);
    }
}

function handleLogout() {
    auth.signOut().then(function () {
        favorites.clear();
        renderPGs();
        closeModal('profileModal');
        var authBtn   = document.getElementById('authBtn');
        var navAvatar = document.getElementById('navAvatar');
        if (authBtn)   authBtn.innerText       = 'Login';
        if (navAvatar) navAvatar.style.display = 'none';
        showToast('\uD83D\uDC4B Logged out successfully');
    });
}

// ==========================================
// 13. PROFILE EDIT
// ==========================================
function toggleEditMode(forceEdit) {
    isEditMode = (forceEdit === true) ? true : !isEditMode;

    document.querySelectorAll('#extraInfoForm input, #extraInfoForm select').forEach(function (inp) {
        inp.disabled = !isEditMode;
    });

    var saveBtn = document.getElementById('saveInfoBtn');
    var editBtn = document.getElementById('editProfileBtn');
    if (saveBtn) saveBtn.style.display = isEditMode ? 'block' : 'none';
    if (editBtn) editBtn.innerText     = isEditMode ? 'Cancel' : 'Edit Profile';
}

async function saveStudentExtraInfo(e) {
    e.preventDefault();
    var data = {
        mobile:            document.getElementById('studentMobile')?.value  || '',
        gender:            document.getElementById('studentGender')?.value  || '',
        address:           document.getElementById('studentAddress')?.value || '',
        clgName:           document.getElementById('studentClg')?.value     || '',
        semester:          document.getElementById('studentSem')?.value     || '',
        branch:            document.getElementById('studentBranch')?.value  || '',
        homeCity:          document.getElementById('studentCity')?.value    || '',
        isProfileComplete: true,
        updatedAt:         new Date().toISOString()
    };

    try {
        await db.collection('users').doc(auth.currentUser.uid).set(data, { merge: true });
        updateVerificationStatus(data);
        toggleEditMode(false);
        showToast('\u2705 Profile saved!');
    } catch (err) {
        showToast('\u26A0\uFE0F Save failed: ' + err.message);
    }
}

function updateVerificationStatus(data) {
    var badge = document.getElementById('verifyBadge');
    var icon  = document.getElementById('badgeIcon');
    var text  = document.getElementById('badgeText');
    if (!badge || !icon || !text) return;

    if (data.mobile && data.clgName && data.semester) {
        badge.className = 'verify-badge verified';
        icon.innerText  = '\u2705';
        text.innerText  = 'Verified Student';
    }
}

// ==========================================
// 14. AUTH STATE LISTENER
// ==========================================
auth.onAuthStateChanged(async function (user) {
    var authBtn   = document.getElementById('authBtn');
    var navAvatar = document.getElementById('navAvatar');

    if (user) {
        if (authBtn) authBtn.innerText = 'Profile';
        if (user.photoURL && navAvatar) {
            navAvatar.src = user.photoURL;
            navAvatar.style.display = 'block';
        }

        try {
            var snap = await db.collection('users').doc(user.uid).get();
            if (snap.exists) {
                var d = snap.data();
                var nameEl   = document.getElementById('profileHeaderName');
                var emailEl  = document.getElementById('profileEmail');
                var mobEl    = document.getElementById('studentMobile');
                var clgEl    = document.getElementById('studentClg');
                var semEl    = document.getElementById('studentSem');
                var branchEl = document.getElementById('studentBranch');
                var cityEl   = document.getElementById('studentCity');
                var genEl    = document.getElementById('studentGender');
                var addrEl   = document.getElementById('studentAddress');

                if (nameEl)   nameEl.innerText  = d.fullName || user.displayName || 'Student';
                if (emailEl)  emailEl.innerText  = user.email;
                if (mobEl)    mobEl.value         = d.mobile   || '';
                if (clgEl)    clgEl.value          = d.clgName  || '';
                if (semEl)    semEl.value           = d.semester || '';
                if (branchEl) branchEl.value        = d.branch   || '';
                if (cityEl)   cityEl.value           = d.homeCity || '';
                if (genEl  && d.gender)  genEl.value  = d.gender;
                if (addrEl && d.address) addrEl.value = d.address;

                if (!d.isProfileComplete) {
                    openModal('profileModal');
                    toggleEditMode(true);
                }
                updateVerificationStatus(d);
            }
        } catch (e) {
            console.warn('Firestore read failed:', e);
        }
    } else {
        if (authBtn) authBtn.innerText = 'Login';
    }
});

// ==========================================
// 15. INITIALISATION
// ==========================================
document.addEventListener('DOMContentLoaded', function () {

    // Initial render
    renderPGs();
    startHeroSlider();

    // Close modals on backdrop click
    document.querySelectorAll('.modal').forEach(function (m) {
        m.addEventListener('click', function (e) {
            if (e.target === m) closeModal(m.id);
        });
    });

    // Price range live label update
    var priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', function () {
            var label = document.getElementById('priceValue');
            if (label) label.innerText = '\u20B9' + priceRange.value;
            renderPGs();
        });
    }

    // Search
    var searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.addEventListener('input', renderPGs);

    // Sort & capacity dropdowns
    var sortFilter     = document.getElementById('sortFilter');
    var capacityFilter = document.getElementById('capacityFilter');
    if (sortFilter)     sortFilter.addEventListener('change', renderPGs);
    if (capacityFilter) capacityFilter.addEventListener('change', renderPGs);

    // Top-bar checkboxes -> sync sidebar
    ['wifiFilter', 'messFilter', 'vegFilter'].forEach(function (id) {
        var el  = document.getElementById(id);
        var el2 = document.getElementById(id + '2');
        if (el) {
            el.addEventListener('change', function () {
                if (el2) el2.checked = el.checked;
                renderPGs();
            });
        }
    });

    // Sidebar checkboxes -> sync top-bar
    ['wifiFilter2', 'messFilter2', 'vegFilter2'].forEach(function (id) {
        var el     = document.getElementById(id);
        var baseEl = document.getElementById(id.replace('2', ''));
        if (el) {
            el.addEventListener('change', function () {
                if (baseEl) baseEl.checked = el.checked;
                renderPGs();
            });
        }
    });

    // AC filter
    var acFilter = document.getElementById('acFilter');
    if (acFilter) acFilter.addEventListener('change', renderPGs);

    // Auth form
    var authForm = document.getElementById('authForm');
    if (authForm) authForm.addEventListener('submit', handleEmailAuth);
});

// ==========================================
// 50+ DUMMY PG DATA (Surat + Bardoli + Palsana)
// ==========================================
const extraPGs = [
    // ── VESU (10 PGs) ──
    { id:11, name:"Vesu Green Residency", area:"Vesu", rent:8500, type:"AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/23SBJ1LV/1.avif", lat:21.1510, lng:72.7780, address:"22, Green Park Society, Vesu, Surat - 395007", desc:"Affordable AC PG with homely vegetarian mess. 10 min walk from SVNIT.", amenities:["WiFi","AC","Mess","Hot Water","CCTV","Power Backup"], owner:{name:"Jignesh Patel",phone:"+91 98250 11101",initials:"J"}, roommates:[{name:"Rohan Shah",college:"SVNIT",sem:"3rd",city:"Vadodara",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:12, name:"Sunrise Villa PG", area:"Vesu", rent:13000, type:"AC", capacity:1, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/gbQXykds/2.avif", lat:21.1495, lng:72.7755, address:"8, Sunrise Complex, Vesu Main Road, Surat - 395007", desc:"Premium single room PG with modern amenities near SVNIT campus.", amenities:["WiFi","AC","Mess","Housekeeping","Hot Water","Laundry","CCTV","Power Backup"], owner:{name:"Meena Shah",phone:"+91 99099 22202",initials:"M"}, roommates:[] },
    { id:13, name:"Vesu Boys Hostel", area:"Vesu", rent:6000, type:"Non-AC", capacity:3, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/21xp0XFG/3.avif", lat:21.1520, lng:72.7800, address:"15, Shiv Shakti Society, Vesu, Surat - 395007", desc:"Budget boys hostel with WiFi and tiffin service. Very popular with UTU students.", amenities:["WiFi","Mess","Hot Water","CCTV","Study Room"], owner:{name:"Ramji Tiwari",phone:"+91 94260 33303",initials:"R"}, roommates:[{name:"Aryan Gupta",college:"UTU",sem:"1st",city:"Surat",gender:"Male"},{name:"Keval Patel",college:"UTU",sem:"1st",city:"Anand",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:14, name:"Comfort Zone PG Vesu", area:"Vesu", rent:10500, type:"AC", capacity:2, wifi:true, mess:false, isVeg:false, img:"https://i.ibb.co/7tNpS2s6/4.avif", lat:21.1488, lng:72.7770, address:"Plot 7, Comfort Residency, Vesu-Bhatar Cross Road, Surat", desc:"Modern AC rooms with attached kitchen. Self-cooking facility available.", amenities:["WiFi","AC","Kitchen","Hot Water","Laundry","CCTV","Power Backup","Parking"], owner:{name:"Sonal Kapoor",phone:"+91 90990 44404",initials:"S"}, roommates:[{name:"Harsh Modi",college:"SVNIT",sem:"7th",city:"Rajkot",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:15, name:"Elite Girls PG Vesu", area:"Vesu", rent:11000, type:"AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/99MLbhh0/5.jpg", lat:21.1505, lng:72.7795, address:"101, Laxmi Enclave, Nr Vesu Temple, Surat - 395007", desc:"Safe and secure girls-only PG with 24/7 security, homely food and CCTV.", amenities:["WiFi","AC","Mess","Hot Water","Laundry","CCTV","Power Backup","Housekeeping"], owner:{name:"Priya Joshi",phone:"+91 98985 55505",initials:"P"}, roommates:[{name:"Nisha Patel",college:"SVNIT",sem:"5th",city:"Surat",gender:"Female"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:43, name:"Vesu Nest PG", area:"Vesu", rent:9200, type:"AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/JRLXQX2S/6.webp", lat:21.1498, lng:72.7760, address:"Nest Complex, Vesu, Surat - 395007", desc:"Cozy AC PG with attached balcony and WiFi. Popular with SVNIT students.", amenities:["WiFi","AC","Mess","Hot Water","CCTV","Power Backup"], owner:{name:"Suresh Patel",phone:"+91 90016 23423",initials:"S"}, roommates:[{name:"Yash Trivedi",college:"SVNIT",sem:"7th",city:"Ahmedabad",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:44, name:"Scholar's Den Vesu", area:"Vesu", rent:11500, type:"AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/23RpvTxW/7.avif", lat:21.1512, lng:72.7785, address:"Scholar's Den, Vesu, Surat - 395007", desc:"Academic-focused PG with study lounge, fast internet and healthy meals.", amenities:["WiFi","AC","Mess","Hot Water","Study Room","CCTV","Power Backup","Laundry"], owner:{name:"Kinjal Shah",phone:"+91 94270 24524",initials:"K"}, roommates:[{name:"Neel Patel",college:"SVNIT",sem:"8th",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:45, name:"Vesu Valley Hostel", area:"Vesu", rent:7800, type:"Non-AC", capacity:3, wifi:true, mess:true, isVeg:false, img:"https://i.ibb.co/7xLWJzFk/8.avif", lat:21.1485, lng:72.7798, address:"Valley Road, Vesu, Surat - 395007", desc:"Budget hostel with WiFi and non-veg mess available on request.", amenities:["WiFi","Mess","Hot Water","CCTV","Power Backup","Kitchen"], owner:{name:"Sagar Patel",phone:"+91 99259 25625",initials:"S"}, roommates:[{name:"Ravi Kumar",college:"SVNIT",sem:"3rd",city:"Bihar",gender:"Male"},{name:"Amit Singh",college:"SVNIT",sem:"3rd",city:"UP",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:52, name:"UTU Campus PG", area:"Vesu", rent:8000, type:"AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/0Rphp3Lc/9.avif", lat:21.1465, lng:72.7855, address:"100m from UTU Gate, Vesu, Surat - 395007", desc:"Literally 100 meters from UTU main gate. Best location for UTU students.", amenities:["WiFi","AC","Mess","Hot Water","CCTV","Power Backup","Study Room","Laundry"], owner:{name:"UTU Hostel Mgmt",phone:"+91 98253 32332",initials:"U"}, roommates:[{name:"Parth Chauhan",college:"UTU Surat",sem:"5th",city:"Anand",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:50, name:"Piplod Budget Corner", area:"Piplod", rent:7000, type:"Non-AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/2Ypr3psL/10.avif", lat:21.1715, lng:72.7840, address:"Budget Corner, Piplod, Surat - 395007", desc:"Affordable PG in premium Piplod area. Best value for money near SVNIT.", amenities:["WiFi","Mess","Hot Water","CCTV","Power Backup","Study Room"], owner:{name:"Bhavna Patel",phone:"+91 98986 30130",initials:"B"}, roommates:[{name:"Smit Trivedi",college:"SVNIT",sem:"4th",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },

    // ── ADAJAN (8 PGs) ──
    { id:16, name:"Adajan Student Hub", area:"Adajan", rent:7000, type:"Non-AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/1Gk14SR5/11.avif", lat:21.1930, lng:72.7990, address:"Near Adajan Patiya, Surat - 395009", desc:"Central Adajan location, close to VNSGU. Mess serves fresh veg food daily.", amenities:["WiFi","Mess","Hot Water","CCTV","Study Room","Power Backup"], owner:{name:"Dinesh Vaghela",phone:"+91 91730 66606",initials:"D"}, roommates:[{name:"Sumit Rana",college:"VNSGU",sem:"4th",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:17, name:"Royal Adajan PG", area:"Adajan", rent:9500, type:"AC", capacity:2, wifi:true, mess:true, isVeg:false, img:"https://i.ibb.co/qLqmmsjv/12.webp", lat:21.1945, lng:72.8005, address:"12B, Royal Gardens, Adajan, Surat - 395009", desc:"Royal living experience with modern AC rooms and non-veg mess option.", amenities:["WiFi","AC","Mess","Hot Water","Laundry","CCTV","Power Backup"], owner:{name:"Chirag Dave",phone:"+91 98790 77707",initials:"C"}, roommates:[{name:"Jay Mehta",college:"VNSGU",sem:"2nd",city:"Bharuch",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:18, name:"Adajan Girls Hostel", area:"Adajan", rent:8000, type:"AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/vCdBdSXV/13.png", lat:21.1960, lng:72.7970, address:"Near Adajan Circle, Opp. Garden, Surat - 395009", desc:"Premium girls hostel with 24/7 security, biometric entry and homely veg mess.", amenities:["WiFi","AC","Mess","Hot Water","CCTV","Power Backup","Housekeeping","Study Room"], owner:{name:"Hema Trivedi",phone:"+91 94270 88808",initials:"H"}, roommates:[{name:"Pooja Singh",college:"VNSGU",sem:"6th",city:"Navsari",gender:"Female"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:19, name:"Budget Stay Adajan", area:"Adajan", rent:5000, type:"Non-AC", capacity:3, wifi:false, mess:true, isVeg:true, img:"https://i.ibb.co/R4Zhm97F/14.jpg", lat:21.1915, lng:72.7985, address:"Street 4, Swami Narayan Colony, Adajan, Surat - 395009", desc:"Most affordable PG in Adajan with basic but clean rooms and daily tiffin.", amenities:["Mess","Hot Water","CCTV"], owner:{name:"Bhiku Patel",phone:"+91 87990 99909",initials:"B"}, roommates:[{name:"Tejas Patel",college:"VNSGU",sem:"1st",city:"Surat",gender:"Male"},{name:"Mitul Shah",college:"VNSGU",sem:"1st",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:20, name:"Luxury Adajan Suite", area:"Adajan", rent:16000, type:"AC", capacity:1, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/H8fXWs6/15.webp", lat:21.1935, lng:72.8015, address:"Level 8, Skyview Tower, Adajan, Surat - 395009", desc:"Penthouse-level private PG suite with panoramic city view, gym and gourmet mess.", amenities:["WiFi","AC","Mess","Housekeeping","Hot Water","Laundry","CCTV","Power Backup","Gym","Terrace","Parking"], owner:{name:"Vivek Agarwal",phone:"+91 95588 10010",initials:"V"}, roommates:[] },
    { id:46, name:"Adajan View Tower PG", area:"Adajan", rent:8800, type:"AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/Nvqhy3w/16.jpg", lat:21.1925, lng:72.7998, address:"View Tower, Adajan, Surat - 395009", desc:"High-floor AC rooms with city views. 10 min walk to VNSGU.", amenities:["WiFi","AC","Mess","Hot Water","CCTV","Power Backup","Laundry"], owner:{name:"Hitesh Jain",phone:"+91 98257 26726",initials:"H"}, roommates:[{name:"Kapil Verma",college:"VNSGU",sem:"4th",city:"Rajasthan",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:47, name:"Adajan Eco Stay", area:"Adajan", rent:6800, type:"Non-AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/4Zd600v1/17.avif", lat:21.1952, lng:72.7975, address:"Eco Park Colony, Adajan, Surat - 395009", desc:"Eco-friendly PG with garden, solar hot water and organic vegetarian food.", amenities:["WiFi","Mess","Hot Water","CCTV","Power Backup","Parking"], owner:{name:"Manisha Ben",phone:"+91 91737 27827",initials:"M"}, roommates:[{name:"Kavya Patel",college:"VNSGU",sem:"5th",city:"Surat",gender:"Female"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:48, name:"Adajan Super Budget", area:"Adajan", rent:4200, type:"Non-AC", capacity:4, wifi:false, mess:true, isVeg:true, img:"https://i.ibb.co/Sb1P8w1/18.jpg", lat:21.1908, lng:72.7980, address:"Near Adajan Bus Stop, Surat - 395009", desc:"Super affordable 4-sharing PG with veg mess. Best for first-year students.", amenities:["Mess","Hot Water","CCTV"], owner:{name:"Mohan Bhai",phone:"+91 94260 28928",initials:"M"}, roommates:[{name:"Jigar Patel",college:"VNSGU",sem:"1st",city:"Surat",gender:"Male"},{name:"Het Shah",college:"VNSGU",sem:"1st",city:"Anand",gender:"Male"},{name:"Dev Mehta",college:"VNSGU",sem:"1st",city:"Vadodara",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },

    // ── PIPLOD (5 PGs) ──
    { id:21, name:"Piplod Scholar PG", area:"Piplod", rent:9000, type:"AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/Y4m742Fy/19.webp", lat:21.1710, lng:72.7820, address:"Scholar Society, Piplod, Surat - 395007", desc:"Designed for serious students. Quiet environment, study lounge and fast WiFi.", amenities:["WiFi","AC","Mess","Hot Water","CCTV","Study Room","Power Backup"], owner:{name:"Naresh Lad",phone:"+91 98791 11111",initials:"N"}, roommates:[{name:"Dhruv Shah",college:"SVNIT",sem:"6th",city:"Vadodara",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:22, name:"Green Park PG Piplod", area:"Piplod", rent:12500, type:"AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/qTq8ffJ/20.png", lat:21.1725, lng:72.7810, address:"Green Park Row House, Piplod Main Rd, Surat - 395007", desc:"Row house PG with garden access, premium AC rooms and organic vegetarian food.", amenities:["WiFi","AC","Mess","Hot Water","Laundry","CCTV","Power Backup","Parking"], owner:{name:"Alka Desai",phone:"+91 99254 22222",initials:"A"}, roommates:[{name:"Preet Patel",college:"SVNIT",sem:"4th",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:23, name:"Piplod Ladies Nest", area:"Piplod", rent:10000, type:"AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/SwpYJLtH/21.avif", lat:21.1695, lng:72.7835, address:"Nest Society, Piplod, Surat - 395007", desc:"Exclusive ladies PG in calm Piplod locality. Mother-cooked meals daily.", amenities:["WiFi","AC","Mess","Hot Water","CCTV","Power Backup","Housekeeping"], owner:{name:"Kavita Mehta",phone:"+91 70161 33333",initials:"K"}, roommates:[{name:"Isha Trivedi",college:"SVNIT",sem:"3rd",city:"Anand",gender:"Female"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:49, name:"Piplod Business PG", area:"Piplod", rent:14000, type:"AC", capacity:1, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/gbGjcwmp/22.avif", lat:21.1705, lng:72.7825, address:"Business Hub, Piplod, Surat - 395007", desc:"Executive single room PG for MBA and final year students. Premium in every way.", amenities:["WiFi","AC","Mess","Housekeeping","Hot Water","Laundry","CCTV","Power Backup","Gym","Parking"], owner:{name:"Ashwin Kapoor",phone:"+91 99254 29029",initials:"A"}, roommates:[] },

    // ── ATHWA (2 PGs) ──
    { id:24, name:"Athwa Classic PG", area:"Athwa", rent:7500, type:"Non-AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/Q7LM50Z2/23.avif", lat:21.1780, lng:72.8100, address:"Classic Society, Athwa Lines, Surat - 395001", desc:"Heritage area PG with modern amenities. Near VNSGU and city centre.", amenities:["WiFi","Mess","Hot Water","CCTV","Study Room","Power Backup"], owner:{name:"Jayantibhai Vyas",phone:"+91 98255 44444",initials:"J"}, roommates:[{name:"Mihir Solanki",college:"VNSGU",sem:"5th",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:25, name:"Athwa Premium Stay", area:"Athwa", rent:11500, type:"AC", capacity:1, wifi:true, mess:true, isVeg:false, img:"https://i.ibb.co/hRT4hFP7/24.jpg", lat:21.1795, lng:72.8085, address:"Premium Plaza, Athwa Gate, Surat - 395001", desc:"Single occupancy AC rooms with attached bathroom. Non-veg mess available.", amenities:["WiFi","AC","Mess","Hot Water","Laundry","CCTV","Power Backup","Parking"], owner:{name:"Rakesh Nair",phone:"+91 91738 55555",initials:"R"}, roommates:[] },

    // ── BHATAR (2 PGs) ──
    { id:26, name:"Bhatar Boys PG", area:"Bhatar", rent:6500, type:"Non-AC", capacity:3, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/G3fC4kPG/25.png", lat:21.1650, lng:72.7900, address:"Bhatar Road, Nr. Bhatar Circle, Surat - 395007", desc:"Budget triple sharing PG in Bhatar. 5 min auto to SVNIT.", amenities:["WiFi","Mess","Hot Water","CCTV","Power Backup"], owner:{name:"Mahendra Bhai",phone:"+91 94265 66606",initials:"M"}, roommates:[{name:"Raj Solanki",college:"SVNIT",sem:"2nd",city:"Rajkot",gender:"Male"},{name:"Om Patel",college:"SVNIT",sem:"2nd",city:"Jamnagar",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:27, name:"Bhatar AC Comfort", area:"Bhatar", rent:9800, type:"AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/Q7vGx6wm/26.webp", lat:21.1635, lng:72.7915, address:"Comfort Residency, Bhatar, Surat - 395007", desc:"New AC PG near SVNIT with clean rooms, WiFi and tiffin service.", amenities:["WiFi","AC","Mess","Hot Water","CCTV","Power Backup","Laundry"], owner:{name:"Sanjay Patel",phone:"+91 99786 77707",initials:"S"}, roommates:[{name:"Aakash Bhatt",college:"SVNIT",sem:"6th",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },

    // ── ALTHAN (2 PGs) ──
    { id:28, name:"Althan Student Villa", area:"Althan", rent:8000, type:"AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/Lzs0JT96/27.avif", lat:21.1560, lng:72.7850, address:"Villa 5, Althan Tenament, Surat - 395017", desc:"Modern villa-style PG near SVNIT Althan gate. Clean, quiet and safe.", amenities:["WiFi","AC","Mess","Hot Water","CCTV","Power Backup","Study Room"], owner:{name:"Falguni Shah",phone:"+91 98240 88808",initials:"F"}, roommates:[{name:"Jainil Mehta",college:"SVNIT",sem:"4th",city:"Bharuch",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:53, name:"Althan Girls PG", area:"Althan", rent:8500, type:"AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/B5rGYPtn/28.jpg", lat:21.1555, lng:72.7845, address:"Girls Colony, Althan, Surat - 395017", desc:"Safe girls PG in Althan with biometric entry, CCTV and healthy meals.", amenities:["WiFi","AC","Mess","Hot Water","CCTV","Power Backup","Housekeeping"], owner:{name:"Urmila Ben",phone:"+91 94275 33433",initials:"U"}, roommates:[{name:"Priya Mehta",college:"SVNIT",sem:"4th",city:"Vadodara",gender:"Female"},{name:"",college:"",sem:"",city:"",gender:""}] },

    // ── PAL (1 PG) ──
    { id:29, name:"Pal Residency PG", area:"Pal", rent:7200, type:"Non-AC", capacity:2, wifi:true, mess:false, isVeg:true, img:"https://i.ibb.co/zhQgfPRy/29.jpg", lat:21.1420, lng:72.8050, address:"Pal Gam, Nr. D-Mart, Surat - 395009", desc:"Quiet Pal locality PG with WiFi. Self-cooking kitchen available.", amenities:["WiFi","Kitchen","Hot Water","CCTV","Power Backup","Parking"], owner:{name:"Kantilal Patel",phone:"+91 86909 99909",initials:"K"}, roommates:[{name:"Viren Joshi",college:"UTU",sem:"3rd",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },

    // ── VARACHHA (1 PG) ──
    { id:30, name:"Varachha Affordable PG", area:"Varachha", rent:4000, type:"Non-AC", capacity:4, wifi:false, mess:true, isVeg:true, img:"https://i.ibb.co/gbK0ZQj9/30.jpg", lat:21.2100, lng:72.8650, address:"Kosad Road, Varachha, Surat - 395006", desc:"Most economical PG in Surat. Ideal for students on tight budget.", amenities:["Mess","Hot Water","CCTV"], owner:{name:"Raju Bhai",phone:"+91 99743 10101",initials:"R"}, roommates:[{name:"Sagar Patel",college:"UTU",sem:"1st",city:"Navsari",gender:"Male"},{name:"Kiran Desai",college:"UTU",sem:"1st",city:"Valsad",gender:"Male"},{name:"Nikhil Shah",college:"UTU",sem:"1st",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },

    // ── KATARGAM (1 PG) ──
    { id:31, name:"Katargam Smart PG", area:"Katargam", rent:5500, type:"Non-AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/gM9kMLKL/31.jpg", lat:21.2350, lng:72.8500, address:"Ring Road, Katargam, Surat - 395004", desc:"Affordable PG near Katargam with home-style food and WiFi.", amenities:["WiFi","Mess","Hot Water","CCTV","Power Backup"], owner:{name:"Dilip Bhai",phone:"+91 99791 11211",initials:"D"}, roommates:[{name:"Raj Shah",college:"UTU",sem:"2nd",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },

    // ── BARDOLI (7 PGs) ──
    { id:33, name:"Bardoli Classic Stay", area:"Bardoli", rent:4200, type:"Non-AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/Jjr8gcrh/32.avif", lat:21.1215, lng:73.1095, address:"Classic Society, Bardoli - 394601", desc:"Clean and comfortable PG near Bardoli College with daily veg tiffin.", amenities:["WiFi","Mess","Hot Water","CCTV","Study Room"], owner:{name:"Kishan Bhai",phone:"+91 98256 13413",initials:"K"}, roommates:[{name:"Rohan Patel",college:"Bardoli Engineering College",sem:"2nd",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:34, name:"Engineering Boys Hostel", area:"Bardoli", rent:3500, type:"Non-AC", capacity:4, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/sJc8sVNN/33.jpg", lat:21.1225, lng:73.1110, address:"Nr. Bardoli Engg. College Gate, Bardoli - 394601", desc:"Hostel-style PG just outside engineering college gate. Most popular among freshers.", amenities:["WiFi","Mess","Hot Water","CCTV","Study Room","Power Backup"], owner:{name:"College Hostel",phone:"+91 94266 14514",initials:"C"}, roommates:[{name:"Dev Patel",college:"Bardoli Engineering College",sem:"1st",city:"Tapi",gender:"Male"},{name:"Nilesh Vasava",college:"Bardoli Engineering College",sem:"1st",city:"Bharuch",gender:"Male"},{name:"Pratik Gamit",college:"Bardoli Engineering College",sem:"1st",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:35, name:"Bardoli Premium AC", area:"Bardoli", rent:7000, type:"AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/K7ZDhJb/34.jpg", lat:21.1205, lng:73.1085, address:"Premium Nagar, Bardoli - 394601", desc:"Only premium AC PG in Bardoli. Ideal for final year students wanting comfort.", amenities:["WiFi","AC","Mess","Hot Water","Laundry","CCTV","Power Backup"], owner:{name:"Bhavesh Shah",phone:"+91 91730 15615",initials:"B"}, roommates:[{name:"Saumil Desai",college:"Bardoli University",sem:"6th",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:36, name:"Bardoli Girls Hostel", area:"Bardoli", rent:4800, type:"Non-AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/pv8jZjw0/35.webp", lat:21.1185, lng:73.1075, address:"Mahila Colony, Bardoli - 394601", desc:"Safe girls hostel in Bardoli with warden, CCTV and homely food.", amenities:["WiFi","Mess","Hot Water","CCTV","Power Backup","Study Room"], owner:{name:"Lata Ben",phone:"+91 99254 16716",initials:"L"}, roommates:[{name:"Krupa Patel",college:"Bardoli University",sem:"3rd",city:"Navsari",gender:"Female"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:37, name:"Station Road PG Bardoli", area:"Bardoli", rent:3800, type:"Non-AC", capacity:3, wifi:false, mess:true, isVeg:true, img:"https://i.ibb.co/6kxy9fg/36.webp", lat:21.1198, lng:73.1115, address:"Station Road, Bardoli - 394601", desc:"Walking distance from Bardoli station. Budget triple sharing with fresh tiffin.", amenities:["Mess","Hot Water","CCTV"], owner:{name:"Harish Patel",phone:"+91 98255 17817",initials:"H"}, roommates:[{name:"Tejas Vasava",college:"Bardoli Engineering College",sem:"2nd",city:"Vyara",gender:"Male"},{name:"Aman Gamit",college:"Bardoli Engineering College",sem:"2nd",city:"Tapi",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:38, name:"Bardoli Smart Hostel", area:"Bardoli", rent:5500, type:"Non-AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/4gtYk6WN/37.webp", lat:21.1210, lng:73.1125, address:"Smart Colony, Nr. Bardoli Bus Stand, Bardoli - 394601", desc:"Modern hostel near Bardoli bus stand. Good connectivity and clean rooms.", amenities:["WiFi","Mess","Hot Water","CCTV","Power Backup","Study Room","Laundry"], owner:{name:"Chirag Patel",phone:"+91 90990 18918",initials:"C"}, roommates:[{name:"Neel Shah",college:"Bardoli University",sem:"4th",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:51, name:"Bardoli Station Road PG", area:"Bardoli", rent:4000, type:"Non-AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/SwhRBVYj/38.webp", lat:21.1195, lng:73.1130, address:"Station Road, Bardoli - 394601", desc:"Near railway station for easy travel home. Clean rooms, fresh food.", amenities:["WiFi","Mess","Hot Water","CCTV"], owner:{name:"Nanu Bhai",phone:"+91 94261 31231",initials:"N"}, roommates:[{name:"Yash Rathod",college:"Bardoli Engineering College",sem:"3rd",city:"Surat",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },

    // ── PALSANA (3 PGs) ──
    { id:39, name:"Palsana Comfort PG", area:"Palsana", rent:4500, type:"Non-AC", capacity:2, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/3mWDVLbg/39.webp", lat:21.0775, lng:72.9630, address:"Comfort Lane, Palsana - 394315", desc:"Comfortable PG near ITI Palsana with home-cooked food.", amenities:["WiFi","Mess","Hot Water","CCTV","Study Room"], owner:{name:"Ishwar Bhai",phone:"+91 87900 19019",initials:"I"}, roommates:[{name:"Sagar Vasava",college:"ITI Palsana",sem:"2nd",city:"Navsari",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:40, name:"Palsana Budget Stay", area:"Palsana", rent:3500, type:"Non-AC", capacity:3, wifi:false, mess:true, isVeg:true, img:"https://i.ibb.co/ZRhVXHQC/40.avif", lat:21.0785, lng:72.9650, address:"Main Bazar, Palsana - 394315", desc:"Cheapest PG in Palsana. Clean rooms and daily veg tiffin service.", amenities:["Mess","Hot Water","CCTV"], owner:{name:"Ramu Kaka",phone:"+91 94261 20120",initials:"R"}, roommates:[{name:"Dipak Gamit",college:"ITI Palsana",sem:"1st",city:"Tapi",gender:"Male"},{name:"Suresh Baria",college:"ITI Palsana",sem:"1st",city:"Bharuch",gender:"Male"},{name:"",college:"",sem:"",city:"",gender:""}] },
    { id:41, name:"Palsana AC Premium", area:"Palsana", rent:7500, type:"AC", capacity:1, wifi:true, mess:true, isVeg:true, img:"https://i.ibb.co/W4k4z2tN/41.webp", lat:21.0790, lng:72.9645, address:"Premium Park, Palsana Town - 394315", desc:"Only premium AC PG in Palsana with attached bathroom and 24/7 hot water.", amenities:["WiFi","AC","Mess","Hot Water","CCTV","Power Backup","Laundry"], owner:{name:"Pravin Patel",phone:"+91 99786 21221",initials:"P"}, roommates:[] }
];

// Combine all PGs
const allPGs = pgData.concat(extraPGs);

// ==========================================
// PG OWNER PORTAL
// ==========================================




// ==========================================
// AI COLLEGE COMMUTE PLANNER
// ==========================================

var AI_FUNCTION_URL = "/api/ai";

// ── Haversine: real distance in km between two coords ──
function getDistKm(lat1, lng1, lat2, lng2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLng = (lng2 - lng1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

var collegeAreaMap = {
    "SVNIT Surat":                 { lat: 21.1588, lng: 72.7944 },
    "UTU Surat":                   { lat: 21.1463, lng: 72.7852 },
    "VNSGU Surat":                 { lat: 21.1961, lng: 72.7892 },
    "GLS University":              { lat: 21.1900, lng: 72.7800 },
    "Bardoli Engineering College": { lat: 21.1220, lng: 73.1100 },
    "Bardoli University":          { lat: 21.1190, lng: 73.1080 },
    "ITI Palsana":                 { lat: 21.0780, lng: 72.9640 },
    "Other":                       { lat: 21.1703, lng: 72.8311 }
};

var aiState = { college:"", budget:10000, sharing:0, priorities:["commute","budget","amenities","safety","food"], pills:[], travel:"", extraNote:"" };

function openAIPlanner() { openModal("aiPlannerModal"); goStep(1); }

function goStep(n) {
    if (n===2 && !validateStep1()) return;
    [1,2,3,4].forEach(function(i) {
        var el=document.getElementById("aiStep"+i), dot=document.getElementById("stepDot"+i);
        if(el)  el.style.display=(i===n)?"block":"none";
        if(dot){ dot.className="ai-step"; if(i<n) dot.className+=" done"; if(i===n) dot.className+=" active"; }
    });
}
function validateStep1() {
    var c=document.getElementById("aiCollege")?document.getElementById("aiCollege").value:"";
    if(!c){ showToast("Please select your college"); return false; }
    if(!aiState.sharing){ showToast("Please pick room sharing option"); return false; }
    aiState.college=c; aiState.budget=parseInt(document.getElementById("aiBudget").value); return true;
}
function selectShare(n) { aiState.sharing=n; [1,2,3,4].forEach(function(i){ var el=document.getElementById("shareOpt"+i); if(el) el.className="ai-option-card"+(i===n?" selected":""); }); }
function selectTravel(mode) {
    aiState.travel=mode;
    var m={walk:"travelOpt1",bike:"travelOpt2",bus:"travelOpt3"};
    ["travelOpt1","travelOpt2","travelOpt3"].forEach(function(id){ var el=document.getElementById(id); if(el) el.className="ai-option-card"; });
    var s=document.getElementById(m[mode]); if(s) s.className="ai-option-card selected";
}
function togglePill(key) {
    var el=document.getElementById("pill-"+key); if(!el) return;
    var idx=aiState.pills.indexOf(key);
    if(idx>-1){ aiState.pills.splice(idx,1); el.className="ai-pill"; } else { aiState.pills.push(key); el.className="ai-pill selected"; }
}
(function(){
    var ds=null;
    document.addEventListener("dragstart",function(e){ var it=e.target.closest?e.target.closest(".priority-item"):null; if(!it) return; ds=it; setTimeout(function(){it.classList.add("dragging");},0); });
    document.addEventListener("dragend",function(){ document.querySelectorAll(".priority-item").forEach(function(el){el.classList.remove("dragging","drag-over");}); updatePriorityRanks(); });
    document.addEventListener("dragover",function(e){ e.preventDefault(); var it=e.target.closest?e.target.closest(".priority-item"):null; if(!it||it===ds) return; document.querySelectorAll(".priority-item").forEach(function(el){el.classList.remove("drag-over");}); it.classList.add("drag-over"); var list=document.getElementById("priorityList"); if(!list||!ds) return; var items=Array.from(list.querySelectorAll(".priority-item")); if(items.indexOf(ds)<items.indexOf(it)) list.insertBefore(ds,it.nextSibling); else list.insertBefore(ds,it); });
    document.addEventListener("drop",function(e){e.preventDefault();});
})();
function updatePriorityRanks() { var list=document.getElementById("priorityList"); if(!list) return; aiState.priorities=[]; list.querySelectorAll(".priority-item").forEach(function(item,i){ var v=item.getAttribute("data-val"); aiState.priorities.push(v); var r=document.getElementById("rank-"+v); if(r) r.innerText=i+1; }); }
function scorePG(pg, ci, travelMode) {
    var s = 0, w = {};
    aiState.priorities.forEach(function(p, i) { w[p] = 5 - i; });

    // ── Live distance from selected college to this PG ──
    var distKm = (pg.lat && pg.lng)
        ? getDistKm(ci.lat, ci.lng, pg.lat, pg.lng)
        : 999;

    // ── Commute score based on real distance ──
    var commuteScore;
    if      (distKm <= 1)  commuteScore = 20;   // walking
    else if (distKm <= 5)  commuteScore = 12;   // bike
    else if (distKm <= 10) commuteScore = 5;    // bus
    else                   commuteScore = 0;    // too far - excluded

    s += commuteScore * (w.commute || 3);

    // Bonus for matching chosen travel mode exactly
    if (travelMode === 'walk' && distKm <= 1)  s += 30;
    if (travelMode === 'bike' && distKm <= 5)  s += 20;
    if (travelMode === 'bus'  && distKm <= 10) s += 10;

    // ── Budget ──
    if (pg.rent > aiState.budget) {
        s -= 80;
    } else {
        s += Math.min(10, 5 + ((aiState.budget - pg.rent) / aiState.budget) * 5) * (w.budget || 3);
    }

    // ── Amenities ──
    var a = 0;
    if (pg.wifi) a += 2;
    if (pg.type === 'AC') a += 2;
    if (pg.mess) a += 2;
    if (pg.amenities) {
        if (pg.amenities.includes('Laundry'))      a++;
        if (pg.amenities.includes('Gym'))          a++;
        if (pg.amenities.includes('Power Backup')) a++;
        if (pg.amenities.includes('CCTV'))         a++;
    }
    s += Math.min(10, a) * (w.amenities || 3);

    // ── Safety ──
    var sf = 0;
    if (pg.amenities) {
        if (pg.amenities.includes('CCTV'))         sf += 4;
        if (pg.amenities.includes('Power Backup')) sf += 3;
        if (pg.amenities.includes('Parking'))      sf += 2;
    }
    s += Math.min(10, sf) * (w.safety || 3);

    // ── Food ──
    var f = pg.mess ? 10 : 3;
    if (pg.isVeg && aiState.pills.includes('veg')) f = 10;
    s += f * (w.food || 3);

    // ── Must-have deductions ──
    if (aiState.pills.includes('wifi')    && !pg.wifi)                                           s -= 40;
    if (aiState.pills.includes('ac')      && pg.type !== 'AC')                                   s -= 35;
    if (aiState.pills.includes('mess')    && !pg.mess)                                           s -= 35;
    if (aiState.pills.includes('veg')     && !pg.isVeg)                                          s -= 60;
    if (aiState.pills.includes('laundry') && pg.amenities && !pg.amenities.includes('Laundry'))  s -= 20;
    if (aiState.pills.includes('gym')     && pg.amenities && !pg.amenities.includes('Gym'))      s -= 15;
    if (aiState.pills.includes('parking') && pg.amenities && !pg.amenities.includes('Parking'))  s -= 15;
    if (aiState.sharing && aiState.sharing !== 4 && pg.capacity !== aiState.sharing)             s -= 25;

    return Math.max(0, s);
}
async function runAIAnalysis() {
    updatePriorityRanks();
    aiState.extraNote=(document.getElementById("aiExtraNote")&&document.getElementById("aiExtraNote").value)||"";
    goStep(4);
    var msgs=["Analyzing your priorities...","Calculating commute distances...","Scoring "+allPGs.length+" PGs...","Ranking by your preferences...","Almost ready..."];
    var mi=0,li=setInterval(function(){ mi=(mi+1)%msgs.length; var el=document.getElementById("aiLoadingText"); if(el) el.innerText=msgs[mi]; },900);
    var ci = collegeAreaMap[aiState.college] || collegeAreaMap['Other'];
    var travelMode = aiState.travel || 'bus';

    // Distance limit based on travel mode chosen by user
    var maxKm = (travelMode === 'walk') ? 1 : (travelMode === 'bike') ? 5 : 10;

    // Filter allPGs: only those within maxKm of the SELECTED college
    var poolPGs = allPGs.filter(function(pg) {
        if (!pg.lat || !pg.lng) return false;
        var d = getDistKm(ci.lat, ci.lng, pg.lat, pg.lng);
        return d <= maxKm;
    });

    // If too few PGs in chosen mode, expand distance limit
    if (poolPGs.length < 4 && maxKm < 5) {
        maxKm = 5;
        poolPGs = allPGs.filter(function(pg) {
            return pg.lat && pg.lng && getDistKm(ci.lat, ci.lng, pg.lat, pg.lng) <= maxKm;
        });
    }
    if (poolPGs.length < 4 && maxKm < 10) {
        maxKm = 10;
        poolPGs = allPGs.filter(function(pg) {
            return pg.lat && pg.lng && getDistKm(ci.lat, ci.lng, pg.lat, pg.lng) <= maxKm;
        });
    }

    // Score each PG by distance from selected college + user preferences
    var scored = poolPGs.map(function(pg) {
        return { pg: pg, score: scorePG(pg, ci, travelMode) };
    });
    scored.sort(function(a, b) { return b.score - a.score; });
    var top = scored.slice(0, 4), mx = top[0] ? top[0].score : 1;
    var pn={commute:"Short Commute",budget:"Low Budget",amenities:"Best Amenities",safety:"Safety & Security",food:"Food / Mess"};
    var pt=aiState.priorities.map(function(p,i){return (i+1)+". "+(pn[p]||p);}).join(", ");
    var prompt="You are a helpful AI assistant for SmartFinder, a student PG finder in Surat, Gujarat. Student: College="+aiState.college+", Budget=Rs."+aiState.budget.toLocaleString()+", Sharing="+(aiState.sharing===4?"Any":aiState.sharing+"p")+", Priorities="+pt+", Must-have="+(aiState.pills.join(", ")||"none")+", Travel="+(aiState.travel||"any")+". Top "+top.length+" PGs from "+allPGs.length+" total: "+top.map(function(it,i){var p=it.pg;return (i+1)+"."+p.name+"("+p.area+") Rs."+p.rent+(p.wifi?" WiFi":"")+(p.mess?" Mess":"")+" "+Math.round((it.score/mx)*100)+"% match";}).join(",")+". Write warm 3 sentences: why these PGs match, commute tip, budget tip. No bullets.";
    try {
        var r=await fetch(AI_FUNCTION_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:prompt})});
        if(!r.ok) throw new Error(r.status);
        var d=await r.json(); clearInterval(li);
        showAIResults(top,mx,d.result||"Great! Found the best PGs for your needs.");
    } catch(err) {
        clearInterval(li);
        showAIResults(top,mx,"Based on your college and budget, we found the best PGs in "+ci.areas[0]+". Click any card to see full details, map and owner contact!");
    }
}
function showAIResults(top,mx,txt) {
    var l=document.getElementById("aiLoadingState"),r=document.getElementById("aiResultState");
    if(l) l.style.display="none"; if(r) r.style.display="block";
    var s=document.getElementById("aiResultSubtitle"); var modeLabel = travelMode==='walk' ? 'walking (≤1km)' : travelMode==='bike' ? 'by bike (≤5km)' : 'by bus (≤10km)';
    if(s) s.innerText = 'Showing ' + top.length + ' PGs near ' + aiState.college + ' reachable ' + modeLabel;
    var a=document.getElementById("aiAnalysisText"); if(a) a.innerText=txt;
    var c=document.getElementById("aiMatchedPGs"); if(!c) return;
    var medals=["#1","#2","#3","#4"],html="";
    top.forEach(function(item,i) {
        var pg=item.pg,pct=Math.round((item.score/mx)*100),split=Math.round(pg.rent/pg.capacity),tags=[];
        if(pg.type==="AC")tags.push("AC"); if(pg.wifi)tags.push("WiFi"); if(pg.mess)tags.push("Mess"); if(pg.isVeg)tags.push("Veg");
        html+='<div class="ai-pg-result-card" data-pgid="'+pg.id+'">';
        html+='<img src="'+pg.img+'" style="width:68px;height:68px;border-radius:12px;object-fit:cover;flex-shrink:0;">';
        html+='<div style="flex:1;min-width:0;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><span style="font-size:14px;font-weight:800;color:#CEDC00;">'+medals[i]+'</span><span style="font-family:Syne,sans-serif;font-weight:800;font-size:13px;color:#CEDC00;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+pg.name+'</span></div>';
        html+='<div style="font-size:11px;color:rgba(255,255,255,0.45);margin-bottom:4px;">'+pg.area+' &middot; &#8377;'+pg.rent.toLocaleString()+'/mo &middot; &#8377;'+split.toLocaleString()+'/person</div>';
        html+='<div style="font-size:10px;color:rgba(255,255,255,0.35);margin-bottom:8px;">'+tags.join(' &middot; ')+'</div>';
        html+='<div style="display:flex;align-items:center;gap:8px;"><div style="flex:1;background:rgba(255,255,255,0.08);border-radius:999px;height:5px;overflow:hidden;"><div style="height:100%;width:'+pct+'%;background:linear-gradient(to right,#CEDC00,#a8b800);border-radius:999px;"></div></div><span style="font-size:9px;font-weight:800;color:#CEDC00;background:rgba(206,220,0,0.12);border:1px solid rgba(206,220,0,0.25);padding:2px 8px;border-radius:20px;">'+pct+'% match</span></div>';
        html+='</div><div style="font-size:11px;color:rgba(255,255,255,0.25);flex-shrink:0;">&rarr;</div></div>';
    });
    c.innerHTML=html;
    c.querySelectorAll(".ai-pg-result-card").forEach(function(card) {
        card.addEventListener("click",function(){ var id=parseInt(this.getAttribute("data-pgid")); closeModal("aiPlannerModal"); openPGDetail(id); });
        card.addEventListener("mouseover",function(){this.style.borderColor="#CEDC00"; this.style.transform="translateX(4px)";});
        card.addEventListener("mouseout",function(){this.style.borderColor="rgba(206,220,0,0.18)"; this.style.transform="none";});
    });
}
function resetAI() {
    aiState={college:"",budget:10000,sharing:0,priorities:["commute","budget","amenities","safety","food"],pills:[],travel:"",extraNote:""};
    var l=document.getElementById("aiLoadingState"),r=document.getElementById("aiResultState");
    if(l) l.style.display="block"; if(r) r.style.display="none";
    var m=document.getElementById("aiMatchedPGs"); if(m) m.innerHTML="";
}