"use client";

import { JSX } from "react";

import { useAppStore } from "@/features/app-store/useAppStore";
import { getKeys } from "@/features/global/getKeys";

export const SongLibraryTitle = (): JSX.Element => {
	const { songLibrary } = useAppStore();
	const numberOfSongs = getKeys(songLibrary).filter(
		(songId) => !songLibrary[songId].deleted,
	).length;

	return (
		<span>
			{numberOfSongs} song{numberOfSongs === 1 ? "" : "s"}
		</span>
	);
};
