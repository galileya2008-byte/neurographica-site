import Image, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/paths";

type SiteImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

export function SiteImage({ src, alt, ...props }: SiteImageProps) {
  return <Image src={withBasePath(src)} alt={alt} {...props} />;
}
