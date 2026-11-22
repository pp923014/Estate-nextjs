"use client";
import {useState} from "react";
import {InquiryModal} from "@/components/SiteModals";
export default function PropertyInquiry({property}){const [open,setOpen]=useState(false);return <><button onClick={()=>setOpen(true)} className="btn-dark mt-6 w-full">Enquire about property ↗</button><InquiryModal open={open} onClose={()=>setOpen(false)} property={property}/></>}
