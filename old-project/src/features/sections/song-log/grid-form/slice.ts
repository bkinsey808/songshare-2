import { FormEvent } from "react";
import { UseFormReturn } from "react-hook-form";
import { StateCreator } from "zustand";

import { songLogGridSortDefault } from "./consts";
import { resetOnClick } from "./resetOnClick";
import { submit } from "./submit";
import type {
	SongLogGridForm,
	SongLogGridSort as SongLogGridSortType,
} from "./types";
import { AppSlice, sliceResetFns } from "@/features/app-store/useAppStore";

type SongLogGridFormSliceState = {
	songLogGridSort: SongLogGridSortType;
	songLogGridSearch: string;
	songLogGridForm: UseFormReturn<SongLogGridForm> | null;
};

const songLogGridSliceInitialState: SongLogGridFormSliceState = {
	songLogGridSort: songLogGridSortDefault,
	songLogGridSearch: "",
	songLogGridForm: null,
};

export type SongLogGridFormSlice = SongLogGridFormSliceState & {
	songLogGridSortSet: (sort: SongLogGridSortType) => () => void;
	songLogGridFormSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
	songLogGridFormSet: (form: UseFormReturn<SongLogGridForm>) => void;
	songLogGridFormResetOnClick: () => void;
};

type AppSongLogGridSlice = StateCreator<AppSlice, [], [], SongLogGridFormSlice>;

const songLogGridFormSliceInitialState: SongLogGridFormSliceState = {
	songLogGridSort: songLogGridSortDefault,
	songLogGridSearch: "",
	songLogGridForm: null,
};

export const createSongLogGridFormSlice: AppSongLogGridSlice = (set, get) => {
	sliceResetFns.add(() => set(songLogGridSliceInitialState));
	return {
		...songLogGridFormSliceInitialState,
		songLogGridSortSet: (sort) => () => {
			set({
				songLogGridSort: sort,
			});
		},
		songLogGridFormSubmit: submit(get, set),
		songLogGridFormSet: (form) => set({ songLogGridForm: form }),
		songLogGridFormResetOnClick: resetOnClick(get),
	};
};
