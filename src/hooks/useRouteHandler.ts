import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

type useRouteHandlerProps = (url: string) => void;

export default function useRouteHandler(event: useRouteHandlerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const url = pathname + searchParams.toString();
    event(url);
  }, [pathname, searchParams]);
}
