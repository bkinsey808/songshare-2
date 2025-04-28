import { useEffect, useState } from "react";

export type IsOnlineValues = {
	error: null | string;
	isOffline: boolean;
	isOnline: boolean;
};

const MISSING_BROWSER_ERROR =
	"useIsOnline only works in a browser environment.";

const missingWindow = typeof window === "undefined";

const missingNavigator = typeof navigator === "undefined";

const useIsOnline = (): IsOnlineValues => {
	const [isOnline, setOnlineStatus] = useState(window.navigator.onLine);

	useEffect(() => {
		const toggleOnlineStatus = (): void => {
			setOnlineStatus(window.navigator.onLine);
		};

		window.addEventListener("online", toggleOnlineStatus);
		window.addEventListener("offline", toggleOnlineStatus);

		return (): void => {
			window.removeEventListener("online", toggleOnlineStatus);
			window.removeEventListener("offline", toggleOnlineStatus);
		};
	}, [isOnline]);

	if (missingWindow || missingNavigator) {
		return {
			error: MISSING_BROWSER_ERROR,
			isOnline: false,
			isOffline: false,
		};
	}

	return {
		error: null,
		isOffline: !isOnline,
		isOnline,
	};
};

export { useIsOnline };
