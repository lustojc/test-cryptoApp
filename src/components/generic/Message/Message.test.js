import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Message from './Message';

describe('test message component', () => {
  it('render message', () => {
    render(<Message message="Correct value" backgroundColor="red" />);

    const messageElement = screen.getByText(/correct value/i);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveStyle({ backgroundColor: 'red' });
    expect(messageElement).toMatchSnapshot();
  });
});
