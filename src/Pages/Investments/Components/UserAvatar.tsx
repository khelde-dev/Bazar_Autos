interface UserAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-base",
  lg: "h-14 w-14 text-lg",
};

/**
 * Avatar circular con gradiente azul y la inicial del usuario.
 * Mismo estilo que el del Header para consistencia visual.
 */
export const UserAvatar = ({ name, size = "md" }: UserAvatarProps) => {
  const initial = (name?.[0] ?? "?").toUpperCase();
  return (
    <div
      className={`${SIZE_MAP[size]} rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black shadow-sm border-2 border-white shrink-0`}
    >
      {initial}
    </div>
  );
};
