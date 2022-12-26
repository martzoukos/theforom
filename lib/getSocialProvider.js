export const getSocialProvider = url => {
  if (/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(url)) {
    return 'twitter'
  }
  if (/http(?:s)?:\/\/(?:www\.)?facebook\.com\/([a-zA-Z0-9_]+)/.test(url)) {
    return 'facebook'
  }
  if (/http(?:s)?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9_]+)/.test(url)) {
    return 'instagram'
  }
  return false
}