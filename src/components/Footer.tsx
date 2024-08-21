import { ActionIcon, Anchor, Container, Group, rem, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text size="md">
          Created by{" "}
          <Anchor
            variant="gradient"
            href="https://github.com/ianriizky"
            target="_blank"
          >
            ianriizky
          </Anchor>
        </Text>

        <Group
          gap={0}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon
            component="a"
            href="https://github.com/ianriizky/bayarindong"
            target="_blank"
            size="lg"
            color="gray"
            variant="subtle"
          >
            <IconBrandGithub
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
