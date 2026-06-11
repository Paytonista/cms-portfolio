import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin page for my portfolio website",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}