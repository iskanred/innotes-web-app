import type { Note } from "$lib/entities/notes/model/Note";

export interface Folder {
	id?: string;
	name: string;
	notes: Note[];
}
