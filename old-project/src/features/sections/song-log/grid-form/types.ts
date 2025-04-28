import { InferOutput } from "valibot";

import { SongLogGridSort } from "./consts";
import { SongLogGridFormSchema } from "./schemas";

export type SongLogGridForm = InferOutput<typeof SongLogGridFormSchema> & {
	sort: SongLogGridSort;
};

export type SongLogGridSort =
	(typeof SongLogGridSort)[keyof typeof SongLogGridSort];
