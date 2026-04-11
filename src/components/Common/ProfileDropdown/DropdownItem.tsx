import Image from "next/image";
import Link from "next/link";
/* =========================
   Reusable Dropdown Item
========================= */
type DropdownItemProps = {
  children: React.ReactNode;
  href?: string;
  icon: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function DropdownItem({
  children,
  href,
  icon,
  disabled = false,
  onClick,
}: DropdownItemProps) {
  const content = (
    <div
      className={`flex items-center gap-2 px-3 py-2 text-sm border-b border-gray-300 ${disabled
        ? "cursor-not-allowed"
        : "hover:bg-gray-100"
        }`}
    >
      <Image src={icon} alt="icon" width={25} height={25} />
      {children}
    </div>
  );

  if (disabled) {
    return (
      <div className="soon-parent ">
        {content}
        <span className="soon-container">
          soon
        </span>
      </div>
    );
  }

  if (href) {
    return <Link href={href} className='border-b-2'>{content}</Link>;
  }

  return <button onClick={onClick}>{content}</button>;
}
