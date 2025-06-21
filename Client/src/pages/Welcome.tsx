const Welcome = () => {
  return (
    <>
      <header className="h-[50vh] bg-gradient-to-r from-orange-800 to-amber-900 text-white shadow-lg relative flex flex-col justify-center px-10 overflow-hidden">
        {/* Earth Background Image */}
        <div className="absolute right-[-120px] bottom-[-160px] w-[700px] h-[700px] opacity-20 z-0 animate-spin-slow">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
            alt="Earth"
            className="w-full h-full object-contain rounded-full"
          />
        </div>

        {/* Login Button */}
        <div className="absolute top-4 right-6 z-10">
          <button className="bg-yellow-800 text-gray-100 px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition">
            Login
          </button>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold">Welcome to E-CELL BlogSphere</h1>
          <p className="mt-4 text-lg md:text-2xl font-light max-w-2xl">
            Share your stories, connect with global minds, and build a world of ideas—one blog at a time.
          </p>
        </div>
      </header>

      <main className="p-6">
        {/* Future Content */}
      </main>

      {/* Custom CSS animation */}
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 60s linear infinite;
          }
        `}
      </style>
    </>
  );
};

export default Welcome;
