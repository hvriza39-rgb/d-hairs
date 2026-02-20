import AdminSidebar from "@/components/AdminSidebar";

export const metadata = {
    title: "Admin Dashboard | D-Hairs",
    description: "Manage your D-Hairs store inventory.",
};

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar />
            <div className="flex-1 max-w-7xl mx-auto w-full">
                {children}
            </div>
        </div>
    );
}
