/* eslint-disable camelcase */
import { add, format } from "date-fns";
import { type Locale, enUS } from "date-fns/locale";
import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { Clock } from "lucide-react";
import { DateTime } from "luxon";
import * as React from "react";
import { ComponentProps, JSX, Ref, useImperativeHandle, useRef } from "react";
import { DayPicker } from "react-day-picker";

import { Button, buttonVariants } from "@/components/ui/button";
import type { CalendarProps } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { appDateTimeFormat } from "@/features/time-zone/consts";
import { cn } from "@/lib/utils";

// ---------- utils start ----------
/**
 * regular expression to check for valid hour format (01-23)
 */
function isValidHour(value: string): boolean {
	return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value);
}

/**
 * regular expression to check for valid 12 hour format (01-12)
 */
function isValid12Hour(value: string): boolean {
	return /^(0[1-9]|1[0-2])$/.test(value);
}

/**
 * regular expression to check for valid minute format (00-59)
 */
function isValidMinuteOrSecond(value: string): boolean {
	return /^[0-5][0-9]$/.test(value);
}

type GetValidNumberConfig = { max: number; min?: number; loop?: boolean };

function getValidNumber(
	value: string,
	{ max, min = 0, loop = false }: GetValidNumberConfig,
): string {
	let numericValue = parseInt(value, 10);

	if (!Number.isNaN(numericValue)) {
		if (!loop) {
			if (numericValue > max) numericValue = max;
			if (numericValue < min) numericValue = min;
		} else {
			if (numericValue > max) numericValue = min;
			if (numericValue < min) numericValue = max;
		}
		return numericValue.toString().padStart(2, "0");
	}

	return "00";
}

function getValidHour(value: string): string {
	if (isValidHour(value)) return value;
	return getValidNumber(value, { max: 23 });
}

function getValid12Hour(value: string): string {
	if (isValid12Hour(value)) return value;
	return getValidNumber(value, { min: 1, max: 12 });
}

function getValidMinuteOrSecond(value: string): string {
	if (isValidMinuteOrSecond(value)) return value;
	return getValidNumber(value, { max: 59 });
}

type GetValidArrowNumberConfig = {
	min: number;
	max: number;
	step: number;
};

function getValidArrowNumber(
	value: string,
	{ min, max, step }: GetValidArrowNumberConfig,
): string {
	let numericValue = parseInt(value, 10);
	if (!Number.isNaN(numericValue)) {
		numericValue += step;
		return getValidNumber(String(numericValue), { min, max, loop: true });
	}
	return "00";
}

function getValidArrowHour(value: string, step: number): string {
	return getValidArrowNumber(value, { min: 0, max: 23, step });
}

function getValidArrow12Hour(value: string, step: number): string {
	return getValidArrowNumber(value, { min: 1, max: 12, step });
}

function getValidArrowMinuteOrSecond(value: string, step: number): string {
	return getValidArrowNumber(value, { min: 0, max: 59, step });
}

function setMinutes(date: Date, value: string): Date {
	const minutes = getValidMinuteOrSecond(value);
	date.setMinutes(parseInt(minutes, 10));
	return date;
}

function setSeconds(date: Date, value: string): Date {
	const seconds = getValidMinuteOrSecond(value);
	date.setSeconds(parseInt(seconds, 10));
	return date;
}

function setHours(date: Date, value: string): Date {
	const hours = getValidHour(value);
	date.setHours(parseInt(hours, 10));
	return date;
}

function set12Hours(date: Date, value: string, period: Period): Date {
	const hours = parseInt(getValid12Hour(value), 10);
	const convertedHours = convert12HourTo24Hour(hours, period);
	date.setHours(convertedHours);
	return date;
}

type TimePickerType = "minutes" | "seconds" | "hours" | "12hours";
type Period = "AM" | "PM";

function setDateByType(
	date: Date,
	value: string,
	type: TimePickerType,
	period?: Period,
): Date {
	switch (type) {
		case "minutes":
			return setMinutes(date, value);
		case "seconds":
			return setSeconds(date, value);
		case "hours":
			return setHours(date, value);
		case "12hours": {
			if (!period) return date;
			return set12Hours(date, value, period);
		}
		default:
			return date;
	}
}

