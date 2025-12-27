import { Link } from 'react-router-dom';

const Cards = () => {
  const data = [
    {
      title: 'Complaints Submitted',
      count: 4,
      link: '/browse/complaints',
    },
    {
      title: 'Pending Complaints',
      count: 2,
      link: '/browse/complaints',
    },
    {
      title: 'Resolved Complaints',
      count: 2,
      link: '/browse/complaints',
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border p-5 flex flex-col"
          >
            <h3 className="text-gray-600 text-sm font-medium">
              {item.title}
            </h3>

            <div className="mt-2 text-3xl font-bold text-blue-600">
              {item.count}
            </div>

            {/* VIEW ALL LINK */}
            <Link
              to={item.link}
              className="mt-3 text-sm text-blue-500 hover:underline w-fit"
            >
              View All
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
