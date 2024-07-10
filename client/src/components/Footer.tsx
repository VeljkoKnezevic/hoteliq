const Footer = () => {
  return (
    <footer className="sticky top-full flex w-full flex-col overflow-hidden bg-primary-blue px-6 py-4 text-[#fff] md:px-10">
      <div className="flex justify-between xl:mx-auto xl:w-full xl:max-w-[1200px]  2xl:max-w-[1440px]">
        <h3 className="text-xl xl:text-2xl">Hotel IQ</h3>
        <div className="flex items-center gap-3">
          <img className="h-5 w-5" src="/icon-facebook.svg" alt="Facebook" />
          <img className="h-5 w-5" src="/icon-instagram.svg" alt="Instagram" />
          <img className="h-5 w-5" src="/icon-twitter.svg" alt="Twitter" />
        </div>
      </div>
      <p className="mt-3 text-center text-xs opacity-60 xl:mt-4">
        &copy; Copyright {new Date().getFullYear()} | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
