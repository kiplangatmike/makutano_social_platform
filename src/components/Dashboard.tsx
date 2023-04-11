export default function Dashboard() {
  const stat = [
    ["Total", "500"],
    ["New Users", "150"],
    ["Daily Users", "200"],
    ["Dormant Users", "50"],
  ];
  return (
    <div>
      <div className="flex flex-row flex-wrap justify-around ">
        {stat.map((items, index) => (
          <div key={index} className="feed-card m-2 pt-3 rounded-2xl font-bold flex-grow flex-1 min-h-[100px] min-w-[200px] text-center">
            {items[0]}
            <div className="mt-3 text-2xl font-bold">{items[1]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
