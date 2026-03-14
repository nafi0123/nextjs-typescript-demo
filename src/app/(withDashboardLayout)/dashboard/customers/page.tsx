import React from 'react';
import { getAllUsers } from '@/services/coustomers.service';
import UserSearch from './_components/UserSearch';
import RoleSelector from './_components/RoleSelector';
import { DeleteUserBtn } from './_components/DeleteUserBtn';
import { User as UserIcon, Mail, Calendar, RefreshCcw, Users } from 'lucide-react';

const CustomersPage = async ({ 
    searchParams 
}: { 
    searchParams: Promise<{ page?: string; query?: string }> 
}) => {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const searchTerm = params.query || "";
    
    const { users, pagination } = await getAllUsers(currentPage, 10, searchTerm);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 p-4 md:p-0">
            {/* Header and Search Bar Section */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6 border border-[#EBE3D9] shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="bg-black p-3 rounded-sm text-white">
                        <Users size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                            User Directory
                        </h1>
                        <p className="text-[#A38A6F] text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
                            Found {pagination?.totalUsers || 0} Registered Members
                        </p>
                    </div>
                </div>
                <UserSearch />
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-sm border border-[#EBE3D9] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-max">
                        <thead>
                            <tr className="bg-[#FEF4EC] border-b border-[#EBE3D9]">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F]">Profile</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F]">Email</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F]">Joined Date</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F]">Last Update</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F]">Role</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0F0F0]">
                            {users.length > 0 ? (
                                users.map((user: any) => (
                                    <tr key={user._id} className="hover:bg-[#FDFBF9] transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-9 h-9 bg-[#F2EDE4] rounded-full flex items-center justify-center text-[#A38A6F]">
                                                    <UserIcon size={16} />
                                                </div>
                                                <span className="font-bold text-slate-900 uppercase text-[11px] tracking-tight">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-[11px] text-slate-500 font-medium italic">
                                            <div className="flex items-center gap-2">
                                                <Mail size={12} className="text-[#CCAF91]" />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={12} className="text-[#CCAF91]" />
                                                {formatDate(user.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                            <div className="flex items-center gap-2">
                                                <RefreshCcw size={12} />
                                                {formatDate(user.updatedAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <RoleSelector userId={user._id} currentRole={user.role || 'customer'} />
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <DeleteUserBtn userId={user._id} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-20 text-center text-[10px] font-black uppercase tracking-widest text-slate-300">
                                        No users found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pb-10">
                    <div className="flex items-center gap-2">
                        <a 
                            href={`?page=${currentPage - 1}${searchTerm ? `&query=${searchTerm}` : ''}`}
                            className={`px-6 py-3 border border-[#EBE3D9] text-[10px] font-black tracking-[0.2em] ${!pagination.hasPrevPage ? 'pointer-events-none opacity-20' : 'hover:bg-black hover:text-white transition'}`}
                        >
                            PREV
                        </a>
                        <div className="bg-[#FEF4EC] px-6 py-3 border border-[#EBE3D9] text-[10px] font-black tracking-[0.2em] text-[#A38A6F]">
                            {pagination.currentPage} / {pagination.totalPages}
                        </div>
                        <a 
                            href={`?page=${currentPage + 1}${searchTerm ? `&query=${searchTerm}` : ''}`}
                            className={`px-6 py-3 border border-[#EBE3D9] text-[10px] font-black tracking-[0.2em] ${!pagination.hasNextPage ? 'pointer-events-none opacity-20' : 'hover:bg-black hover:text-white transition'}`}
                        >
                            NEXT
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomersPage;