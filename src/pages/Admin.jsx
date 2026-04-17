import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

function Admin({ setPage }) {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.log("ERROR:", error)
      } else {
        setOrders(data)
      }
    }

    getData()
  }, [])

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)

    if (!error) {
      setOrders(prev =>
        prev.map(o =>
          o.id === id ? { ...o, status } : o
        )
      )
    }
  }

  const getStatusColor = (status) => {
    if (status === "pending") return "#999"
    if (status === "proses") return "#1677ff"
    return "#52c41a"
  }

  // 🔍 FILTER + SEARCH
  const filteredOrders = orders.filter(order => {
    const matchFilter = filter === "all" || order.status === filter
    const matchSearch =
      order.order_id?.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(search.toLowerCase())

    return matchFilter && matchSearch
  })

  // 💰 TOTAL OMZET
  const totalOmzet = filteredOrders.reduce((acc, o) => acc + o.price, 0)

  return (
    <div style={{
      padding: 20,
      maxWidth: 600,
      margin: "auto",
      fontFamily: "sans-serif"
    }}>
      
      {/* BACK */}
      <button
        onClick={() => setPage("home")}
        style={{
          marginBottom: 10,
          padding: "8px 12px",
          borderRadius: 8,
          border: "none",
          background: "#eee"
        }}
      >
        ← Kembali
      </button>

      <h1 style={{ textAlign: "center" }}>Admin Panel</h1>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Cari order ID"
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

      {/* 🔥 FILTER */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        {["all", "pending", "proses", "selesai"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 8,
              border: "none",
              background: filter === f ? "#111" : "#eee",
              color: filter === f ? "#fff" : "#333"
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 💰 OMZET */}
      <div style={{
        marginBottom: 15,
        padding: 12,
        borderRadius: 10,
        background: "#f5f5f5"
      }}>
        <b>Total Omzet:</b> Rp {totalOmzet.toLocaleString("id-ID")}
      </div>

      {/* LIST */}
      {filteredOrders.map(order => (
        <div
          key={order.id}
          style={{
            border: "1px solid #eee",
            borderRadius: 14,
            padding: 16,
            marginBottom: 14,
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
          }}
        >
          <p><b>ID:</b> {order.order_id}</p>
          <p><b>Product:</b> {order.product}</p>
          <p><b>Variant:</b> {order.variant}</p>
          <p><b>Price:</b> Rp {order.price}</p>

          <p>
            <b>Status:</b>{" "}
            <span style={{
              color: "#fff",
              background: getStatusColor(order.status),
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 12
            }}>
              {order.status}
            </span>
          </p>

          {/* FNB */}
          {order.type === "fnb" && (
            <>
              <p><b>Nama:</b> {order.customer_name}</p>
              <p><b>Outlet:</b> {order.outlet}</p>
            </>
          )}

          {/* INTERNET */}
          {order.type === "internet" && (
            <p><b>Phone:</b> {order.phone}</p>
          )}

          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button
              onClick={() => updateStatus(order.id, "proses")}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 8,
                border: "none",
                background: "#1677ff",
                color: "#fff"
              }}
            >
              Proses
            </button>

            <button
              onClick={() => updateStatus(order.id, "selesai")}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 8,
                border: "none",
                background: "#52c41a",
                color: "#fff"
              }}
            >
              Selesai
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Admin