function getDateByType(date: Date | null, type: TimePickerType): string {
	if (!date) return "00";
	switch (type) {
		case "minutes":
			return getValidMinuteOrSecond(String(date.getMinutes()));
		case "seconds":
			return getValidMinuteOrSecond(String(date.getSeconds()));
		case "hours":
			return getValidHour(String(date.getHours()));
		case "12hours":
			return getValid12Hour(String(display12HourValue(date.getHours())));
		default:
			return "00";
	}
}

function getArrowByType(
	value: string,
	step: number,
	type: TimePickerType,
): string {
	switch (type) {
		case "minutes":
			return getValidArrowMinuteOrSecond(value, step);
		case "seconds":
			return getValidArrowMinuteOrSecond(value, step);
		case "hours":
			return getValidArrowHour(value, step);
		case "12hours":
			return getValidArrow12Hour(value, step);
		default:
			return "00";
	}
}

/**
 * handles value change of 12-hour input
 * 12:00 PM is 12:00
 * 12:00 AM is 00:00
 */
function convert12HourTo24Hour(hour: number, period: Period): number {
	if (period === "PM") {
		if (hour <= 11) {
			return hour + 12;
		}
		return hour;
	}

	if (period === "AM") {
		if (hour === 12) return 0;
		return hour;
	}
	return hour;
}

/**
 * time is stored in the 24-hour form,
 * but needs to be displayed to the user
 * in its 12-hour representation
 */
function display12HourValue(hours: number): string {
	if (hours === 0 || hours === 12) return "12";
	if (hours >= 22) return `${hours - 12}`;
	if (hours % 12 > 9) return `${hours}`;
	return `0${hours % 12}`;
}

function genMonths(
	locale: Pick<Locale, "options" | "localize" | "formatLong">,
): { value: number; label: string }[] {
	return Array.from({ length: 12 }, (_, i) => ({
		value: i,
		label: format(new Date(2021, i), "MMMM", { locale }),
	}));
}

function genYears(yearRange = 50): { value: number; label: string }[] {
	const today = new Date();
	return Array.from({ length: yearRange * 2 + 1 }, (_, i) => ({
		value: today.getFullYear() - yearRange + i,
		label: (today.getFullYear() - yearRange + i).toString(),
	}));
}

