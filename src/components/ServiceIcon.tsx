import {
  Stethoscope, HeartPulse, SmilePlus, Syringe, ShieldCheck,
  Home, Scissors, FlaskConical, Bone, Eye, Camera, Bird,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  consulta: Stethoscope,
  intervencion: HeartPulse,
  odontologia: SmilePlus,
  vacunacion: Syringe,
  desparasitacion: ShieldCheck,
  estancia: Home,
  estetica: Scissors,
  laboratorio: FlaskConical,
  ortopedia: Bone,
  oftalmologia: Eye,
  radiologia: Camera,
  exoticos: Bird,
};

interface ServiceIconProps {
  service: string;
  className?: string;
  size?: number;
}

export default function ServiceIcon({ service, className = "w-6 h-6", size }: ServiceIconProps) {
  const Icon = ICON_MAP[service] || Stethoscope;
  return <Icon className={className} size={size} />;
}
