"use client";

import { JSX } from "react";

import { useSortedFilteredSongLogs } from "./useSortedFilteredSongLogs";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/features/app-store/useAppStore";
import { tw } from "@/features/global/tw";
import { Grid } from "@/features/grid/Grid";
import { GridHeader } from "@/features/grid/GridHeader";

export const SongLogGrid = (): JSX.Element | null => {
	const { songId, iso2formatted, songLogLoadClick, songLogForm } =
		useAppStore();
	const songLogs = useSortedFilteredSongLogs(songId);

	if (!songId) {
		return null;
	}

	return (
		<Grid
			fixedClassName={tw`grid-cols-[1.5rem,15rem]`}
			scrollingClassName={tw`grid-cols-[2rem,4rem]`}
		>
			<GridHeader>
				<div>Song Log Date Time</div>
				<div>Notes</div>
			</GridHeader>
		</Grid>
	);
};

// 			<GridHeader>
// 				<div>Song Log Date Time</div>
// 				<div>Notes</div>
// 			</GridHeader>
// 			{songLogs.map((songLog) => {
// 				const dateLocalFormatted = iso2formatted(songLog.date);

// 				return (
// 					<GridRow key={songLog.logId}>
// 						<Button
// 							variant="outline"
// 							className="min-h-[2rem] justify-start"
// 							onClick={songLogLoadClick({
// 								logId: songLog.logId,
// 								songId: songLog.songId,
// 								form: songLogForm,
// 							})}
// 							title="Open Song Log"
// 						>
// 							<pre>{dateLocalFormatted}</pre>
// 						</Button>
// 						<Button
// 							variant="outline"
// 							className="min-h-[2rem] justify-start"
// 							onClick={songLogLoadClick({
// 								logId: songLog.logId,
// 								songId: songLog.songId,
// 								form: songLogForm,
// 							})}
// 							title="Open Song Log"
// 						>
// 							{songLog.notes}
// 						</Button>
// 					</GridRow>
// 				);
// 			})}
// 		</Grid> */
// 	);
// };
