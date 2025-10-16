import { useQuery } from "@tanstack/react-query";
import type { SiteFeature } from "@shared/schema";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  const { data: features = [] } = useQuery<SiteFeature[]>({
    queryKey: ["/api/features"],
  });

  const announcement = features.find(
    (f) => f.name === "announcement" && f.isEnabled
  );

  if (!announcement || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-primary/90 to-accent/90 text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm md:text-base font-medium">
              {announcement.content}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/20 flex-shrink-0"
            onClick={() => setDismissed(true)}
            data-testid="button-dismiss-announcement"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
