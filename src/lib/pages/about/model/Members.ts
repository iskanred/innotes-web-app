import type { Member } from "$lib/entities/member/model/Member";
import { base } from "$app/paths";

export const members: Member[] = [
	{
		name: "Iskander Nafikov",
		pathToPhoto: `${base}/images/iskander.jpeg`,
		role: "Frontend Developer",
		email: "i.nafikov@innopolis.university",
		github: "https://github.com/Iskanred"
	},
	{
		name: "Alexander Evdokimov",
		pathToPhoto: `${base}/images/aleksandr.jpg`,
		role: "Frontend Developer",
		email: "a.evdokimov@innopolis.university",
		github: "https://github.com/quhaaST"
	},
	{
		name: "Andrey Plekhov",
		pathToPhoto: `${base}/images/andrey.jpg`,
		role: "Frontend Developer",
		email: "a.plekhov@innopolis.university",
		github: "https://github.com/Majorro"
	}
];
