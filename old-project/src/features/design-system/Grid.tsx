import {
	ButtonHTMLAttributes,
	ComponentProps,
	JSX,
	createContext,
	useContext,
} from "react";

import { cn } from "@/lib/utils";

type GridContextValue = {
	gridClassName: string;
};

const GridContext = createContext<GridContextValue>({} as GridContextValue);

/** @deprecated */
export const Grid = (
	props: ButtonHTMLAttributes<HTMLDivElement> & {
		/** gets applied to both the grid header and grid rows */
		readonly gridClassName: string;
	},
): JSX.Element => {
	return (
		<GridContext.Provider value={{ gridClassName: props.gridClassName }}>
			{props.children}
		</GridContext.Provider>
	);
};

/** @deprecated */
export const GridHeader = ({
	className,
	...props
}: ButtonHTMLAttributes<HTMLDivElement>): JSX.Element => {
	const { gridClassName } = useContext(GridContext);

	return (
		<div
			className={cn(
				"mb-[0.5rem] grid grid-flow-col gap-[0.5rem] border-b border-[currentColor] font-bold",
				gridClassName,
				className,
			)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
		/>
	);
};

type GridRowProps = ComponentProps<"div">;

/** @deprecated */
export const GridRow = ({ className, ...props }: GridRowProps): JSX.Element => {
	const { gridClassName } = useContext(GridContext);

	return (
		<div
			className={cn(
				"grid grid-flow-row gap-[0.5rem]",
				gridClassName,
				className,
			)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
		/>
	);
};
