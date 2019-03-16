import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Counter from './Counter';

afterEach(() => {
	window.localStorage.removeItem('count');
});

test('counter increments the count', () => {
	const { container } = render(<Counter />);
	const button = container.firstChild as Element;
	fireEvent.click(button);
	expect(button.textContent).toBe('1');
});

test('reads and updates localstorage', () => {
	window.localStorage.setItem('count', '3');
	const { container, rerender } = render(<Counter />);
	const button = container.firstChild as Element;
	expect(button.textContent).toBe('3');
	fireEvent.click(button);
	expect(button.textContent).toBe('4');
	/**
	 * we'll expect window.localStorage.getItem count to be four. That assertion is actually failing
	 * The reason this is happening is because this useEffect callback is being called sometime after the render.
	 * React intentionally doesn't want this callback to block rendering.
	 * It schedules it to be done at a later time
	 *
	 * We can force this callback to be run synchronously if we rerender this Counter component
	 *
	 * We're going to pull in rerender from our render utilities.
	 * We'll say, "rerender Counter." We'll put that before we do this assertion.
	 * We get our test passing
	 */
	rerender(<Counter />);
	expect(window.localStorage.getItem('count')).toBe('4');
});
