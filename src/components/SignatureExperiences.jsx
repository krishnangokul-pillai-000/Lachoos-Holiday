import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './SignatureExperiences.css';

const experiences = [
  {
    eyebrow: 'BACKWATERS',
    title: 'Kumarakom Houseboats',
    duration: '2 Nights',
    desc: 'A private kettuvallam through palm-lined canals, served at sunset.',
    img: '/images/packages/kumarakom-1.jpg',
  },
  {
    eyebrow: 'HERITAGE',
    title: 'Fort Kochi Walks',
    duration: '1 Day',
    desc: 'Chinese fishing nets, spice warehouses and centuries-old cathedrals.',
    img: '/images/packages/Fort_kochi.jpg',
  },
  {
    eyebrow: 'HIGH RANGE',
    title: 'Munnar Tea Estates',
    duration: '3 Nights',
    desc: 'Mist-wrapped contour roads through emerald plantations at first light.',
    img: '/images/packages/munnarTeaEstate-1.jpg',
  },
  {
    eyebrow: 'SAFARI',
    title: 'Periyar Wildlife',
    duration: '2 Nights',
    desc: 'A silent boat through Thekkady reserve &mdash; gaur, elephants, langur.',
    img: '/images/packages/Thekkady.jpg',
  },
  {
    eyebrow: 'COAST',
    title: 'Cliffs of Varkala',
    duration: '3 Nights',
    desc: 'Red laterite cliffs above the Arabian Sea, framed by coconut palms.',
    img: '/images/packages/varkalacliff.jpg',
  },
  {
    eyebrow: 'RAINFOREST',
    title: 'Gavi Eco Trail',
    duration: '2 Nights',
    desc: 'A jungle camp deep in the cardamom hills of Pathanamthitta.',
    img: '/images/packages/gavi-1.jpg',
  },
];

const SignatureExperiences = () => {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateButtons();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    return () => {
      el.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, []);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.se-card');
    const step = card ? card.getBoundingClientRect().width + 24 : 320;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="se-section">
      <div className="container">
        <motion.div
          className="se-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="se-eyebrow">SIGNATURE EXPERIENCES</span>
            <h2 className="se-title">
              The Kerala<br />
              <em>only locals know.</em>
            </h2>
          </div>
          <div className="se-controls">
            <button
              type="button"
              className="se-arrow"
              aria-label="Previous"
              disabled={!canPrev}
              onClick={() => scrollBy(-1)}
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              className="se-arrow"
              aria-label="Next"
              disabled={!canNext}
              onClick={() => scrollBy(1)}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="container se-track-outer">
        <div className="se-track-wrap">
          <div className="se-track" ref={trackRef}>
            {experiences.map((exp, i) => (
            <motion.article
              key={exp.title}
              className="se-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="se-card-image">
                <img src={exp.img} alt={exp.title} loading="lazy" />
                <div className="se-card-frame" aria-hidden="true" />
                <span className="se-card-duration">{exp.duration}</span>
              </div>
              <div className="se-card-body">
                <span className="se-card-eyebrow">{exp.eyebrow}</span>
                <h3 className="se-card-title">{exp.title}</h3>
                <p
                  className="se-card-desc"
                  dangerouslySetInnerHTML={{ __html: exp.desc }}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default SignatureExperiences;
