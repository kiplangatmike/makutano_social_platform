import Image from "next/image"

export default function ProfilePost () {
    return (
        <div className="relative">
        <button className="absolute top-0 right-0">Edit</button>
            <div className="mb-2 text-[20px] font-semibold">Posts</div>
          <div className="mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue
            eu urna non commodo. Maecenas ultrices vitae erat ac suscipit. Donec
            ex mi, sagittis eget fringilla ornare, dictum vitae magna.
          </div>
          <div className="h-full overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt=""
              width={1000}
              height={1000}
            ></Image>
          </div>
        </div>
    )
}