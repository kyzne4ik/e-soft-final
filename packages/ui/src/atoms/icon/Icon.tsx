import { icons, type LucideProps } from "lucide-react";

const toPascalCase = (name: string): string =>
  name.replace(/(^\w|-\w)/g, (match) => match.replace("-", "").toUpperCase());

export interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
  size?: number;
}

export function Icon({ name, size = 18, ...rest }: IconProps) {
  const LucideIcon = icons[toPascalCase(name) as keyof typeof icons];

  if (!LucideIcon) return null;

  return <LucideIcon size={size} aria-hidden {...rest} />;
}
