import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-6">
        
        {/* TOP */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          
          {/* LEFT */}
          <div>
            <h2 className="text-lg font-semibold text-white">ReflexCMS</h2>
            <p className="mt-1 text-sm text-gray-400 max-w-sm">
              Hostel complaint management system designed for fast and transparent issue resolution.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-2 text-sm md:items-end">
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-indigo-500" />
              support@reflexcms.com
            </span>
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="text-indigo-500" />
              +92 311 8892269
            </span>
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="text-indigo-500" />
              UET Peshawar, Pakistan
            </span>

            {/* SOCIAL */}
            <div className="flex gap-3 pt-2">
              {[faFacebookF, faTwitter, faInstagram, faLinkedinIn].map(
                (icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-600 transition"
                  >
                    <FontAwesomeIcon icon={icon} className="text-white text-xs" />
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-4 border-t border-gray-700" />

        {/* BOTTOM */}
        <div className="relative flex items-center text-xs">
          <p className="text-gray-500">
            © {new Date().getFullYear()} ReflexCMS. All rights reserved.
          </p>

          <p className="absolute left-1/2 -translate-x-1/2 text-white">
            Built by <span className="font-medium">Mohsin Khan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
