import { Page } from '@playwright/test';

const isCI = Boolean(process.env.CI);
export const navigateTo = async (path: string, page: Page) => {
  if (isCI) {
    return page.goto(`/ng-gc-ws${path}`);
  }
  return page.goto(path);
};
