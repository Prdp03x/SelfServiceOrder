const CartItem = ({ item, removeFromCart }) => {
  const extrasTotal =
    item.selectedOptions?.reduce((s, o) => s + o.price, 0) || 0;

  return (
    <div className="border-b pb-3">
      <p className="font-medium flex justify-between">
        <span>
          {item.name} x {item.qty}
        </span>
        <span>₹ {(item.price + extrasTotal) * item.qty}</span>
      </p>

      {/* REMOVE BUTTON */}
      <button
        onClick={() => removeFromCart(item)}
        className="text-red-500 text-sm mt-1"
      >
        Remove
      </button>

      {item.selectedOptions?.map((opt, i) => (
        <p key={i} className="text-sm text-gray-500">
          + {opt.name} (₹{opt.price})
        </p>
      ))}
    </div>
  );
};

export default CartItem;
