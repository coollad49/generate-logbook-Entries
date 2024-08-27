"use client"

import { Description, Field, Label, Textarea } from '@headlessui/react'
import clsx from 'clsx'
import { useState, useEffect } from 'react';
import {Button} from '@/components/ui/button'
import { useRouter } from 'next/navigation';

export default function Report() {
    const [modelResponse, setModelResponse] = useState('');
    const router = useRouter();

    useEffect(() => {
        const storedResponse = sessionStorage.getItem('modelResponse');
        if (storedResponse) {
            setModelResponse(storedResponse);
        }
    }, []);
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <Button variant="outline" className='absolute z-30 top-8 left-12' onClick={()=>router.push('/')}>👈🏽</Button>
        <h1 className="text-3xl font-bold text-white">Generated Logbook Entries</h1>
        <Field className="w-[60%] relative z-20" disabled>
            <Textarea
            className={clsx(
                'bg-black mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-4 px-4 text-sm/6 text-white',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            rows={15}
            value={modelResponse}
            />
        </Field>
    </div>
  )
}
