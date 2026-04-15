import { useState, useEffect } from "react";
import API from "../api/api";

const useMenu = () => {
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchCategories();
    loadMenu();
  }, []);

  const fetchCategories = async () => {
    const res = await API.get("/menu/categories");
    setCategories(res.data);
  };

  const loadMenu = async (category = "") => {
    const url = category ? `/menu?category=${category}` : "/menu";
    const res = await API.get(url);
    setMenu(res.data);
    setSelectedCategory(category);
  };

  return {
    menu,
    categories,
    selectedCategory,
    loadMenu,
  };
};

export default useMenu;