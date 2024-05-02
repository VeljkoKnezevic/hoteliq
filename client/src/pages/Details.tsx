import Header from "../components/Header";
import Rating from "../components/Rating";

const Details = () => {
  return (
    <>
      <Header />
      <main>
        <h2>Detail</h2>

        <img src="/Spain-1.png" alt="" />
        <Rating />
        <div>
          <h3>The Aston Vill hotel</h3>
          <p>
            <span>$200,7</span>/night
          </p>
        </div>
        <p>Alice Springs NT 0870, Australia</p>

        <h4>Description</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          cupiditate officiis ullam doloremque harum beatae, suscipit eligendi.
          Voluptatum et doloribus obcaecati iure labore omnis unde, esse
          corporis, ipsa laboriosam sint.
        </p>

        <h5>Preview</h5>
        <div className="flex">
          <img src="/Spain-1.png" width={100} alt="" />
          <img src="/Spain-2.png" width={100} alt="" />
          <img src="/Spain-3.png" width={100} alt="" />
        </div>
      </main>
    </>
  );
};

export default Details;
