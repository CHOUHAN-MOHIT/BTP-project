import React , {useEffect} from 'react'
import './Home.css'

const Home = ( { setActiveTab }) => {
  useEffect(() => {
    setActiveTab('Home');
  }, []);
  const HeroSection = () => {
    return (
      <div className="banner grid place-content-evenly">
      <div className='text-center font-semibold	'>
        <h1 className='text-4xl'>Bridging Cultures, Celebrating Traditions</h1>
        <h3 className='text-2xl'>Your Gateway to Authentic Indian Weddings.</h3> 
      </div>
    </div>
    );
  };
  const ServicesSection = () => {
    return (
      <section className="py-16 bg-mutedAccent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Services</h2>
          <p className="text-lg text-gray-600 mb-8 text-center">We make it easy for foreign guests to discover and attend traditional Indian weddings, filled with rituals, joy, and cultural richness.</p>
          
          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1: Browse Weddings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Browse and Select Weddings</h3>
              <p className="text-gray-600">Explore a curated list of Indian weddings and choose one that aligns with your interests and preferences.</p>
            </div>
            
            {/* Service Card 2: Easy Booking */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Easy Booking Process</h3>
              <p className="text-gray-600">We facilitate a hassle-free booking process to ensure you secure your spot at the chosen wedding with ease.</p>
            </div>
            
            {/* Service Card 3: Assistance and Support */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Assistance and Support</h3>
              <p className="text-gray-600">Our dedicated team is available to assist you throughout your journey, providing guidance and support to make your experience memorable.</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  const TestimonialsSection = () => {
    return (
      <section className="py-16 bg-neutralAccent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Testimonials</h2>
          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Card Example */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">"I had an amazing experience attending an Indian wedding through Indian Wedding Host. Everything was well-organized, and I got to experience the rich traditions and joyous celebrations."</p>
              <h4 className="text-lg font-semibold mt-4">- John Doe</h4>
            </div>
            {/* Add more testimonial cards here */}
          </div>
        </div>
      </section>
    );
  };
  return (
    <>
    <main className="container">
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Gradient Boundary */}
        <div className="h-16 bg-gradient-to-b from-mutedAccent to-neutralAccent"></div>

        {/* Testimonials Section */}
        <TestimonialsSection />
      </main>
    </>
  )
}

export default Home