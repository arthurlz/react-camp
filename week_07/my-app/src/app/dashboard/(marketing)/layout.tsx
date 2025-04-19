import type { Metadata } from "next";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <nav>marketing</nav> <hr />
      {children}
    </div>
  );
}
