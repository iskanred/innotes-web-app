import type { Folder } from "$lib/entities/folder/model/Folder";

export function sortedFolders(folders: Folder[]): Folder[] {
	return [...folders].sort((f1: Folder, f2: Folder) => {
		return f1.name.localeCompare(f2.name);
	});
}
