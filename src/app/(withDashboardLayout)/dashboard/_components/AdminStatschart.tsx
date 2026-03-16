"use client";

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, Cell
} from 'recharts';
import Container from '@/components/shared/Container';
import { Box } from 'lucide-react';

interface IDashboardProps {
  orders: any;
  products: any;
  users: any;
}

const AdminStatsChart = ({ orders, products, users }: IDashboardProps) => {
  
  // এপিআই রেসপন্স থেকে অ্যারে এক্সট্রাক্ট করা
  const ordersList = Array.isArray(orders) ? orders : (orders?.data || orders?.orders || []);
  const productsList = Array.isArray(products) ? products : (products?.data || products?.products || []);
  const usersList = Array.isArray(users) ? users : (users?.data || users?.users || []);

  // ১. সেলস ডাটা (ট্রানজেকশন ভিত্তিক)
  const salesData = ordersList.map((order: any) => ({
    name: order.transactionId?.slice(-6).toUpperCase() || "N/A",
    amount: order.totalAmount || 0,
  }));

  // ২. ইনভেন্টরি ডাটা (টপ ৫ প্রোডাক্ট এবং তাদের স্টক)
  const stockData = productsList.slice(0, 6).map((p: any) => ({
    name: p.name.length > 10 ? p.name.slice(0, 10) + '...' : p.name,
    stock: p.stock || 0,
  }));

  // ৩. আউট অফ স্টক ক্যালকুলেশন (সঠিক ডাটার জন্য)
  const outOfStockItems = productsList.filter((p: any) => p.stock === 0);

  return (
    <div className="bg-[#FBF9F6] min-h-screen py-10 md:py-16 font-sans text-slate-900">
      <Container>
        <div className="px-4 sm:px-6 md:px-0">
          
          {/* হেডার ডিজাইন (আপনার দেওয়া ইমেজ অনুযায়ী) */}
          <div className="bg-white border border-slate-100 p-8 mb-10 flex items-center gap-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
            <div className="bg-black p-4 rounded-lg">
              <Box className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight leading-none">Overview</h1>
              <p className="text-[11px] font-bold text-[#A38A6F] uppercase tracking-[0.2em] mt-2">
                Total {productsList.length} Items Found
              </p>
            </div>
          </div>

          {/* Stats Cards (Luxury Minimal Design) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-10 border-t-4 border-black shadow-sm group hover:shadow-md transition-all">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Net Revenue</p>
              <h3 className="text-4xl font-black italic tracking-tighter mt-3">
                ${ordersList.reduce((acc: number, curr: any) => acc + (curr.totalAmount || 0), 0).toFixed(2)}
              </h3>
            </div>
            
            <div className="bg-white p-10 border-t-4 border-[#CC99A2] shadow-sm group hover:shadow-md transition-all">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Customer Base</p>
              <h3 className="text-4xl font-black italic tracking-tighter mt-3">{usersList.length} Users</h3>
            </div>

            <div className="bg-white p-10 border-t-4 border-red-500 shadow-sm group hover:shadow-md transition-all">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Critical Stock</p>
              <h3 className="text-4xl font-black italic tracking-tighter mt-3 text-red-600">
                {outOfStockItems.length} Out Of Stock
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Area Chart: Sales */}
            <div className="bg-white p-8 md:p-12 shadow-sm border border-slate-100 rounded-sm">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-12 text-slate-400">Revenue Stream</h4>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#000" stopOpacity={0.05}/>
                        <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" fontSize={9} fontBold={700} axisLine={false} tickLine={false} dy={10} />
                    <YAxis fontSize={9} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="step" dataKey="amount" stroke="#000" strokeWidth={2} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart: Inventory */}
            <div className="bg-white p-8 md:p-12 shadow-sm border border-slate-100 rounded-sm">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-12 text-slate-400">Stock Analysis</h4>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stockData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" fontSize={9} axisLine={false} tickLine={false} dy={10} />
                    <YAxis fontSize={9} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#fcfaf7'}} contentStyle={{ border: '1px solid #eee', fontSize: '12px' }} />
                    <Bar dataKey="stock" barSize={30} radius={[2, 2, 0, 0]}>
                      {stockData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.stock === 0 ? '#ef4444' : '#CC99A2'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminStatsChart;