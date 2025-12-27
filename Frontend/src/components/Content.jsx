import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function Content() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-6 text-left">

        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
          Streamlined Issue Resolution
        </p>

        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
          Simplify Hostel Complaint Management
        </h2>

        <p className="mt-5 text-gray-600 leading-relaxed max-w-3xl">
          ReflexCMS provides a centralized platform for students and hostel
          administration to manage complaints efficiently. From submission to
          resolution, every step is transparent and well-tracked.
        </p>

        <ul className="mt-8 space-y-4 text-gray-700 max-w-3xl">
          <li className="flex items-start gap-3">
            <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 mt-1" />
            <span>
              Role-based forwarding to Warden, Employee, Deputy Provost, and Provost.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 mt-1" />
            <span>
              Real-time complaint status tracking: New, Pending, In-Progress, Closed.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 mt-1" />
            <span>
              Secure system ensuring accountability and clear communication.
            </span>
          </li>
        </ul>

      </div>
    </section>
  );
}
