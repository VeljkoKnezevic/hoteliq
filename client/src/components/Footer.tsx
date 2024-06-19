const Footer = () => {
  return (
    <footer className="sticky top-full flex w-screen flex-col bg-primary-blue px-6 py-4 text-[#fff]">
      <div className="flex justify-between">
        <h3 className="text-xl">Hotel IQ</h3>
        <div className="flex items-center gap-3">
          <img className="h-5 w-5" src="/icon-facebook.svg" alt="Facebook" />
          <img className="h-5 w-5" src="/icon-instagram.svg" alt="Instagram" />
          <img className="h-5 w-5" src="/icon-twitter.svg" alt="Twitter" />
        </div>
      </div>
      <p className="mt-3 text-center text-xs opacity-60">
        &copy; Copyright {new Date().getFullYear()} | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
