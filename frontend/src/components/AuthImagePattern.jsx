const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center wa-header p-12 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-6 gap-4 p-8 rotate-12 scale-125">
          {[...Array(36)].map((_, i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-xl bg-white/20 ${i % 3 === 0 ? "animate-pulse" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-md text-center z-10">
        {/* Chat bubbles illustration */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl rounded-tl-none px-6 py-3 self-start ml-8">
            <p className="text-sm">Hey there! 👋</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tr-none px-6 py-3 self-end mr-8">
            <p className="text-sm">Welcome to ByteChat! 💬</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl rounded-tl-none px-6 py-3 self-start ml-12">
            <p className="text-sm">Let's get started 🚀</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="opacity-80 text-sm leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;