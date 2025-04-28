"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { ComponentProps, JSX } from "react";

import { cn } from "@/lib/utils";

type RadioGroupProps = ComponentProps<typeof RadioGroupPrimitive.Root>;
export const RadioGroup = ({
	className,
	...props
}: RadioGroupProps): JSX.Element => {
	return (
		<RadioGroupPrimitive.Root
			className={cn("grid gap-2", className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
		/>
	);
};

type RadioGroupItemProps = ComponentProps<typeof RadioGroupPrimitive.Item>;

export const RadioGroupItem = ({
	className,
	...props
}: RadioGroupItemProps): JSX.Element => {
	return (
		<RadioGroupPrimitive.Item
			className={cn(
				"aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
		>
			<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
				<CheckIcon className="h-3.5 w-3.5 fill-primary" />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
};
