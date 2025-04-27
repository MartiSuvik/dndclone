const DesignersHero = () => {
    return (
      <section className="relative py-20 md:py-28">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 animate-fly-in"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1518355077561-4af7abce973d?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            filter: "grayscale(0%)"
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-black opacity-30" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 w-80 h-80 bg-[#C5A267] rounded-full opacity-10"></div>
          <div className="absolute -left-20 top-1/2 w-40 h-40 bg-[#C5A267] rounded-full opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fly-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-6">
            DESIGNERS
          </h1>
          <p className="text-lg sm:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-thin">
            Meet the talented individuals who bring vision, expertise, and creativity to every interior design project at D&D Design Center.
          </p>
        </div>
        </div>
      </section>
    );
  };
  
  export default DesignersHero;