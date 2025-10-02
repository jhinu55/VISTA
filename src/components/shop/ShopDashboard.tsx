'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  InboxIcon,
  PresentationChartLineIcon,
  QueueListIcon,
  TagIcon,
  WrenchIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';

const ShopDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const kpiData = [
    { title: 'Repairs Today', value: '12', change: '+2', changeType: 'increase' },
    { title: 'Pending Orders', value: '28', change: '-5', changeType: 'decrease' },
    { title: 'Parts Low', value: '8', change: '+3', changeType: 'increase' },
    { title: 'Average Repair Time', value: '2.3d', change: '-0.5', changeType: 'decrease' },
  ];

  const repairTickets = [
    { id: 'RT001', clientName: 'John Doe', device: 'iPhone 14 Pro', status: 'In Progress', daysOpen: 2 },
    { id: 'RT002', clientName: 'Jane Smith', device: 'MacBook Air', status: 'Pending Parts', daysOpen: 3 },
    { id: 'RT003', clientName: 'Mike Johnson', device: 'iPad Pro', status: 'Diagnostic', daysOpen: 1 },
    // Add more sample data as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside 
        className={clsx(
          "bg-white shadow-lg w-64 transition-all duration-300 fixed h-full",
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        )}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">VISTA</h1>
          <p className="text-sm text-gray-500">Repair Shop Portal</p>
        </div>

        <nav className="mt-6">
          {[
            { name: 'New Orders', icon: InboxIcon, href: '/shop/orders/new' },
            { name: 'Pending Repairs', icon: WrenchIcon, href: '/shop/repairs/pending' },
            { name: 'Completed', icon: ClipboardDocumentListIcon, href: '/shop/repairs/completed' },
            { name: 'Inventory', icon: TagIcon, href: '/shop/inventory' },
            { name: 'Reports', icon: PresentationChartLineIcon, href: '/shop/reports' },
            { name: 'Settings', icon: CogIcon, href: '/shop/settings' },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={clsx(
        "flex-1 transition-all duration-300",
        sidebarOpen ? 'ml-64' : 'ml-0'
      )}>
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-800"
          >
            <QueueListIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{kpi.value}</p>
                  </div>
                  <span className={clsx(
                    "text-sm font-medium",
                    kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {kpi.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Active Repair Tickets Table */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Active Repair Tickets</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search tickets..."
                  className="px-4 py-2 border rounded-lg text-sm"
                />
                <select className="px-4 py-2 border rounded-lg text-sm text-gray-600">
                  <option value="">All Status</option>
                  <option value="in-progress">In Progress</option>
                  <option value="pending">Pending Parts</option>
                  <option value="diagnostic">Diagnostic</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Device
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days Open
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {repairTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {ticket.clientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {ticket.device}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={clsx(
                          "px-2 py-1 text-xs font-medium rounded-full",
                          {
                            'bg-blue-100 text-blue-800': ticket.status === 'In Progress',
                            'bg-yellow-100 text-yellow-800': ticket.status === 'Pending Parts',
                            'bg-purple-100 text-purple-800': ticket.status === 'Diagnostic',
                          }
                        )}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {ticket.daysOpen} days
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopDashboard;