import axios from "axios"

export const uploadFile = async (file, path) => {
  // Stripe weird characters and add timestamp so that we don't accidentally replace old images
  const timestamp = new Date().getTime();
  const filename = file.name.split('.')[0].replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '').toLowerCase() + `_${timestamp}`;
  const fileExtension = file.name.split('.').pop();
  
  // Get signed URL first for security, since we're uploading from frontend
  // Read: https://raz-levy.medium.com/how-to-upload-files-to-aws-s3-from-the-client-side-using-react-js-and-node-js-660252e61e0
  const { data } = await axios.post('/api/s3/uploadFile', {
    name: `${filename}.${fileExtension}`,
    type: file.type,
    path: path
  })

  // Use the signedURL to upload the image
  const res = await axios.put(data.signedURL, file, {
    headers: {
      'Content-type': file.type,
      'Access-Control-Allow-Origin': '*',
    }
  })

  if (res.status === 200) {
    return data.fileURL
  } else {
    return null
  }
}