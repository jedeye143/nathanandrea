window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const burst = document.getElementById('radiant-burst');
    const enterPrompt = document.getElementById('enter-prompt');
    const enterBtn = document.getElementById('enter-btn');

    // Show the button after the sacred verse animation
    if (enterPrompt) {
        setTimeout(() => {
            enterPrompt.classList.remove('opacity-0', 'scale-90');
            enterPrompt.classList.add('opacity-100', 'scale-100');
        }, 2000); // Show button earlier for better UX
    }

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            // Trigger music immediately on user gesture
            if (typeof playMusic === 'function') {
                playMusic();
            } else {
                const music = document.getElementById('bg-music');
                if (music) music.play().catch(e => console.log("Play deferred"));
            }

            // Start the reveal sequence
            if (burst) burst.style.opacity = '1';
            
            setTimeout(() => {
                if (mainContent) mainContent.style.opacity = '1';
                if (loader) loader.style.opacity = '0';
                
                setTimeout(() => {
                    if (loader) loader.style.display = 'none';
                }, 1500);
            }, 1000); // Peak of the light burst
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // 1. Custom Cursor Logic
    const cursor = document.getElementById('custom-cursor');
    const outline = document.getElementById('custom-cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursor.style.transform = `translate(${posX}px, ${posY}px)`;
        
        outline.animate({
            transform: `translate(${posX - 12}px, ${posY - 12}px)`
        }, { duration: 600, fill: "forwards" });
    });

    // Cursor hover effects
    const links = document.querySelectorAll('a, button, input, .guest-name');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(4)';
            outline.style.borderColor = 'white';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(4)', '');
            outline.style.borderColor = '#D4AF37';
        });
    });

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

    // 6. Romantic Enhancements (Petals & Sparkles)
    function createPetal() {
        const petal = document.createElement('div');
        petal.innerHTML = '❀';
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 10 + 10) + 's';
        petal.style.fontSize = (Math.random() * 20 + 10) + 'px';
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 20000);
    }
    setInterval(createPetal, 3000);

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
            const allImages = document.querySelectorAll('img:not(#story img, #gallery img, .interactive-img)');
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
        "songs/goodness_of_god.mp3",
        "songs/dakilang_katapatan.mp3",
        "songs/10000_reasons.mp3"
    ];
    let currentSongIndex = 0;

    // Initialize immediately
    if (music) {
        music.src = playlist[currentSongIndex];
        music.load();
        
        music.onerror = () => {
            console.error("Audio Load Error on: " + music.src);
            playNext();
        };
    }

    const playMusic = () => {
        if (!music) return;
        music.play().then(() => {
            isPlaying = true;
            if (musicBtn) {
                musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                musicBtn.classList.add('animate-pulse');
            }
        }).catch(e => {
            console.warn("Playback failed:", e);
        });
    };

    const pauseMusic = () => {
        if (!music) return;
        music.pause();
        isPlaying = false;
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
        };

        document.addEventListener('click', startOnInteraction);
        document.addEventListener('scroll', startOnInteraction);
        document.addEventListener('touchstart', startOnInteraction);

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
