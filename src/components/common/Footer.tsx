import Image from "next/image";
import footer from "$public/footer.svg";
import { HiOutlineChevronDown } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="t-primary mt-4 bg-transparent lg:sticky lg:top-20">
      <ul className="t-secondary mx-6 my-4 flex flex-wrap items-center justify-center text-xs">
        <li className="mx-2 my-1 flex items-center justify-center">
          <a href="#" className="flex">
            About
          </a>
        </li>
        <li className="mx-2 my-1 flex items-center justify-center">
          <a href="#" className="flex">
            Accessibility
          </a>
        </li>
        <li className="mx-2 my-1 flex items-center justify-center">
          <a href="#" className="flex">
            Help Center
          </a>
        </li>
        <li className="mx-2 my-1 flex items-center">
          <a href="#" className="flex">
            Privacy & Terms
          </a>
          <HiOutlineChevronDown className="mui-icon ml-1 h-3 w-3" />
        </li>
        <li className="mx-2 my-1 flex items-center justify-center">
          <a href="#" className="flex">
            Ad Choices
          </a>
        </li>
        <li className="mx-2 my-1 flex items-center justify-center">
          <a href="#" className="flex">
            Advertising
          </a>
        </li>
        <li className="mx-2 my-1 flex items-center justify-center">
          <a href="#" className="flex">
            Business Services
          </a>
          <HiOutlineChevronDown className="mui-icon ml-1 h-3 w-3" />
        </li>

        <li className="mx-2 my-1 flex items-center justify-center">
          <a href="#" className="flex">
            More
          </a>
        </li>
      </ul>
      <div className="flex items-center justify-center text-center">
        <Image src={footer} alt="logo" width={56} height={14} />
      </div>
    </footer>
  );
}
