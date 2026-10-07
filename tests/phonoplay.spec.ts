import { test, expect } from "@playwright/test";

test.describe("PhonoPlay Assessment 3", () => {
  test("Builder use case - activity data can be retrieved", async ({ page }) => {
    const response = await page.request.get(
      "http://localhost:3000/api/activities"
    );

    expect(response.ok()).toBeTruthy();

    const activities = await response.json();

    expect(Array.isArray(activities)).toBeTruthy();
    expect(activities.length).toBeGreaterThan(0);
  });

  test("User use case - Wordle builder loads successfully", async ({ page }) => {
    await page.goto("http://localhost:3000/wordle");

    await expect(page).toHaveURL(/wordle/);

    await expect(page.locator("body")).toContainText(/wordle/i);
  });

  test("Operational health check returns OK", async ({ page }) => {
    const response = await page.request.get(
      "http://localhost:3000/health"
    );

    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data.status).toBe("ok");
  });
});