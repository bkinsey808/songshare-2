"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ComponentProps, JSX } from "react";

import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

type AccordionItemProps = ComponentProps<typeof AccordionPrimitive.Item>;

export const AccordionItem = ({
	className,
	...props
}: AccordionItemProps): JSX.Element => (
	// eslint-disable-next-line react/jsx-props-no-spreading
	<AccordionPrimitive.Item className={cn("border-b", className)} {...props} />
);

type AccordioTriggerProps = ComponentProps<typeof AccordionPrimitive.Trigger>;

export const AccordionTrigger = ({
	className,
	children,
	...props
}: AccordioTriggerProps): JSX.Element => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			className={cn(
				"flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
				className,
			)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
		>
			{children}
			<ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
);

type AccordionContentProps = ComponentProps<typeof AccordionPrimitive.Content>;

export const AccordionContent = ({
	className,
	children,
	...props
}: AccordionContentProps): JSX.Element => (
	<AccordionPrimitive.Content
		className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
		// eslint-disable-next-line react/jsx-props-no-spreading
		{...props}
	>
		<div className={cn("pb-4 pt-0", className)}>{children}</div>
	</AccordionPrimitive.Content>
);
