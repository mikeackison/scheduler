import React from 'react';

import { render, cleanup, act } from '@testing-library/react';

import Appointment from 'components/Application';

afterEach(cleanup);

describe('Appointment', () => {
  xit('renders without crashing', () => {
    render(<Appointment />);
  });
});
