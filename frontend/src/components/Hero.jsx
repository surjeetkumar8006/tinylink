export default function Hero() {
  return (
    <section
      className="w-full bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50
      rounded-3xl p-10 shadow-md border border-gray-200
      transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">

        {/* Left section */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-3">
            Your Connections Platform
          </h1>

          <p className="text-gray-600 text-base max-w-xl leading-relaxed">
            Create beautiful short links that improve engagement and track every click
            with real-time analytics. Fast, reliable, and built for professionals.
          </p>
        </div>

        {/* Right side badge box */}
        <div className="flex flex-col items-start md:items-end gap-3">
          
          {/* Highlight Tag */}
          <span
            className="text-sm font-medium text-indigo-700 bg-white 
            px-4 py-2 rounded-full shadow border border-indigo-100
            hover:shadow-md transition-all"
          >
            ✨ MERN Powered • Lightning Fast
          </span>

          {/* Tiny note */}
          <span className="text-xs text-gray-500">
            High-quality design for your assignment & portfolio
          </span>
        </div>

      </div>
    </section>
  )
}
