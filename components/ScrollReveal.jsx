"use client";

import { useEffect } from "react";

/**
 * Wires up the IntersectionObserver for lp-reveal scroll animations.
 * Rendered once in the root layout so it covers every page.
 */
export default function ScrollReveal() {
    useEffect(() => {
        const ro = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("in");
                        ro.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.08 }
        );

        const observe = () => {
            document.querySelectorAll(".lp-reveal").forEach((el) => ro.observe(el));
        };

        // Observe immediately, then re-scan on route changes (Next.js soft nav)
        observe();

        return () => ro.disconnect();
    }, []);

    return null;
}
