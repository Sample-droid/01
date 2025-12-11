import React from "react";
import "./Foo.css";


const Foo = () => {
  
    return (
    <div className="food-page">
      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <h1>Food For Health</h1>
          <p>Eat For Mind And Body</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container">
        {/* Introduction */}
        <section className="intro">
          <h2>Why Healthy Eating Matters</h2>
          <p>
            Balanced nutrition fuels your body, sharpens your mind, and boosts
            immunity. Incorporate whole foods to feel energized, maintain a
            healthy weight, and prevent chronic diseases.
          </p>
        </section>

        <hr />

        {/* Nutritional Facts */}
        <section className="facts">
          <h2>Nutrition Facts & Superfoods</h2>
          <ul>
            <li>
              Blueberries: High in antioxidants to support brain health and
              reduce inflammation.
            </li>
            <li>
              Leafy Greens: Spinach & kale rich in iron, calcium, and vitamins
              A, C, K.
            </li>
            <li>
              Whole Grains: Oats, quinoa for steady energy and digestive health.
            </li>
            <li>
              Legumes: Lentils, chickpeas loaded with protein, fiber, and B
              vitamins.
            </li>
            <li>
              Fatty Fish: Salmon, mackerel deliver omega-3s for heart and
              cognitive functions.
            </li>
          </ul>
        </section>

        <hr />

        {/* Consulting Professionals */}
        <section className="consultants">
          <h2>Consulting Professionals</h2>
          <div className="consultant-list">
            <article className="consultant-card">
              <h3>D&amp;V Business Consulting</h3>
              <p>
                Food & beverage consultants specializing in product development,
                compliance, and go-to-market strategies.
              </p>
              <a
                href="https://www.dvconsulting.co.in/food-consulting-india/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit D&amp;V Consulting
              </a>
            </article>

            <article className="consultant-card">
              <h3>Foodsure</h3>
              <p>
                Leading food innovation firm offering recipe formulation,
                factory setup, R&amp;D, and certification services.
              </p>
              <a
                href="https://foodsure.co.in/blog/trusted-food-consulting-firms/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Foodsure
              </a>
            </article>

            <article className="consultant-card">
              <h3>Suman Food Consultants</h3>
              <p>
                Established firm providing plant design, machinery planning,
                cost studies, and operational support for food factories.
              </p>
              <a
                href="https://foodsure.co.in/blog/trusted-food-consulting-firms/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Suman Food Consultants
              </a>
            </article>
          </div>
        </section>

        <hr />

        {/* Food Providers */}
        <section className="providers">
          <h2>Trusted Food Providers</h2>
          <div className="provider-list">
            <article className="provider-card">
              <h3>24 Mantra Organic</h3>
              <p>
                India’s first certified organic brand offering cereals, pulses,
                spices, and snacks.
              </p>
              <a
                href="https://www.24mantra.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit 24 Mantra
              </a>
            </article>

            <article className="provider-card">
              <h3>Organic India</h3>
              <p>
                Global leader in herbal supplements, teas, and organic groceries
                for holistic health.
              </p>
              <a
                href="https://www.organicaindia.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Organic India
              </a>
            </article>

            <article className="provider-card">
              <h3>Nature’s Basket</h3>
              <p>
                Premium gourmet retailer delivering fresh produce, superfoods,
                and artisanal products.
              </p>
              <a
                href="https://www.naturesbasket.co.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Nature’s Basket
              </a>
            </article>

            <article className="provider-card">
              <h3>Farmizen</h3>
              <p>
                Community-supported agriculture platform connecting you to fresh,
                pesticide-free produce from local farms.
              </p>
              <a
                href="https://farmizen.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Farmizen
              </a>
            </article>
          </div>
        </section>
      </main>

      
    </div>
  );
};

export default Foo;