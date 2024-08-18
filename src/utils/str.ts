import { faker } from "@faker-js/faker";

export function slug(title: string, separator: string = "-"): string {
  return title
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, separator);
}

export function uniqueSlug(
  title: string,
  separator: string = "-",
  uniqueLength: number = 5
): string {
  return `${slug(title, separator)}-${faker.string.alphanumeric(uniqueLength)}`;
}

/**
 * @see https://github.com/GrafiteInc/Helpers/blob/main/src/strings.js#L116
 */
export function replaceFirst(str: string, key: string, value: string): string {
  const location = str.indexOf(key);

  return (
    str.valueOf().substring(0, location) +
    value +
    str.valueOf().substring(location + key.length)
  );
}

/**
 * @see https://github.com/GrafiteInc/Helpers/blob/main/src/strings.js#L124
 */
export function replaceLast(str: string, key: string, value: string): string {
  const location = str.lastIndexOf(key);

  return (
    str.valueOf().substring(0, location) +
    value +
    str.valueOf().substring(location + key.length)
  );
}

export function createQueryParams(
  object: { [key: string]: string },
  separator: string = "&",
  join: string = "="
): string {
  return Object.keys(object)
    .filter((key) => object[key] !== undefined)
    .map((key) => `${key}${join}${object[key]}`)
    .join(separator);
}

/**
 * Create a Base64-encoded ASCII string from a string of data.
 *
 * @see [Window: btoa() method](https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa)
 */
export function btoa(stringToEncode: string): string {
  return Buffer.from(stringToEncode, "ascii").toString("base64");
}

/**
 * Decode a string of data which has been encoded using Base64 encoding.
 *
 * @see [Window: atob() method](https://developer.mozilla.org/en-US/docs/Web/API/Window/atob)
 */
export function atob(encodedData: string): string {
  return Buffer.from(encodedData, "base64").toString("ascii");
}
