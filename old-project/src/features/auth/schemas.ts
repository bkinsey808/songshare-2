import { Schema as S } from "@effect/schema";
import {
	boolean,
	custom,
	minLength,
	nonEmpty,
	object,
	pipe,
	string,
} from "valibot";

import { role } from "./consts";

export const SessionCookieDataSchema = S.Struct({
	uid: S.String,
	email: S.String,
	username: S.Union(S.String, S.Null),
	picture: S.Union(S.String, S.Null),
	roles: S.Array(S.Literal(...Object.values(role))),
	sessionWarningTimestamp: S.Number,
});

export const RegistrationSchema = object({
	username: pipe(
		string(),
		nonEmpty("Username is required"),
		minLength(3, "Username must be at least 3 characters"),
	),
	acceptTermsAndConditions: pipe(
		boolean(),
		custom((value) => {
			return value === true;
		}, "You must accept the terms and conditions"),
	),
});
