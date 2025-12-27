import { useNavigate } from "react-router-dom";
import Content from "./Content";
import Footer from "./Footer";
import Team from "./Team";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center px-6"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />

        {/* content */}
        <div className="relative z-10 max-w-4xl text-center text-white">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs tracking-wider uppercase">
            Complaint Management System
          </p>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
            Reflex<span className="text-blue-400">CMS</span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-white/80">
            Smart, Fast, Reliable — manage complaints, route them instantly, and track resolution end-to-end.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/about")}
              className="w-full sm:w-auto rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20 transition"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* QUICK HIGHLIGHTS */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Role-based Routing</h3>
            <p className="mt-2 text-sm text-gray-600">
              Forward complaints to Warden, Employee, Deputy Provost, or Provost with remarks.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Status Tracking</h3>
            <p className="mt-2 text-sm text-gray-600">
              New → Pending → In Progress → Closed with clear accountability.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Simple & Professional</h3>
            <p className="mt-2 text-sm text-gray-600">
              Clean UI designed for demos, reports, and final evaluation.
            </p>
          </div>
        </div>
      </section>

      {/* KEEP YOUR EXISTING SECTIONS */}
      <Content />
      <Team />
      <Footer />
    </div>
  );
};

export default Home;
