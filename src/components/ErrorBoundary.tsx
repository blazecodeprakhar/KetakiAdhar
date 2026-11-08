import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              We encountered an unexpected error. Please try refreshing the page or return to the homepage.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-md cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Back to Homepage</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
