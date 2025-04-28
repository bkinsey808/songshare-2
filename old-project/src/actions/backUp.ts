"use server";

import { sessionCookieGet } from "./sessionCookieGet";
import { ActionResultType } from "@/features/app-store/consts";
import { db } from "@/features/firebase/firebaseServer";
import { backUpFormFieldKey } from "@/features/sections/admin/consts";
import { BackUpForm } from "@/features/sections/admin/types";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export const backUp = async ({
	fromPrefix,
	toPrefix,
}: BackUpForm): Promise<
	| {
			actionResultType: "SUCCESS";
	  }
	| {
			actionResultType: "ERROR";
			fieldErrors?: Record<string, string[]>;
	  }
> => {
	try {
		if (!fromPrefix || !toPrefix) {
			return {
				actionResultType: ActionResultType.ERROR,
				fieldErrors: { root: ["Prefixes are required"] },
			};
		}
		if (toPrefix === fromPrefix) {
			return {
				actionResultType: ActionResultType.ERROR,
				fieldErrors: { root: ["Cannot overwrite same prefix"] },
			};
		}
		if (toPrefix === "production") {
			return {
				actionResultType: ActionResultType.ERROR,
				fieldErrors: {
					[backUpFormFieldKey.TO_PREFIX]: ["Cannot overwrite production"],
				},
			};
		}

		const cookieResult = await sessionCookieGet();

		if (cookieResult.actionResultType === ActionResultType.ERROR) {
			return {
				actionResultType: ActionResultType.ERROR,
				fieldErrors: { root: ["Session expired"] },
			};
		}

		const collections = await db.listCollections();
		const collectionNames = collections
			.map((collection) => collection.id)
			.filter((collectionName) => collectionName.startsWith(fromPrefix));

		if (collectionNames.length === 0) {
			return {
				actionResultType: ActionResultType.ERROR,
				fieldErrors: {
					[backUpFormFieldKey.FROM_PREFIX]: [
						"No collections with from prefix found",
					],
				},
			};
		}

		const collectionPromises = collectionNames.map((collectionName) => {
			const collectionNameWithoutPrefix = collectionName.replace(
				`${fromPrefix}_`,
				"",
			);
			const fromCollection = collectionName;

			const toCollection = `${toPrefix}_${collectionNameWithoutPrefix}`;
			return db
				.collection(fromCollection)
				.get()
				.then((snapshot) => {
					const promises = snapshot.docs.map((innerDoc) => {
						const data = innerDoc.data();
						return db.collection(toCollection).doc(innerDoc.id).set(data);
					});
					return Promise.all(promises);
				});
		});
		const result = await Promise.allSettled(collectionPromises);
		const failedCollections = result.filter(
			(innerResult) => innerResult.status === "rejected",
		);
		if (failedCollections.length > 0) {
			return {
				actionResultType: ActionResultType.ERROR,
				fieldErrors: { root: ["Failed to backup collections"] },
			};
		}

		return { actionResultType: ActionResultType.SUCCESS };
	} catch (error) {
		console.error(error);
		return {
			actionResultType: ActionResultType.ERROR,
			fieldErrors: { root: ["Error backing up database"] },
		};
	}
};
