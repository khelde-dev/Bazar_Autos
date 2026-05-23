import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sidebar } from "./Sidebar";
import { UserMenu } from "./UserMenu";
import { NAV_ITEMS } from "./nav-items";

const titleFor = (pathname: string): string => {
  const match = NAV_ITEMS.find((i) => pathname.startsWith(i.to));
  return match?.label ?? "Bazar de Autos";
};

export const Topbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const title = titleFor(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-6">
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Abrir menú de navegación"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <VisuallyHidden>
            <SheetTitle>Navegación</SheetTitle>
          </VisuallyHidden>
          <Sidebar className="w-full border-0" onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <h1 className="flex-1 text-base font-semibold tracking-tight">{title}</h1>

      <UserMenu />
    </header>
  );
};
