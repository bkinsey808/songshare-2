"use client";

import { JSX, ReactNode, useCallback, useEffect } from "react";

import { AccountDeleteConfirmModal } from "./AccountDeleteConfirmModal";
import { AccountManageModal } from "./AccountManageModal";
import { RegisterModal } from "./RegisterModal";
import { SessionExpireWarningModal } from "./SessionExpireWarningModal";
import { SessionExpiredModal } from "./SessionExpiredModal";
import { SESSION_POLLING_INTERVAL_SECONDS } from "./consts";
import { sessionCookieGet } from "@/actions/sessionCookieGet";
import { ActionResultType } from "@/features/app-store/consts";
import { useAppStore } from "@/features/app-store/useAppStore";
import { useInterval } from "@/features/global/useInterval";
import { appModal } from "@/features/modal/consts";

export const AuthProvider = ({
	children,
}: {
	readonly children: ReactNode;
}): JSX.Element => {
	const {
		openAppModal,
		setOpenAppModal,
		signIn,
		isSignedIn,
		// lastSignInCheck,
		setLastSignInCheck,
		signOut,
		sessionCookieData,
	} = useAppStore();

	const handleRefresh = useCallback(async () => {
		const cookieResult = await sessionCookieGet();

		if (cookieResult.actionResultType === ActionResultType.ERROR) {
			signOut();
			setOpenAppModal(null);
			return;
		}

		setOpenAppModal(null);
		signIn(cookieResult.sessionCookieData);
	}, [setOpenAppModal, signIn, signOut]);

	// const existingSessionWarningTimestamp =
	// 	sessionCookieData?.sessionWarningTimestamp ?? 0;

	// handle refresh
	useEffect(() => {
		void handleRefresh();
	}, [handleRefresh]);

	const intervalFn = useCallback(async () => {
		// // we only need to poll if we haven't recently checked
		// if (
		// 	Date.now() - lastSignInCheck <
		// 	SESSION_POLLING_INTERVAL_SECONDS * 1000
		// ) {
		// 	if (openAppModal === appModal.SESSION_EXPIRE_WARNING) {
		// 		setOpenAppModal(null);
		// 	}
		// 	return;
		// }

		const freshSessionCookieData = await sessionCookieGet();

		if (!freshSessionCookieData) {
			signOut();
			setOpenAppModal(appModal.SESSION_EXPIRED);
			return;
		}

		// console.log(
		// 	`old diff: ${(existingSessionWarningTimestamp - Date.now()) / 1000}`,
		// );

		// if (existingSessionWarningTimestamp < Date.now()) {
		// 	setOpenAppModal(appModal.SESSION_EXPIRE_WARNING);
		// 	return;
		// }

		// if (openAppModal === appModal.SESSION_EXPIRE_WARNING) {
		// 	setOpenAppModal(null);
		// }

		setLastSignInCheck(Date.now());
	}, [
		// lastSignInCheck,
		setLastSignInCheck,
		signOut,
		setOpenAppModal,
		// existingSessionWarningTimestamp,
		// openAppModal,
	]);

	useInterval(
		() => {
			void intervalFn();
		},
		isSignedIn ? SESSION_POLLING_INTERVAL_SECONDS * 1000 : null,
	);

	useEffect(() => {
		if (
			(!sessionCookieData || !isSignedIn) &&
			openAppModal === appModal.SESSION_EXPIRE_WARNING
		) {
			setOpenAppModal(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sessionCookieData, isSignedIn, setOpenAppModal]);

	return (
		<>
			<AccountManageModal />
			<AccountDeleteConfirmModal />
			<RegisterModal />
			<SessionExpiredModal />
			<SessionExpireWarningModal />

			{children}
		</>
	);
};
