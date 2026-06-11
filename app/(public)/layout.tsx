import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "About me page for my portfolio website",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}