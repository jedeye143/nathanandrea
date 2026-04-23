window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const burst = document.getElementById('radiant-burst');

    // Music and Reveal trigger on any click
    const startJourney = () => {
        if (burst) burst.style.opacity = '1';
        
        // Trigger music immediately on user gesture
        if (typeof playMusic === 'function') {
            playMusic();
        }

        setTimeout(() => {
            if (mainContent) mainContent.style.opacity = '1';
            if (loader) loader.style.opacity = '0';
            
            setTimeout(() => {
                if (loader) loader.style.display = 'none';
            }, 1500);
        }, 1000);
        
        // Clean up listeners
        window.removeEventListener('click', startJourney);
        window.removeEventListener('touchstart', startJourney);
    };

    if (loader) {
        window.addEventListener('click', startJourney);
        window.addEventListener('touchstart', startJourney);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // 1. Custom Cursor Logic
    const cursor = document.getElementById('custom-cursor');
    const outline = document.getElementById('custom-cursor-outline');

    if (cursor) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursor.style.transform = `translate(${posX}px, ${posY}px)`;
            
            if (outline) {
                outline.animate({
                    transform: `translate(${posX - 12}px, ${posY - 12}px)`
                }, { duration: 600, fill: "forwards" });
            }
        });

        // Cursor hover effects
        const links = document.querySelectorAll('a, button, input, .guest-name');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform += ' scale(4)';
                if (outline) outline.style.borderColor = 'white';
            });
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = cursor.style.transform.replace(' scale(4)', '');
                if (outline) outline.style.borderColor = '#D4AF37';
            });
        });
    }

    // 2. Countdown Logic
    const targetDate = new Date('May 16, 2026 09:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        if (document.getElementById('days')) {
            document.getElementById('days').innerText = d.toString().padStart(2, '0');
            document.getElementById('hours').innerText = h.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Section Reveal on Scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // 6. Romantic Enhancements (Petals & Hearts)
    function createPetal() {
        const petal = document.createElement('div');
        const icons = ['❀', '♥', '❤', '✿'];
        const colors = ['#D4AF37', '#7e468f', '#a07cbd', '#b57ebe', '#EAB308'];
        
        petal.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.color = colors[Math.floor(Math.random() * colors.length)];
        petal.style.animationDuration = (Math.random() * 10 + 10) + 's';
        petal.style.fontSize = (Math.random() * 20 + 10) + 'px';
        petal.style.opacity = (Math.random() * 0.5 + 0.3).toString();
        
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 20000);
    }
    setInterval(createPetal, 2000);

    function createSparkle(container) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
    }

    const hero = document.getElementById('hero');
    if (hero) {
        setInterval(() => createSparkle(hero), 500);
    }

    // 7. Parallax for Background Shapes & Floral Items
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Parallax for Background Shapes
        const shapes = document.querySelectorAll('.line-frame, [class*="bg-"][class*="blur-3xl"]');
        shapes.forEach(shape => {
            const speed = 0.05;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Dynamic Image Grayscale on Scroll (ONLY ON INDEX PAGE)
        if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
            const allImages = document.querySelectorAll('img:not(#story img, #gallery img, #attire img, .interactive-img)');
            allImages.forEach(img => {
                if (scrolled > 200) {
                    img.classList.add('grayscale-scroll');
                } else {
                    img.classList.remove('grayscale-scroll');
                }
            });
        }
    });

    // 8. Guest Search Logic
    const guestSearch = document.getElementById('guest-search');
    const guestSections = document.getElementById('guest-sections');
    const guests = guestSections ? guestSections.querySelectorAll('.guest-name') : [];

    if (guestSearch) {
        guestSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            guests.forEach(guest => {
                const name = guest.textContent.toLowerCase();
                if (name.includes(term)) {
                    guest.style.display = 'block';
                    guest.style.opacity = '1';
                } else {
                    guest.style.display = 'none';
                    guest.style.opacity = '0';
                }
            });
        });
    }

    // 9. Music Player & Playlist Logic
    const musicBtn = document.getElementById('music-toggle');
    const music = document.getElementById('bg-music');
    let isPlaying = false;

    const playlist = [
        "songs/Arbor North - You, Me, and Jesus (Official Lyric Video).mp3",
        "songs/John Waller - The Marriage Prayer lyrics.mp3",
        "songs/The Blessing with Kari Jobe & Cody Carnes _ Live From Elevation Ballantyne _ Elevation Worship.mp3"
    ];
    let currentSongIndex = parseInt(sessionStorage.getItem('music_index')) || 0;

    // Initialize immediately
    if (music) {
        music.src = playlist[currentSongIndex];
        music.load();
        
        // Restore time if exists
        const savedTime = parseFloat(sessionStorage.getItem('music_time'));
        if (savedTime) {
            music.currentTime = savedTime;
        }

        music.onerror = () => {
            console.error("Audio Load Error on: " + music.src);
            playNext();
        };

        // Continually save time for persistence
        music.addEventListener('timeupdate', () => {
            sessionStorage.setItem('music_time', music.currentTime);
            sessionStorage.setItem('music_index', currentSongIndex);
        });
    }

    const playMusic = () => {
        if (!music) return;
        music.play().then(() => {
            isPlaying = true;
            sessionStorage.setItem('music_playing', 'true');
            if (musicBtn) {
                musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                musicBtn.classList.add('animate-pulse');
            }
        }).catch(e => {
            console.warn("Playback waiting for interaction...");
            // Keep state as 'true' so it resumes on first gesture
            sessionStorage.setItem('music_playing', 'true');
        });
    };

    const pauseMusic = () => {
        if (!music) return;
        music.pause();
        isPlaying = false;
        sessionStorage.setItem('music_playing', 'false');
        if (musicBtn) {
            musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
            musicBtn.classList.remove('animate-pulse');
        }
    };

    const playNext = () => {
        if (!music) return;
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        music.src = playlist[currentSongIndex];
        music.load();
        playMusic();
    };

    // Global reveal trigger for auto-resume
    window.resumeMusic = () => {
        const wasPlaying = sessionStorage.getItem('music_playing') !== 'false'; // Default to true for first load
        if (wasPlaying) {
            playMusic();
        }
    };

    if (musicBtn && music) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isPlaying) pauseMusic();
            else playMusic();
        });

        const startOnInteraction = () => {
            if (!isPlaying) playMusic();
            document.removeEventListener('click', startOnInteraction);
            document.removeEventListener('scroll', startOnInteraction);
            document.removeEventListener('touchstart', startOnInteraction);
            document.removeEventListener('mousemove', startOnInteraction);
            document.removeEventListener('keydown', startOnInteraction);
        };

        // Aggressive interaction triggers to satisfy browser autoplay policies
        document.addEventListener('click', startOnInteraction);
        document.addEventListener('scroll', startOnInteraction);
        document.addEventListener('touchstart', startOnInteraction);
        document.addEventListener('mousemove', startOnInteraction);
        document.addEventListener('keydown', startOnInteraction);

        // Make the loader itself a trigger area
        const loader = document.getElementById('loader');
        if (loader) {
            loader.addEventListener('click', startOnInteraction);
        }

        music.addEventListener('ended', playNext);
    }

    // 10. Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        const closeBtn = document.getElementById('close-menu');

        const toggleMenu = (forceClose = false) => {
            if (forceClose) {
                mobileMenu.classList.remove('active');
            } else {
                mobileMenu.classList.toggle('active');
            }
            
            const isActive = mobileMenu.classList.contains('active');
            if (isActive) {
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                mobileMenuBtn.classList.remove('text-[#3B0764]');
                mobileMenuBtn.classList.add('text-white');
            } else {
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
                mobileMenuBtn.classList.remove('text-white');
                mobileMenuBtn.classList.add('text-[#3B0764]');
            }
        };

        mobileMenuBtn.addEventListener('click', () => toggleMenu());
        if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(true));

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });
    }

});
