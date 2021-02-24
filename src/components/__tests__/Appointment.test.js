import React from 'react';

import { render, cleanup, act } from '@testing-library/react';

import Appointment from 'components/Application';

afterEach(cleanup);

describe('Appointment', () => {
  it('renders without crashing', async () => {
    const promise = Promise.resolve();

    render(<Appointment />);
    await act(() => promise);
  });
});
