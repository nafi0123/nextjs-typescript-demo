// app/admin/dashboard/page.tsx

import { getAllOrders } from "@/services/order.service";
import AdminStatsChart from "./_components/AdminStatschart";
import { getAllProducts } from "@/services/product.service";
import { getAllUsers } from "@/services/coustomers.service";

// আপনার সার্ভিস ফাইলগুলো ইমপোর্ট করুন

export default async function DashboardPage() {
    const orders = await getAllOrders(); // আপনার সার্ভার সাইড এপিআই
    const products = await getAllProducts();
    const users = await getAllUsers();

    return (
        <AdminStatsChart 
            orders={orders} 
            products={products} 
            users={users} 
        />
    );
}