/* Portfolio — Jean-Paul van Staden */
(function () {
    'use strict';

    /* ===== MOBILE MENU ===== */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        const setMenu = (open) => {
            navMenu.classList.toggle('active', open);
            hamburger.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', String(open));
            hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        };

        hamburger.addEventListener('click', () => {
            setMenu(!navMenu.classList.contains('active'));
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMenu(false));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setMenu(false);
        });
    }

    /* ===== ACTIVE NAV LINK ON SCROLL =====
       Only in-page anchors participate; the résumé button is skipped. */
    const anchorLinks = Array.from(
        document.querySelectorAll('.nav-link[href^="#"]')
    );
    const sections = anchorLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (sections.length) {
        const spy = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    anchorLinks.forEach((link) => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === '#' + entry.target.id
                        );
                    });
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );
        sections.forEach((section) => spy.observe(section));
    }

    /* ===== REVEAL ON SCROLL =====
       Opt in only if the visitor hasn't asked for reduced motion, so content
       is never hidden from someone whose reveal would never fire. */
    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    const revealTargets = document.querySelectorAll(
        '.project-card, .skill-category, .timeline-item, .cred-block, .contact-link'
    );

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        revealTargets.forEach((el) => el.classList.add('reveal'));

        const reveal = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        reveal.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
        );
        revealTargets.forEach((el) => reveal.observe(el));
    }
})();
