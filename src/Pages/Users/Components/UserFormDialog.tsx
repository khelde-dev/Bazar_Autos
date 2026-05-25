import { Eye, EyeOff, Loader2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  CreateUserPayload,
  UpdateUserPayload,
  UserItem,
  UserRole,
} from "../Types/Users.types";

// ── types ─────────────────────────────────────────────────────────────────────

type Mode = "create" | "edit";

interface UserFormState {
  username: string;
  password: string;
  full_name: string;
  email: string;
  role: UserRole;
}

const EMPTY: UserFormState = {
  username: "",
  password: "",
  full_name: "",
  email: "",
  role: "user",
};

function fromUser(user: UserItem): UserFormState {
  return {
    ...EMPTY,
    full_name: user.name,
    username: user.username,
    email: user.email ?? "",
    role: user.role ?? "user",
  };
}

function isCreateValid(f: UserFormState) {
  return f.username.trim() && f.password.trim() && f.full_name.trim() && f.email.trim();
}

/** Enable save only when at least one field changed. Password optional. */
function isEditValid(f: UserFormState, original: UserItem | null) {
  if (!f.username.trim() || !f.full_name.trim()) return false;
  const nameChanged = f.full_name.trim() !== original?.name;
  const usernameChanged = f.username.trim() !== original?.username;
  const emailChanged = f.email.trim() !== (original?.email ?? "");
  const roleChanged = f.role !== original?.role;
  return nameChanged || usernameChanged || emailChanged || roleChanged;
}

const ROLE_OPTIONS: Array<{ value: UserRole; label: string }> = [
  { value: "user", label: "Usuario" },
  { value: "admin", label: "Admin" },
];

// ── props ─────────────────────────────────────────────────────────────────────

interface UserFormDialogProps {
  mode: Mode | null;
  editing: UserItem | null;
  isPending: boolean;
  onSave: (payload: CreateUserPayload | UpdateUserPayload) => void;
  onClose: () => void;
}

// ── component ─────────────────────────────────────────────────────────────────

export const UserFormDialog: React.FC<UserFormDialogProps> = ({
  mode,
  editing,
  isPending,
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<UserFormState>(EMPTY);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setShowPassword(false);
    if (mode === "edit" && editing) {
      setForm(fromUser(editing));
    } else if (mode === "create") {
      setForm(EMPTY);
    }
  }, [mode, editing]);

  const set = (key: keyof UserFormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = () => {
    if (mode === "create") {
      onSave({
        username: form.username.trim(),
        password: form.password,
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        role: form.role,
      } satisfies CreateUserPayload);
    } else {
      onSave({
        username: form.username.trim(),
        password: form.password,
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        role: form.role,
      } satisfies UpdateUserPayload);
    }
  };

  const isCreate = mode === "create";
  const canSave = isCreate ? isCreateValid(form) : isEditValid(form, editing);

  return (
    <Dialog open={!!mode} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isCreate ? "Nuevo usuario" : "Editar usuario"}</DialogTitle>
          <DialogDescription>
            {isCreate
              ? "Completa todos los campos para registrar el usuario."
              : "Modifica los datos del usuario."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Nombre completo */}
          <div className="grid gap-1.5">
            <Label htmlFor="u-fullname">Nombre completo</Label>
            <Input
              id="u-fullname"
              value={form.full_name}
              onChange={set("full_name")}
              placeholder="Ej. Juan Pérez García"
              autoComplete="name"
            />
          </div>

          {/* Username */}
          <div className="grid gap-1.5">
            <Label htmlFor="u-username">Nombre de usuario</Label>
            <Input
              id="u-username"
              value={form.username}
              onChange={set("username")}
              placeholder="Ej. juan_perez"
              autoComplete="off"
            />
          </div>

          {/* Email — siempre visible */}
          <div className="grid gap-1.5">
            <Label htmlFor="u-email">Correo electrónico</Label>
            <Input
              id="u-email"
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="correo@ejemplo.com"
              autoComplete="email"
            />
          </div>

          {/* Rol */}
          <div className="grid gap-1.5">
            <Label htmlFor="u-role">Rol</Label>
            <Select
              value={form.role}
              onValueChange={(v) => setForm((prev) => ({ ...prev, role: v as UserRole }))}
            >
              <SelectTrigger id="u-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contraseña */}
          <div className="grid gap-1.5">
            <Label htmlFor="u-password">{isCreate ? "Contraseña" : "Nueva contraseña"}</Label>
            <div className="relative">
              <Input
                id="u-password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={set("password")}
                placeholder={isCreate ? "Contraseña inicial" : "Dejar vacío para no cambiar"}
                autoComplete="new-password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isPending || !canSave}>
            {isPending && <Loader2 className="animate-spin" />}
            {isCreate ? "Crear usuario" : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
