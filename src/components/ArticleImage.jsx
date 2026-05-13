import { useState } from 'react'
import fallbackImg from '../assets/news.avif'

const ArticleImage = ({ src, alt, loading = 'lazy', className }) => {
  const [failed, setFailed] = useState(false)
  const url = !src || failed ? fallbackImg : src

  return (
    <img
      src={url}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}

export default ArticleImage
