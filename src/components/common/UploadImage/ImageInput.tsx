'use client'

import { useState, useCallback, ChangeEvent, SetStateAction, Dispatch } from 'react'
import { Button, useToast } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

interface Props {
  field: any
  file?: File | null
  setFile: Dispatch<SetStateAction<File | null>>
  isDisabled?:boolean
}

export default function ImageInput( {field, setFile, isDisabled } : Props ) {
  const toast = useToast();
  const [data, setData] = useState<{
    image: string | null
  }>({
    image: null,
  })

  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0]
      if (file) {
        if (file.size / 1024 / 1024 > 50) {
          toast({
            title: "File size too big (max 50MB)",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          setFile(file)
          const reader = new FileReader()
          reader.onload = (e) => {
            setData((prev) => ({ ...prev, image: e.target?.result as string }))
          }
          reader.readAsDataURL(file)
        }
      }
    },
    [setData]
  ) 

  return (
  
    <div className='w-full'>
      <label
        htmlFor={`image-upload-${field.name}`}
        className={`group relative mt-2 flex h-40 ${isDisabled?"cursor-not-allowed":"cursor-pointer"} flex-col items-center justify-center rounded-md dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 shadow-sm transition-all`}
      >
        <div
          className={`border border-gray-500 absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
            data.image || field.value
              ? 'bg-white/80 opacity-0'
              : ' opacity-100 hover:bg-gray-200'
          }`}
        >
          <svg
            className={`scale-100 h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M12 12v9"></path>
            <path d="m16 16-4-4-4 4"></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Toca para subir tu <span className="font-semibold">foto</span></p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 50MB)</p>

          <span className="sr-only">Subir foto</span>
        </div>
        {(field.value || data.image) && (
          // eslint-disable-next-line @next/next/no-img-element
          <>
            <img
              src={data.image || field.value}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
            {!isDisabled &&
              <Button style={{position:"absolute",right:"10px",top:"10px"}}>
                <EditIcon/>
              </Button>
            }
          </>
        )}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          name={field.name}
          id={`image-upload-${field.name}`}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={onChangePicture}
          disabled={isDisabled}
        />
      </div>
    </div>
  )
}