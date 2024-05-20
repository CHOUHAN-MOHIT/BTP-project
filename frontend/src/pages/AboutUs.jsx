import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel"; // Example carousel library
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles

const AboutUs = ({ setActiveTab }) => {
  useEffect(() => {
    setActiveTab("About");
  }, []);
  
  return (
    <div className="pt-32 bg-mutedAccent">
      <section className="pb-8 text-black bg-mutedAccent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Story</h2>
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            <div>
              <img src="https://source.unsplash.com/random/500x300" alt="Our Journey" />
              <p className="legend">Our humble beginnings</p>
            </div>
            <div>
              <img src="https://source.unsplash.com/random/300x300" alt="Growth" />
              <p className="legend">Growing our team</p>
            </div>
            <div>
              <img src="https://source.unsplash.com/random/300x300" alt="Celebration" />
              <p className="legend">Celebrating with couples</p>
            </div>
          </Carousel>
          <p className="text-lg text-justify mt-4">
            Welcome to our wedding celebration platform! Our journey began with a simple idea: to make wedding planning and celebrations more enjoyable and less stressful. Over the years, we have helped countless couples create unforgettable moments by providing a comprehensive platform that caters to all their wedding needs. From finding the perfect venue to managing guest lists and everything in between, our mission is to bring your dream wedding to life with ease and elegance.
          </p>
        </div>
      </section>

      <div className="h-16 bg-gradient-to-b from-mutedAccent to-neutralAccent"></div>

      <section className="pb-8 text-black bg-neutralAccent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Mission</h2>
          <div className="flex justify-center">
            <img src="https://source.unsplash.com/random/300x300" alt="Our Mission" className="w-full md:w-1/2 rounded-lg" />
          </div>
          <p className="text-lg text-justify mt-4">
            Our mission is to create a seamless and enjoyable wedding planning experience for every couple. We understand that every wedding is unique, and we strive to offer personalized solutions that reflect your individual style and preferences. By leveraging the latest technology and our extensive network of wedding professionals, we are committed to making your special day as magical and memorable as possible.
          </p>
        </div>
      </section>

      <div className="h-16 bg-gradient-to-b from-neutralAccent to-mutedAccent"></div>

      <section className="pb-8 text-black bg-mutedAccent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <img
                src="/path/to/photo1.jpg"
                alt="Team Member 1"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-shade">Jane Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
              <p className="text-gray-600 mt-2">Jane has over 20 years of experience in the wedding industry...</p>
            </div>
            <div className="text-center">
              <img
                src="/path/to/photo2.jpg"
                alt="Team Member 2"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-shade">John Smith</h3>
              <p className="text-gray-600">Chief Technology Officer</p>
              <p className="text-gray-600 mt-2">John is a tech enthusiast with a passion for creating innovative solutions...</p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-16 bg-gradient-to-b from-mutedAccent to-neutralAccent"></div>

      <section className="pb-8 text-black bg-neutralAccent">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
          <p className="text-lg leading-relaxed mb-4 text-center">
            We would love to hear from you! Whether you have questions about our services, need assistance with your wedding planning, or simply want to share your feedback, feel free to get in touch with us.
          </p>
          <div className="text-center">
            <p className="text-lg mb-2">
              <strong>Email:</strong> <a href="mailto:support@weddingplatform.com" className="text-highlight">support@weddingplatform.com</a>
            </p>
            <p className="text-lg mb-2">
              <strong>Phone:</strong> <a href="tel:+11234567890" className="text-highlight">+1 (123) 456-7890</a>
            </p>
            <p className="text-lg">
              <strong>Address:</strong> 123 Wedding Lane, Celebration City, CA 12345
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
