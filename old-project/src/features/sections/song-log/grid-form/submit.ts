import { FormEvent } from "react";

import { AppSliceGet, AppSliceSet } from "@/features/app-store/types";

type Submit = (
	get: AppSliceGet,
	set: AppSliceSet,
) => (e: FormEvent<HTMLFormElement>) => Promise<void>;

export const submit: Submit = (get, set) => async (e) => {
	e.preventDefault();
	const { songLogGridForm } = get();

	if (!songLogGridForm) {
		console.error("no form");
		return;
	}

	return songLogGridForm.handleSubmit(async (songLogGridValues) => {
		const { sort, search } = songLogGridValues;
		set({
			songLogGridSort: sort,
			songLogGridSearch: search,
		});

		// reset isDirty back to false
		songLogGridForm.reset(
			{
				sort,
				search,
			},
			{ keepDirty: false },
		);
		return Promise.resolve();
	})();
};
