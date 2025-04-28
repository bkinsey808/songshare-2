import { array, boolean, object, optional, record, string } from "valibot";

export const SongLogFormSchema = object({
	logId: string(),
	songId: string(),
	notes: string(),
	date: string(),
});

export const SongLogEntrySchema = object({
	logId: string(),
	notes: string(),
	date: string(),
	deleted: boolean(),
});

export const SongLogSchema = object({
	songId: string(),
	uid: string(),
	logs: record(
		string(),
		object({
			notes: string(),
			date: string(),
			deleted: optional(boolean()),
		}),
	),
	logIds: array(string()),
});
