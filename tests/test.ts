import { expect, test } from "@playwright/test";

test("index page header has anchors", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("button", { name: "Innotes" })).toBeVisible();
	await expect(page.getByRole("button", { name: "My notes" })).toBeVisible();
	await expect(page.getByRole("button", { name: "About" })).toBeVisible();
});
