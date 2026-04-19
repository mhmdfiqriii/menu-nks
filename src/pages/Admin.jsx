import { useEffect, useState, useRef } from "react"
import { supabase } from "../lib/supabase"

function Admin({ setPage, showToast }) {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [highlightId, setHighlightId] = useState(null)

  // 🔥 NEW
  const [selectedOrder, setSelectedOrder] = useState(null)

  // 🔥 sebelum return
let items = []

if (selectedOrder) {
  try {
    // 🟢 coba parse JSON (data baru)
    const parsed = JSON.parse(selectedOrder.variant)

    if (Array.isArray(parsed)) {
      items = parsed
    } else {
      items = []
    }

  } catch {
    // 🔴 fallback buat data lama (string ||)
    if (selectedOrder.variant?.includes("||")) {
      items = selectedOrder.variant.split("||").map(v => ({
        name: v,
        qty: "",
        options: ""
      }))
    } else {
      items = []
    }
  }
}

  const lastNotifyTime = useRef(0)
  const lastOrderId = useRef(null)
  const channelRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
  audioRef.current = new Audio("/notif.mp3")
  audioRef.current.load()
  }, [])

  const cleanStatus = (status) => {
    return status?.replace(/'/g, "").trim().toLowerCase()
  }

// NOTIF
const notify = (id) => {
  const now = Date.now()

  if (now - lastNotifyTime.current < 1000) return

  if (id !== lastOrderId.current) {
    // 🔥 PLAY AUDIO DULU
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }

    // 🔥 BARU TOAST
    setTimeout(() => {
      showToast("Order baru masuk 🚨")
    }, 200)

    lastOrderId.current = id
    lastNotifyTime.current = now
  }
}

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)

    if (error) console.log(error)

    // 🔥 biar modal ikut update
    setSelectedOrder(prev => prev ? { ...prev, status } : null)
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

    const fetchOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })

      if (data) {
        setOrders(data.map(o => ({
          ...o,
          status: cleanStatus(o.status)
        })))
      }
    }

    fetchOrders()

    const interval = setInterval(fetchOrders, 5000)

    const createChannel = () => {
      const channel = supabase
        .channel("orders-realtime")

        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "orders" },
          (payload) => {
            const data = payload.new
            if (!data) return

            data.status = cleanStatus(data.status)

            setOrders(prev => {
              const exists = prev.find(o => o.id === data.id)

              if (exists) {
                return prev.map(o => o.id === data.id ? data : o)
              } else {
                notify(data.id)

                setHighlightId(data.id)
                setTimeout(() => setHighlightId(null), 2000)

                return [data, ...prev]
              }
            })
          }
        )

        .subscribe((status) => {
          if (status === "TIMED_OUT") {
            showToast("Realtime putus, pakai backup...", "error")
            setTimeout(createChannel, 3000)
          }
        })

      channelRef.current = channel
    }

    createChannel()

    return () => {
      clearInterval(interval)
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
      }
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
      background: "#fafafa",
      minHeight: "100vh"
    }}>

      <button onClick={() => setPage("home")} style={{
        marginBottom: 12,
        padding: "8px 16px",
        borderRadius: 999,
        border: "none",
        background: "#eee"
      }}>
        ← Kembali
      </button>

      <h1 style={{ textAlign: "center" }}>Admin Panel</h1>

      {/* FILTER */}
      <input
        placeholder="Cari order..."
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

      {/* FILTER BUTTON */}
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

      {/* OMZET */}
      <div style={{
        marginBottom: 15,
        padding: 12,
        borderRadius: 10,
        background: "#fff",
        border: "1px solid #eee"
      }}>
      <b>Total Omzet:</b> Rp. {totalOmzet.toLocaleString("id-ID")}
      </div>

      {/* CARD */}
      {filteredOrders.map(order => (
  <div
    key={order.id}
    onClick={() => setSelectedOrder(order)}
    style={{
      cursor: "pointer",
      borderRadius: 16,
      padding: 16,
      marginBottom: 14,
      background: "#fff",
      borderLeft: `6px solid ${getStatusColor(order.status)}`,
      boxShadow: highlightId === order.id
        ? "0 0 0 2px #1677ff"
        : "0 2px 6px rgba(0,0,0,0.05)",
      opacity: order.status === "selesai" ? 0.6 : 1
    }}
  >

    {/* TOP ROW */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6
    }}>
      <span style={{
        fontSize: 12,
        color: "#666",
        fontWeight: 500
      }}>
        {order.type.toUpperCase()}
      </span>

      <span style={{
        fontSize: 11,
        padding: "4px 10px",
        borderRadius: 999,
        background: getStatusColor(order.status),
        color: "#fff"
      }}>
        {formatStatus(order.status)}
      </span>
    </div>

    {/* ORDER ID */}
    <div style={{
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 6
    }}>
      {order.order_id}
    </div>

    {/* PRICE */}
    <div style={{
      fontSize: 14,
      fontWeight: 600
    }}>
      Rp {formatRupiah(order.price)}
    </div>

  </div>
))}

      {/* 🔥 MODAL */}
{selectedOrder && (
  <div
    className="admin-modal-overlay"
    onClick={() => setSelectedOrder(null)}
  >
    <div
      className="admin-modal-box"
      onClick={e => e.stopPropagation()}
    >

      {/* HEADER */}
      <div className="admin-header">
        <div className="admin-id">
          {selectedOrder.order_id}
        </div>

        <div
          className="admin-status"
          style={{ background: getStatusColor(selectedOrder.status) }}
        >
          {formatStatus(selectedOrder.status)}
        </div>
      </div>

      <div className="admin-sub">
        {selectedOrder.type.toUpperCase()} •{" "}
        {new Date(selectedOrder.created_at)
          .toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
      </div>

      {/* DATA */}
{selectedOrder.type === "fnb" && (
  <div className="admin-section">
    <div className="admin-label">Data Pembeli</div>

    <div>Nama Pemesan : {selectedOrder.customer_name}</div>
    <div>Outlet : {selectedOrder.outlet}</div>
    <div>Jam Pengambilan : {selectedOrder.pickup_time}</div>
  </div>
)}

      {selectedOrder.type === "internet" && (
        <div className="admin-section">
          <div className="admin-label">Data Pembeli</div>
          <div>No. HP : {selectedOrder.phone}</div>
        </div>
      )}

      {/* PESANAN */}
      <div className="admin-section">
        <div className="admin-label">Pesanan</div>

        {/* FNB */}
        {selectedOrder.type === "fnb" && items.map((item, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div>
              {i + 1}. {item.name} ({item.qty}x)
            </div>

            {item.options && (
              <div style={{ fontSize: 12, color: "#666" }}>
                {item.options}
              </div>
            )}
          </div>
        ))}

        {/* DIGITAL */}
        {selectedOrder.type !== "fnb" && (
          <div>Varian : {selectedOrder.variant}
          </div>
        )}
      </div>

      {/* TOTAL */}
      <div className="admin-total">
        <div className="admin-label">Total</div>
        <div className="admin-total-price">
          Rp {formatRupiah(selectedOrder.price)}
        </div>
      </div>

      {/* ACTION */}
      <div className="admin-actions">
        <button
          className={`admin-btn ${
            selectedOrder.status === "selesai"
              ? "btn-disabled"
              : "btn-proses"
          }`}
          disabled={selectedOrder.status === "selesai"}
          onClick={() => updateStatus(selectedOrder.id, "proses")}
        >
          Proses
        </button>

        <button
          className={`admin-btn ${
            selectedOrder.status === "selesai"
              ? "btn-disabled"
              : "btn-selesai"
          }`}
          disabled={selectedOrder.status === "selesai"}
          onClick={() => updateStatus(selectedOrder.id, "selesai")}
        >
          Selesai
        </button>
      </div>

      <button
        className="btn-close"
        onClick={() => setSelectedOrder(null)}
      >
        Tutup
      </button>

    </div>
  </div>
)}

    </div>
  )
}

export default Admin