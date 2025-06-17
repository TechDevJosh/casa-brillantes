import React, { useState, useEffect } from 'react';

// --- SVG Icon Components for a more elegant UI ---
const PoolIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4Z" />
    <path d="M18 16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2h12v2Z" />
    <path d="m7.5 10.5 1.5 1.5 3-3" />
  </svg>
);
const MicIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);
const DumbbellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.4 14.4 9.6 9.6" />
    <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l7.07-7.071a2 2 0 1 1 2.829 2.829z" />
    <path d="m17.24 15.66-3.41-3.41" />
    <path d="m15.83 7.17 3.41 3.41" />
    <path d="M5.343 2.515a2 2 0 1 1 2.829 2.828L1.1 12.414a2 2 0 1 1-2.829-2.829z" />
    <path d="m6.76 9.34 3.41-3.41" />
    <path d="m8.17 16.83-3.41-3.41" />
  </svg>
);
const AirVentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <path d="M6 8h12" />
    <path d="M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-1.31" />
    <path d="M6.6 12.6a2.5 2.5 0 0 0 3.16 3.83 2.53 2.53 0 0 0 1.14-1.31" />
  </svg>
);
const WifiIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" x2="12.01" y1="20" y2="20" />
  </svg>
);
const TvIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
    <polyline points="17 2 12 7 7 2" />
  </svg>
);
const RefrigeratorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" />
    <path d="M5 10h14" />
    <path d="M15 14v-2" />
  </svg>
);
const GrillIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 21h16" />
    <path d="M4 17h16" />
    <path d="M18 4H6l-2 3h16Z" />
    <path d="m18 7-2 4h-8l-2-4" />
    <path d="m16 11-1 3H9l-1-3" />
    <path d="m15 14-1 3h-4l-1-3" />
  </svg>
);

// --- Helper Data & Components ---

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#rates', label: 'Rates' },
  { href: '#contact', label: 'Contact' },
];

const amenitiesList = [
  { icon: <PoolIcon />, name: 'Private Plunge Pool' },
  { icon: <MicIcon />, name: 'Karaoke & Board Games' },
  { icon: <DumbbellIcon />, name: 'Air-Conditioned Gym' },
  { icon: <AirVentIcon />, name: 'Split-Type Aircons' },
  { icon: <WifiIcon />, name: 'High-Speed Internet' },
  { icon: <TvIcon />, name: 'Smart TV & Netflix' },
  { icon: <RefrigeratorIcon />, name: 'Cooktop & Fridge' },
  { icon: <GrillIcon />, name: 'Outdoor BBQ Grill' },
];

const galleryImages = [
  '/Casa Brillantes Night.jpg',
  '/Private Pool In Subic.jpg',
  '/Living Area Interior.jpg',
  '/Mountain View Staycation.jpg',
  '/Cozy Bedroom Retreat.jpg',
  '/Outdoor Barbeque Grill.jpg',
  '/Private Gym Facility.jpg',
  '/Subic Sunset View.jpg',
];

const reviewImages = [
  '/Keane.jpg',
  '/Kamal.jpg',
  '/Maria Clarisse.jpg',
  '/Shammy.jpg',
  '/Georgia.jpg',
];

const promoRates = [
  { pax: 'Up to 5 Guests', price: '5,000', featured: false },
  { pax: 'Up to 10 Guests', price: '9,500', featured: true },
  { pax: 'Up to 15 Guests', price: '13,500', featured: false },
];

const Section = ({ id, title, children, className = '' }) => (
  <section id={id} className={`py-20 md:py-28 ${className}`}>
    <div className="container mx-auto px-6 lg:px-8">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-stone-800 mb-16 font-serif">
        {title}
      </h2>
      {children}
    </div>
  </section>
);

