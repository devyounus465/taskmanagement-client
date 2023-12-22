import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <div>
      <div className="card h-[300px]  bg-base-100 shadow-xl ">
        <div className="card-body">
          <h2 className="card-title">{item.title}</h2>
          <p>{item.desc}</p>
          <div className="card-actions justify-end">
            <Link to={"/login"}>
              <button className="btn btn-sm bg-pink-500 text-white">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
