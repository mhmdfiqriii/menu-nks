import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

function Admin({ setPage }) {
  const [orders, setOrders] = useState([])

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

    if (error) {
      console.log("ERROR:", error)
    } else {
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

  return (
    <div style={{
      padding: 20,
      maxWidth: 600,
      margin: "auto",
      fontFamily: "sans-serif"
    }}>
      
      {/* tombol kembali */}
      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => setPage("home")}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            background: "#eee",
            cursor: "pointer"
          }}
        >
          ← Kembali
        </button>
      </div>

      <h1 style={{ textAlign: "center" }}>Admin Panel</h1>

      {orders.map(order => (
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
          <p><b>Type:</b> {order.type}</p>
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

          {order.type === "fnb" && (
            <>
              <p><b>Nama:</b> {order.customer_name}</p>
              <p><b>Outlet:</b> {order.outlet}</p>
              <p><b>Jam:</b> {order.pickup_time}</p>
            </>
          )}

          {order.type === "internet" && (
            <p><b>Phone:</b> {order.phone}</p>
          )}

          {order.type === "imei" && (
            <p style={{ fontSize: 12, color: "#999" }}>
              Tidak ada data tambahan
            </p>
          )}

          <div style={{
            marginTop: 12,
            display: "flex",
            gap: 8
          }}>
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