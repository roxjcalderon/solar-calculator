import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';

import Map from '../Map';

test('verify nominal power message is displayed', () => {
  render(<Map />);
  const nominalPower = screen.getByText(/Select an area on the map above to begin/i);
  expect(nominalPower).toBeInTheDocument();
});
