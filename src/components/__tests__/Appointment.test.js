import React from 'react';

import { render, cleanup } from '@testing-library/react';

import Appointment from 'components/Application';
import { act } from '@testing-library/react-hooks';

afterEach(cleanup);

describe('Appointment', () => {
  xit('renders without crashing', () => {
    render(<Appointment />);
  });
});
