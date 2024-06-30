"use server";
import { auth } from "@clerk/nextjs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function getSignedURL() {
  const { userId } = auth();
  if (!userId) {
    return { failure: "Not authenticated" };
  }
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `test-file`,
  });
  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 60 * 60 * 24 * 30,
  });
  return { success: { url: "" } };
}
