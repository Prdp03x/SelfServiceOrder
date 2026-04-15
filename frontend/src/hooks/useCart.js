import { useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (itemId, optionTitle, choice, type) => {
    setSelectedOptions((prev) => {
      const itemOptions = prev[itemId] || {};

      if (type === "single") {
        return {
          ...prev,
          [itemId]: {
            ...itemOptions,
            [optionTitle]: [choice],
          },
        };
      }

      const existing = itemOptions[optionTitle] || [];
      const alreadySelected = existing.find((c) => c.name === choice.name);

      const updated = alreadySelected
        ? existing.filter((c) => c.name !== choice.name)
        : [...existing, choice];

      return {
        ...prev,
        [itemId]: {
          ...itemOptions,
          [optionTitle]: updated,
        },
      };
    });
  };

  const addToCart = (item) => {
    const extras = selectedOptions[item._id] || {};
    const selectedExtras = Object.values(extras).flat();

    const existing = cart.find(
      (i) =>
        i._id === item._id &&
        JSON.stringify(i.selectedOptions) === JSON.stringify(selectedExtras)
    );

    if (existing) {
      setCart(cart.map((i) =>
        i === existing ? { ...i, qty: i.qty + 1 } : i
      ));
    } else {
      setCart([
        ...cart,
        { ...item, qty: 1, selectedOptions: selectedExtras },
      ]);
    }

    setSelectedOptions((prev) => ({
      ...prev,
      [item._id]: {},
    }));
  };

  const total = cart.reduce((sum, item) => {
    const extras =
      item.selectedOptions?.reduce((s, opt) => s + opt.price, 0) || 0;

    return sum + (item.price + extras) * item.qty;
  }, 0);

  const removeFromCart = (itemToRemove) => {
  setCart((prev) =>
    prev.filter(
      (item) =>
        !(
          item._id === itemToRemove._id &&
          JSON.stringify(item.selectedOptions) ===
            JSON.stringify(itemToRemove.selectedOptions)
        )
    )
  );
};

  return {
    cart,
    selectedOptions,
    handleOptionChange,
    addToCart,
    removeFromCart,
    total,
    setCart,
    setSelectedOptions,
  };
};

export default useCart;