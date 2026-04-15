import AddToCartButton from "../AddToCartButton";
import OptionSelector from "./OptionSelector";

const MenuCard = ({
  item,
  selectedOptions,
  handleOptionChange,
  addToCart,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col">
      <img
        src={item.image}
        alt={item.name}
        className="h-44 w-full object-cover"
      />

      <div className="p-4 flex flex-col flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {item.name}
          </h3>

          <p className="text-gray-500 mb-3 font-semibold">
            ₹ {item.price}
          </p>

          {item.options?.map((opt) => (
            <OptionSelector
              key={opt.title}
              itemId={item._id}
              opt={opt}
              selectedOptions={selectedOptions}
              handleOptionChange={handleOptionChange}
            />
          ))}
        </div>

        <div className="mt-auto pt-4">
          <AddToCartButton item={item} addToCart={addToCart} />
        </div>
      </div>
    </div>
  );
};

export default MenuCard;