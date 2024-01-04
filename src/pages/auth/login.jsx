import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import { aes } from "../../lib/utils/aes";
import {
  DECRYPTED_EMAIL,
  DECRYPTED_PASSWORD,
  USER_EMAIL,
  USER_PASSWORD,
} from "../../lib/utils/constants";
import { loginSchema } from "../../lib/utils/schemas";
import { useNavigation } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  function onSubmit() {
    if (
      getValues("email") === USER_EMAIL &&
      getValues("password") === USER_PASSWORD
    ) {
      Cookies.set("email", aes("encrypt", getValues("email"), "email"));
      Cookies.set(
        "password",
        aes("encrypt", getValues("password"), "password")
      );
    } else {
      toast("Username atau password salah! Silahkan coba lagi");
    }
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
              <div className="w-full">
                <div className="relative flex justify-center items-center w-full">
                  <img
                    src="/images/person.svg"
                    alt="person"
                    className="absolute left-5"
                  />
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    name="email"
                    placeholder="Email...."
                    className="w-full pl-14 border-[1.5px] shadow-sm rounded-full py-2 px-4"
                  />
                </div>
                {errors.email ? (
                  <div className="mt-2">
                    <span>{errors.email.message}</span>
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <div className="flex justify-center items-center w-full relative">
                  <img
                    src="/images/lock.svg"
                    alt="lock"
                    className="absolute left-5"
                  />
                  <input
                    {...register("password", { required: true })}
                    className="w-full pl-14 border-[1.5px] shadow-sm rounded-full py-2 px-4"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password...."
                  />
                  <button
                    type="button"
                    aria-label="show and hide password"
                    className="w-6 h-6 absolute right-5"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {!showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password ? (
                  <div className="mt-2">
                    <span>{errors.password.message}</span>
                  </div>
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
      {Cookies.get("email") !== undefined ||
      (Cookies.get("password") !== undefined &&
        DECRYPTED_EMAIL === USER_EMAIL &&
        DECRYPTED_PASSWORD === USER_PASSWORD) ? (
        <Navigate to="/" />
      ) : (
        children
      )}
    </>
  );
}
