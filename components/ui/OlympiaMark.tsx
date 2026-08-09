import Image from "next/image";

export function OlympiaMark({
  size = 36,
  alt = "Olympia",
  className = "",
}: {
  size?: number;
  alt?: string;
  className?: string;
}) {
  return (
    <>
      <Image
        src="/logo-light.svg"
        alt={alt}
        width={size}
        height={size}
        className={`block dark:hidden ${className}`}
      />
      <Image
        src="/logo-dark.svg"
        alt={alt ? "" : ""}
        aria-hidden="true"
        width={size}
        height={size}
        className={`hidden dark:block ${className}`}
      />
    </>
  );
}
