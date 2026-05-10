import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

import Header from "../components/Header"
import PromoBanner from "../components/PromoBanner"
import WelcomeCard from "../components/WelcomeCard"
import BrandCard from "../components/BrandCard"
import OfflineModal from "../components/OfflineModal"
import PageWrapper from "../components/PageWrapper"
import Skeleton from "../components/Skeleton"
import SectionHeader from "../components/SectionHeader"

function Home() {
  const navigate = useNavigate()

  const [status, setStatus] = useState("online")
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 550)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await supabase
        .from("settings")
        .select("admin_status")
        .single()

      if (data) setStatus(data.admin_status)
    }

    fetchStatus()
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel("settings")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "settings"
        },
        (payload) => {
          setStatus(payload.new.admin_status)
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const handleClick = (path) => {
    if (status === "offline") {
      setShowModal(true)
      return
    }

    setTimeout(() => {
      navigate(path)
    }, 120)
  }

  const brands = [
    {
      name: "Kopi Kenangan",
      color: "#DB0007",
      desc: "Mengenang Mantan Dengan Segelas Kopi.",
      img: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/brands/kopken/logo.webp",
      path: "/kopken"
    },
    {
      name: "Fore Coffee",
      color: "#006041",
      desc: "Esensi Kopi Premium di Setiap Karya.",
      img: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/brands/fore/logo.webp",
      path: "/fore"
    },
    {
      name: "Tomoro Coffee",
      color: "#FFA688",
      desc: "Kopi Yang Menemanimu Menuju Hari Esok.",
      img: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/brands/tomoro/logo.webp",
      path: "/tomoro"
    }
  ]

  return (
    <div className="max-w-md mx-auto bg-[#fafafa] min-h-screen">

      <Header status={status} />

      <PageWrapper>
        <div className="p-4 space-y-6">

          {/* BANNER */}
          {loading ? (
            <Skeleton className="w-full h-[210px]" />
          ) : (
            <PromoBanner />
          )}

          {/* WELCOME */}
          {loading ? (
            <Skeleton className="w-full h-[120px]" />
          ) : (
            <WelcomeCard />
          )}

          {/* COFFEE */}
          <SectionHeader
            title="🌟 FEATURED BRANDS"
            tags={["Best Deals"]}
          />

          <div className="space-y-3">
            {loading
              ? [...Array(3)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-full h-[82px]"
                  />
                ))
              : brands.map((b, i) => (
                  <BrandCard
                    key={i}
                    data={b}
                    onClick={() => handleClick(b.path)}
                  />
                ))}
          </div>

          {/* FOOTER */}
          <div className="pt-3 pb-6">
            <p className="text-center text-xs text-gray-400">
              © 2026 Web Developed by mhmdfiqriii_
            </p>
          </div>

        </div>
      </PageWrapper>

      {showModal && (
        <OfflineModal
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default Home