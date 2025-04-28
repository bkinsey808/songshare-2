"use client";

import { useParams } from "next/navigation";
import { JSX, ReactNode } from "react";

import { useFollowingSubscription } from "@/features/firebase/useFollowingSubscription";
import { useLibrarySubscription } from "@/features/firebase/useLibrarySubscription";
import { useUserLibrarySubscription } from "@/features/sections/user-library/useUserLibrarySubscription";

export const FollowingProvider = ({
	children,
}: {
	readonly children: ReactNode;
}): JSX.Element => {
	const params = useParams();
	const fuid = params.fuid as string;
	useFollowingSubscription(fuid);
	useLibrarySubscription();
	useUserLibrarySubscription();

	return <>{children}</>;
};
