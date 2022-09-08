import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Message from './Message';

describe('test message component', () => {
  it('render message', () => {
    render(<Message message="Correct value" color="green" />);

    const messageElement = screen.getByText(/correct value/i);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('message-color__green');
    expect(messageElement).toMatchSnapshot();
  });
});
