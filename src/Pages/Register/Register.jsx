import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUser, googleSignin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle submit

  const dataSub = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((res) => {
        const user = res.user;
        console.log(user);

        updateUser(data.name, data.photo)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Register Successfull",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard");
          })
          .catch((err) => {
            console.log(err.mesage);
          });
      })
      .catch((err) => {
        console.log(err.mesage);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  // handle google sign in

  const handleGoogle = () => {
    googleSignin()
      .then((res) => {
        console.log(res.user);
        navigate("/dashboard");
      })
      .catch();
  };
  return (
    <div>
      <div className="container  py-16 ">
        <div className="w-12/12 md:w-6/12  mx-auto">
          <div className="card  shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(dataSub)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Type Your Name"
                  className="input w-full input-bordered"
                />
                {errors.name && <p>Name is required.</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="text"
                  {...register("photo", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photo && <p>Photo is required.</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && <p>email is required.</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password && <p>Password is required.</p>}
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-pink-500 text-white">Register</button>
              </div>
              <p>
                Already have account? please{" "}
                <Link className="text-pink-500" to={"/login"}>
                  Login
                </Link>
              </p>
            </form>
            <button onClick={handleGoogle} className="btn">
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
