import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

function Admin() {
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
      // update local state biar ga reload
      setOrders(prev =>
        prev.map(o =>
          o.id === id ? { ...o, status } : o
        )
      )
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      {orders.map(order => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 12,
            marginBottom: 10
          }}
        >
          <p><b>ID:</b> {order.order_id}</p>
          <p><b>Type:</b> {order.type}</p>
          <p><b>Product:</b> {order.product}</p>
          <p><b>Variant:</b> {order.variant}</p>
          <p><b>Price:</b> Rp {order.price}</p>
          <p><b>Status:</b> {order.status || "pending"}</p>

          <div style={{ marginTop: 10 }}>
            <button onClick={() => updateStatus(order.id, "proses")}>
              Proses
            </button>

            <button onClick={() => updateStatus(order.id, "selesai")}>
              Selesai
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Admin