import { test, expect } from '@playwright/test';

test('has title and login redirect', async ({ page }) => {
  await page.goto('/');
  // NextAuth should redirect us to the login page
  await expect(page).toHaveURL(/.*login/);
  await expect(page.locator('h2')).toContainText('Sign in to your account');
});

test('can login with mock credentials', async ({ page }) => {
  await page.goto('/login');
  
  // Fill the credentials
  await page.fill('input[name="email"]', 'admin@example.com');
  await page.fill('input[name="password"]', 'password');
  
  // Click the sign in button
  await page.click('button:has-text("Sign in with Mock Admin")');
  
  // Should redirect to dashboard
  await expect(page).toHaveURL('/');
  
  // Should see CurriculumMind AI header
  await expect(page.locator('span:has-text("CurriculumMind AI")')).toBeVisible();
});
