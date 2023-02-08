import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <h1 className="text-6xl font-normal leading-normal mt-0 mb-2 text-teal-800">
        <Link href="/">URL Shortener</Link>
      </h1>
    </div>
  );
};

export default Header;
