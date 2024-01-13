'use client';

import { UploadButton, UploadDropzone } from '@/lib/uploadThing';
import Image from 'next/image';
import { useState } from 'react';

export default function UploadMe() {
  const [imageUrl, setImageUrl] = useState<string>('');
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <UploadDropzone
        endpoint='imageUploader'
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res);
          setImageUrl(res[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imageUrl.length ? (
        <div>
          <Image src={imageUrl} alt='Uploaded Image' width={500} height={500} />
          <h1>{imageUrl}</h1>
        </div>
      ) : null}
    </main>
  );
}
