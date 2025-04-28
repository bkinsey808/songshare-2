import { SongLog, SongLogEntry } from "../types";
import { useAppStore } from "@/features/app-store/useAppStore";
import { getKeys } from "@/features/global/getKeys";

type SongLogEntrySong = SongLogEntry & { songId: string };

const getUnsortedUnfilteredSongLogs = (
	songLogs: Record<string, SongLogEntry[]>,
	songId?: string | null,
): SongLogEntrySong[] => {
	if (songId) {
		return songLogs[songId]?.map((entry) => ({ ...entry, songId })) ?? [];
	}
	const songIds = getKeys(songLogs);
	const songLogEntries = songIds.reduce((acc, innerSongId) => {
		const v = songLogs[innerSongId].map((entry) => ({
			...entry,
			songId: innerSongId,
		}));
		return acc.concat(v);
	}, [] as SongLogEntrySong[]);
	return songLogEntries;
};

// makes it reactive
export const useSortedFilteredSongLogs = (
	songId?: string | null,
): SongLogEntrySong[] =>
	useAppStore((state) => {
		const songLogs = state.songLogs;
		const unsortedUnfilteredSongLogs = getUnsortedUnfilteredSongLogs(
			songLogs,
			songId,
		);
		return unsortedUnfilteredSongLogs.filter((entry) => !entry.deleted);
	});
