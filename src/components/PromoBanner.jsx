import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

function PromoBanner() {
  const navigate = useNavigate()

  const banners = [
    {
      img: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/promo-kopken.jpg",
      path: "/kopken"
    },
    {
      img: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/promo-fore.jpg",
      path: "/fore"
    },
    {
      img: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/promo-jjw.jpg",
      path: "/janji"
    }
  ]

  const extended = [...banners, banners[0]]

  const [index, setIndex] = useState(0)
  const [transition, setTransition] = useState(true)

  const intervalRef = useRef(null)

  const startAuto = () => {
    stopAuto()
    intervalRef.current = setInterval(() => {
      setIndex(i => {
        if (i >= banners.length) return 1
        return i + 1
      })
    }, 3000)
  }

  const stopAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    startAuto()
    return () => stopAuto()
  }, [])

  useEffect(() => {
    if (index === banners.length) {
      setTimeout(() => {
        setTransition(false)
        setIndex(0)
      }, 500)
    }

    if (index === 0 && !transition) {
      setTimeout(() => {
        setTransition(true)
      }, 50)
    }
  }, [index])

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) stopAuto()
      else startAuto()
    }

    document.addEventListener("visibilitychange", handleVisibility)
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility)
  }, [])

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-md">

      {/* SLIDER */}
      <div
        className="flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: transition ? "transform 0.5s ease-out" : "none"
        }}
      >
        {extended.map((b, i) => (
          <img
            key={i}
            src={b.img}
            onClick={() => navigate(b.path)}
            className="w-full h-[210px] object-cover flex-shrink-0 cursor-pointer active:scale-[0.98]"
          />
        ))}
      </div>

      {/* DOT (FIX + PREMIUM) */}
      <div className="absolute bottom-1 left-0 right-0 flex justify-center">
        <div className="flex gap-2 px-3 py-1 rounded-full backdrop-blur-md bg-white/40 border border-white/30">

          {banners.map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-300 rounded-full ${
                i === (index % banners.length)
                  ? "w-6 h-1.5 bg-white scale-110"
                  : "w-2 h-1.5 bg-white/50"
              }`}
            />
          ))}

        </div>
      </div>

    </div>
  )
}

export default PromoBanner