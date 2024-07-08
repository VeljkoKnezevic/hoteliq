import { HotelCardVariants } from "../types";

type THotelCard = {
  variant: HotelCardVariants;
};

const HotelCard = ({ variant }: THotelCard) => {
  if (variant == "nearby") {
    return (
      <section className="mx-2 max-w-fit rounded-lg">
        <img className="rounded-t-lg" src="/Australia-1.png" alt="" />
        <div className="p-3">
          <div className="flex justify-between">
            <h3 className="text-sm font-bold text-text-black">
              The Aston Hotel
            </h3>
            <div className="flex items-center gap-2">
              <img src="star.svg" alt="Star" />
              <p className="text-sm font-bold text-text-black">5.0</p>
            </div>
          </div>
          <p className="mt-2 text-xs font-medium text-primary-grey">
            Alice Springs NT0870, Australia
          </p>
          <p className="mt-2 text-xs font-medium text-primary-grey">
            <span className="text-sm font-bold text-secondary-blue">
              $165,3{" "}
            </span>
            /night
          </p>
        </div>
      </section>
    );
  } else {
    // variant is popular
    return (
      <section className="flex gap-4 p-3">
        <img
          width={84}
          className="h-[84px] rounded-sm"
          src="/Australia-1.png"
          alt=""
        />
        <div className="py-1">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-text-black">
              The Aston Hotel
            </h3>
            <p className="text-xs font-medium text-primary-grey">
              <span className="text-sm font-bold text-secondary-blue">
                $165,3
              </span>
              /night
            </p>
          </div>
          <p className="mt-2 text-xs font-medium text-primary-grey">
            Alice Springs NT0870, Australia
          </p>
          <div className="mt-2 flex items-center gap-2">
            <img src="star.svg" alt="Star" />
            <p className="text-sm font-bold text-text-black">5.0</p>
          </div>
        </div>
      </section>
    );
  }
};

export default HotelCard;
