'use client'

import { useState, useCallback, useMemo, ChangeEvent } from 'react'
import LoadingDots from './loadingDots'
import { PutBlobResult } from '@vercel/blob'
import { useToast } from '@chakra-ui/react';

export default function Uploader() {
  const toast = useToast();
  const [data, setData] = useState<{
    image: string | null
  }>({
    image: null,
  })
  const [file, setFile] = useState<File | null>(null)
  console.log(file)

  const [dragActive, setDragActive] = useState(false)

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

  const [saving, setSaving] = useState(false)

  const saveDisabled = useMemo(() => {
    return !data.image || saving
  }, [data.image, saving])

  return (
    <form
      className="w-full"
      onSubmit={async (e) => {
        e.preventDefault()
        setSaving(true)
        fetch('/api/upload', {
          method: 'POST',
          headers: { 'content-type': file?.type || 'application/octet-stream' },
          body: file,
        }).then(async (res) => {
          if (res.status === 200) {
            const { url } = (await res.json()) as PutBlobResult
            toast({
              title: "File was uploaded at " + url,
              status: "success",
              duration: 5000,
              isClosable: true,
              });
          } else {
            const error = await res.text()
            toast({
              title: "Error uploading file: " + error,
              status: "error",
              duration: 5000,
              isClosable: true,
              });
          }
          setSaving(false)
        })
      }}
    >
      <div className='w-full'>
        <label
          htmlFor="image-upload"
          className="group relative mt-2 flex h-40 cursor-pointer flex-col items-center justify-center rounded-md cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 shadow-sm transition-all"
        >
          <div
            className="absolute z-[5] w-full rounded-md"
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragEnter={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)

              const file = e.dataTransfer.files && e.dataTransfer.files[0]
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
                    setData((prev) => ({
                      ...prev,
                      image: e.target?.result as string,
                    }))
                  }
                  reader.readAsDataURL(file)
                }
              }
            }}
          />
          <div
            className={`${
              dragActive ? 'border-2 border-black' : ''
            } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
              data.image
                ? 'bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md'
                : ' opacity-100 hover:bg-gray-200'
            }`}
          >
            <svg
              className={`${
                dragActive ? 'scale-110' : 'scale-100'
              } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
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
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Toca para subir tu<span className="font-semibold"> poder</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>

            <span className="sr-only">Subir foto</span>
          </div>
          {data.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          )}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            id="image-upload"
            name="image"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onChangePicture}
          />
        </div>
      </div>

      <button
        disabled={saveDisabled}
        className={`${
          saveDisabled
            ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
            : 'border-black bg-black text-white hover:bg-white hover:text-black'
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {saving ? (
          <LoadingDots color="#808080" />
        ) : (
          <p className="text-sm">Confirmar imagen</p>
        )}
      </button>
    </form>
  )
}