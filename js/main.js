document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Treatment Cards - Click/Touch to show WhatsApp CTA
    const treatmentCards = document.querySelectorAll('.treatment-card');

    treatmentCards.forEach(card => {
        const whatsappMsg = card.getAttribute('data-whatsapp');
        const ctaLink = card.querySelector('.treatment-cta');

        if (ctaLink && whatsappMsg) {
            ctaLink.href = `https://api.whatsapp.com/send?phone=41984833490&text=${whatsappMsg}`;
            ctaLink.target = '_blank';
        }

        // Toggle active class on click (for mobile touch)
        card.addEventListener('click', (e) => {
            // Don't toggle if clicking the CTA link itself
            if (e.target.classList.contains('treatment-cta')) return;

            // Close other active cards
            treatmentCards.forEach(other => {
                if (other !== card) other.classList.remove('active');
            });

            card.classList.toggle('active');
        });
    });

    // Video Logic
    const videos = document.querySelectorAll('.video-wrapper');

    videos.forEach(wrapper => {
        wrapper.addEventListener('click', function () {
            // If it's already playing, do nothing
            if (this.querySelector('iframe')) return;

            const videoId = this.getAttribute('data-video-id');
            const iframe = document.createElement('iframe');

            const sourceId = videoId && videoId !== 'VIDEO_ID_1' ? videoId : 'dQw4w9WgXcQ';

            iframe.src = `https://www.youtube.com/embed/${sourceId}?autoplay=1`;
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.title = "Video Player";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.position = "absolute";
            iframe.style.top = "0";
            iframe.style.left = "0";

            this.innerHTML = '';
            this.appendChild(iframe);
        });
    });

    // Animate on Scroll (Simple observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .benefit-item, .video-wrapper').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

});
