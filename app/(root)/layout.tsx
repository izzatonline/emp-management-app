import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="bg-gray-50">
        <div>
          <section className="mx-auto w-full max-w-3xl flex min-h-screen flex-1 flex-col px-6 pb-6 pt-12 max-md:pb-14 sm:px-14">
            <div className="flex justify-between items-center">
              <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
                Employee Management App
              </h1>
            </div>
            <div>{children}</div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Layout;
