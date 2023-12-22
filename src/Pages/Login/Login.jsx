import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { userLogin, googleSignin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log("state in the location login page", location.state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dataSub = (data) => {
    // console.log(data);
    userLogin(data.email, data.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        Swal.fire({
          icon: "success",
          title: "Login Successfull",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { replace: true });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      });
  };
  // handle google
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
      <div className="container py-16">
        <div className="w-12/12 md:w-6/12 mx-auto ">
          <div className="card  shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(dataSub)} className="card-body">
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
                <button className="btn bg-pink-500 text-white">Login</button>
              </div>
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

export default Login;
