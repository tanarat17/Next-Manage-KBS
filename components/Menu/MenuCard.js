export default function MenuCard({ imageSrc, altText, onClick }) {
  return (
    <div
      className="card bg-neutral text-neutral-content w-full sm:w-[550px] h-[250px] hover:border-4 hover:border-yellow-500 focus:border-4 focus:border-yellow-500 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="card-body items-center text-center">
        <img
          src={imageSrc}
          alt={altText}
          className="w-[200px] h-[200px] object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

  