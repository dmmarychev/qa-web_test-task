import { expect, Locator } from "@playwright/test";

const getRandomLocator = async (field: Locator) => {
    await expect(field).not.toHaveCount(0);

    const fieldsCount = await field.count();

    return field.nth(Math.floor(Math.random() * fieldsCount));
};

export { getRandomLocator };
