"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const DUR = 10000; // ms per slide

export default function HeroSlider({ slides }) {
    const [cur, setCur] = useState(0);
    const timerRef = useRef(null);
    const total = slides.length;

    const startAuto = useCallback(() => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCur((prev) => (prev + 1) % total);
        }, DUR);
    }, [total]);

    useEffect(() => {
        startAuto();
        return () => clearInterval(timerRef.current);
    }, [startAuto]);

    const handleArrow = (dir) => {
        clearInterval(timerRef.current);
        setCur((prev) => ((prev + dir + total) % total));
        startAuto();
    };

    const overlayClass = (i) => {
        const classes = ["lp-s1", "lp-s2", "lp-s3"];
        return classes[i % classes.length];
    };

    return (
        <div className="lp-hero" id="hero">
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className={`lp-slide ${overlayClass(i)}${cur === i ? " active" : ""}`}
                >
                    <div
                        className="lp-slide-photo"
                        style={{ backgroundImage: `url('${slide.imageUrl}')` }}
                    />
                    <div className="lp-slide-overlay" />
                    <div className="lp-slide-content">
                        <div className="lp-slide-eyebrow">
                            <span>{slide.eyebrow}</span>
                        </div>
                        <h1 className="lp-slide-h1">
                            {slide.headingMain}
                            <em>{slide.headingItalic}</em>
                        </h1>
                        <p className="lp-slide-sub">{slide.sub}</p>
                        <div className="lp-slide-btns">
                            <Link href={slide.primaryHref} className="lp-btn-main">
                                {slide.primaryLabel}
                            </Link>
                            <Link href={slide.secondaryHref} className="lp-btn-outline">
                                {slide.secondaryLabel}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <button
                className="lp-hero-arrow lp-arrow-l"
                onClick={() => handleArrow(-1)}
                aria-label="Previous slide"
            >
                ←
            </button>
            <button
                className="lp-hero-arrow lp-arrow-r"
                onClick={() => handleArrow(1)}
                aria-label="Next slide"
            >
                →
            </button>

            {/* Progress bar — key trick: re-mounts the fill on active change to restart animation */}
            <div className="lp-slide-progress">
                {slides.map((_, i) => (
                    <div key={i} className="lp-prog-seg">
                        <div
                            key={cur === i ? `active-${cur}` : `idle-${i}`}
                            className={`lp-prog-fill${cur === i ? " running" : ""}`}
                        />
                    </div>
                ))}
            </div>

            <div className="lp-slide-counter">
                <strong>{String(cur + 1).padStart(2, "0")}</strong>{" "}
                / {String(total).padStart(2, "0")}
            </div>

            <div className="lp-hero-chip">
                <div style={{ fontSize: "20px" }}>⭐</div>
                <div>
                    <strong>4.9 / 5.0</strong>
                    <span>5,200+ verified reviews</span>
                </div>
            </div>
        </div>
    );
}
