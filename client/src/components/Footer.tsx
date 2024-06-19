const Footer = () => {
  return (
    <footer className="mt-6 flex w-screen flex-col bg-primary-blue px-6 py-4 text-[#fff]">
      <div className="flex justify-between">
        <h3>Hotel IQ</h3>
        <div className="flex items-center gap-3">
          <img src="icon-facebook.svg" alt="Facebook" />
          <img src="icon-instagram.svg" alt="Instagram" />
          <img src="icon-twitter.svg" alt="Twitter" />
        </div>
      </div>
      <p className="mt-2">
        &copy; Copyright {new Date().getFullYear()} | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
