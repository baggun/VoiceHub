import { DefaultLayout } from "@components/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
