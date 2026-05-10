import { useEffect, useState } from "react"

function PageWrapper({ children }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className={`transition-opacity duration-500 ease-out ${
        show
          ? "opacity-100"
          : "opacity-0"
      }`}
    >
      {children}
    </div>
  )
}

export default PageWrapper