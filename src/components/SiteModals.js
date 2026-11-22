"use client";
import { useState } from "react";

export function OwnerModal({open,onClose}) {
  const [form,setForm] = useState({ownerName:"",email:"",phone:"",title:"",category:"Sale",listingType:"Sale",price:"",city:"",description:""});
  const [state,setState] = useState({busy:false,error:"",success:false});
  if (!open) return null;
  function update(e){setForm({...form,[e.target.name]:e.target.value});}
  async function submit(e){
    e.preventDefault(); setState({busy:true,error:"",success:false});
    try { const r=await fetch("/api/owner-requests",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)}); const d=await r.json(); if(!r.ok) throw new Error(d.message); setState({busy:false,error:"",success:true}); }
    catch(err){setState({busy:false,error:err.message,success:false});}
  }
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="modal-card max-h-[90vh] overflow-y-auto">
    <div className="mb-5 flex items-start justify-between"><div><p className="eyebrow">PROPERTY PARTNERSHIP</p><h2 className="section-title text-3xl">List your property</h2><p className="mt-2 text-sm text-muted">Share the details and our team will get in touch.</p></div><button onClick={onClose} className="text-2xl" aria-label="Close">×</button></div>
    {state.success ? <div className="rounded-xl bg-green-50 p-5 text-green-800">Thank you! Your property request has been submitted for review.</div> :
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      {["ownerName","email","phone","title","price","city"].map((name)=><label key={name} className="field-label">{({ownerName:"Owner name",email:"Email",phone:"Phone",title:"Property title",price:"Expected price (₹)",city:"City"})[name]}<input className="field mt-1" name={name} value={form[name]} onChange={update} required/></label>)}
      <label className="field-label">Category<select className="field mt-1" name="category" value={form.category} onChange={update}>{["Rent","Sale","Apartments","Vacation Homes","Resorts"].map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="field-label">Listing type<select className="field mt-1" name="listingType" value={form.listingType} onChange={update}><option>Sale</option><option>Rent</option></select></label>
      <label className="field-label sm:col-span-2">Description<textarea className="field mt-1" rows="3" name="description" value={form.description} onChange={update} required/></label>
      {state.error&&<p className="text-sm text-red-600 sm:col-span-2">{state.error}</p>}
      <button disabled={state.busy} className="btn-dark sm:col-span-2">{state.busy?"Submitting...":"Submit property request"}</button>
    </form>}
  </div></div>;
}

export function InquiryModal({open,onClose,property}) {
  const [form,setForm]=useState({name:"",email:"",phone:"",message:""});
  const [status,setStatus]=useState({busy:false,error:"",success:false});
  if(!open)return null;
  async function submit(e){e.preventDefault();setStatus({busy:true,error:"",success:false});try{const r=await fetch("/api/inquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,propertyId:property?._id,propertyTitle:property?.title||"General inquiry"})});const d=await r.json();if(!r.ok)throw new Error(d.message);setStatus({busy:false,error:"",success:true});}catch(err){setStatus({busy:false,error:err.message,success:false});}}
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="modal-card max-w-lg">
    <div className="mb-5 flex justify-between"><div><p className="eyebrow">LET'S TALK</p><h2 className="section-title text-3xl">Property inquiry</h2><p className="mt-1 text-sm text-muted">{property?.title||"Tell us what you're looking for."}</p></div><button onClick={onClose} className="text-2xl">×</button></div>
    {status.success?<div className="rounded-xl bg-green-50 p-5 text-green-800">Your inquiry has been received. Our team will contact you soon.</div>:<form onSubmit={submit} className="grid gap-3"><input className="field" placeholder="Full name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input className="field" type="email" placeholder="Email address" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><input className="field" placeholder="Phone number" required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/><textarea className="field" rows="4" placeholder="Your message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>{status.error&&<p className="text-sm text-red-600">{status.error}</p>}<button disabled={status.busy} className="btn-dark">{status.busy?"Sending...":"Send inquiry"}</button></form>}
  </div></div>;
}
