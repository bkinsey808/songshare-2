"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { DateTime } from "luxon";
import { JSX, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { SettingsSchema } from "./schemas";
import { Settings } from "./types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { useAppStore } from "@/features/app-store/useAppStore";

export const SettingsForm = (): JSX.Element => {
	const timezoneOptions = useMemo(() => {
		return Intl.supportedValuesOf("timeZone").map((timeZone) => {
			const dt = DateTime.local().setZone(timeZone);
			const shortName = dt.toFormat("ZZZ"); // Short timezone name
			const longName = dt.toFormat("ZZZZ"); // Long timezone name

			return {
				value: timeZone,
				label: timeZone.replace(/_/g, " ").replace(/\//g, " / "),
				search:
					`${shortName}: ${timeZone} (${longName}) <${dt.toFormat("fff")}>`.toLocaleLowerCase(),
			};
		});
	}, []);

	const [search, setSearch] = useState("");

	const { settingsSubmit, settingsFormSet, timeZone } = useAppStore();

	const form = useForm<Settings>({
		resolver: valibotResolver(SettingsSchema),
		defaultValues: {
			useSystemTimeZone: !timeZone,
			timeZone: timeZone ?? undefined,
		},
	});

	// set settings form
	useEffect(() => {
		if (form) {
			settingsFormSet(form);
		}
	}, [form, settingsFormSet]);

	const { useSystemTimeZone } = form.getValues();
	useEffect(() => {
		if (useSystemTimeZone) {
			form.setValue("timeZone", undefined);
		}
	}, [form, useSystemTimeZone]);

	return (
		<Form form={form}>
			<form onSubmit={settingsSubmit}>
				<div className="flex gap-[2rem]">
					<FormField
						name="useSystemTimeZone"
						control={form.control}
						render={({
							field: { name, onBlur, onChange, ref, value, disabled },
						}) => (
							<FormItem>
								<FormLabel>Use System Timezone</FormLabel>
								<FormControl>
									<Checkbox
										className="block"
										onCheckedChange={() => onChange(!value)}
										name={name}
										onBlur={onBlur}
										ref={ref}
										value={value}
										disabled={!!disabled}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						name="timeZone"
						control={form.control}
						render={({ field: { onChange, ref, value, disabled } }) => (
							<FormItem>
								<FormLabel>Time Zone</FormLabel>
								<FormControl>
									<Combobox
										options={timezoneOptions.filter((option) =>
											option.search.includes(search.toLocaleLowerCase()),
										)}
										label="timezone"
										search={search}
										setSearch={setSearch}
										disabled={
											form.formState.isSubmitting ||
											useSystemTimeZone ||
											!!disabled
										}
										onChange={onChange}
										ref={ref}
										value={value}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<div className="flex gap-[0.5rem]">
					<Button type="submit" disabled={form.formState.isSubmitting}>
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
};
