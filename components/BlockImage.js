/* eslint-disable @next/next/no-img-element */
export const BlockImage = ({ src, alt='' }) => {

  return (
    <img
      src={src}
      alt={alt}
    />
  )
}