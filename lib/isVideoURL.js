import urlParser from "js-video-url-parser";

export const isVideoUrl = url => {
  if (!url) return false
  return !!urlParser.parse(url)
}