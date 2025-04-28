import { JSX } from "react";

import { sectionId } from "../consts";
import { SongLogTitle } from "./SongLogTitle";
import { SongLogForm } from "./form/SongLogForm";
import { SongLogGrid } from "./grid/SongLogGrid";
import { SectionAccordion } from "@/features/section/SectionAccordion";

export const SongLog = (): JSX.Element => {
	return (
		<SectionAccordion
			sectionId={sectionId.SONG_LOG}
			title={<SongLogTitle />}
			buttonLabel="Song Log"
			buttonVariant="secondary"
		>
			<SongLogForm />
			<SongLogGrid />
		</SectionAccordion>
	);
};
