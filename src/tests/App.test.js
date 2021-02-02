import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('Teste render', () => {
    render(<App />);
    screen.debug();
  });
});
