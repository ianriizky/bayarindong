import { MantineColorScheme } from "@mantine/core";

export function getColorScheme() {
  return document.documentElement.getAttribute(
    "data-mantine-color-scheme"
  ) as MantineColorScheme;
}
