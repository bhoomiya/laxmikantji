document.addEventListener('DOMContentLoaded', () => {
    // Initialize Icons
    lucide.createIcons();

    // Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = scrollPercentage + '%';
        });
    }

    // Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        // Initial check on load
        const triggerReveal = () => {
            reveals.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const elementVisible = 100;
                if (elementTop < window.innerHeight - elementVisible) {
                    el.classList.add('active');
                }
            });
        };

        setTimeout(() => {
            // Force activate first few if they are in viewport or just start animations
            triggerReveal();
        }, 100);

        window.addEventListener('scroll', triggerReveal);
    }

    // Magnetic Buttons
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0, 0)');
    });

    // --- Page Specific Logic ---

    // Home Page - Typewriter & Carousel
    const typeTarget = document.querySelector('.typewriter-text');
    if (typeTarget) {
        const phrases = ["Concept to Consumer", "C2C Agribusiness Strategy", "Sustainable Innovation", "Global Seed Technology"];
        let phraseIndex = 0, charIndex = 0, isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            typeTarget.textContent = isDeleting ? currentPhrase.substring(0, charIndex - 1) : currentPhrase.substring(0, charIndex + 1);
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            let typeSpeed = isDeleting ? 30 : 80;
            if (!isDeleting && charIndex === currentPhrase.length) { typeSpeed = 2000; isDeleting = true; }
            else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; typeSpeed = 500; }
            setTimeout(type, typeSpeed);
        }
        type();

        // Carousel
        const slides = document.querySelectorAll('.carousel-fade');
        let currentSlide = 0;
        if (slides.length > 0) {
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 5000);
        }
    }

    // Insights Page - Blog Modal
    const blogModal = document.getElementById('blog-modal');
    if (blogModal) {
        const blogBody = document.getElementById('blog-body');
        const blogContent = {
            'hybrid-seeds': `
                <span class="text-amber-600 font-bold uppercase text-xs tracking-wider">Technology / Seeds</span>
                <h2 class="text-3xl md:text-4xl font-heading font-bold text-sage-900 mt-2 mb-6">The Future of Hybrid Seeds in India</h2>
                <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200" class="w-full h-64 object-cover rounded-xl mb-8">
                <p class="text-lg text-stone-700 leading-relaxed mb-6">Hybrid seeds have revolutionized agriculture by offering higher yields, better uniformity, and disease resistance.</p>
                <h3 class="text-2xl font-bold text-sage-800 mb-4">Climate Resilience</h3>
                <p class="text-stone-600 mb-6">The next frontier is climate resilience. Developing germplasm that can withstand heat stress, salinity, and water scarcity is paramount.</p>
            `,
            'supply-chain': `
                 <span class="text-amber-600 font-bold uppercase text-xs tracking-wider">Strategy / Operations</span>
                <h2 class="text-3xl md:text-4xl font-heading font-bold text-sage-900 mt-2 mb-6">Supply Chain Resilience</h2>
                <img src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=1200" class="w-full h-64 object-cover rounded-xl mb-8">
                <p class="text-lg text-stone-700 leading-relaxed mb-6">The journey from seed to spoon is fraught with inefficiencies.</p>
            `,
            'organic-farming': `
                <span class="text-amber-600 font-bold uppercase text-xs tracking-wider">Sustainability / Environment</span>
                <h2 class="text-3xl md:text-4xl font-heading font-bold text-sage-900 mt-2 mb-6">Scaling Organic Farming</h2>
                <img src="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=1200" class="w-full h-64 object-cover rounded-xl mb-8">
                <p class="text-lg text-stone-700 leading-relaxed mb-6">Consumers globally are shifting towards chemical-free produce.</p>
            `
        };

        window.openBlog = function (id) {
            if (blogContent[id]) {
                blogBody.innerHTML = blogContent[id];
                blogModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeBlog = function () {
            blogModal.classList.remove('open');
            document.body.style.overflow = 'auto';
        };

        blogModal.addEventListener('click', (e) => {
            if (e.target === blogModal) window.closeBlog();
        });
    }
});
