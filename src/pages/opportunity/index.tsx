import Layout from "$components/Layout";

export default function Opportunity() {
  return (
    <Layout>
      <div className="feed-card dark:bg-gray-900 rounded-3xl p-4">
        <div className="text-center text-2xl font-bold">Opportunities</div>
        <div className="mb-2 flex justify-between">
          <div>
            <div className="font-semibold">Cashier</div>
            <div>Head office Nairobi</div>
          </div>
          <button className="my-2 rounded-xl bg-blue-400/30 px-4 py-2 font-bold text-white hover:bg-blue-500/30">
            more details
          </button>
        </div>
        <div className="sidebar-section flex justify-between">
          <div>
            <div className="pt-2 font-semibold">Manager</div>
            <div>Uganda, Kampala</div>
          </div>
          <button className="my-2 rounded-xl bg-blue-400/30 px-4 py-2 font-bold text-white hover:bg-blue-500/30">
            more details
          </button>
        </div>
      </div>
    </Layout>
  );
}
