"use client";
import { Pathname, useRouter } from "@/navigation";
import { Button } from "@mui/material";
import { ComponentProps } from "react";
import { Locale } from "@/i18n";

type ButtonLinkProps = {
  href: Pathname;
  locale?: Locale;
} & Omit<ComponentProps<typeof Button>, "href">;

export default function ButtonLink(props: ButtonLinkProps) {
  const { href, locale, ...rest } = props;
  const router = useRouter();

  return (
    <Button
      {...rest}
      onClick={() => router.push(href, {locale})}
    />
  );
}