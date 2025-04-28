import { InferOutput } from "valibot";

import { Collection } from "./consts";
import { UserDocSchema, UserPublicDocSchema } from "./schemas";

export type UserDoc = InferOutput<typeof UserDocSchema>;
export type UserPublicDoc = InferOutput<typeof UserPublicDocSchema>;

export type Collection = (typeof Collection)[keyof typeof Collection];
