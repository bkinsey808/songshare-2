"use client";

import { JSX } from "react";

import { useSortedFilteredSongLogs } from "@/features/sections/song-log/grid/useSortedFilteredSongLogs";

export const LogTitle = (): JSX.Element => {
	const songLogs = useSortedFilteredSongLogs();
	const numberOfLogs = songLogs.length;

	return (
		<span>
			{numberOfLogs} log{numberOfLogs === 1 ? "" : "s"}
		</span>
	);
};
