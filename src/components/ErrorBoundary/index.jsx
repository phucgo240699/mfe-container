import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex items-center justify-center h-screen bg-green-400">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Service Unavailable</h1>
            <p className="text-lg">
              We are currently experiencing technical difficulties. Please try
              again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-10 border-[1px] px-6 py-2 rounded-lg text-blue-700 border-blue-700 hover:text-blue-500 hover:border-blue-500"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
