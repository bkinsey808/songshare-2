"use server";

import { collectionNameGet } from "@/features/firebase/collectionNameGet";
import { Collection } from "@/features/firebase/consts";
import { db } from "@/features/firebase/firebaseServer";
import { UserPublicDocSchema } from "@/features/firebase/schemas";
import { serverParse } from "@/features/global/serverParse";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/** delete the active user */

type UserActiveUnset = ({
	uid,
	fuid,
}: {
	uid: string;
	fuid: string | null;
}) => Promise<{ usersActive: Record<string, unknown> }>;

export const userActiveUnset: UserActiveUnset = async ({ uid, fuid }) => {
	// get the fuid user public doc
	const fuidUserPublicDocSnapshot = await db
		.collection(collectionNameGet(Collection.USERS_PUBLIC))
		.doc(fuid ?? uid)
		.get();
	if (!fuidUserPublicDocSnapshot.exists) {
		throw new Error("fuidUserPublicDocSnapshot does not exist");
	}
	const fuidUserPublicDocData = fuidUserPublicDocSnapshot.data();
	if (!fuidUserPublicDocData) {
		throw new Error("Invalid fuidUserPublicDocData");
	}
	const fuidUserPublicDocDataParseResult = serverParse(
		UserPublicDocSchema,
		fuidUserPublicDocData,
	);
	if (!fuidUserPublicDocDataParseResult.success) {
		throw new Error("Invalid fuidUserPublicDocDataParsed");
	}
	const fuidUserPublicDoc = fuidUserPublicDocDataParseResult.output;

	if (!fuidUserPublicDoc.usersActive) {
		fuidUserPublicDoc.usersActive = {};
	}
	delete fuidUserPublicDoc.usersActive[uid];

	// update the fuid user public doc
	await db
		.collection(collectionNameGet(Collection.USERS_PUBLIC))
		.doc(fuid ?? uid)
		.update({ usersActive: fuidUserPublicDoc.usersActive });

	return { usersActive: fuidUserPublicDoc.usersActive };
};
