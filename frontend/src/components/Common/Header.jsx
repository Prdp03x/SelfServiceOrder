import { useNavigate } from "react-router";

const Header = ({ brand }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-fullpx-6 py-3 flex justify-start items-center rounded-lg mb-5"
      // style={{ backgroundColor: brand?.primaryColor || "#000" }}
    >
      {/* LEFT: LOGO + NAME */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        {brand?.logo && (
          <img
            src={brand.logo}
            alt="logo"
            className="h-10 w-10 object-cover rounded-full"
          />
        )}

        <h1 className="text-gray-500 font-bold text-lg">
          {brand?.name || "My Cafe"}
        </h1>
      </div>
    </div>
  );
};

export default Header;