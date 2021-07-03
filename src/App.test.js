import { render, screen } from '@testing-library/react';
import App from './App';

test('renders button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/button/i);
  expect(buttonElement).toBeInTheDocument();
});
