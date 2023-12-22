import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <div className="banner-area h-screen flex items-center bg-[#FFC0E3]">
        <div className="container">
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-8">
            <div className="space-y-4 pl-8 ">
              <h2 className=" text-3xl md:text-6xl font-bold">
                Task Management Platform
              </h2>
              <p className="pb-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Debitis accusamus est minima vel praesentium facilis sit aut
                mollitia, doloribus quidem.
              </p>
              <Link to={"/login"}>
                <button className="btn bg-pink-500 text-white">
                  Let’s Explore
                </button>
              </Link>
            </div>
            <div>
              <img
                className="w-full"
                src="https://i.ibb.co/k35cSLh/task-management.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
