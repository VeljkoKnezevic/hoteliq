const Rating = () => {
  return (
    <section className="flex justify-around">
      <div className="mt-2 flex items-center gap-2">
        <img src="/wifi.svg" alt="Wifi" />
        <span className="text-xs font-medium text-text-black">Free wifi</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <img src="/restaurant.svg" alt="Breakfast" />
        <span className="text-xs font-medium text-text-black">
          Free breakfast
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <img src="/star.svg" alt="Star" />
        <span className="text-sm font-bold text-text-black">5.0</span>
      </div>
    </section>
  );
};

export default Rating;
