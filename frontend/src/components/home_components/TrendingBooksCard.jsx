const TrendingBooksCard = ({ book }) => {
  const { BookName, AuthorName, Image } = book || {};

  return (
    <div className="card bg-base-100 image-full w-full h-full shadow-xl overflow-hidden group">
      <figure className="w-full h-full">
        <img
          src={Image || "https://via.placeholder.com/150"}
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
  );
};

export default TrendingBooksCard