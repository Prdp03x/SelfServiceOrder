// import { useEffect } from "react";
// import useOrders from "../hooks/useOrders";
// import API from "../api/api";
// import OrderCard from "../components/Dashboard/OrderCard";

// const Dashboard = () => {
//   const { orders, newOrderIds, fetchOrders } = useOrders();

//   useEffect(() => {
//     document.title = "Dashboard | Kitchen";
//   }, []);

//   const updateStatus = async (id, status) => {
//     await API.put(`/order/${id}`, { status });
//     fetchOrders();
//   };

//   const deleteOrder = async (id) => {
//     await API.delete(`/order/${id}`);
//     fetchOrders();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-5 font-sans">
//       <div className="max-w-6xl mx-auto">

//         <h1 className="text-3xl font-bold mb-6">
//           👨‍🍳 Kitchen Dashboard ({orders.length})
//         </h1>

//         {orders.length === 0 ? (
//           <p className="text-gray-400">No orders yet</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {orders.map((order) => (
//               <OrderCard
//                 key={order._id}
//                 order={order}
//                 isNew={newOrderIds.includes(order._id)}
//                 updateStatus={updateStatus}
//                 deleteOrder={deleteOrder}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect } from "react";
import useOrders from "../hooks/useOrders";
import API from "../api/api";
import OrderCard from "../components/Dashboard/OrderCard";

const Dashboard = () => {
  const { orders, newOrderIds, fetchOrders } = useOrders();

  useEffect(() => {
    document.title = "Dashboard | Kitchen";
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/order/${id}`, { status });
    fetchOrders();
  };

const deleteOrder = async (id) => {
  try {
    await API.delete(`/order/${id}`);

    // 🔥 REMOVE FROM LOCAL STORAGE
    const existing = JSON.parse(localStorage.getItem("orders")) || [];
    const updated = existing.filter((orderId) => orderId !== id);
    localStorage.setItem("orders", JSON.stringify(updated));

    fetchOrders();
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-5 font-sans">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          👨‍🍳 Kitchen Dashboard ({orders.length})
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-400">No orders yet</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                isNew={newOrderIds.includes(order._id)}
                updateStatus={updateStatus}
                deleteOrder={deleteOrder}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;