import { useEffect, useState } from "react";
import { createAdminUser, getAdminUsers, setAdminUserActive } from "../../api/adminApi";
export default function AdminUsersPage(){
 const [items,setItems]=useState([]);const [form,setForm]=useState({email:"",password:"",role:"EDITOR"});const [error,setError]=useState("");
 const load=()=>getAdminUsers().then(setItems).catch(e=>setError(e.response?.data?.message||"Failed to load"));
 useEffect(()=>{load();},[]);
 const submit=async(e)=>{e.preventDefault();try{await createAdminUser(form);setForm({email:"",password:"",role:"EDITOR"});load();}catch(e){setError(e.response?.data?.message||"Failed to create user")}};
 return <div className="p-5 lg:p-10"><div className="mx-auto max-w-5xl"><p className="eyebrow">ACCESS CONTROL</p><h1 className="section-title">Admin Users</h1>
 <form onSubmit={submit} className="mt-8 grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6 md:grid-cols-4"><input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="rounded-xl border border-zinc-300 px-3 py-2.5"/><input required minLength="8" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="rounded-xl border border-zinc-300 px-3 py-2.5"/><select value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="rounded-xl border border-zinc-300 px-3 py-2.5"><option>EDITOR</option><option>ADMIN</option></select><button className="btn-primary">Create user</button></form>
 {error&&<p className="mt-5 text-red-600">{error}</p>}
 <div className="mt-8 overflow-x-auto rounded-3xl border border-zinc-200 bg-white"><table className="min-w-full text-left text-sm"><thead className="bg-zinc-50 text-xs uppercase text-zinc-500"><tr><th className="px-5 py-4">Email</th><th className="px-5 py-4">Role</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Action</th></tr></thead><tbody className="divide-y divide-zinc-100">{items.map(i=><tr key={i.id}><td className="px-5 py-4">{i.email}</td><td className="px-5 py-4">{i.role}</td><td className="px-5 py-4">{i.active?"Active":"Disabled"}</td><td className="px-5 py-4"><button onClick={()=>setAdminUserActive(i.id,!i.active).then(load)} className="font-semibold">{i.active?"Disable":"Enable"}</button></td></tr>)}</tbody></table></div>
 </div></div>;
}
