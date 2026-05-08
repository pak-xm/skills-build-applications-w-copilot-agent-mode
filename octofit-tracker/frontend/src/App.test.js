import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock(
  'react-router-dom',
  () => ({
    Link: ({ children }) => children,
    Navigate: () => null,
    Route: ({ element }) => element,
    Routes: ({ children }) => children,
  }),
  { virtual: true }
);

test('renders navigation menu links', () => {
  render(<App />);

  expect(screen.getAllByText(/users/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/activities/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/teams/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/leaderboard/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/workouts/i).length).toBeGreaterThan(0);
});
