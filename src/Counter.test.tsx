import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Counter from './Counter';

test('counter increments the count', () => {
  const { container } = render(<Counter />);
  const button = container.firstChild as Element;
  fireEvent.click(button);
  expect(button.textContent).toBe('1');
});