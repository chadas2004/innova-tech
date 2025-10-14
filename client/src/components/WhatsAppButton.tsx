import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
  const whatsappLink = "https://wa.me/22995792329?text=Bonjour,%20je%20suis%20intéressé%20par%20vos%20services%20informatiques";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      data-testid="button-whatsapp-floating"
    >
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-whatsapp hover:bg-whatsapp/90 text-white shadow-lg hover:shadow-xl transition-all"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </a>
  );
}
