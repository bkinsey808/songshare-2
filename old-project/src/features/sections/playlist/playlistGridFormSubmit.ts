import { FormEvent } from "react";

import { playlistGridSave } from "@/actions/playlistGridSave";
import { toast } from "@/components/ui/use-toast";
import { ActionResultType } from "@/features/app-store/consts";
import { AppSliceGet, AppSliceSet } from "@/features/app-store/types";
import { useAppStore } from "@/features/app-store/useAppStore";
import { getKeys } from "@/features/global/getKeys";

type PlaylistGridFormSubmit = (
	get: AppSliceGet,
	set: AppSliceSet,
) => (e?: FormEvent<HTMLFormElement>) => Promise<void>;

export const playlistGridFormSubmit: PlaylistGridFormSubmit =
	(get, set) => (e) => {
		e?.preventDefault();
		const { playlistGridForm } = get();

		if (!playlistGridForm) {
			console.error("no form");
			return Promise.resolve();
		}

		return playlistGridForm.handleSubmit(
			async (playlistGridFormValues) => {
				set({ playlistFormIsDisabled: true });
				const { sessionCookieData } = useAppStore.getState();

				if (!sessionCookieData) {
					toast({
						variant: "destructive",
						title: "Please sign in again",
					});
					return;
				}

				const { playlistId, playlistIsUnsavedSet } = get();
				const playstGridFormSaveResult = await playlistGridSave({
					playlistGridFormValues,
					playlistId,
				});
				playlistIsUnsavedSet(false);

				switch (playstGridFormSaveResult.actionResultType) {
					case ActionResultType.ERROR:
						const keys = playstGridFormSaveResult.fieldErrors
							? getKeys(playstGridFormSaveResult.fieldErrors)
							: undefined;
						keys?.forEach((key) => {
							const message = playstGridFormSaveResult.fieldErrors?.[key]?.[0];
							if (!message) {
								return;
							}
							playlistGridForm.setError(key, {
								type: "manual",
								message,
							});
						});
						toast({
							variant: "destructive",
							title: "There was an error saving playlist grid",
						});

						break;
					case ActionResultType.SUCCESS:
						playlistGridForm.reset(playlistGridFormValues);
						toast({ title: "Playlist grid saved" });
						break;
				}
			},
			(args) => {
				console.error("invalid", args);
			},
		)(e);
	};
