import Header from "../components/Header";

const PageNotFound = () => {
  return (
    <>
      <Header />
      <div className="flex min-h-80 flex-col items-center justify-center text-center text-primary-blue">
        <p className="text-9xl">404</p>
        <p className="mt-3 text-2xl">Page doesn't exist</p>
      </div>
    </>
  );
};

export default PageNotFound;
