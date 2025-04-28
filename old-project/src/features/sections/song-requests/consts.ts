import { Song } from "../song/types";

export const SongRequestsSort = {
	SONG_NAME_ASC: "SONG_NAME_ASC",
	SONG_NAME_DESC: "SONG_NAME_DESC",
} as const;

export const songRequestsSortDefault = SongRequestsSort.SONG_NAME_ASC;

export const songRequestsSortData = {
	[SongRequestsSort.SONG_NAME_ASC]: {
		label: "Song Name (A-Z)",
		sort:
			(songRequests: Record<string, Song>) =>
			(aSongId: string, bSongId: string): number => {
				const a = songRequests[aSongId]?.songName;
				const b = songRequests[bSongId]?.songName;
				return a?.localeCompare(b);
			},
	},
	[SongRequestsSort.SONG_NAME_DESC]: {
		label: "Song Name (Z-A)",
		sort:
			(songRequests: Record<string, Song>) =>
			(aSongId: string, bSongId: string): number => {
				const a = songRequests[aSongId]?.songName;
				const b = songRequests[bSongId]?.songName;
				return b?.localeCompare(a);
			},
	},
} as const;

export const songRequestsSortOptions = Object.entries(songRequestsSortData).map(
	([value, { label }]) => ({
		value,
		label,
	}),
);
