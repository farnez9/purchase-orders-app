import type { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <main className="flex-1">
        <div className="md:max-w-screen-lg md:mx-auto w-full">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
