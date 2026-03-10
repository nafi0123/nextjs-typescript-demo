import { StaticImageData } from 'next/image';

export interface Ingredient { 
  img: StaticImageData;
  title: string;
  desc: string;
}