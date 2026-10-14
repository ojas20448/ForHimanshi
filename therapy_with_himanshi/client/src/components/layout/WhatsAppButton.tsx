import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
export function WhatsAppButton() {
  const url = `https://wa.me/919599529780?text=${encodeURIComponent("Hi Himanshi, I would like to know more about therapy sessions.")}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Ask Himanshi about therapy on WhatsApp"
    >
      <WhatsAppIcon size={25} />
    </a>
  );
}
