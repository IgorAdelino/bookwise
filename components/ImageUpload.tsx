'use client'
import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

const authenticator = async() => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

    if(!response.ok) {
      const errorText = await response.text()

      throw new Error(`Resquest failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    const {signature, expire, token} = data

    return {token, expire, signature}
  } catch (error: any) {
    console.log(error)
    throw new Error("Authentication request failed: ", error.message)
  }
}

const {env: {imagekit: {urlEndpoint, publicKey}}} = config


const ImageUpload = ({onFileChange}: {onFileChange: (filePath: string) => void}) => {
  const ikUploadRef = useRef(null)
  const [file, setFile] = useState<{filePath: string} | null>(null)

  const onError = (error: any) => {
    console.log(error)

    toast({
      title: "Image uploaded failed",
      description: `Your image could not be uploaded. Please try again.`,
      variant: "destructive"
    })
  }

  const onSuccess = (response: any) => {
    setFile(response)
    onFileChange(response.filePath)

    toast({
      title: "Image uploaded successfully",
      description: `${response.filePath} has been uploaded successfully`,
      variant: "default"
    })
  }


  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload className="hidden" ref={ikUploadRef} onSuccess={onSuccess} onError={onError} fileName="test-upload.png"/>
      <button className="upload_btn" style={{background: '#232839'}} onClick={
        (e) => {
          e.preventDefault()
          if(ikUploadRef.current){
            // @ts-ignore
            ikUploadRef.current?.click()
          }
        }
      }>
        <Image src="/icons/upload.svg" alt="upload-icon" width={20} height={20} className="object-contain"/>
        <p className="text-base text-light-100">Upload a File</p>

        {
          file && <p className="upload-filename">{file.filePath}</p>
        }
      </button>
      {
        file && (
          <IKImage alt={file.filePath} path={file.filePath} width={300} height={300}/>
        )
      }
    </ImageKitProvider>
  )
}

export default ImageUpload