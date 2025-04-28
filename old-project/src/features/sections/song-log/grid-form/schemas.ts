import { object, string, union } from "valibot";

import { SongLogGridSort } from "./consts";

export const SongLogGridFormSchema = object({
	sort: union(Object.values(SongLogGridSort).map((value) => string(value))),
	search: string(),
});
