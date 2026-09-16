import type { ServiceRecord } from "@/types/content";
import { ServiceIcon } from "./StudioIcons";

export default function ServiceMark({ service, className = "" }: { service: Pick<ServiceRecord, "title" | "icon" | "iconKey">; className?: string }) {
  if (service.icon) {
    const mask = `url("${service.icon}")`;
    return <span className={`service-mark service-mark--custom ${className}`.trim()} style={{ WebkitMaskImage: mask, maskImage: mask }} aria-hidden="true" />;
  }
  return <span className={`service-mark service-mark--preset ${className}`.trim()} aria-hidden="true"><ServiceIcon type={service.iconKey} /></span>;
}
