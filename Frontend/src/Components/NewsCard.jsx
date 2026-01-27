import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

const NewsCard = ({ title, image, date, author, id }) => {
  return (
    <div className="bg-white border-2 border-[#4ade80] p-1 rounded-md shadow-sm h-full flex flex-col hover:shadow-md transition-shadow duration-300">
      <div className="border border-gray-100 h-full flex flex-col rounded-sm">
        <div className="relative h-auto w-full overflow-hidden group">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-3 flex flex-col flex-grow">
          <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-3 hover:text-green-700 transition-colors">
            <Link to={`/news/${id}`}>{title}</Link>
          </h3>

          <div className="mt-auto mb-3">
            <Link
              to={`/news/${id}`}
              className="text-xs font-semibold text-[#4ade80] flex items-center gap-1 hover:gap-2 transition-all"
            >
              Baca Selengkapnya <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex items-center justify-between text-[10px] text-gray-500 border-t pt-2 mt-auto">
            <div className="flex items-center gap-1">
              <User size={12} />
              <span className="truncate max-w-[20   0px]">{author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
