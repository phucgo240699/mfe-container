export default () => (
  <div className="bg-gray-100 flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">
        Service unavailable
      </h1>
      <p className="text-2xl text-gray-600 mb-8">
        Oops! The page you're looking for is currently unavailable.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Go Home
      </a>
    </div>
  </div>
);
