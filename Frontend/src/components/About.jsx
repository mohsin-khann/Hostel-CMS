import  Footer from "./Footer";

const About = () => {
    return (
        <div className="flex flex-col bg-gray-900 text-white">
            <div className="container mx-auto px-6 py-16">
                {/* About Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-indigo-500 mb-4">About Our Complaint Management System</h2>
                    <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        Our Complaint Management System (CMS) is designed to optimize the process of submitting, tracking, and resolving complaints. It provides a transparent, user-friendly platform where users can easily submit issues and administrators can efficiently manage and resolve them in real time.
                    </p>
                </div>

                {/* How It Works Section */}
                <div className="mb-16">
                    <h3 className="text-3xl font-semibold text-indigo-500 text-center mb-6">How It Works</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <h4 className="text-xl font-semibold text-indigo-400 mb-4">Step 1: Register Your Complaint</h4>
                            <p className="text-gray-400">
                                Users can easily register complaints by filling out a simple form. Each submission includes essential details like the complaint category, description, and urgency, allowing for efficient prioritization and routing.
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <h4 className="text-xl font-semibold text-indigo-400 mb-4">Step 2: Admin Review & Assignment</h4>
                            <p className="text-gray-400">
                                Administrators review each complaint based on its severity, categorize it, and assign it to the appropriate team member. This ensures that every issue is handled by the right expert promptly.
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <h4 className="text-xl font-semibold text-indigo-400 mb-4">Step 3: Resolution & Updates</h4>
                            <p className="text-gray-400">
                                The assigned team member works on resolving the issue. Users are kept updated with real-time progress through automated notifications, ensuring they’re always informed of their complaint’s status.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Key Features Section */}
                <div className="bg-gray-800 py-16 mb-16">
                    <h3 className="text-3xl font-semibold text-indigo-500 text-center mb-6">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <h4 className="text-xl font-semibold text-indigo-400 mb-4">Intuitive User Interface</h4>
                            <p className="text-gray-400">
                                With a focus on simplicity, our interface allows users to easily navigate and submit complaints. The system adapts seamlessly across devices for optimal user experience.
                            </p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <h4 className="text-xl font-semibold text-indigo-400 mb-4">Advanced Admin Dashboard</h4>
                            <p className="text-gray-400">
                                The admin dashboard features advanced tools for categorizing, assigning, and tracking complaints, as well as viewing detailed reports to monitor performance and outcomes.
                            </p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <h4 className="text-xl font-semibold text-indigo-400 mb-4">Real-Time Notifications</h4>
                            <p className="text-gray-400">
                                Receive instant updates via email and push notifications when a complaint is submitted, updated, or resolved, ensuring clear communication throughout the process.
                            </p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <h4 className="text-xl font-semibold text-indigo-400 mb-4">Reporting & Analytics</h4>
                            <p className="text-gray-400">
                                The platform provides in-depth reports and analytics to track trends, measure resolution efficiency, and identify potential areas for improvement.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Benefits for Users Section */}
                <div className="py-16">
                    <h3 className="text-3xl font-semibold text-indigo-500 text-center mb-6">Benefits for Users</h3>
                    <ul className="list-disc pl-8 text-gray-400">
                        <li className="mb-4">
                            <span className="font-semibold text-indigo-400">Transparency:</span> Track the progress of complaints with live updates and status changes, ensuring clear visibility throughout the process.
                        </li>
                        <li className="mb-4">
                            <span className="font-semibold text-indigo-400">Enhanced Communication:</span> Real-time notifications and updates keep users well-informed, reducing uncertainty and providing peace of mind.
                        </li>
                        <li className="mb-4">
                            <span className="font-semibold text-indigo-400">Faster Resolutions:</span> The automated workflow speeds up complaint handling, resulting in quicker response times and faster resolutions.
                        </li>
                        <li className="mb-4">
                            <span className="font-semibold text-indigo-400">Seamless Experience:</span> A responsive and intuitive platform that works seamlessly across all devices for an effortless user experience.
                        </li>
                    </ul>
                </div>

                {/* Why Choose Us Section */}
                <div className="bg-gray-800 py-16 mb-16">
                    <h3 className="text-3xl font-semibold text-indigo-500 text-center mb-6">Why Choose Our CMS?</h3>
                    <p className="text-lg text-gray-400 text-center max-w-3xl mx-auto">
                        Our Complaint Management System is built with both users and administrators in mind. We offer a powerful, yet easy-to-use platform designed for speed, transparency, and efficiency. With advanced features like real-time updates, an intuitive user interface, and robust admin tools, our CMS ensures a seamless experience from start to finish.
                    </p>
                </div>

                {/* Testimonials Section */}
                <div className="bg-gray-700 py-16 mb-16">
                    <h3 className="text-3xl font-semibold text-indigo-500 text-center mb-6">What Our Users Say</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-8">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs">
                            <p className="text-gray-400 mb-4">
                                &quot;The Complaint Management System has been a game changer for us. The ease of submitting and tracking complaints has greatly improved our customer service efficiency.
                            </p>
                            <p className="text-indigo-400 font-semibold">John Doe, Support Team</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs">
                            <p className="text-gray-400 mb-4">
                                &quot;As an admin, I love the streamlined dashboard that allows me to manage complaints quickly. The real-time updates keep everything running smoothly.
                            </p>
                            <p className="text-indigo-400 font-semibold">Jane Smith, Admin</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default About;
