import { LogOut, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/Context/ThemeContext";
import { useLogOutMutation } from "@/Pages/Login/Hooks/UseLoginMutation";
import { useUserRole } from "@/hooks/use-user-role";

export const UserMenu = () => {
  const { username } = useUserRole();
  const { theme, toggle } = useTheme();
  const { mutate: logout, isPending } = useLogOutMutation();

  const initial = username?.[0]?.toUpperCase() ?? "?";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative size-9 rounded-full"
          aria-label="Abrir menú de usuario"
        >
          <Avatar className="size-9">
            <AvatarFallback className="bg-linear-to-br from-blue-500 to-blue-700 text-xs font-semibold text-white">
              {initial}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Sesión</span>
          <span className="text-sm font-semibold">{username ?? "Usuario"}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={toggle}>
          {theme === "dark" ? <Sun /> : <Moon />}
          <span>{theme === "dark" ? "Modo claro" : "Modo oscuro"}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isPending}
          onSelect={() => logout()}
          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut />
          <span>{isPending ? "Cerrando..." : "Cerrar sesión"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
