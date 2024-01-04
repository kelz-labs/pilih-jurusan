import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import { aes } from "../../lib/utils/aes";
import {
  DECRYPTED_EMAIL,
  DECRYPTED_PASSWORD,
  USER_EMAIL,
  USER_PASSWORD,
} from "../../lib/utils/constants";
import { Navigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  function onSubmit() {
    Cookies.set("email", aes("encrypt", getValues("email"), "email"));
    Cookies.set("password", aes("encrypt", getValues("password"), "password"));

    navigate("/");
  }

  return (
    <LoginRoute>
      <Layout>
        <form
          className="p-10 bg-white shadow-lg rounded-2xl mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <div className="mt-3">
              <h3 className="font-bold text-2xl text-[#5B5B56]">Masuk</h3>
              <p className="mt-8 mb-3 text-[#393934]">
                Masukkan alamat email kata sandi yang telah anda daftarkan.
              </p>
            </div>
            <div className="space-y-5 mb-6">
              <div className="w-full flex justify-start items-center relative">
                <img
                  src="/images/person.svg"
                  alt="person"
                  className="absolute left-5"
                />
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  placeholder="Email...."
                  className="w-full pl-14 border-[1.5px] shadow-sm rounded-full py-2 px-4"
                />
                {errors.email ? <span>{errors.email.message}</span> : null}
              </div>
              <div className="w-full flex justify-start items-center relative">
                <img
                  src="/images/lock.svg"
                  alt="lock"
                  className="absolute left-5"
                />
                <input
                  {...register("password")}
                  className="w-full pl-14 border-[1.5px] shadow-sm rounded-full py-2 px-4"
                  type="password"
                  name="password"
                  placeholder="Password...."
                />
                {errors.password ? (
                  <span>{errors.password.message}</span>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              aria-label="masuk sekarang"
              className="bg-[#F06623] text-white w-full font-bold rounded-full px-2 py-4"
            >
              Masuk Sekarang
            </button>
          </div>
        </form>
      </Layout>
    </LoginRoute>
  );
}

function LoginRoute({ children }) {
  return (
    <>
      {(Cookies.get("username") !== undefined &&
        Cookies.get("password") !== undefined) ||
      (DECRYPTED_EMAIL === USER_EMAIL &&
        DECRYPTED_PASSWORD === USER_PASSWORD) ? (
        <Navigate to="/" />
      ) : (
        children
      )}
    </>
  );
}
