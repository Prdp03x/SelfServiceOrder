const CategoryFilter = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="flex gap-3 mb-6 flex-wrap">
      <button
        onClick={() => onSelect("")}
        className={`px-4 py-2 rounded-full border ${
          selectedCategory === ""
            ? "bg-black text-white"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === cat
              ? "bg-black text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;