import { useEffect, useState, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"

function PromoBanner() {
  const navigate = useNavigate()

  const banners = [
    {
      img: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/banners/home/promo-kopken.jpg",
      path: "/kopken",
      title: "Kopi Kenangan",
      sub: "Diskon menu pilihan sampai 50%",
      cta: "Lihat Promo"
    },
    {
      img: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/banners/home/promo-fore.jpg",
      path: "/fore",
      title: "Fore Coffee",
      sub: "Coffee modern favorit anak kota",
      cta: "Pesan Sekarang"
    },
    {
      img: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/banners/home/promo-jjw.jpg",
      path: "/janji",
      title: "Janji Jiwa",
      sub: "Promo hemat buat teman sejiwa",
      cta: "Cek Menu"
    }
  ]

  const extended = [...banners, banners[0]]

  const [index, setIndex] = useState(0)
  const [transition, setTransition] = useState(true)

  const intervalRef = useRef(null)

  const stopAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const startAuto = useCallback(() => {
    stopAuto()

    intervalRef.current = setInterval(() => {
      setIndex(prev => {
        if (prev >= banners.length) return 1
        return prev + 1
      })
    }, 3500)
  }, [stopAuto, banners.length])

  useEffect(() => {
    startAuto()
    return () => stopAuto()
  }, [startAuto, stopAuto])

  useEffect(() => {
    if (index === banners.length) {
      const timer = setTimeout(() => {
        setTransition(false)
        setIndex(0)
      }, 500)

      return () => clearTimeout(timer)
    }

    if (index === 0 && !transition) {
      const timer = setTimeout(() => {
        setTransition(true)
      }, 50)

      return () => clearTimeout(timer)
    }
  }, [index, transition, banners.length])

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) stopAuto()
      else startAuto()
    }

    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      )
    }
  }, [startAuto, stopAuto])

  const active = banners[index % banners.length]

  return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-md card-shadow">

      <div
        className="flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: transition ? "transform .5s ease-out" : "none"
        }}
      >
        {extended.map((b, i) => (
          <img
            key={i}
            src={b.img}
            className="w-full h-[170px] object-cover flex-shrink-0"
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

      <div className="absolute left-4 right-4 bottom-4 text-white">
        <p className="text-[11px] uppercase tracking-[2px] text-white/80">
          Special Deals
        </p>

        <h3 className="text-xl font-bold mt-1">
          {active.title}
        </h3>

        <p className="text-xs text-white/85 mt-1">
          {active.sub}
        </p>

        <button
          onClick={() => navigate(active.path)}
          className="mt-3 px-4 py-2 rounded-full bg-white text-gray-900 text-xs font-semibold active:scale-95 transition-all"
        >
          {active.cta}
        </button>
      </div>

      <div className="absolute bottom-4 right-4">
        <div className="flex gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
          {banners.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
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