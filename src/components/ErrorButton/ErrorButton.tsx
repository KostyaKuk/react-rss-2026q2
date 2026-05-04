import React from 'react';
import './ErrorButton.css';

interface ErrorTestButtonState {
  shouldThrow: boolean;
}

class ErrorTestButton extends React.Component<object, ErrorTestButtonState> {
  constructor(props: object) {
    super(props);
    this.state = {
      shouldThrow: false
    };
  }

  triggerError = (): void => {
    console.error('Test error triggered: Simulated error from test button');
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test error: This is a simulated error from the test button!');
    }
    
    return (
      <button 
        className="error-test-button"
        onClick={this.triggerError}
      >
        🧪 Test Error
      </button>
    );
  }
}

export default ErrorTestButton;