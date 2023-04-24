import type { Folder } from "$lib/entities/folder/model/Folder";

export interface User {
	id?: string;
	email: string;
	folders: Folder[];
}
