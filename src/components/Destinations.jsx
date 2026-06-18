import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import './Destinations.css';

/* Animated counter */
const Counter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = duration / target;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* Mosaic card with parallax image */
const MosaicCard = ({ dest, i }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <motion.div
      ref={ref}
      className={`dest-card dest-card--${dest.size}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="dest-img-wrap">
        <motion.div className="dest-img-parallax" style={{ y }}>
          <img src={dest.img} alt={dest.title} className="dest-img" />
        </motion.div>
        <div className="dest-gradient" />

        <div className="dest-panel">
          <div className="dest-panel-top">
            <span className="dest-chip">{dest.tag}</span>
          </div>
          <div className="dest-panel-bottom">
            <div className="dest-location">
              <MapPin size={13} /> {dest.location}
            </div>
            <p className="dest-card-desc">{dest.desc}</p>
            <Link to="/contact" className="dest-explore-btn">
              Enquire Now <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Caption rendered OUTSIDE the card */}
      <div className="dest-caption">
        <div className="dest-caption-text">
          <span className="dest-caption-num">0{i + 1}</span>
          <h3 className="dest-card-title">{dest.title}</h3>
        </div>
        <Link to="/contact" className="dest-caption-link">
          View <ArrowRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
};

const destinations = [
  {
    title: 'Alleppey Backwaters',
    tag: 'EXPERT VERIFIED',
    desc: 'Drift through time on a private vessel where the only schedule is the setting sun.',
    img: '/images/packages/kumarakom-1.jpg',
    size: 'main',
    location: 'Alappuzha, Kerala'
  },
  {
    title: 'Munnar Tea Estates',
    tag: 'HILL STATION',
    desc: 'Exclusive stays in sprawling emerald hills in the heart of Kerala high ranges.',
    img: '/images/packages/munnarTeaEstate-2.jpg',
    size: 'side',
    location: 'Idukki, Kerala'
  },
  {
    title: 'Wayanad Wilderness',
    tag: 'ECO-LUXURY',
    desc: 'Rediscover silence in curated luxury jungle lodges where nature meets bespoke comfort.',
    img: '/images/packages/wayanad-3.jpg',
    size: 'wide',
    location: 'Wayanad, Kerala'
  },
];

const stats = [
  { num: 500, suffix: '+', label: 'Happy Travellers' },
  { num: 10, suffix: '+', label: 'Years of Experience' },
  { num: 9, suffix: '', label: 'Kerala Destinations' },
  { num: 48, suffix: 'h', label: 'Support Response' },
];

const Destinations = () => (
  <>
    {/* Stats Strip */}
    <section className="stats-strip">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="stat-box"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="stat-number">
              <Counter target={s.num} suffix={s.suffix} />
            </span>
            <span className="stat-rule" />
            <span className="stat-label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Destinations */}
    <section className="dest-section">
      <div className="container">
        <motion.div
          className="dest-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="dest-eyebrow">EXPERT CURATIONS</span>
            <h2 className="dest-title">
              Curated <em>Experiences.</em>
            </h2>
            <p className="dest-sub">
              A handpicked atlas of Kerala&rsquo;s most cinematic landscapes &mdash;
              drifted through, never rushed.
            </p>
          </div>
          <Link to="/contact" className="dest-view-all">
            VIEW ALL DESTINATIONS <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="dest-mosaic">
          {destinations.map((dest, i) => (
            <MosaicCard key={dest.title} dest={dest} i={i} />
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Destinations;
