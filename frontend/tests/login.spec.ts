import { test, expect } from "@playwright/test";

test("user can log in and open dashboard", async ({ page }) => {
  await page.goto("/login");

  await page
    .getByLabel(/email/i)
    .fill("YOUR_TEST_EMAIL");

  await page
    .getByLabel(/password/i)
    .fill("YOUR_TEST_PASSWORD");

  await page
    .getByRole("button", { name: /login/i })
    .click();

  await expect(page).toHaveURL(/dashboard/);

  await expect(
    page.getByText(/welcome back/i).first()
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Devices" })
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Mate AI" })
  ).toBeVisible();
});