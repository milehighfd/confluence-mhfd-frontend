import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
	children?: ReactNode;
	fallback: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error?: unknown;
	erroInfo?: unknown;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: unknown, errorInfo: unknown): void {
		this.setState({ hasError: true, error: error, erroInfo: errorInfo });
	}

	render(): ReactNode {
		if (this.state.hasError) {
			// Render a fallback UI when an error occurs
			return this.props.fallback;
		}

		return this.props?.children;
	}
}

export default ErrorBoundary;