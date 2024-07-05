"use client"

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputForm from "@/components/Input/input-form"
import { form } from "./form"
import dynamic from "next/dynamic";
import { useState } from "react";
const MyFroalaEditor = dynamic(
    () => import('@/components/froala/index'),
    { ssr: false }
);

import {jsonToFormData} from "@/lib/utils/json-to-formdata"

export default function PageFrame({item}){

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: item });

    const [desc, setDesc] = useState(item.deskripsi)

    const onSubmit = async (values) => {
        values.deskripsi = desc
        values.admin = parseInt(values.admin)
        values.wkm = parseFloat(values.wkm)
        values.dealer = parseFloat(values.dealer)


        console.log("ini values yaa ", values)
        Swal.fire({
        title: "Do you want to save the record?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#0891B2",
        cancelButtonColor: "#d33",
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            try {
                const resUpdate = await fetch("/api/vendor/update",{
                    method: "POST",
                  headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values)
                })

                if(resUpdate.status ==200){
                    const message = await resUpdate.json()
                    Swal.fire("Info", message.message, "info");
                }

            } catch (error) {
            Swal.fire("Failed!", error.message, "error");
            }
        },
        allowOutsideClick: () => !Swal.isLoading(),
        });
   
    };

    return (
        <>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

                
                <div className="-mx-3 mb-6 w-full grid grid-cols-12">
                    
                    {form.map((e)=>{
                        return <InputForm disabled={e.disabled} step={e.step} key={e.id} name={e.name} title={e.title} type={e.type} id={e.id} register={register}/> 
                    })}

                </div>

                <div className="-mx-3 w-full grid grid-cols-12">
                    <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mr-4 flex items-center col-span-3">
                                Deskripsi Produk
                            </label>
                    </div>
                </div>
                <MyFroalaEditor model={desc} setDesc={setDesc} />

                <br />
                <br />

                <div className="-mx-3 w-full grid grid-cols-12">
                    <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
                            <p className="uppercase tracking-wide text-gray-700 text-xs font-bold mr-4 flex items-center col-span-6">
                                Tampilan Deskripsi Vendor
                            </p>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: desc }} className= "py-5 rounded-lg px-5 border-2 border-black" />
                
                <br />
                <button
                    id="button"
                    type="submit"
                    className="w-full mb-14 px-6 py-1 mt-2 text-lg text-black transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-yellow hover:bg-white hover:shadow-lg focus:outline-none border-2 border-yellow"
                >
                    Save
                </button>
            </form>
        </>
    )
}