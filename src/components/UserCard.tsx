import Image from "next/image";

const UserCard = ({ type, bgColor }: { type: string; bgColor: string }) => {
  return (
    <div className={`rounded-2xl p-4 flex-1 min-w-[130px] ${bgColor}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] bg-black px-2 py-1 rounded-full text-white">
          2024/25
        </span>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">1234</h1>
      <h2 className="capitalize text-sm font-medium text-black">s</h2>
    </div>
  );
};

export default UserCard;
