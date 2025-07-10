import { ReactNode, Component, ErrorInfo } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex align-items-center justify-content-center min-h-screen">
          <Card className="w-full max-w-md">
            <div className="text-center">
              <i className="pi pi-exclamation-triangle text-6xl text-red-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
              <p className="text-600 mb-4">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <Button
                label="Reload Page"
                onClick={() => window.location.reload()}
                severity="danger"
              />
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
