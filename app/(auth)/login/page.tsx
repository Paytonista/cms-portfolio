import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Login page for the admin portal.",
};

export default function Page() {
  return (
    <main className="h-screen py-5 px-15">
        <div className="grid grid-cols-[2fr_1fr] h-full b -xs bg-[#07203785]">
            <div className=" rounded  ">
                1
            </div>
            <div className=" rounded p-10 bg-white">
                <div className="flex items-center gap-3 my-4 ">
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="text-sm text-gray-500">or</span>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>

                
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="text-sm font-medium text-gray-300">Username</label>
                        <input type="text" id="username" name="username" className="px-3 py-2 border rounded bg-[#07203785] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                        <input type="password" id="password" name="password" className="px-3 py-2 border rounded bg-[#07203785] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">Login</button>
                </form>
            </div>

        </div>
       
    </main>
  );
}
