export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md py-4 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-blue-600">JobPortal</h1>

        {/* Links */}
        <div className="flex gap-8 text-lg">
          <a href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="/jobs" className="text-gray-700 hover:text-blue-600">
            Jobs
          </a>
          <a href="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}
