import S3 from "aws-sdk/clients/s3";
import { getSession } from "next-auth/react";

const s3 = new S3({
  region: process.env.S3_UPLOAD_REGION,
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
  signatureVersion: "v4",
});

export const uploadFile = async (req, res) => {
  const session = await getSession({ req });
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { name, type, path } = req.body;
    const fileNamePath = `${session?.user?.id}/${path}/${name}`

    const fileParams = {
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key: fileNamePath,
      Expires: 600,
      ContentType: type,
    };

    const signedURL = await s3.getSignedUrlPromise("putObject", fileParams);
    const fileURL = process.env.NEXT_PUBLIC_S3_BUCKET_URL + fileNamePath

    res.status(200).json({ signedURL, fileURL });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};

export default uploadFile