import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';

import App from '../App';

test('renders solar calculator header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Solar Calculator/i);
  expect(linkElement).toBeInTheDocument();
});
