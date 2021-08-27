import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';

import { calculateNominalPower } from '../nominalPowerCalculation';

test('renders calculation with expected result', () => {
  const power = calculateNominalPower(10)
  expect(power).toContain(1.53);
});

test('renders error', () => {
  const power = calculateNominalPower("G")
  expect(power).toContain("We could not calculate your nominal power at this time");
});


test('renders solar calculator header', () => {
  const power = calculateNominalPower()
  expect(power).toContain("We could not calculate your nominal power at this time");
});


test('renders solar calculator header', () => {
  const power = calculateNominalPower(0)
  expect(power).toContain("Select an area on the map above to begin");
});
