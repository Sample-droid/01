import React from "react";
import "./Green.css";


const Green = () => {
  return (
    <div className="green-page">
      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <h1>Build Your Eco-Friendly Dream Home</h1>
          <p>
            From sustainable materials to passive-solar design, discover the
            principles, tips, and trusted builders you need to create a healthy,
            efficient, earth-loving home.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container">
        {/* Introduction */}
        <section className="intro">
          <h2>Why Go Green?</h2>
          <p>
            An eco-friendly house reduces your carbon footprint, slashes your
            utility bills, and creates a healthier living space. By integrating
            renewable energy, water-saving systems, and low-impact materials,
            you can build a home that nurtures both family and planet.
          </p>
        </section>

        <hr />

        {/* Key Principles */}
        <section className="principles">
          <h2>Key Principles of Eco-Friendly Architecture</h2>
          <ul>
            <li>
              Passive Solar Design: Orient windows and overhangs to capture
              winter sun and shade summer heat.
            </li>
            <li>
              Super-Insulation: Seal gaps and use high-R-value insulation to
              maintain comfort all year.
            </li>
            <li>
              Natural Ventilation: Cross-ventilation and stack effect reduce
              reliance on HVAC.
            </li>
            <li>
              Water Conservation: Harvest rainwater, reuse greywater, and
              install low-flow fixtures.
            </li>
            <li>
              Green Roofs &amp; Walls: Plant vegetation on top or sides to
              improve insulation and biodiversity.
            </li>
          </ul>
        </section>

        <hr />

        {/* Materials */}
        <section className="materials">
          <h2>Top Eco-Friendly Materials</h2>
          <ul>
            <li>Bamboo &amp; Engineered Wood: Rapidly renewable, strong, and versatile.</li>
            <li>Recycled Steel &amp; Aluminum: Cuts down mining and supports circular economy.</li>
            <li>Rammed Earth &amp; Straw Bale: Exceptional thermal mass with low embodied energy.</li>
            <li>Reclaimed Brick &amp; Stone: Vintage charm, less waste.</li>
            <li>Recycled Plastic Lumber: Durable, weather-resistant, and reduces landfill.</li>
          </ul>
        </section>

        <hr />

        {/* DIY Tips */}
        <section className="tips">
          <h2>5 DIY Tips for Your Eco-Home Project</h2>
          <ol>
            <li>
              Start with a Detailed Plan: Sketch your layout, passive-solar
              orientation, and plumbing routes before breaking ground.
            </li>
            <li>
              Local Codes &amp; Incentives: Research green building codes,
              rebates, and tax credits in your area.
            </li>
            <li>
              Source Locally: Reduce transport emissions by choosing regional
              suppliers for wood, stone, and finishes.
            </li>
            <li>
              Phased Construction: Tackle core systems (insulation, HVAC, solar)
              first, then move to finishes and landscaping.
            </li>
            <li>
              Performance Monitoring: Install energy meters and moisture sensors
              to tune your systems over the first year.
            </li>
          </ol>
        </section>

        <hr />

        {/* Recommended Builders */}
        <section className="builders">
          <h2>Recommended Eco-Friendly Builders</h2>
          <div className="builder-list">
            <article className="builder-card">
              <h3>Godrej Properties</h3>
              <p>
                Pioneers of sustainable urban living, integrating solar panels,
                rainwater harvesting, and net-zero aspirations in every project.
              </p>
              <a
                href="https://www.godrejproperties.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Godrej Properties
              </a>
            </article>

            <article className="builder-card">
              <h3>Tata Realty &amp; Infrastructure</h3>
              <p>
                Makers of smarter, greener cities—renowned for solar integration,
                water recycling, and carbon-neutral design.
              </p>
              <a
                href="https://www.tatarealty.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Tata Realty
              </a>
            </article>

            <article className="builder-card">
              <h3>Mahindra Lifespace</h3>
              <p>
                Champions of eco-townships; delivering renewable-energy
                communities and zero-waste solutions in flagship projects.
              </p>
              <a
                href="https://www.mahindrafuturepace.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Mahindra Lifespace
              </a>
            </article>

            <article className="builder-card">
              <h3>Bamboo House India</h3>
              <p>
                Innovators in engineered bamboo and recycled-plastic homes; fast
                to build, cost-effective, and community-driven.
              </p>
              <a
                href="https://www.bamboohouseindia.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Bamboo House India
              </a>
            </article>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="brand-title">EcoGuardians</h2>
            <p className="brand-tagline">Protecting Nature, Empowering People</p>
          </div>

          <nav className="footer-links">
            <h4 className="links-heading">Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/projects">Our Projects</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>

          <div className="footer-involve">
            <h4 className="involve-heading">Get Involved</h4>
            <button className="involve-button">Volunteer</button>
            <button className="involve-button outline">Donate</button>
          </div>

          <div className="footer-social">
            <h4 className="social-heading">Follow Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" aria-label="Facebook" className="icon">F</a>
              <a href="https://X.com" aria-label="X" className="icon">T</a>
              <a href="https://instagram.com" aria-label="Instagram" className="icon">I</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} EcoGuardians. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Green;
