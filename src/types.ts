export interface Feature {
  id: string;
  title: string;
  description: string;
  category: 'hardware' | 'network' | 'evasion' | 'performance';
}

export interface UseCase {
  title: string;
  description: string;
  illustration: string;
  benefits: string[];
}

export interface Packet {
  id: string;
  timestamp: string;
  type: 'UDP' | 'HID';
  payload: string;
  latency: number;
}

export interface Part {
  name: string;
  category: 'Core' | 'Interface' | 'Cabling' | 'Optional';
  price: number;
  description: string;
  recommendation: string;
  link?: string;
}
