import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import { getLatestProducts, getCategoryGroups } from "@/services/productService";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "D-HAIRS | Flawless Hair, Every Day",
  description:
    "Premium 100% human hair lace front wigs, bundles, and closures. Undetectable, luxurious, delivered to you.",
};

// ─── Fallback slides (shown only when the shop has 0 products) ──────────────
const FALLBACK_SLIDES = [
  {
    imageUrl:
      "https://res.cloudinary.com/dla8ojffk/image/upload/f_auto,q_auto,w_1600/v1771610577/u4uals0pxpwrq9bbuvvy.jpg",
    eyebrow: "New Collection 2025",
    headingMain: "Flawless Hair,",
    headingItalic: "Every Day.",
    sub: "Premium 100% human hair lace front wigs — undetectable, luxurious, delivered to you.",
    primaryLabel: "Shop Collection",
    primaryHref: "/shop",
    secondaryLabel: "View All Products",
    secondaryHref: "/shop",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dla8ojffk/image/upload/f_auto,q_auto,w_1600/v1771610493/wplpqcaf8k4yiee0wtpu.jpg",
    eyebrow: "Premium Bundles",
    headingMain: "Silky Smooth",
    headingItalic: "Brazilian Hair.",
    sub: "Grade 12A virgin hair bundles — tangle-free, shed-free, and endlessly lustrous.",
    primaryLabel: "Shop Bundles",
    primaryHref: "/shop",
    secondaryLabel: "See All Textures",
    secondaryHref: "/shop",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1564141696939-9eb6e957ccfc?w=1600&auto=format&fit=crop&q=75&fm=webp",
    eyebrow: "HD Lace Frontals",
    headingMain: "Undetectable",
    headingItalic: "Natural Look.",
    sub: "Pre-plucked hairline, bleached knots, HD lace — ready to wear in minutes.",
    primaryLabel: "Shop Wigs",
    primaryHref: "/shop",
    secondaryLabel: "Learn More",
    secondaryHref: "/shop",
  },
];

const EYEBROWS = ["New Collection 2025", "Premium Bundles", "HD Lace Frontals"];

function formatPrice(price) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

/** Map a real product from the DB to the slide shape expected by HeroSlider */
function productToSlide(product, index) {
  const words = product.name.trim().split(" ");
  const half = Math.ceil(words.length / 2);
  const headingMain = words.slice(0, half).join(" ");
  const headingItalic =
    words.slice(half).join(" ") || formatPrice(product.price);

  return {
    imageUrl: product.imageUrl,
    eyebrow: EYEBROWS[index % EYEBROWS.length],
    headingMain,
    headingItalic,
    sub: product.description,
    primaryLabel: "Shop Now",
    primaryHref: `/product/${product.id}`,
    secondaryLabel: "View All Products",
    secondaryHref: "/shop",
  };
}

