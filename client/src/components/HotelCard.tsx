import { HotelCardVariants } from "../types";

type THotelCard = {
  variant: HotelCardVariants;
};

const HotelCard = ({ variant }: THotelCard) => {
  if (variant == "nearby") {
    return (
      <div>
        <img src="/Australia-1.png" alt="" />
        <div>
          <h3>The Aston Hotel</h3>
          <p>Alice Springs NT0870, Australia</p>
          <p>
            <span>$165,3</span>/night
          </p>
        </div>
      </div>
    );
  } else {
    // variant is popular
    return (
      <div>
        <img src="/Australia-1.png" alt="" />
        <div>
          <h3>The Aston Hotel</h3>
          <p>Alice Springs NT0870, Australia</p>
          <p>
            <span>$165,3</span>/night
          </p>
        </div>
      </div>
    );
  }
};

export default HotelCard;
