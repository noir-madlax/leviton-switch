export function DashboardHeader() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 border-b-3 border-blue-500 pb-3 mb-4">
        Amazon Dimmers & Light Switches
        <br />
        Competitor Analysis Report
      </h1>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 max-w-2xl mx-auto">
        <p className="text-blue-800 text-sm">
          📊 <strong>Demo Dashboard</strong> - This is a recreation of the original HTML report using Next.js, React,
          and modern charting libraries.
        </p>
      </div>

      <div className="text-gray-500 italic">
        Report Generated:{" "}
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </div>
    </div>
  )
}
