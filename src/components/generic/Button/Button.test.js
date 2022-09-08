import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Button from './Button';

describe('test button component', () => {
  it('render button', () => {
    render(<Button text="Add" color="white" />);

    const btnElement = screen.getByText(/add/i);
    expect(btnElement).toBeInTheDocument();
    expect(btnElement).toHaveClass('button-color__white');
    expect(btnElement).toMatchSnapshot();
  });
});
