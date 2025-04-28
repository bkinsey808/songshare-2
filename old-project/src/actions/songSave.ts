"use server";

import { flatten } from "valibot";

import { sessionExtend } from "./sessionExtend";
import { songGet } from "./songGet";
import { userDocGet } from "./userDocGet";
import { ActionResultType } from "@/features/app-store/consts";
import { collectionNameGet } from "@/features/firebase/collectionNameGet";
import { Collection } from "@/features/firebase/consts";
import { db } from "@/features/firebase/firebaseServer";
import { getFormError } from "@/features/form/getFormError";
import { serverParse } from "@/features/global/serverParse";
import { SongSchema } from "@/features/sections/song/schemas";
import type { Song } from "@/features/sections/song/types";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

type SaveOrCreateSong = (
	songId: string | null,
	uid: string,
	song: Song,
) => Promise<string>;

const saveOrCreateSong: SaveOrCreateSong = async (songId, uid, song) => {
	if (song.sharer && song.sharer !== uid) {
		throw new Error("User does not own this song");
	}
	if (!song.sharer) {
		// eslint-disable-next-line no-param-reassign
		song.sharer = uid;
	}
	if (songId) {
		const songResult = await songGet(songId);
		if (songResult.actionResultType === ActionResultType.ERROR) {
			console.warn("Song not found");
		} else {
			if (!!songResult.song.sharer && songResult.song.sharer !== uid) {
				throw new Error("User does not own this song");
			}
		}
		await db
			.collection(collectionNameGet(Collection.SONGS))
			.doc(songId)
			.set(song);
		return songId;
	}
	const result = await db
		.collection(collectionNameGet(Collection.SONGS))
		.add(song);
	// eslint-disable-next-line no-param-reassign
	songId = result.id;
	return songId;
};

type SongSave = ({
	song,
	songId,
}: {
	song: Song;
	songId: string | null;
}) => Promise<
	| {
			actionResultType: "SUCCESS";
			songId: string;
	  }
	| {
			actionResultType: "ERROR";
			fieldErrors: ReturnType<typeof flatten>["nested"];
	  }
>;

export const songSave: SongSave = async ({ song, songId }) => {
	try {
		const songParseResult = serverParse(SongSchema, song);
		if (!songParseResult.success) {
			return {
				actionResultType: ActionResultType.ERROR,
				fieldErrors: flatten<typeof SongSchema>(songParseResult.issues).nested,
			};
		}

		const extendSessionResult = await sessionExtend();
		if (extendSessionResult.actionResultType === ActionResultType.ERROR) {
			return getFormError("Session expired");
		}

		const { sessionCookieData } = extendSessionResult;
		const { uid } = sessionCookieData;

		const userDocResult = await userDocGet();
		if (userDocResult.actionResultType === ActionResultType.ERROR) {
			return getFormError("Failed to get user doc");
		}
		const { userDoc } = userDocResult;

		const newSongId = await saveOrCreateSong(songId, uid, song);
		const newSongIds = Array.from(new Set([...userDoc.songIds, newSongId]));

		await db.collection(collectionNameGet(Collection.USERS)).doc(uid).update({
			songIds: newSongIds,
			songId: newSongId,
		});

		return {
			actionResultType: ActionResultType.SUCCESS,
			songId: newSongId,
		};
	} catch (error) {
		console.error({ error });
		return getFormError("Failed to save song");
	}
};
