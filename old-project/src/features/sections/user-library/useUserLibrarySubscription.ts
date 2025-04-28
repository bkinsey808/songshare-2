import { useEffect } from "react";

import { useAppStore } from "@/features/app-store/useAppStore";
import { useFirestoreClient } from "@/features/firebase/useFirebaseClient";

export const useUserLibrarySubscription = (): void => {
	const { userIds, userLibrarySubscribe, userLibraryUnsubscribe } =
		useAppStore();

	const { getDb, initialized, clearDb } = useFirestoreClient();

	useEffect(() => {
		const db = getDb();
		userLibrarySubscribe({ db, clearDb });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userIds]);

	useEffect(() => {
		return (): void => {
			userLibraryUnsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialized]);
};
