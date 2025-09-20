import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, User } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", assets: 400 },
  { name: "Feb", assets: 300 },
  { name: "Mar", assets: 500 },
  { name: "Apr", assets: 450 },
  { name: "May", assets: 600 },
  { name: "Jun", assets: 700 },
];

const assetTable = [
  { id: "CAM-101", type: "Camera", location: "Lobby", status: "Active" },
  { id: "RDR-203", type: "Card Reader", location: "East Wing", status: "Inactive" },
  { id: "PANEL-07", type: "Control Panel", location: "Server Room", status: "Maintenance" },
  { id: "CAM-225", type: "Camera", location: "Parking Lot", status: "Active" },
  { id: "RDR-315", type: "Card Reader", location: "Main Entrance", status: "Active" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      {/* Top Navbar */}
      <header className="bg-[#1B2A41] text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Sentra</h1>
          <nav className="hidden md:flex gap-6 text-sm text-gray-300">
            <a href="#" className="hover:text-white">Assets</a>
            <a href="#" className="hover:text-white">Access</a>
            <a href="#" className="hover:text-white">Visitors</a>
            <a href="#" className="hover:text-white">Rooms</a>
            <a href="#" className="hover:text-white">Ops</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 cursor-pointer" />
          <Settings className="w-5 h-5 cursor-pointer" />
          <User className="w-6 h-6 cursor-pointer" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI Cards */}
        <Card className="bg-white shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle>Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#1B2A41]">1,245</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle>Active Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#1DB9A0]">1,102</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle>Maintenance Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">143</p>
          </CardContent>
        </Card>

        {/* Chart Section */}
        <Card className="md:col-span-2 bg-white shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle>Asset Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="assets" stroke="#1DB9A0" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Action Card */}
        <Card className="bg-white shadow-md rounded-2xl flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button className="bg-[#1DB9A0] hover:bg-[#15957F] text-white">Add New Asset</Button>
            <Button variant="outline" className="border-[#1B2A41] text-[#1B2A41] hover:bg-gray-100">Generate Report</Button>
          </CardContent>
        </Card>

        {/* Asset Table */}
        <Card className="md:col-span-3 bg-white shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle>Asset Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assetTable.map((asset) => (
                    <tr key={asset.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium text-gray-900">{asset.id}</td>
                      <td className="px-4 py-2">{asset.type}</td>
                      <td className="px-4 py-2">{asset.location}</td>
                      <td className="px-4 py-2">
                        {asset.status === "Active" && <Badge className="bg-[#1DB9A0] text-white">Active</Badge>}
                        {asset.status === "Inactive" && <Badge className="bg-gray-400 text-white">Inactive</Badge>}
                        {asset.status === "Maintenance" && <Badge className="bg-red-500 text-white">Maintenance</Badge>}
                      </td>
                      <td className="px-4 py-2">
                        <Button variant="outline" size="sm" className="text-[#1B2A41] border-[#1B2A41] hover:bg-gray-100">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
