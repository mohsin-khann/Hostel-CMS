import profile from "../assets/profile.jpg"; // apni ek simple professional image rakh do

export default function Team() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Project Developer
          </h2>
          <p className="mt-2 text-gray-600">
            Hostel Complaint Management System
          </p>
        </div>

        {/* Card */}
        <div className="flex justify-center">
          <div className="w-full md:w-2/3 bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Image */}
              <img
                src={profile}
                alt="Mohsin Khan"
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
              />

              {/* Info */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Mohsin Khan
                </h3>
                <p className="text-blue-600 font-medium mt-1">
                  Full Stack Web Developer
                </p>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  Designed and developed a complete Hostel Complaint Management
                  System using modern web technologies. The system supports
                  role-based complaint routing, status tracking, and transparent
                  communication between students and administration.
                </p>

                {/* Skills */}
                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                    React.js
                  </span>
                  <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                    Node.js
                  </span>
                  <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full">
                    MongoDB
                  </span>
                  <span className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full">
                    REST APIs
                  </span>
                  <span className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full">
                    Tailwind CSS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
