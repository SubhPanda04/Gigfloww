import Navbar from "@/components/Navbar/Navbar";

export default function Reviews() {
    return (
        <div className="w-full min-h-screen bg-gray-50 overflow-hidden">
            <Navbar />
            <main className="p-4 max-w-full">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Reviews</h1>
                    <div className="bg-white rounded-lg shadow-sm border p-6 overflow-hidden">
                        <p className="text-gray-600">Reviews page content coming soon...</p>
                    </div>
                </div>
            </main>
        </div>
    );
}