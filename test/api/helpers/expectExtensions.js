import expect from "expect.js";

export function expectToEndWith(actual, expectedSuffix) {
  if (!actual.endsWith(expectedSuffix)) {
    expect().fail(`expected ${actual} to end with ${expectedSuffix}`);
  }
}
