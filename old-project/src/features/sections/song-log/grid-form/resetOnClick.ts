import { FormEvent } from "react";

import { songLogGridSortDefault } from "./consts";
import { AppSliceGet } from "@/features/app-store/types";

type ResetOnClick = (get: AppSliceGet) => () => void;

export const resetOnClick: ResetOnClick = (get) => () => {
	const { songLogGridForm, songLogGridFormSubmit } = get();
	songLogGridForm?.reset({
		sort: songLogGridSortDefault,
		search: "",
	});
	const formEvent = new Event("submit", {
		bubbles: true,
		cancelable: true,
	});
	void songLogGridFormSubmit(
		formEvent as unknown as FormEvent<HTMLFormElement>,
	);
};
