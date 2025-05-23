"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";
import { ComponentProps, JSX } from "react";

import { cn } from "@/lib/utils";

export const Popover = PopoverPrimitive.Root;

export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverAnchor = PopoverPrimitive.Anchor;

type PopoverContentProps = ComponentProps<typeof PopoverPrimitive.Content>;

export const PopoverContent = ({
	className,
	align = "center",
	sideOffset = 4,
	...props
}: PopoverContentProps): JSX.Element => (
	<PopoverPrimitive.Portal>
		<PopoverPrimitive.Content
			align={align}
			sideOffset={sideOffset}
			className={cn(
				"z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				className,
			)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
		/>
	</PopoverPrimitive.Portal>
);
