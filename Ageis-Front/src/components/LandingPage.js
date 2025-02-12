import React from 'react';
import { useNavigate } from 'react-router-dom';

// Sample Data for WADA Code
const wadaCode = [
  {
    title: "Prohibited Substances",
    content:
      "WADA provides an updated list of substances prohibited in competitive sports, including performance-enhancing drugs (PEDs), hormones, stimulants, narcotics, and other substances that may give athletes an unfair advantage.",
    link: "https://www.wada-ama.org/en/prohibited-list",
  },
  {
    title: "Therapeutic Use Exemption (TUE)",
    content:
      "Athletes can apply for a Therapeutic Use Exemption (TUE) if they need to take a prohibited substance for medical reasons. The process involves submitting medical documentation to a TUE committee for review and approval.",
    link: "https://www.wada-ama.org/en/what-we-do/tue",
  },
  {
    title: "WADA Code Overview",
    content:
      "The WADA Code outlines global anti-doping standards for athletes and organizations. It ensures that all sports follow consistent anti-doping regulations to maintain fairness and integrity in competition.",
    link: "https://www.wada-ama.org/en/what-we-do/the-code",
  },
];

// Recent Sports News Section
const recentNews = [
  {
    title: "India Organized Anti-Doping Workshop",
    content:
      "A workshop was conducted to raise awareness about anti-doping regulations and promote fair play in sports.",
    imageUrl:
      "https://nadaindia.yas.gov.in/wp-content/uploads/India_organized-2.jpeg",
  },
  {
    title: "Anti-Doping Awareness Session",
    content:
      "An informative session was held to educate athletes and coaches on anti-doping measures and compliance.",
    imageUrl:
      "https://nadaindia.yas.gov.in/wp-content/uploads/Anti-Doping-Awareness-Session-1.jpeg",
  },
  {
    title: "Promoting Clean Sports Initiatives",
    content:
      "Efforts to promote clean sports were highlighted during a recent awareness session with experts.",
    imageUrl:
      "https://nadaindia.yas.gov.in/wp-content/uploads/Anti-Doping-Awareness-Session.jpeg",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="bg-[#203C5C] text-white">
      {/* Navigation Bar */}
      <nav className="bg-[#203C5C] sticky top-0 z-10 py-4">
  <div className="flex justify-between items-center px-6 text-white">
    <div className="flex items-center">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/2/29/Ministry_of_Youth_Affairs_and_Sports.svg"
        alt="Ministry Logo"
        className="h-12 w-auto filter invert mr-4"
      />
      <span className="text-2xl font-bold">Ageis Track</span>
    </div>
    <div>
      <a href="#news" className="px-4 text-white hover:text-[#FFF4DF] no-underline">
        News
      </a>
      <a
        href="#features"
        className="px-4 text-white hover:text-[#FFF4DF] no-underline"
      >
        Features
      </a>
      <a
        href="#guidelines"
        className="px-4 text-white hover:text-[#FFF4DF] no-underline"
      >
        Guidelines
      </a>
      <a
        href="#footer"
        onClick={handleLoginRedirect}
        className="px-4 text-white hover:text-[#FFF4DF] no-underline"
      >
        Login
      </a>
    </div>
  </div>
</nav>

      {/* Carousel Section */}
      <section id="carousel" className="bg-white py-3">
  <div
    id="carouselExample"
    className="carousel slide"
    data-bs-ride="carousel"
  >
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img
          src="https://nadaindia.yas.gov.in/wp-content/uploads/New-Slider4.jpg"
          className="d-block w-100"
          alt="Slide 1"
        />
      </div>
      <div className="carousel-item">
        <img
          src="https://nadaindia.yas.gov.in/wp-content/uploads/New-Slider1.jpg"
          className="d-block w-100"
          alt="Slide 2"
        />
      </div>
      <div className="carousel-item">
        <img
          src="https://nadaindia.yas.gov.in/wp-content/uploads/New-Slider2-1.jpg"
          className="d-block w-100"
          alt="Slide 3"
        />
      </div>
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
    >
      <span
        className="carousel-control-prev-icon"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
    >
      <span
        className="carousel-control-next-icon"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</section>

{/* Global Anti-Doping Standards Section */}
<section className="bg-[#203C5C] text-white text-center py-24">
        <h1 className="text-4xl">Global Anti-Doping Standards</h1>
        <p className="text-lg">Learn about the WADA Code and the fight against doping in sports</p>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-[#FFF4DF] py-10">
        <h2 className="text-3xl text-center text-[#203C5C]">Our Features</h2>
        <div className="flex justify-center flex-wrap mt-8">
          {wadaCode.map((item, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 p-6 m-4 rounded-lg shadow-lg max-w-xs"
            >
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-base mt-4">{item.content}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 block mt-4"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Sports News Section */}
      <section id="news" className="py-10 bg-gray-200">
        <h2 className="text-3xl text-center text-[#203C5C]">
          Recent Sports News
        </h2>
        <div className="flex justify-center flex-wrap mt-8">
          {recentNews.map((news, index) => (
            <div
              key={index}
              className="bg-white p-6 m-4 rounded-lg shadow-lg max-w-xs"
            >
              <img src={news.imageUrl} alt="News" className="w-full" />
              <h3 className="text-2xl font-bold mt-4 text-black">{news.title}</h3>
              <p className="text-base mt-4 text-black">{news.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guidelines Section */}
      <section id="guidelines" className="bg-[#FFF4DF] py-10">
        <h2 className="text-3xl text-center text-[#203C5C]">Anti-Doping Guidelines</h2>
        <p className="text-center text-lg max-w-3xl mx-auto mt-4 text-black">
          The Anti-Doping guidelines ensure fairness and integrity in sports by
          setting clear standards for what substances and methods are prohibited.
          These guidelines are enforced by the World Anti-Doping Agency (WADA) and
          national anti-doping organizations worldwide. It is essential for athletes
          and sports organizations to stay informed about the latest rules to prevent
          doping violations.
        </p>
      </section>

      {/* Footer Section */}
      <section id="footer" className="bg-[#203C5C] py-10 text-center text-white">
        <div className="mt-6">
          <p>&copy; 2024 Ageis Track | All Rights Reserved</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
