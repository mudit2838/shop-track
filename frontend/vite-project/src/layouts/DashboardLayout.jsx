import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {

    return (

        <div className="flex bg-slate-50 min-h-screen text-slate-800 font-sans">

            <Sidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">

                <Navbar />

                <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
                    <div className="mx-auto w-full max-w-7xl">
                        {children}
                    </div>
                </div>

            </div>

        </div>

    )

}

export default DashboardLayout;