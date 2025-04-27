// components/ui/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: any) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>Oops, something went wrong.</h2>
          <p>Please try refreshing the page or check back later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
