"use server";

import { ActionResultType } from "@/features/app-store/consts";
import { collectionNameGet } from "@/features/firebase/collectionNameGet";
import { Collection } from "@/features/firebase/consts";
import { db } from "@/features/firebase/firebaseServer";
import { actionErrorMessageGet } from "@/features/global/actionErrorMessageGet";
import { serverParse } from "@/features/global/serverParse";
import { SongSchema } from "@/features/sections/song/schemas";
import { Song } from "@/features/sections/song/types";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

type SongGet = (songId: string) => Promise<
	| { actionResultType: "SUCCESS"; song: Song }
	| {
			actionResultType: "ERROR";
			message: string;
	  }
>;

export const songGet: SongGet = async (songId) => {
	try {
		const songDoc = await db
			.collection(collectionNameGet(Collection.SONGS))
			.doc(songId)
			.get();
		if (!songDoc.exists) {
			console.warn("Song not found");
			return actionErrorMessageGet("Song not found");
		}
		const songData = songDoc.data();

		const songParseResult = serverParse(SongSchema, songData);
		if (!songParseResult.success) {
			console.warn(songData);
			return actionErrorMessageGet("Song data invalid");
		}

		const song = songParseResult.output;

		return { actionResultType: ActionResultType.SUCCESS, song };
	} catch (error) {
		return actionErrorMessageGet("Error getting song");
	}
};
