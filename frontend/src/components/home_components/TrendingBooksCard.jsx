import { Link } from 'react-router-dom';
import home_skeleton from '../skeletons/home_skeleton';

// ACCEPT THE id PROP HERE
const TrendingBooksCard = ({ book, id }) => {
  const { BookName, AuthorName, Image } = book || {};

  return (
    // Wrap the card block in a Link component pointing to your dynamic path
    <Link to={`/book/${id}`} className="block w-full h-full text-white no-underline">
      <div className="card bg-base-100 image-full w-full h-full shadow-xl overflow-hidden group">
        <figure className="w-full h-full">
          <img
            src={Image || "https://placehold.co/400x600?text=No+Cover"}
            alt={BookName}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        </figure>
        <div className="card-body justify-end p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="card-title text-sm md:text-base leading-tight">{BookName}</h2>
          <p className="text-xs opacity-80">{AuthorName}</p>
          
          <div className="flex text-warning text-xs mt-1">
            ★★★★☆
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrendingBooksCard;