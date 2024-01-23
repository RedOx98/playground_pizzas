"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type Option = {
    title: string,
    additionalPrice: number,
}

type Inputs = {
    title: string;
    desc: string;
    price: number;
    catSlug: string;
}

const AddPage = () => {
    const { data: session, status } = useSession();

    const [inputs, setInputs] = useState<Inputs>({
        title: "",
        desc: "",
        price: 0,
        catSlug: ""
    });

    const [option, setOption] = useState<Option>({
        title: "",
        additionalPrice: 0
    });

    const [file, setFile] = useState<File>()

    const [options, setOptions] = useState<Option[]>([]);

    const router = useRouter();

    if (status === "loading") {
        return <p className="">Loading...</p>
    }

    if (status === "unauthenticated") {
        router.push('/');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs(prev => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        })
    }

    const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption(prev => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        })
    }

    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const item = (target.files as FileList)[0];
        setFile(item)
    }

    const upload = async () => {

        const data = new FormData();

        data.append("file", file!);
        data.append("upload_preset", "restaurant")

        const res = await fetch('https://api.cloudinary.com/v1_1/dhydpleqs/image/upload', {
            method: 'POST',
            body: data
        });
        const resData = await res.json();

        console.log(resData.url);

        return resData.url
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const url = await upload();

        try {
            const res = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: JSON.stringify({
                    img: url,
                    ...inputs,
                    options: options
                })
            })

            const data = await res.json();

            // router.push(`/product/${data.id}`);
        } catch (err) {
            console.log(err);
        }
    };

    // const deleteOption = (id: string) => {
    //     const options = options
    // }

    console.log(inputs, option);

    return (
        <div>
            <form className="shadow-lg flex flex-wrap gap-4 p-8" onSubmit={handleSubmit}>
                <h1 className="">Add New Product</h1>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="" className="">Title</label>
                    <input onChange={handleChange} className='ring-1 ring-red-200 p-2 rounded-sm' type="text" name='title' />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="" className="">Image</label>
                    <input
                        className='ring-1 ring-red-200 p-2 rounded-sm'
                        type="file"
                        name='img'
                        onChange={handleChangeImg}
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="" className="">Desc</label>
                    <textarea onChange={handleChange} className='ring-1 ring-red-200 p-2 rounded-sm' rows={5} name='desc' />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="" className="">Price</label>
                    <input onChange={handleChange} className='ring-1 ring-red-200 p-2 rounded-sm' type="number" name='price' />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="" className="">Category</label>
                    <input onChange={handleChange} className='ring-1 ring-red-200 p-2 rounded-sm' type="text" name='catSlug' />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="" className="">Options</label>
                    <div>
                        <input onChange={changeOption} className='ring-1 ring-red-200 p-2 rounded-sm' type="text" placeholder='Title' name='title' />
                        <input onChange={changeOption} className='ring-1 ring-red-200 p-2 rounded-sm' type="number" placeholder='Additional Price' name='additionalPrice' />
                    </div>
                    <div className="w-52 bg-red-500 text-white p-2 " onClick={() => { setOptions(prev => [...prev, option]) }}>Add Option</div>
                </div>
                {
                    options.map((item) => (
                        <div className="ring-1 p-2 rounded-xl cursor-pointer " key={item.title} onClick={() => setOptions(options.filter(option => option.title !== item.title))}>
                            <span className="">{option.title}</span>
                            <span className="">${option.additionalPrice}</span>
                        </div>
                    ))
                }
                <button type='submit' className="p-2 w-full bg-red-500 text-white">Submit</button>
            </form>
        </div>
    )
}

export default AddPage