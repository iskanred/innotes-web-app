export class Note {
	id: string;
	title: string;
	content: string;
	folderId: string;

	constructor(id: string, title: string, content: string, folderId: string) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.folderId = folderId;

		if (!title) {
			this.title = "Default";
		}
	}
}
