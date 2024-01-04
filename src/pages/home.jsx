import Cookies from "js-cookie";
import Layout from "../components/layout";
import {
  DECRYPTED_EMAIL,
  DECRYPTED_PASSWORD,
  USER_EMAIL,
  USER_PASSWORD,
} from "../lib/utils/constants";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function handleLogout() {
    Cookies.remove("email");
    Cookies.remove("password");

    navigate("/");
  }

  return (
    <HomeRoute>
      <Layout>
        <div className="rounded-2xl bg-white shadow-lg w-[508px] p-10">
          <div>
            <h3 className="font-bold text-3xl text-[#5B5B56]">Dashboard</h3>
            <p className="mt-10 text-[#393934]">
              Selamat datang {DECRYPTED_EMAIL}
            </p>
            <div className="mt-6 text-[#393934]">
              <p>Daftar Makanan:</p>
              <ul className="mt-6 decoration list-disc">
                <li>Rendang [Rp.20.000]</li>
                <li>Ayam Goreng [Rp.15.000]</li>
              </ul>
            </div>
          </div>
          <button
            type="button"
            aria-label="keluar"
            className="w-full rounded-full mt-6 bg-[#F06623] text-white px-2 py-4 font-bold"
            onClick={handleLogout}
          >
            Keluar
          </button>
        </div>
      </Layout>
    </HomeRoute>
  );
}

function HomeRoute({ children }) {
  return (
    <>
      {Cookies.get("email") === undefined ||
      (Cookies.get("password") === undefined &&
        DECRYPTED_EMAIL === USER_EMAIL &&
        DECRYPTED_PASSWORD === USER_PASSWORD) ? (
        <Navigate to="/auth/login" />
      ) : (
        children
      )}
    </>
  );
}
