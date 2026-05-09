function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[999] bg-[#fafafa] flex items-center justify-center splash-enter">

      {/* glow */}
      <div className="absolute w-40 h-40 rounded-full bg-[#DB0007]/10 blur-3xl"></div>

      <div className="relative flex flex-col items-center">

        <div className="w-24 h-24 rounded-[30px] bg-white border border-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center justify-center splash-logo">

          <img
            src="https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/brands/woffel-store/favicon.svg"
            className="w-14 h-14 object-contain"
          />

        </div>

        <p className="mt-5 text-[11px] tracking-[4px] font-semibold text-gray-500">
          WOFFEL STORE
        </p>

      </div>

    </div>
  )
}

export default SplashScreen