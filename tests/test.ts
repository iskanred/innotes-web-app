import { expect, test } from "@playwright/test";

test("index page header has anchors", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("link", { name: "Innotes" })).toBeVisible();
	await expect(page.getByRole("link", { name: "My Notes" })).toBeVisible();
	await expect(page.getByRole("link", { name: "About" })).toBeVisible();
});
