"use client";

import { Code, Group } from "@mantine/core";
import {
  Icon2fa,
  IconBellRinging,
  IconBrandMantine,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconSettings,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import classes from "./page.module.css";

const data = [
  { link: "", label: "Notifications", icon: IconBellRinging },
  { link: "", label: "Billing", icon: IconReceipt2 },
  { link: "", label: "Security", icon: IconFingerprint },
  { link: "", label: "SSH Keys", icon: IconKey },
  { link: "", label: "Databases", icon: IconDatabaseImport },
  { link: "", label: "Authentication", icon: Icon2fa },
  { link: "", label: "Other Settings", icon: IconSettings },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [active, setActive] = useState("Billing");
  const { data: session } = useSession();

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <IconBrandMantine size={28} />
          <Code fw={700}>{process.env.NEXT_PUBLIC_VERSION}</Code>
        </Group>
        {data.map((item) => (
          <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
              event.preventDefault();
              setActive(item.label);
            }}
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
          </a>
        ))}
      </div>

      {children}

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={async (event) => {
            event.preventDefault();
            signOut();
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout {session?.user?.name}</span>
        </a>
      </div>
    </nav>
  );
}
