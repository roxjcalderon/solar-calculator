import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';

import Map from '../Map';

test('verify nominal power message is displayed', () => {
  render(<Map />);
  const nominalPower = screen.getByText(/Nominal Power for Area Selected/i);
  expect(nominalPower).toBeInTheDocument();
});
