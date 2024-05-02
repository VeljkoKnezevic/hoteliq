import { HotelCardVariants } from "../types";

type THotelCard = {
  variant: HotelCardVariants;
};

const HotelCard = ({ variant }: THotelCard) => {
  return (
    <div className={variant == "nearby" ? "" : "flex"}>
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
};

export default HotelCard;
