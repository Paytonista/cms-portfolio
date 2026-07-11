import { createUploadthing } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  hightlight_image: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(({ file }) => {
      console.log("Highlight image complete", file.url);
    }),
    carousel_images: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .onUploadComplete(({ file }) => {
      console.log("Carousel Image complete", file.url);
    }),
    
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;