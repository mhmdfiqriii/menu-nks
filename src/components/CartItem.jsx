function CartItem({ item }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span>{item.name} ({item.qty})</span>
      <span>
        Rp {new Intl.NumberFormat("id-ID").format(item.price * item.qty)}
      </span>
    </div>
  )
}

export default CartItem