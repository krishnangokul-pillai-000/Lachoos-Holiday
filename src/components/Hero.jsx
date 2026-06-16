import React, { useState } from 'react';
import { MapPin, Calendar, Users, ArrowRight, Search, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './Hero.css';

const heroImg = "/images/packages/lachoos-home-cover.png";

const titleLines = [
  ['Where', 'every', 'turn'],
  ['leads', 'to', 'a'],
  ['different', 'shade', 'of', 'green'],
];

const marqueeWords = [
  'Heritage',
  'Spice Trails',
  'Pilgrimage',
  'Ayurveda',
  'Wildlife',
  'Cuisine',
  'Backwaters',
  'Hill Stations',
];

const marqueeLoop = [...marqueeWords, ...marqueeWords];

const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i = 0) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 1.05,
      delay: 0.35 + i * 0.09,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('3 - 5 Days');
  const [travelers, setTravelers] = useState('2 Adults');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const locations = [
    'Alleppey Backwaters', 'Munnar Tea Estates', 'Wayanad Wilderness',
    'Kochi Heritage', 'Thekkady Wildlife', 'Sabarimala Pilgrimage',
    'Athirappilly Waterfalls', 'Varkala Beach', 'Kumarakom'
  ];

  const filteredLocations = locations.filter(loc =>
    loc.toLowerCase().includes(destination.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const message = `Hello! I want to plan a trip to ${destination || 'Kerala'}.\nDuration: ${duration}\nTravelers: ${travelers}\nCan you provide more details?`;
    window.open(`https://wa.me/919074885337?text=${encodeURIComponent(message)}`, '_blank');
  };

  let wordIndex = 0;

  return (
    <section className="hero-section">
      {/* Scroll progress hairline */}
      <motion.div className="hero-progress" style={{ scaleX: progress }} />

      <motion.div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroImg})` }}
        initial={{ scale: 1, x: '-1.5%' }}
        animate={{ scale: 1, x: '0%' }}
        transition={{ duration: 18, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="hero-vignette" />
      <div className="hero-overlay" />

      <div className="hero-content">
        {/* Eyebrow */}
        <motion.div
          className="hero-eyebrow-wrap"
          custom={0} initial="hidden" animate="visible" variants={fadeUp}
        >
          <span className="hero-eyebrow-rule" />
          <span className="hero-eyebrow">GOD'S OWN COUNTRY · KERALA, INDIA</span>
          <span className="hero-eyebrow-rule" />
        </motion.div>

        {/* Title — word-by-word reveal */}
        <h1 className="hero-title" aria-label="Where every turn leads to a different shade of green">
          {titleLines.map((line, li) => (
            <span key={li} className="hero-title-line">
              {line.map((word) => {
                const i = wordIndex++;
                return (
                  <span key={`${li}-${i}`} className="hero-title-word">
                    <motion.span
                      className="hero-title-word-inner"
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={wordVariants}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.p
          className="hero-kicker"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Experience God&rsquo;s Own Country
        </motion.p>

        {/* Subtitle */}
        <motion.p
          className="hero-subtitle"
          custom={3} initial="hidden" animate="visible" variants={fadeUp}
        >
          Experience Kerala with personalized luxury — from the backwaters to the high ranges, curated by local experts.
        </motion.p>

        {/* Search — frosted glass (rounded shell, Stitch-inspired) */}
        <motion.div
          className="hero-search-shell"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <form onSubmit={handleSearch} className="search-bar">
            <span className="search-bar-rule" aria-hidden="true" />

            <div className="search-field relative">
              <MapPin className="search-icon" size={18} />
              <div className="search-text">
                <span className="search-label">DESTINATION</span>
                <input
                  type="text" placeholder="Where to?"
                  className="search-input"
                  value={destination}
                  onChange={(e) => { setDestination(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {showSuggestions && destination && filteredLocations.length > 0 && (
                  <ul className="suggestions-list">
                    {filteredLocations.map((loc, i) => (
                      <li key={i} onClick={() => { setDestination(loc); setShowSuggestions(false); }}>{loc}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="search-field">
              <Calendar className="search-icon" size={18} />
              <div className="search-text">
                <span className="search-label">DURATION</span>
                <select className="search-select" value={duration} onChange={(e) => setDuration(e.target.value)}>
                  <option>2 - 3 Days</option>
                  <option>3 - 5 Days</option>
                  <option>5 - 7 Days</option>
                  <option>7+ Days</option>
                </select>
              </div>
            </div>

            <div className="search-field">
              <Users className="search-icon" size={18} />
              <div className="search-text">
                <span className="search-label">TRAVELERS</span>
                <select className="search-select" value={travelers} onChange={(e) => setTravelers(e.target.value)}>
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>Family (3-5)</option>
                  <option>Group (5+)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="search-btn">
              <Search size={16} className="search-btn-icon" />
              <span>SEARCH<br />PACKAGES</span>
              <ArrowRight size={14} className="search-btn-arrow" />
            </button>
          </form>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="hero-trust"
          custom={5} initial="hidden" animate="visible" variants={fadeUp}
        >
          <div className="trust-item"><span className="trust-num">500+</span><span>Happy Travellers</span></div>
          <div className="trust-divider" />
          <div className="trust-item"><span className="trust-num">10+</span><span>Years in Kerala</span></div>
          <div className="trust-divider" />
          <div className="trust-item"><span className="trust-num">4.9★</span><span>Avg. Rating</span></div>
          <div className="trust-divider" />
          <div className="trust-item trust-verified">
            <ShieldCheck size={14} />
            <span>Verified Local Operator</span>
          </div>
        </motion.div>
      </div>

      {/* Slim experiences marquee — anchored to hero bottom */}
      <div className="hero-marquee" aria-label="Kerala experiences">
        <div className="hero-marquee-track">
          {marqueeLoop.map((word, i) => (
            <span key={`${word}-${i}`} className="hero-marquee-item">
              <span className="hero-marquee-word">{word}</span>
              <span className="hero-marquee-dot" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
