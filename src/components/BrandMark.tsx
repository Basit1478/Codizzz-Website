import Image from "next/image";
import Link from "next/link";

export default function BrandMark() {
  return (
    <Link href="/" className="brand-mark" aria-label="Codizzz home">
      <span className="brand-mark__asset">
        <Image className="brand-mark__orange" src="/brand/codizzz-mark-orange.png" alt="" width={448} height={177} priority />
        <Image className="brand-mark__red" src="/brand/codizzz-mark-red.png" alt="" width={448} height={177} priority />
      </span>
      <span className="brand-mark__word">Codizzz</span>
    </Link>
  );
}
