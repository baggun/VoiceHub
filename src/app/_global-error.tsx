"use client";

import ErrorLayout from "@components/layout/error/ErrorLayout";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ErrorLayout error={error} reset={reset} />
      </body>
    </html>
  );
}
