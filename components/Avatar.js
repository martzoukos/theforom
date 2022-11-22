import Image from "next/image"
import { stringAvatar } from "../lib/stringAvatar"
import styles from './Avatar.module.css'

export default function Avatar({
  src, 
  alt = '',
  width = 45,
  height = 45,
}) {
  if (src) {
    console.log(src)
    return (
      <Image 
        src={src} 
        alt={alt}
        width={width}
        height={height}
      />
    )
  } else {
    const bgColor = stringAvatar(alt).bgColor
    const initials = stringAvatar(alt).initials
    return (
      <span 
        className={ styles.emptyAvatar }
        style={{
          backgroundColor: bgColor,
          width,
          height
        }}
      >
        {initials}
      </span>
    )
  }
}