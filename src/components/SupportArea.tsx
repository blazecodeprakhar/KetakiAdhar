

const SupportArea = () => {
  const challenges = [
    {
      title: "Seed Distribution",
      detail: "We provide access to high-quality seeds that help farmers achieve better yield, improve crop health, and strengthen food security. All of this is offered free of cost to the farmer.",
      image: "/seed.png"
    },
    {
      title: "Soil Testing",
      detail: "Healthy soil is the foundation of a good harvest. We conduct regular soil tests and offer practical guidance on improving fertility through natural and sustainable methods.",
      image: "/soil_test.png"
    },
    {
      title: "Medical Assistance",
      detail: "Through our rural medical camps, we bring essential healthcare to farmers and their families, especially in areas where medical facilities are hard to reach.",
      image: "/medical.png"
    },
    {
      title: "Daily Weather Updates",
      detail: "We provide timely and accurate weather reports that help farmers make informed decisions about sowing, irrigation, and harvesting. This reduces risk and protects their crops.",
      image: "/weather.png"
    }
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
           Our Core 
            <span className="text-primary-600"> Support Areas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Cultivating Success: The Fundamental Cornerstones of Our Support
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {challenges.map((challenge, index) => (
            <div key={index} className="group transition-all duration-300 ease-in-out hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer">
                <img
                  src={challenge.image}
                  alt={challenge.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
                  <h3
                    className="text-white font-bold uppercase text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider leading-tight break-words"
                    style={{
                      fontFamily: '"Bebas Neue", sans-serif'
                    }}
                  >
                    {challenge.title}
                  </h3>
                </div>
              </div>
              <div className="pt-6">
                <p className="text-gray-700 text-base leading-relaxed mb-4">{challenge.detail}</p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportArea;