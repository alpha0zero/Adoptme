import { Link } from "react-router-dom";
import { FunctionComponent } from "react";

interface Props {
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
  id: number;
}

const Pet: FunctionComponent<Props> = ({
  name,
  animal,
  breed,
  images,
  location,
  id,
}) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images && images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} data-testid="thumbnail" />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location || "Not known"}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
