import { useEffect, useState, useRef } from "react"
import { supabase } from "../lib/supabase"

function Admin({ setPage, showToast }) {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [search, setSearch] = useState("")

  const lastOrderId = useRef(null)

  const cleanStatus = (status) => {
    return status?.replace(/'/g, "").trim().toLowerCase()
  }

  const notify = (id) => {
    if (id !== lastOrderId.current) {
      showToast("Order baru masuk 🚨")

      const audio = new Audio("/notif.mp3")
      audio.play().catch(() => {})

      lastOrderId.current = id
    }
  }

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)

    if (error) console.log(error)
  }

  const getStatusColor = (status) => {
    if (status === "pending") return "#ff4d4f"
    if (status === "proses") return "#faad14"
    return "#389e0d"
  }

  const formatStatus = (status) => {
    return status?.charAt(0).toUpperCase() + status?.slice(1)
  }

  const formatRupiah = (angka) => new Intl.NumberFormat("id-ID").format(angka)

  useEffect(() => {
    // ✅ initial fetch (sekali doang)
    const init = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })

      if (data) {
        setOrders(
          data.map(o => ({
            ...o,
            status: cleanStatus(o.status)
          }))
        )
      }
    }

    init()

    const channel = supabase
      .channel("orders-realtime")

      // ✅ ORDER BARU
.on(
  "postgres_changes",
  { event: "*", schema: "public", table: "orders" },
  (payload) => {
    console.log("REALTIME MASUK:", payload)

    if (!payload.new) return

    const data = payload.new
    data.status = cleanStatus(data.status)

    setOrders(prev => {
      const exists = prev.find(o => o.id === data.id)

      if (exists) {
        return prev.map(o => o.id === data.id ? data : o)
      } else {
        notify(data.id)
        return [data, ...prev]
      }
    })
  }
)

      .subscribe((status) => {
  console.log("SUB:", status)

  if (status === "SUBSCRIBED") {
    console.log("Realtime aktif")
  }
})

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const filteredOrders = orders.filter(order => {
  const matchFilter = filter === "all" || order.status === filter
  const matchType = typeFilter === "all" || order.type === typeFilter

  const matchSearch =
    order.order_id?.toLowerCase().includes(search.toLowerCase()) ||
    order.customer_name?.toLowerCase().includes(search.toLowerCase())

  return matchFilter && matchType && matchSearch
})

  const totalOmzet = filteredOrders.reduce((acc, o) => acc + o.price, 0)

  return (
    <div style={{
      padding: 20,
      maxWidth: 600,
      margin: "auto",
      fontFamily: "Poppins, sans-serif",
      background: "#fafafa",
      minHeight: "100vh"
    }}>
      
      <button onClick={() => setPage("home")}
        style={{
          marginBottom: 12,
          padding: "8px 16px",
          borderRadius: 999,
          border: "none",
          background: "#eee",
          fontWeight: 500
        }}>
        ← Kembali
      </button>

      <h1 style={{ textAlign: "center" }}>Admin Panel</h1>

      <input
        placeholder="Cari Kode Order ID. Contoh: KKM / IMEI / AKRAB"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 10,
          border: "1px solid #ddd",
          marginBottom: 10
        }}
      />

            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {["all", "pending", "proses", "selesai"].map(f => (
          <button key={f}
            onClick={() => setFilter(f)}
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 8,
              border: "1px solid #ddd",
              background: filter === f ? "#111" : "#fff",
              color: filter === f ? "#fff" : "#333"
            }}>
            {formatStatus(f)}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
  {["all", "fnb", "internet", "imei"].map(t => (
    <button key={t}
      onClick={() => setTypeFilter(t)}
      style={{
        flex: 1,
        padding: 8,
        borderRadius: 8,
        border: "1px solid #ddd",
        background: typeFilter === t ? "#111" : "#fff",
        color: typeFilter === t ? "#fff" : "#333"
      }}>
      {t.toUpperCase()}
    </button>
  ))}
</div>

      <div style={{
        marginBottom: 15,
        padding: 12,
        borderRadius: 10,
        background: "#fff",
        border: "1px solid #eee"
      }}>
        <b>Total Omzet:</b> Rp. {totalOmzet.toLocaleString("id-ID")}
      </div>

      {filteredOrders.map(order => (
        <div key={order.id}
          style={{
            border: "1px solid #eee",
            borderRadius: 14,
            padding: 16,
            marginBottom: 14,
            background: "#fff"
          }}>

          <p>
          <b>Type:</b>{" "}
          <span style={{
            padding: "2px 8px",
            borderRadius: 6,
            fontSize: 11,
            background: order.type === "fnb" ? "#e6f4ff" : "#fff7e6",
            color: order.type === "fnb" ? "#1677ff" : "#d46b08"
          }}>
          {order.type.toUpperCase()}
          </span>
          </p>

          <p><b>ID:</b> {order.order_id}</p>
           <p>
            <b>Status:</b>{" "}
            <span style={{
              color: "#fff",
              background: getStatusColor(order.status),
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 12
            }}>
              {formatStatus(order.status)}
            </span>
          </p>

          <p style={{ fontSize: 12, color: "#666" }}>
          {new Date(order.created_at).toLocaleString("id-ID")}
          </p>
        
          {/* FNB */}
          {order.type === "fnb" && (
          <>
          <p><b>Nama:</b> {order.customer_name}</p>
          <p><b>Outlet:</b> {order.outlet}</p>
          <p><b>Jam:</b> {order.pickup_time}</p>
          </>
          )}

          {/* INTERNET */}
          {order.type === "internet" && (
          <>
          <p><b>Product:</b> {order.product}</p>
          <p><b>No HP:</b> {order.phone}</p>
          </>
          )}

          <p><b>Variant:</b> {order.variant}</p>
          <p><b>Price:</b> Rp. {formatRupiah(order.price)}</p>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => updateStatus(order.id, "proses")}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 8,
                border: "none",
                background: "#faad14",
                color: "#fff"
              }}>
              Proses
            </button>

            <button onClick={() => updateStatus(order.id, "selesai")}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 8,
                border: "none",
                background: "#389e0d",
                color: "#fff"
              }}>
              Selesai
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Admin