export default async function HomePage() {
  // Fetch latest 3 products and category groups in parallel
  const [latest, categoryGroups] = await Promise.all([
    getLatestProducts(3),
    getCategoryGroups(),
  ]);

  // Build hero slides — fill any gap with fallback slides
  const productSlides = latest.map(productToSlide);
  const heroSlides =
    productSlides.length > 0
      ? [
        ...productSlides,
        ...FALLBACK_SLIDES.slice(productSlides.length), // pad to 3 if needed
      ].slice(0, 3)
      : FALLBACK_SLIDES;

  // Up to 5 category cards from DB (most-stocked first)
  const displayCategories = categoryGroups.slice(0, 5);

  return (
    <div className="landing-page">
      {/* ── Announcement bar ─────────────────────────── */}
      <div className="lp-bar">
        <strong>✦ FREE SHIPPING</strong> on orders over ₦300,000 &nbsp;·&nbsp;{" "}
        
      </div>

      {/* ── Hero Slider (live products) ───────────────── */}
      <HeroSlider slides={heroSlides} />

      {/* ── Marquee ──────────────────────────────────── */}
      <div className="lp-marquee" aria-hidden="true">
        <div className="lp-mtrack">
          {[
            "Lace Front Wigs",
            "Brazilian Bundles",
            "HD Lace Closures",
            "Colored Wigs",
            "100% Virgin Hair",
            "Grade 12A Quality",
            "Free Shipping ₦50K+",
            "Lace Front Wigs",
            "Brazilian Bundles",
            "HD Lace Closures",
            "Colored Wigs",
            "100% Virgin Hair",
            "Grade 12A Quality",
            "Free Shipping ₦50K+",
          ].map((item, i) => (
            <span key={i} className="lp-mitem">
              {item} <em>✦</em>
            </span>
          ))}
        </div>
      </div>

      {/* ── Trust Features ───────────────────────────── */}
      <div className="lp-features">
        <div className="lp-feat">
          <div className="lp-feat-icon">🚚</div>
          <div>
            <strong>Free Shipping</strong>
            <span>All orders over ₦50,000</span>
          </div>
        </div>
        <div className="lp-feat">
          <div className="lp-feat-icon">💎</div>
          <div>
            <strong>Grade 12A Hair</strong>
            <span>100% virgin, unprocessed</span>
          </div>
        </div>
        <div className="lp-feat">
          <div className="lp-feat-icon">🔄</div>
          <div>
            <strong>30-Day Returns</strong>
            <span>Hassle-free guarantee</span>
          </div>
        </div>
        <div className="lp-feat">
          <div className="lp-feat-icon">🔒</div>
          <div>
            <strong>Secure Checkout</strong>
            <span>SSL encrypted payments</span>
          </div>
        </div>
      </div>

      {/* ── Collections (live from DB) ────────────────── */}
      {displayCategories.length > 0 && (
        <section className="lp-cats lp-reveal">
          <div className="lp-sec-head">
            <div className="lp-sec-ey">
              <span>Browse by Collection</span>
            </div>
            <h2 className="lp-sec-title">
              Shop <em>Our Collections</em>
            </h2>
          </div>
          <div className="lp-cat-grid">
            {displayCategories.map((cat, i) => (
              <Link
                key={cat.category}
                href={`/shop?category=${encodeURIComponent(cat.category)}`}
                className="lp-cat-card"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="lp-cat-bg"
                  style={{
                    backgroundImage: `url('${cat.imageUrl}')`,
                    backgroundPosition: "center 20%",
                  }}
                />
                <div className="lp-cat-ov" />
                <div className="lp-cat-info">
                  <span className="lp-cat-lbl">
                    {i === 0 ? "Most Popular" : i === 1 ? "Best Seller" : "Collection"}
                  </span>
                  <div className="lp-cat-name">{cat.category}</div>
                  <div className="lp-cat-cnt">{cat.count} Product{cat.count !== 1 ? "s" : ""}</div>
                </div>
                <div className="lp-cat-arr">→</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── About / Why D-HAIRS ──────────────────────── */}
      <section className="lp-about">
        <div className="lp-about-vis">
          <div
            className="lp-about-vis-photo"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dla8ojffk/image/upload/f_auto,q_auto,w_900/v1771610577/u4uals0pxpwrq9bbuvvy.jpg')",
              backgroundPosition: "center 20%",
            }}
          />
          <div className="lp-about-vis-badge">
            <strong>5K+</strong>
            <span>Happy Clients</span>
          </div>
        </div>
        <div className="lp-about-txt lp-reveal">
          <div className="lp-sec-ey">
            <span>Why D-HAIRS</span>
          </div>
          <h2 className="lp-sec-title">
            Quality You Can <em>Feel &amp; Trust</em>
          </h2>
          <p className="lp-about-p">
            Every strand we sell is ethically sourced, rigorously inspected,
            and guaranteed to exceed your expectations. Transforming looks and
            building confidence since 2018.
          </p>
          <div className="lp-checks">
            {[
              "100% Remy human hair — zero synthetic blends",
              "HD & transparent lace for an undetectable finish",
              "Pre-plucked hairlines, bleached knots — ready to wear",
              "Dyeable, heat-safe up to 450°F",
            ].map((item, i) => (
              <div key={i} className="lp-chk">
                <div className="lp-chk-ic">✓</div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────── */}
      <section className="lp-testis">
        <div className="lp-sec-head lp-reveal">
          <div className="lp-sec-ey">
            <span>Real Reviews</span>
          </div>
          <h2 className="lp-sec-title">
            What Our <em>Clients Say</em>
          </h2>
        </div>
        <div className="lp-tgrid">
          {[
            {
              quote:
                '"The lace is literally undetectable. My stylist didn\'t even believe it was a wig. This is my third order and I\'m obsessed every single time."',
              avatar: "👩🏾",
              name: "Aaliyah M.",
              verified: 'Verified · Body Wave Wig 26"',
              delay: "lp-d1",
            },
            {
              quote:
                '"Ordered bundles for the first time and I\'m blown away. Zero shedding, zero tangles. Ships fast, packaging is beautiful. Will never buy hair anywhere else!"',
              avatar: "👩🏽",
              name: "Destiny R.",
              verified: "Verified · Brazilian Bundle Deal",
              delay: "lp-d2",
            },
            {
              quote:
                '"The colored wig is absolutely gorgeous. So natural-looking and incredibly soft. Customer service was amazing. 10/10!"',
              avatar: "👩🏻",
              name: "Jasmine T.",
              verified: "Verified · Ombre Loose Wave Wig",
              delay: "lp-d3",
            },
          ].map((t, i) => (
            <div key={i} className={`lp-tcard lp-reveal ${t.delay}`}>
              <div className="lp-tstars">★★★★★</div>
              <p className="lp-tquote">{t.quote}</p>
              <div className="lp-tauthor">
                <div className="lp-tavatar">{t.avatar}</div>
                <div>
                  <div className="lp-tname">{t.name}</div>
                  <div className="lp-tverified">{t.verified}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────── */}
      <div className="lp-cta lp-reveal">
        <div className="lp-cta-txt">
          
          
          <p className="lp-cta-sub">
            Premium hair delivered straight to your door. Free express shipping
            on orders over ₦300,000.
          </p>
          <div className="lp-cta-code">
            
          </div>
          <Link href="/shop" className="lp-btn-main">
            
          </Link>
        </div>
        <div className="lp-cta-side">
          <div className="lp-cta-circle">
            <div className="lp-cta-pct">5%</div>
            <div className="lp-cta-off">OFF</div>
          </div>
        </div>
      </div>
    </div>
  );
}
