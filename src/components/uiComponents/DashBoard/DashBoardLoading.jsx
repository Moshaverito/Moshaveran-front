function DashBoardLoading(error) {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center"
      dir="rtl"
    >
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">در حال بارگذاری داشبورد...</p>
        {error && <p className="text-sm text-red-500 mt-2">{error.message}</p>}
      </div>
    </div>
  );
}

export default DashBoardLoading;
