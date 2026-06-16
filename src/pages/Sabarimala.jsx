import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bus, Smartphone, Home, MapPin, ArrowRight, Phone } from 'lucide-react';
import './Sabarimala.css';

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } }
};

const services = [
  { icon: <Bus size={28} />, title: "Transport from Pathanamthitta", desc: "Premium San-Travel vehicles from the gateways of Pathanamthitta to Pamba. Fully air-conditioned with spiritual-ready interiors." },
  { icon: <Smartphone size={28} />, title: "Virtual Queue Support", desc: "Seamless registration assistance for the official Sabarimala Virtual Queue system. Our team handles all digital paperwork." },
  { icon: <Home size={28} />, title: "Pilgrim Stays", desc: "Hand-picked, hygienic, and peaceful accommodations in Pathanamthitta and Pamba for rest before the sacred trek." },
  { icon: <MapPin size={28} />, title: "Custom Planning", desc: "Itineraries tailored to your group size and physical requirements. Localized knowledge on the best Darshan timings." },
];

const steps = [
  { num: "01", title: "Arrival & Pathanamthitta Prep", desc: "Arrival at Pathanamthitta. Meet your personal specialist for orientation and collection of ritual items. Overnight stay in curated luxury pilgrim suites." },
  { num: "02", title: "Journey to Pamba & The Trek", desc: "Private transit to Pamba. Assisted entry into the trekking path. Dedicated support points along the sacred forest route for elderly or first-time pilgrims." },
  { num: "03", title: "Darshan & Return Transit", desc: "Early morning Darshan at Sannidhanam. Descent back to Pamba where our vehicle awaits to transport you back for the departure journey." },
];

const Sabarimala = () => {
  const [form, setForm] = useState({ name: '', phone: '', date: '', count: '', notes: '' });
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 1;
    
    const handleTimeUpdate = () => {
      if (video.currentTime >= 4) {
        video.pause();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Sabarimala Pilgrimage Inquiry\nName: ${form.name}\nPhone: ${form.phone}\nTravel Date: ${form.date}\nPilgrim Count: ${form.count}\nNotes: ${form.notes}`;
    window.open(`https://wa.me/919074885337?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="sb-page">
      {/* Hero */}
      <section className="sb-hero">
        <motion.div
          className="sb-hero-video-wrapper"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
        >
          <video
            ref={videoRef}
            className="sb-hero-video"
            autoPlay
            muted
            playsInline
            poster="/images/packages/sabarimala-main.jpg"
          >
            <source src="/videos/Sabarimala_pilgrimage_animation_…_202606151528.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="sb-hero-overlay" />
        <div className="container sb-hero-content">
          <motion.div
            initial="hidden" animate="visible" variants={stagger}
            className="sb-hero-text"
          >
            <motion.span variants={fadeIn} className="sb-label">SABARIMALA SPECIALIZED LOGISTICS</motion.span>
            <motion.h1 variants={fadeIn} className="sb-title">
              The Sacred Path,<br />Perfectly Planned.
            </motion.h1>
            <motion.p variants={fadeIn} className="sb-subtitle">
              Experience the divine sanctity of Sabarimala with the personal accountability of Pathanamthitta experts. We handle the logistics; you focus on the prayer.
            </motion.p>
            <motion.div variants={fadeIn} className="sb-hero-actions">
              <button className="sb-btn-primary" onClick={() => document.getElementById('sb-inquiry').scrollIntoView({ behavior: 'smooth' })}>
                Plan My Pilgrimage <ArrowRight size={16} />
              </button>
              <a href="tel:+919074885337" className="sb-btn-outline">
                <Phone size={16} /> Speak to an Expert
              </a>
            </motion.div>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <motion.div
          className="sb-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="sb-scroll-line" />
        </motion.div>
      </section>

      {/* Sacred Services */}
      <section className="sb-services section-padding">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="sb-services-header"
          >
            <motion.span variants={fadeIn} className="sb-label dark">OUR OFFERINGS</motion.span>
            <motion.h2 variants={fadeIn} className="sb-heading">Sacred Services</motion.h2>
            <motion.p variants={fadeIn} className="sb-services-lead">
              Every detail of your pilgrimage is handled with devotion and precision by our locally rooted team.
            </motion.p>
          </motion.div>

          <motion.div
            className="sb-services-grid"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {services.map((s, i) => (
              <motion.div key={i} className={`sb-service-card ${i === 3 ? 'sb-service-card--accent' : ''}`} variants={fadeIn}>
                <div className="sb-service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pilgrimage Flow + Form */}
      <section className="sb-flow section-padding">
        <div className="container sb-flow-layout">

          {/* Steps Timeline */}
          <motion.div
            className="sb-timeline"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.span variants={fadeIn} className="sb-label">THE JOURNEY</motion.span>
            <motion.h2 variants={fadeIn} className="sb-heading">The Pilgrimage Flow</motion.h2>
            <motion.p variants={fadeIn} className="sb-timeline-lead">
              From your doorstep to Sannidhanam — a seamless, supported, sacred journey.
            </motion.p>

            {steps.map((step, i) => (
              <motion.div key={i} className="sb-step" variants={fadeIn}>
                <div className="sb-step-num">{step.num}</div>
                <div className="sb-step-body">
                  {i < steps.length - 1 && <div className="sb-step-connector" />}
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Inquiry Form */}
          <motion.div
            id="sb-inquiry"
            className="sb-form-card"
            initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="sb-label dark">FREE CONSULTATION</span>
            <h3>Request a Custom Plan</h3>
            <p>Fill out the details below, and our specialist will contact you within 2 hours with a personalized proposal.</p>

            <form onSubmit={handleSubmit}>
              <div className="sb-form-field">
                <label>YOUR NAME</label>
                <input type="text" placeholder="e.g. Rahul Sharma" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              </div>
              <div className="sb-form-field">
                <label>CONTACT NUMBER</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
              </div>
              <div className="sb-form-row">
                <div className="sb-form-field">
                  <label>TRAVEL DATE</label>
                  <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                </div>
                <div className="sb-form-field">
                  <label>PILGRIM COUNT</label>
                  <input type="number" placeholder="e.g. 4" min={1} value={form.count} onChange={e => setForm({...form, count: e.target.value})} />
                </div>
              </div>
              <div className="sb-form-field">
                <label>SPECIAL REQUIREMENTS</label>
                <textarea rows={3} placeholder="Elderly assistance, dietary needs, accessibility..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
              </div>
              <button type="submit" className="sb-submit-btn">
                Send Inquiry via WhatsApp <ArrowRight size={16} />
              </button>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Sabarimala;
