import { useEffect, useLayoutEffect, useRef } from "react";

export const useInterval = (
	callback: () => void,
	delay: number | null,
): void => {
	const savedCallback = useRef(callback);

	// Remember the latest callback if it changes.
	useLayoutEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		// Don't schedule if no delay is specified.
		// Note: 0 is a valid value for delay.
		if (delay === null) {
			return;
		}

		const id = setInterval(() => {
			savedCallback.current();
		}, delay);

		return (): void => {
			clearInterval(id);
		};
	}, [delay]);
};