// --- Main App Components ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? 'bg-white/90 shadow-md backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a
            href="#home"
            className={`text-4xl font-fancy transition-colors duration-300 ${
              isScrolled || isOpen ? 'text-stone-800' : 'text-white'
            }`}
          >
            Casa Brillantes
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
                  isScrolled
                    ? 'text-stone-600 hover:text-amber-600'
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className={`hidden md:inline-block bg-amber-500 text-white text-sm font-semibold px-6 py-2 rounded-full hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 shadow-sm`}
          >
            Book Now
          </a>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none ${
                isScrolled || isOpen ? 'text-stone-800' : 'text-white'
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div
            className={`md:hidden bg-white/95 backdrop-blur-sm -mx-6 px-6 pb-4`}
          >
            <nav className="flex flex-col space-y-4 items-center pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-stone-800 hover:text-amber-600 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="w-full text-center bg-amber-500 text-white font-semibold px-6 py-3 mt-2 rounded-full hover:bg-amber-600 transition-colors duration-300"
              >
                Book Now
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const Hero = () => (
  <section
    id="home"
    className="relative h-screen bg-cover bg-center flex items-center justify-start text-white"
    style={{ backgroundImage: "url('/Hero Image.jpg')" }}
  >
    <div className="absolute inset-0 bg-black/40"></div>
    <div className="relative z-10 p-8 md:p-24 max-w-2xl">
      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-serif mb-4 text-shadow-lg text-left"
        style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
      >
        Casa Brillantes: Scenic Staycation Home with Subic Bay Vista
      </h1>
      <p
        className="text-lg md:text-xl text-gray-200 mb-8 text-left"
        style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
      >
        Wake up to inspiring bay views from your private retreat. Perfect for
        families and groups seeking serenity near Subic.
      </p>
      <a
        href="#contact"
        className="bg-amber-500 text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Secure Your Dates Now!
      </a>
    </div>
  </section>
);

const About = () => (
  <Section
    id="about"
    title="Your Ultimate Private Resort in Subic"
    className="bg-stone-50"
  >
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      <div className="lg:w-1/2">
        <img
          src="/Serene Poolside.jpg"
          alt="Poolside of the A-Frame cabin for a staycation in Subic"
          className="rounded-lg shadow-xl w-full h-auto"
        />
      </div>
      <div className="lg:w-1/2 text-lg text-stone-600 space-y-4 leading-relaxed">
        <p>
          Welcome to <strong>Casa Brillantes</strong>, an architecturally
          designed A-Frame Cabin offering an exclusive and serene vacation
          rental. Here, you can relax in your own private plunge pool while
          soaking in breathtaking mountain and sea views.
        </p>
        <p>
          This is the ideal staycation spot in Subic, Zambales. Inside, enjoy
          luxury and comfort with modern, fully-equipped amenities. From karaoke
          for endless fun to an air-conditioned gym for active guests, every
          detail has been thoughtfully curated to ensure an unforgettable stay.
        </p>
        <p className="font-semibold text-stone-700">
          Tag your barkasyonista barkada and create brilliant memories with us!
        </p>
      </div>
    </div>
  </Section>
);

const Amenities = () => (
  <Section id="amenities" title="Luxury, Comfort & Fun">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {amenitiesList.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="text-amber-600 mb-4">{item.icon}</div>
          <h3 className="text-base md:text-lg font-semibold text-stone-700">
            {item.name}
          </h3>
        </div>
      ))}
    </div>
  </Section>
);

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const openModal = (imgSrc) => setSelectedImg(imgSrc);
  const closeModal = () => setSelectedImg(null);

  return (
    <Section id="gallery" title="A Glimpse of Paradise" className="bg-stone-50">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {galleryImages.map((src, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => openModal(src)}
          >
            <img
              src={src}
              alt={`Casa Brillantes Gallery Image ${
                index + 1
              } - Subic Staycation`}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://placehold.co/600x400/CCCCCC/FFFFFF?text=Error';
              }}
            />
          </div>
        ))}
      </div>
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImg}
              alt="Enlarged view of Casa Brillantes property"
              className="rounded-lg shadow-2xl object-contain max-h-[90vh]"
            />
            <button
              onClick={closeModal}
              className="absolute -top-3 -right-3 bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold focus:outline-none hover:bg-gray-200"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </Section>
  );
};

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewImages.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviewImages.length) % reviewImages.length
    );
  };

  return (
    <Section id="reviews" title="What Our Guests Say">
      <div
        className="relative w-full flex items-center justify-center"
        style={{ minHeight: '500px' }}
      >
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
          {reviewImages.map((src, index) => {
            const offset = index - currentIndex;
            const absOffset = Math.abs(offset);

            const scale = absOffset === 0 ? 1 : 0.7;
            const opacity = absOffset > 1 ? 0 : 1;
            const blur = `blur(${absOffset > 0 ? '8px' : '0px'})`;
            const zIndex = reviewImages.length - absOffset;
            const translateX = offset * 40; // Adjust for spacing
            const rotateY = offset * -20; // Adjust for 3D effect

            return (
              <div
                key={src}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: opacity,
                  filter: blur,
                  zIndex: zIndex,
                }}
              >
                <img
                  src={src}
                  alt={`Testimonial from guest ${index + 1}`}
                  className="rounded-xl object-contain"
                  style={{
                    boxShadow:
                      offset === 0
                        ? '0 25px 50px -12px rgb(0 0 0 / 0.4)'
                        : '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    maxHeight: '500px',
                    maxWidth: 'min(450px, 80vw)',
                  }}
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={prevReview}
          className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-4 z-40 bg-white/60 hover:bg-white rounded-full p-3 text-stone-700 shadow-lg transition"
          aria-label="Previous testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={nextReview}
          className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 z-40 bg-white/60 hover:bg-white rounded-full p-3 text-stone-700 shadow-lg transition"
          aria-label="Next testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </Section>
  );
};

const Rates = () => (
  <Section id="rates" title="Special Promo Rates" className="bg-stone-50">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {promoRates.map((rate, index) => (
        <div
          key={index}
          className={`bg-white p-8 rounded-xl shadow-lg text-center flex flex-col items-center border-2 transition-all duration-300 ${
            rate.featured ? 'border-amber-500 scale-105' : 'border-transparent'
          }`}
        >
          {rate.featured && (
            <span className="text-xs font-bold uppercase tracking-widest bg-amber-500 text-white px-3 py-1 rounded-full -mt-12 mb-4">
              Most Popular
            </span>
          )}
          <h3 className="text-xl font-bold text-stone-700 mb-2">{rate.pax}</h3>
          <p className="text-5xl font-extrabold text-stone-800 mb-2">
            ₱{rate.price}
          </p>
          <span className="text-stone-500 mb-6">/ night</span>
          <a
            href="#contact"
            className={`mt-auto w-full font-semibold py-3 px-6 rounded-lg transition-colors duration-300 ${
              rate.featured
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
            }`}
          >
            Book This Rate
          </a>
        </div>
      ))}
    </div>
    <p className="text-center mt-12 text-stone-600">
      Message us for inquiries and to avail these special rates for your Subic
      vacation!
    </p>
  </Section>
);

const Contact = () => {
  return (
    <Section id="contact" title="Location & Booking" className="bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 bg-stone-50 p-8 md:p-12 rounded-xl shadow-sm">
        <div className="lg:w-1/2 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-800 mb-4">
              How To Get There
            </h3>
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                <strong>From Metro Manila:</strong> Take the North Luzon
                Expressway (NLEX) and then connect to the Subic-Clark-Tarlac
                Expressway (SCTEX). Follow signs to Subic Bay Freeport Zone,
                exit at Kalaklan Gate, and head towards the National Highway.
                You'll find us at Subic Bay View Residences in Brgy.
                Calapandayan.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-md border border-gray-200">
            <img
              src="/View Our Location.png"
              alt="Map of Casa Brillantes in Subic, Zambales"
              className="w-full h-full object-cover"
            />
          </div>
          <a
            href="https://maps.app.goo.gl/12Q9xXu3Vb9xdzQj9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center w-full text-center bg-amber-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-amber-600 transition-colors duration-300 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            View on Google Maps
          </a>
          <div className="space-y-4 pt-6 border-t mt-6">
            <div className="flex items-start gap-4">
              <span className="text-amber-600 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <p className="text-stone-700">
                <strong>Lot 10 Block 2, Subic Bay View Residences,</strong>
                <br />
                Brgy. Calapandayan, Subic, Zambales
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-amber-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <a
                href="tel:09455208252"
                className="text-stone-700 hover:text-amber-600"
              >
                09455208252
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-amber-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <a
                href="mailto:casabrillantes@weblitzstack.com"
                className="text-stone-700 hover:text-amber-600"
              >
                casabrillantes@weblitzstack.com
              </a>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <h3 className="text-2xl font-bold text-stone-800 mb-4">
            Send an Inquiry
          </h3>
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-stone-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-stone-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="checkin"
                  className="block text-sm font-medium text-stone-700 mb-1"
                >
                  Check-in
                </label>
                <input
                  type="date"
                  name="checkin"
                  id="checkin"
                  required
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label
                  htmlFor="checkout"
                  className="block text-sm font-medium text-stone-700 mb-1"
                >
                  Check-out
                </label>
                <input
                  type="date"
                  name="checkout"
                  id="checkout"
                  required
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-stone-700 mb-1"
              >
                Number of Guests
              </label>
              <input
                type="number"
                name="guests"
                id="guests"
                min="1"
                required
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-stone-700 mb-1"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                placeholder="Message us for inquiries!"
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-600 transition-colors duration-300 transform hover:scale-105 shadow-lg"
              >
                PM Now for Inquiries
              </button>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
};

const Footer = () => (
  <footer className="bg-stone-800 text-white">
    <div className="container mx-auto px-6 lg:px-8 py-10 text-center">
      <div className="flex justify-center space-x-6 mb-6">
        <a
          href="https://www.facebook.com/profile.php?id=61570112392221"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-400 hover:text-white transition-colors"
          aria-label="Facebook Page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>
        <a
          href="https://www.airbnb.com/rooms/1318249867472874282"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-400 hover:text-white transition-colors"
          aria-label="Airbnb Listing"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            role="img"
          >
            <path d="M12.246 2c-3.34 0-6.44.94-8.89 2.58a10.04 10.04 0 0 0-2.82 8.66c0 3.86 2.13 7.37 5.38 9.27.35.2.7.38 1.06.55.9.43 1.84.77 2.82.98.34.07.68.11 1.02.11s.68-.04 1.02-.11c.98-.21 1.92-.55 2.82-.98.36-.17.71-.35 1.06-.55 3.25-1.9 5.38-5.41 5.38-9.27a10.04 10.04 0 0 0-2.82-8.66C18.68 2.94 15.58 2 12.246 2zm0 2.01c2.08 0 4.09.52 5.75 1.48 2.12 1.23 3.65 3.37 3.65 5.75s-1.53 4.52-3.65 5.75c-1.66.96-3.67 1.48-5.75 1.48s-4.09-.52-5.75-1.48c-2.12-1.23-3.65-3.37-3.65-5.75s1.53-4.52 3.65-5.75c1.66-.96 3.67-1.48 5.75-1.48zm0 2.49c-2.4 0-4.35 1.95-4.35 4.35s1.95 4.35 4.35 4.35 4.35-1.95 4.35-4.35-1.95-4.35-4.35-4.35zm0 1.98a2.37 2.37 0 1 1 0 4.74 2.37 2.37 0 0 1 0-4.74z"></path>
          </svg>
        </a>
      </div>
      <p className="font-serif text-xl mb-2">Casa Brillantes</p>
      <p className="text-stone-400 text-sm">
        &copy; {new Date().getFullYear()} Casa Brillantes. All Rights Reserved.
      </p>
      <p className="text-stone-500 text-xs mt-4">
        Your Private A-Frame Cabin in Subic, Zambales
      </p>
      <p className="text-stone-500 text-xs mt-6">
        <a
          href="http://weblitzstack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          Powered by weblitzstack.com
        </a>
      </p>
    </div>
  </footer>
);

export default function App() {
  useEffect(() => {
    // SEO: Set dynamic page title
    document.title =
      'Casa Brillantes: A-Frame Cabin Staycation in Subic, Zambales';

    // SEO: Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      'Book your ultimate getaway at Casa Brillantes, a luxury A-Frame cabin in Subic, Zambales with a private pool. Perfect for family staycations and group retreats.'
    );

    // --- Functional hooks ---
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const smoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else if (targetId === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => link.addEventListener('click', smoothScroll));
    return () =>
      links.forEach((link) => link.removeEventListener('click', smoothScroll));
  }, []);

  return (
    <div className="bg-stone-100 font-sans antialiased text-stone-700">
      <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
            body { font-family: 'Inter', sans-serif; }
            .font-serif { font-family: 'Playfair Display', serif; }
            .font-fancy { font-family: 'Great Vibes', cursive; }
        `}</style>
      <Header />
      <main>
        <Hero />
        <About />
        <Amenities />
        <Gallery />
        <Reviews />
        <Rates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
