export default function Layout({ children, ...props }) {
  return (
    <main className="w-full flex justify-center items-start p-4">
      <section
        className="w-full max-w-7xl flex justify-center items-center flex-col"
        {...props}
      >
        <div className="flex justify-start w-full items-center">
          <img src="/images/logo.svg" alt="logo" />
        </div>
        {children}
      </section>
    </main>
  );
}
