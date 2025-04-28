import { DateTime } from "luxon";

/** takes an iso date and timezone and returns converted iso */
export const isoTimeZone2iso = (
	isoString: string | undefined,
	targetTimeZone: string,
): string | undefined => {
	if (isoString === undefined) {
		return undefined;
	}

	// Parse the original ISO string
	const dt = DateTime.fromISO(isoString);

	// Convert to the target timezone
	const dtInTargetZone = dt.setZone(targetTimeZone);

	// Return the new ISO string with the correct offset
	return dtInTargetZone.toISO() ?? undefined;
};
