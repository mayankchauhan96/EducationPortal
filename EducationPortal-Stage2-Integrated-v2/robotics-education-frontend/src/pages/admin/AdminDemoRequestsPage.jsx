import { useEffect, useState } from "react";
import { getDemoRequests, updateDemoStatus } from "../../api/adminApi";
export default function AdminDemoRequestsPage(){
 const [items,setItems]=useState([]);const [error,setError]=useState("");
 const load=()=>getDemoRequests().then(setItems).catch(e=>setError(e.response?.data?.message||"Failed to load"));
 useEffect(()=>{load();},[]);
 const update=async(id,value)=>{await updateDemoStatus(id,value);load();};
 return <div className="p-5 lg:p-10"><div className="mx-auto max-w-7xl"><p className="eyebrow">SCHOOL LEADS</p><h1 className="section-title">Demo Requests</h1>{error&&<p className="mt-5 text-red-600">{error}</p>}
 <div className="mt-8 overflow-x-auto rounded-3xl border border-zinc-200 bg-white"><table className="min-w-full text-left text-sm"><thead className="bg-zinc-50 text-xs uppercase text-zinc-500"><tr>{["Contact","School","Email","Phone","City","Grades"].map(h=><th className="px-5 py-4" key={h}>{h}</th>)}<th className="px-5 py-4">Status</th></tr></thead>
 <tbody className="divide-y divide-zinc-100">{items.length?items.map(i=><tr key={i.id}><td className="px-5 py-4">{i.contactName}</td><td className="px-5 py-4">{i.schoolName}</td><td className="px-5 py-4">{i.email}</td><td className="px-5 py-4">{i.phone||"—"}</td><td className="px-5 py-4">{i.city||"—"}</td><td className="px-5 py-4">{i.grades||"—"}</td><td className="px-5 py-4"><select value={i.status} onChange={e=>update(i.id,e.target.value)} className="rounded-lg border border-zinc-300 px-2 py-1">{["NEW","CONTACTED","QUALIFIED","CLOSED"].map(v=><option key={v}>{v}</option>)}</select></td></tr>):<tr><td colSpan="7" className="px-5 py-10 text-center text-zinc-500">No demo requests yet.</td></tr>}</tbody></table></div></div></div>;
}
