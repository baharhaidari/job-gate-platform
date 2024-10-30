import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <section className="footer flex flex-col justify-center items-center py-10 bg-gray-200 rounded-md mx-6 ">
      <main className="w-full">
        <footer className="grid grid-cols-1 lg:grid-cols-4 gap-7 mb-10">
          <div className="flex items-center">
            <h2 className="text-5xl font-semibold text-green-700">
              JobGate<span className="text-7xl">.</span>
            </h2>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3 uppercase">Site Info</h2>
            <ul className="grid gap-2">
              <li>
                <NavLink
                  to="find-job"
                  className={({ isActive }) =>
                    `hover:text-slate-950 ${isActive ? "active" : ""}`
                  }
                >
                  Find Job
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="find-talents"
                  className={({ isActive }) =>
                    `hover:text-slate-950 ${isActive ? "active" : ""}`
                  }
                >
                  Find Talents
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="contact-us"
                  className={({ isActive }) =>
                    `hover:text-slate-950 ${isActive ? "active" : ""}`
                  }
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="community"
                  className={({ isActive }) =>
                    `hover:text-slate-950 ${isActive ? "active" : ""}`
                  }
                >
                  Community
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3 uppercase">Quick Links</h2>
            <ul className="grid gap-2">
              <li>
                <NavLink
                  to="/privacy"
                  className={({ isActive }) =>
                    `hover:text-slate-950 ${isActive ? "active" : ""}`
                  }
                >
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `hover:text-slate-950 ${isActive ? "active" : ""}`
                  }
                >
                  Terms of Service
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3 uppercase">Support</h2>
            <ul className="grid gap-2">
              <li>Email: BaharHaidary18@gmail.com</li>
              <p>Job Gate Global Inc.</p>
              <p>
                Developer:
                <a
                  href="https://bahar-haidari.vercel.app"
                  target="_blank"
                  className="ml-1 font-semibold hover:underline hover:text-slate-950"
                >
                  Bahar Haidari
                </a>
              </p>
            </ul>
          </div>
        </footer>

        <p className="text-center">© 2024 JobGate. All Rights Reserved!</p>
      </main>
    </section>
  );
}