// ---------- utils end ----------

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	yearRange = 50,
	...props
}: CalendarProps & { readonly yearRange?: number }): JSX.Element {
	const MONTHS = React.useMemo(() => {
		let locale: Pick<Locale, "options" | "localize" | "formatLong"> = enUS;
		const { options, localize, formatLong } = props.locale ?? {};
		if (options && localize && formatLong) {
			locale = {
				options,
				localize,
				formatLong,
			};
		}
		return genMonths(locale);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const YEARS = React.useMemo(() => genYears(yearRange), []);

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn("p-3", className)}
			classNames={{
				months:
					"flex flex-col sm:flex-row space-y-4  sm:space-y-0 justify-center",
				month: "flex flex-col items-center space-y-4",
				month_caption: "flex justify-center pt-1 relative items-center",
				caption_label: "text-sm font-medium",
				nav: "space-x-1 flex items-center ",
				button_previous: cn(
					buttonVariants({ variant: "outline" }),
					"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-5 top-5",
				),
				button_next: cn(
					buttonVariants({ variant: "outline" }),
					"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-5 top-5",
				),
				month_grid: "w-full border-collapse space-y-1",
				weekdays: cn("flex", props.showWeekNumber && "justify-end"),
				weekday:
					"text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
				week: "flex w-full mt-2",
				day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 rounded-1",
				day_button: cn(
					buttonVariants({ variant: "ghost" }),
					"h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-l-md rounded-r-md",
				),
				range_end: "day-range-end",
				selected:
					"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-l-md rounded-r-md",
				today: "bg-accent text-accent-foreground",
				outside:
					"day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
				disabled: "text-muted-foreground opacity-50",
				range_middle:
					"aria-selected:bg-accent aria-selected:text-accent-foreground",
				hidden: "invisible",
				...classNames,
			}}
			components={{
				Chevron: ({ ...innerProps }) =>
					innerProps.orientation === "left" ? (
						<ChevronLeft className="h-4 w-4" />
					) : (
						<ChevronRight className="h-4 w-4" />
					),
				MonthCaption: ({ calendarMonth }) => {
					return (
						<div className="inline-flex gap-2">
							<Select
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
								defaultValue={calendarMonth.date.getMonth().toString()}
								onValueChange={(value) => {
									// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
									const newDate = new Date(calendarMonth.date);
									newDate.setMonth(Number.parseInt(value, 10));
									props.onMonthChange?.(newDate);
								}}
							>
								<SelectTrigger className="w-fit gap-1 border-none p-0 focus:bg-accent focus:text-accent-foreground">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{MONTHS.map((month) => (
										<SelectItem
											key={month.value}
											value={month.value.toString()}
										>
											{month.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Select
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
								defaultValue={calendarMonth.date.getFullYear().toString()}
								onValueChange={(value) => {
									// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
									const newDate = new Date(calendarMonth.date);
									newDate.setFullYear(Number.parseInt(value, 10));
									props.onMonthChange?.(newDate);
								}}
							>
								<SelectTrigger className="w-fit gap-1 border-none p-0 focus:bg-accent focus:text-accent-foreground">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{YEARS.map((year) => (
										<SelectItem key={year.value} value={year.value.toString()}>
											{year.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					);
				},
			}}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
		/>
	);
}
Calendar.displayName = "Calendar";

type PeriodSelectorProps = {
	readonly period: Period;
	readonly setPeriod?: (m: Period) => void;
	readonly date?: Date | null;
	readonly onDateChange?: (date: Date | undefined) => void;
	readonly onRightFocus?: () => void;
	readonly onLeftFocus?: () => void;
	readonly ref?: ComponentProps<typeof SelectTrigger>["ref"];
};

const TimePeriodSelect = ({
	period,
	setPeriod,
	date,
	onDateChange,
	onLeftFocus,
	onRightFocus,
	ref,
}: PeriodSelectorProps): JSX.Element => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
		if (e.key === "ArrowRight") onRightFocus?.();
		if (e.key === "ArrowLeft") onLeftFocus?.();
	};

	const handleValueChange = (value: Period): void => {
		setPeriod?.(value);

		/**
		 * trigger an update whenever the user switches between AM and PM;
		 * otherwise user must manually change the hour each time
		 */
		if (date) {
			const tempDate = new Date(date);
			const hours = display12HourValue(date.getHours());
			onDateChange?.(
				setDateByType(
					tempDate,
					hours.toString(),
					"12hours",
					period === "AM" ? "PM" : "AM",
				),
			);
		}
	};

	return (
		<div className="flex h-10 items-center">
			<Select
				defaultValue={period}
				onValueChange={(value: Period) => handleValueChange(value)}
			>
				<SelectTrigger
					ref={ref}
					className="w-[65px] focus:bg-accent focus:text-accent-foreground"
					onKeyDown={handleKeyDown}
				>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="AM">AM</SelectItem>
					<SelectItem value="PM">PM</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

type TimePickerInputProps = {
	readonly picker: TimePickerType;
	readonly date?: Date | null;
	readonly onDateChange?: ((date: Date | undefined) => void) | undefined;
	readonly period?: Period;
	readonly onRightFocus?: () => void;
	readonly onLeftFocus?: () => void;
} & ComponentProps<typeof Input>;

const TimePickerInput = ({
	className,
	type = "tel",
	value,
	id,
	name,
	date = new Date(new Date().setHours(0, 0, 0, 0)),
	onDateChange,
	onChange,
	onKeyDown,
	picker,
	period,
	onLeftFocus,
	onRightFocus,
	ref,
	...props
}: TimePickerInputProps): JSX.Element => {
	const [flag, setFlag] = React.useState<boolean>(false);
	const [prevIntKey, setPrevIntKey] = React.useState<string>("0");

	/**
	 * allow the user to enter the second digit within 2 seconds
	 * otherwise start again with entering first digit
	 */
	React.useEffect(() => {
		if (flag) {
			const timer = setTimeout(() => {
				setFlag(false);
			}, 2000);

			return (): void => {
				clearTimeout(timer);
			};
		}
	}, [flag]);

	const calculatedValue = React.useMemo(() => {
		return getDateByType(date, picker);
	}, [date, picker]);

	const calculateNewValue = (key: string): string => {
		/*
		 * If picker is '12hours' and the first digit is 0, then the second digit is automatically set to 1.
		 * The second entered digit will break the condition and the value will be set to 10-12.
		 */
		if (picker === "12hours") {
			if (flag && calculatedValue.slice(1, 2) === "1" && prevIntKey === "0")
				return `0${key}`;
		}

		return !flag ? `0${key}` : calculatedValue.slice(1, 2) + key;
	};

	// eslint-disable-next-line complexity
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
	): JSX.Element | undefined => {
		if (e.key === "Tab") return;
		e.preventDefault();
		if (e.key === "ArrowRight") onRightFocus?.();
		if (e.key === "ArrowLeft") onLeftFocus?.();
		if (["ArrowUp", "ArrowDown"].includes(e.key)) {
			const step = e.key === "ArrowUp" ? 1 : -1;
			const newValue = getArrowByType(calculatedValue, step, picker);
			if (flag) setFlag(false);
			const tempDate = date ? new Date(date) : new Date();
			onDateChange?.(setDateByType(tempDate, newValue, picker, period));
		}
		if (e.key >= "0" && e.key <= "9") {
			if (picker === "12hours") setPrevIntKey(e.key);

			const newValue = calculateNewValue(e.key);
			if (flag) onRightFocus?.();
			setFlag((prev) => !prev);
			const tempDate = date ? new Date(date) : new Date();
			onDateChange?.(setDateByType(tempDate, newValue, picker, period));
		}
	};

	return (
		<Input
			ref={ref}
			id={id ?? picker}
			name={name ?? picker}
			className={cn(
				"w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none",
				className,
			)}
			value={value ?? calculatedValue}
			onChange={(e) => {
				e.preventDefault();
				onChange?.(e);
			}}
			type={type}
			inputMode="decimal"
			onKeyDown={(e) => {
				onKeyDown?.(e);
				handleKeyDown(e);
			}}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
		/>
	);
};

TimePickerInput.displayName = "TimePickerInput";

type TimePickerProps = {
	readonly date?: Date | null;
	readonly onChange?: ((date: Date | undefined) => void) | undefined;
	readonly hourCycle?: 12 | 24;
	/**
	 * Determines the smallest unit that is displayed in the datetime picker.
	 * Default is 'second'.
	 * */
	readonly granularity?: Granularity;
	readonly ref?: TimePickerRef;
};

type TimePickerRef = Ref<{
	minuteRef: HTMLInputElement | null;
	hourRef: HTMLInputElement | null;
	secondRef: HTMLInputElement | null;
}>;

// eslint-disable-next-line complexity
const TimePicker = ({
	date,
	onChange,
	hourCycle = 24,
	granularity = "second",
	ref,
}: TimePickerProps): JSX.Element => {
	const minuteRef = React.useRef<HTMLInputElement>(null);
	const hourRef = React.useRef<HTMLInputElement>(null);
	const secondRef = React.useRef<HTMLInputElement>(null);
	const periodRef = React.useRef<HTMLButtonElement>(null);
	const [period, setPeriod] = React.useState<Period>(
		date && date.getHours() >= 12 ? "PM" : "AM",
	);

	useImperativeHandle(
		ref,
		() => ({
			minuteRef: minuteRef.current,
			hourRef: hourRef.current,
			secondRef: secondRef.current,
			periodRef: periodRef.current,
		}),
		[minuteRef, hourRef, secondRef],
	);

	return (
		<div className="flex items-center justify-center gap-2">
			<label htmlFor="datetime-picker-hour-input" className="cursor-pointer">
				<Clock className="mr-2 h-4 w-4" />
			</label>
			<TimePickerInput
				picker={hourCycle === 24 ? "hours" : "12hours"}
				date={date ?? null}
				id="datetime-picker-hour-input"
				onDateChange={onChange}
				ref={hourRef}
				period={period}
				onRightFocus={() => minuteRef?.current?.focus()}
			/>
			{(granularity === "minute" || granularity === "second") && (
				<>
					:
					<TimePickerInput
						picker="minutes"
						date={date ?? null}
						onDateChange={onChange}
						ref={minuteRef}
						onLeftFocus={() => hourRef?.current?.focus()}
						onRightFocus={() => secondRef?.current?.focus()}
					/>
				</>
			)}
			{granularity === "second" && (
				<>
					:
					<TimePickerInput
						picker="seconds"
						date={date ?? null}
						onDateChange={onChange}
						ref={secondRef}
						onLeftFocus={() => minuteRef?.current?.focus()}
						onRightFocus={() => periodRef?.current?.focus()}
					/>
				</>
			)}
			{hourCycle === 12 && (
				<div className="grid gap-1 text-center">
					<TimePeriodSelect
						period={period}
						setPeriod={setPeriod}
						date={date ?? null}
						onDateChange={(innerDate) => {
							onChange?.(innerDate);
							if (innerDate && innerDate?.getHours() >= 12) {
								setPeriod("PM");
							} else {
								setPeriod("AM");
							}
						}}
						ref={periodRef}
						onLeftFocus={() => secondRef?.current?.focus()}
					/>
				</div>
			)}
		</div>
	);
};

type Granularity = "day" | "hour" | "minute" | "second";

type DateTimePickerProps = {
	readonly value?: Date | undefined;
	readonly onChange?: (date: Date | undefined) => void;
	readonly disabled?: boolean;
	/** showing `AM/PM` or not. */
	readonly hourCycle?: 12 | 24;
	readonly placeholder?: string;
	/**
	 * The year range will be: `This year + yearRange` and `this year - yearRange`.
	 * Default is 50.
	 * For example:
	 * This year is 2024, The year dropdown will be 1974 to 2024 which is generated by `2024 - 50 = 1974` and `2024 + 50 = 2074`.
	 * */
	readonly yearRange?: number;
	/**
	 * The format is derived from the `date-fns` documentation.
	 * @reference https://date-fns.org/v3.6.0/docs/format
	 **/
	readonly displayFormat?: { hour24?: string; hour12?: string };
	/**
	 * The granularity prop allows you to control the smallest unit that is displayed by DateTimePicker.
	 * By default, the value is `second` which shows all time inputs.
	 **/
	readonly granularity?: Granularity;
	readonly className?: string;
	readonly ref?: DateTimePickerRef | undefined;
} & Pick<
	CalendarProps,
	"locale" | "weekStartsOn" | "showWeekNumber" | "showOutsideDays"
>;

export type DateTimePickerRef = Ref<
	{
		value?: Date;
	} & Omit<ComponentProps<"input">, "value">
>;

export const DateTimePicker = ({
	locale = enUS,
	value,
	onChange,
	hourCycle = 24,
	yearRange = 50,
	disabled = false,
	// displayFormat,
	granularity = "second",
	placeholder = "Pick a date",
	className,
	ref,
	...props
}: DateTimePickerProps): JSX.Element => {
	const [month, setMonth] = React.useState<Date>(value ?? new Date());
	const buttonRef = useRef<HTMLButtonElement>(null);
	/**
	 * carry over the current time when a user clicks a new day
	 * instead of resetting to 00:00
	 */
	const handleSelect = (newDay: Date | undefined): void => {
		if (!newDay) return;
		if (!value) {
			onChange?.(newDay);
			setMonth(newDay);
			return;
		}
		const diff = newDay.getTime() - value.getTime();
		const diffInDays = diff / (1000 * 60 * 60 * 24);
		const newDateFull = add(value, { days: Math.ceil(diffInDays) });
		onChange?.(newDateFull);
		setMonth(newDateFull);
	};

	useImperativeHandle(
		ref,
		() =>
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			({
				...buttonRef.current,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				value: value as any,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			}) as any,
		[value],
	);

	// const initHourFormat = {
	// 	hour24:
	// 		displayFormat?.hour24 ??
	// 		`PPP HH:mm${!granularity || granularity === "second" ? ":ss" : ""}`,
	// 	hour12:
	// 		displayFormat?.hour12 ??
	// 		`PP hh:mm${!granularity || granularity === "second" ? ":ss" : ""} b`,
	// };

	// let loc = enUS;
	// const { options, localize, formatLong } = locale;
	// if (options && localize && formatLong) {
	// 	loc = {
	// 		...enUS,
	// 		options,
	// 		localize,
	// 		formatLong,
	// 	};
	// }

	const dt = value ? DateTime.fromJSDate(value) : undefined;
	const valueFormatted = dt ? dt.toFormat(appDateTimeFormat) : undefined;

	return (
		<Popover>
			<PopoverTrigger asChild disabled={disabled}>
				<Button
					variant="outline"
					className={cn(
						"w-full justify-start text-left font-normal",
						!value && "text-muted-foreground",
						className,
					)}
					ref={buttonRef}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					<span suppressHydrationWarning={true}>
						{value ? valueFormatted : <span>{placeholder}</span>}
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={value}
					month={month}
					onSelect={(d) => handleSelect(d)}
					onMonthChange={handleSelect}
					yearRange={yearRange}
					locale={locale}
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...props}
				/>
				{granularity !== "day" && (
					<div className="border-t border-border p-3">
						<TimePicker
							onChange={onChange}
							date={value ?? null}
							hourCycle={hourCycle}
							granularity={granularity}
						/>
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
};
