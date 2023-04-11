import Dashboard from "$components/Dashboard";
import Header from "$components/Header";

export default function Admin() {
  const headings = ["Name", "Status"];
  const data = [
    { Name: "Liplan Lekipising", Status: "Verified"},
    { Name: "Mercy Nyamusi", Status: "Pending"},
    { Name: "Mike Kiplangat", Status: "Verified"},
    { Name: "Kevin Lukaa", Status: "Pending"},
    { Name: "Liplan Lekipising", Status: "Verified"},
    { Name: "Mercy Nyamusi", Status: "Pending"},
    { Name: "Mike Kiplangat", Status: "Verified"},
    { Name: "Kevin Lukaa", Status: "Pending"},
  ];

  const onButtonClick = (rowData: any) => {
    console.log(`Button clicked for ${rowData.Name}`);
  };
  return (
    <div className=" bg-black">
      <Header />
      <div className="px-4 py-5 bg-black">
        <Dashboard />
        <table className="feed-card mt-3  rounded-3xl w-full border-collapse text-center">
          <thead>
            <tr className="">
              {headings.map((heading) => (
                <th key={heading} className=" px-4 py-2">
                  {heading}
                </th>
              ))}
              <th className=" px-4 py-2">Verify</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : ''}>
                {headings.map((heading) => (
                  <td
                    key={`${heading}-${index}`}
                    className=" px-4 py-2"
                  >
                    {row[heading]}
                  </td>
                ))}
                <td className=" px-4 py-2">
              <button className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-xl"
                      onClick={() => onButtonClick(row)}>Okay</button>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
