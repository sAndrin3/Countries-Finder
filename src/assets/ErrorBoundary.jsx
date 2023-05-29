import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false }; // Initializes the state with a property "hasError" set to false

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Updates the state when an error occurs, setting "hasError" to true
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo); // Logs the error and error info to the console
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback; // Renders the fallback UI or error message when an error occurs
    }
    return this.props.children; // Renders the wrapped components if no error occurred
  }
}

export default ErrorBoundary;
