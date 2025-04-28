import { StateCreator } from "zustand";

import { AppSlice, sliceResetFns } from "../app-store/useAppStore";
import { UserPublicDoc } from "../firebase/types";

type FollowingSliceState = {
	following: UserPublicDoc | null;
	/** following user id, the follower following the song leader */
	fuid: string | null;
};

const followingSliceInitialState: FollowingSliceState = {
	following: null,
	fuid: null,
};

export type FollowingSlice = FollowingSliceState & {
	setFollowing: (following: UserPublicDoc | null) => void;
	setFuid: (fuid: string | null) => void;
};

type AppFollowingSlice = StateCreator<AppSlice, [], [], FollowingSlice>;

export const createFollowingSlice: AppFollowingSlice = (set, _get) => {
	sliceResetFns.add(() => set(followingSliceInitialState));
	return {
		...followingSliceInitialState,
		setFollowing: (following) => set({ following }),
		setFuid: (fuid) => set({ fuid }),
	};
};
