import { collection, onSnapshot, query, where } from "firebase/firestore";
import { safeParse } from "valibot";

import { SongLogSchema } from "./schemas";
import { SongLogEntry } from "./types";
import { AppSliceGet, AppSliceSet } from "@/features/app-store/types";
import { collectionNameGet } from "@/features/firebase/collectionNameGet";
import { Collection } from "@/features/firebase/consts";
import { useFirestoreClient } from "@/features/firebase/useFirebaseClient";

type SongLogSubscribe = (
	get: AppSliceGet,
	set: AppSliceSet,
) => ({
	uid,
	db,
	clearDb,
}: {
	uid: string;
	db: ReturnType<ReturnType<typeof useFirestoreClient>["getDb"]>;
	clearDb: ReturnType<typeof useFirestoreClient>["clearDb"];
}) => void;

export const songLogSubscribe: SongLogSubscribe =
	(get, set) =>
	({ uid, db, clearDb }) => {
		if (!db) {
			return;
		}
		const songLogCollectionName = collectionNameGet(Collection.SONG_LOGS);

		const songLogsRef = collection(db, songLogCollectionName);
		const q = query(songLogsRef, where("uid", "==", uid));
		const { songLogs } = get();

		const songLogUnsubscribeFn = onSnapshot(q, (querySnapshot) => {
			if (querySnapshot.metadata.fromCache) {
				clearDb();
				return;
			}

			const newSongLogs = querySnapshot.docs
				.map((doc) => doc.data())
				.map((songLog) => {
					const songLogParseResult = safeParse(SongLogSchema, songLog);
					if (!songLogParseResult.success) {
						console.warn(`Invalid data for song log ${songLog.logId}`, songLog);
						return undefined;
					}
					return songLogParseResult.output;
				})
				.reduce(
					(acc, songLog) => {
						if (!songLog) {
							return acc;
						}
						return {
							...acc,
							[songLog.songId]: songLog.logIds.map((logId) => ({
								logId,
								date: songLog.logs[logId].date,
								notes: songLog.logs[logId].notes,
								deleted: !!songLog.logs[logId].deleted,
							})),
						};
					},
					{ ...songLogs } as Record<string, SongLogEntry[]>,
				);
			set({ songLogs: newSongLogs, songLogUnsubscribeFn });
		});
	};
