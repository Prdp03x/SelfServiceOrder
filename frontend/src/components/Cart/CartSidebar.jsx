import CartItem from "./CartItem";
import PlaceOrderButton from "../PlaceOrderButton";

const CartSidebar = ({
  cart,
  total,
  showCart,
  setShowCart,
  placeOrder,
  removeFromCart
}) => {
  return (
    <div
      className="fixed inset-0 bg-white z-50 transition-all duration-500"
      style={{
        clipPath: showCart
          ? "circle(150% at 90% 10%)"
          : "circle(0% at 90% 10%)",
      }}
    >
      <div className="p-6 h-full flex flex-col">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">🛒 Your Cart</h2>
          <button
            onClick={() => setShowCart(false)}
            className="text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-400">Cart is empty</p>
          ) : (
            cart.map((item) => <CartItem key={item._id} item={item} removeFromCart={removeFromCart}/>)
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <PlaceOrderButton
              placeOrder={placeOrder}
              disabled={cart.length === 0}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;