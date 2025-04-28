"use server";

import { cookies } from "next/headers";

import { sessionCookieGet } from "./sessionCookieGet";
import { userPublicDocGet } from "./userPublicDocGet";
import { ActionResultType } from "@/features/app-store/consts";
import { SESSION_COOKIE_NAME } from "@/features/auth/consts";
import { sessionCookieOptions } from "@/features/auth/sessionCookieOptions";
import { sessionTokenEncode } from "@/features/auth/sessionTokenEncode";
import { sessionWarningTimestampGet } from "@/features/auth/sessionWarningTimestampGet";
import { SessionCookieData } from "@/features/auth/types";
import { collectionNameGet } from "@/features/firebase/collectionNameGet";
import { Collection } from "@/features/firebase/consts";
import { db } from "@/features/firebase/firebaseServer";
import { UserPublicDoc } from "@/features/firebase/types";
import { actionErrorMessageGet } from "@/features/global/actionErrorMessageGet";
import { jsDateTimeZone2iso } from "@/features/time-zone/jsDateTimeZone2iso";

type SessionExtend = () => Promise<
	| {
			actionResultType: "SUCCESS";
			sessionCookieData: SessionCookieData;
			userPublicDoc: UserPublicDoc;
	  }
	| {
			actionResultType: "ERROR";
			message: string;
	  }
>;

export const sessionExtend: SessionExtend = async () => {
	try {
		const cookieResult = await sessionCookieGet();

		if (cookieResult.actionResultType === ActionResultType.ERROR) {
			return actionErrorMessageGet("Session expired");
		}

		const sessionCookieData = cookieResult.sessionCookieData;

		const userPublicGetResult = await userPublicDocGet();
		if (userPublicGetResult.actionResultType === ActionResultType.ERROR) {
			return actionErrorMessageGet("Public user not found");
		}
		const { userPublicDoc } = userPublicGetResult;
		const { usersActive = {} } = userPublicDoc;
		const { uid } = sessionCookieData;
		usersActive[uid] = jsDateTimeZone2iso(new Date(), "UTC") ?? "";
		userPublicDoc.usersActive = usersActive;

		await db
			.collection(collectionNameGet(Collection.USERS_PUBLIC))
			.doc(uid)
			.update({
				usersActive,
			});

		const sessionWarningTimestamp = sessionWarningTimestampGet();

		// Extend the session
		const newSessionCookieData: SessionCookieData = {
			...sessionCookieData,
			sessionWarningTimestamp,
		};

		const sessionToken = await sessionTokenEncode(sessionCookieData);

		(await cookies()).set(
			SESSION_COOKIE_NAME,
			sessionToken,
			sessionCookieOptions,
		);

		return {
			actionResultType: ActionResultType.SUCCESS,
			sessionCookieData: newSessionCookieData,
			userPublicDoc,
		};
	} catch (error) {
		return actionErrorMessageGet("Error getting session");
	}
};
