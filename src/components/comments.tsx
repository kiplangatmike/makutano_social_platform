import Avatar from "./Avatar";

export default function Comments() {
  const comment = [
    ["Mike Kiplangat", "Congratulations"],
    ["Mercy Nyamusi", "That's good"],
  ];
  return (
    <div className="feed-card mt-4 rounded-3xl p-4">
      <div>
        {comment.map((items, index) => (
          <div key={index} className="flex items-center gap-2 p-2">
            <div>
              <Avatar size={30} />
            </div>
            <div className=" text-[13px]">
              <span className=" text-[14px] font-semibold">{items[0]}</span>
              <br />
              {items[1]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
