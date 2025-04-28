import { Timestamp } from "firebase/firestore";
import { DateTime } from "luxon";

export const timestamp2iso = (
	timestamp: Timestamp | undefined,
	timeZone: string,
): string | undefined => {
	if (timestamp === undefined) {
		return undefined;
	}
	const date = timestamp.toDate();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	const dt = DateTime.fromJSDate(date);
	if (!dt.isValid) {
		throw new Error("Invalid DateTime object");
	}

	const zonedDt = dt.setZone(timeZone);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	if (!zonedDt.isValid) {
		throw new Error("Invalid Time Zone");
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	const isoString: string | null = zonedDt.toISO();

	if (isoString === null) {
		throw new Error("Failed to convert DateTime object to ISO string");
	}

	return isoString;
};

// Example usage:
// const exampleTimestamp = Timestamp.fromDate(new Date("2024-10-05T20:17:00Z"));
// const targetTimeZone = "Asia/Tokyo";
// const isoStringWithOffset = firestoreTimestampToISOWithOffset(
// 	exampleTimestamp,
// 	targetTimeZone,
// );

// console.log(isoStringWithOffset); // Outputs something like "2024-10-06T05:17:00+09:00"
