import rackImg from '../assets/Cloth Rack/Garment rack.webp';

import colorSide from '../assets/Cloth Rack/shirt side/color gegs side.webp';
import colorFront from '../assets/Cloth Rack/shirt front/color gegs front.webp';
import colorBack from '../assets/Cloth Rack/shirt back/Color gegs back.webp';

import jesusSide from '../assets/Cloth Rack/shirt side/jesus gegs side.webp';
import jesusFront from '../assets/Cloth Rack/shirt front/jesus gegs front.webp';
import jesusBack from '../assets/Cloth Rack/shirt back/jesus gegs back.webp';

import poloSide from '../assets/Cloth Rack/shirt side/polo gegs side.webp';
import poloFront from '../assets/Cloth Rack/shirt front/polo gegs front.webp';
import poloBack from '../assets/Cloth Rack/shirt back/polo gegs back.webp';

import senatorSide from '../assets/Cloth Rack/shirt side/senator gegs side.webp';
import senatorFront from '../assets/Cloth Rack/shirt front/senator gegs front.webp';
import senatorBack from '../assets/Cloth Rack/shirt back/senator gegs back.webp';

export const RACK_IMAGE = rackImg;

export const COLLECTIONS = [
  {
    id: 'color-gegs',
    name: 'COLOR ATELIER SHIRT',
    code: '01 // EDITION',
    price: '₦85,000',
    description:
      'Hand-finished piece crafted in the GEGS studio with structured proportions and clean architectural lines.',
    sizes: ['S', 'M', 'L', 'XL'],
    colorways: [
      {
        id: 'primary',
        label: 'PRIMARY',
        swatch: '#2563EB',
        sideImg: colorSide,
        frontImg: colorFront,
        backImg: colorBack,
      },
    ],
  },
  {
    id: 'jesus-gegs',
    name: 'STATEMENT GRAPHIC SHIRT',
    code: '02 // EDITION',
    price: '₦90,000',
    description:
      'Tailored silhouette paired with bold editorial detailing and crisp finishing for everyday presence.',
    sizes: ['S', 'M', 'L', 'XL'],
    colorways: [
      {
        id: 'primary',
        label: 'PRIMARY',
        swatch: '#141413',
        sideImg: jesusSide,
        frontImg: jesusFront,
        backImg: jesusBack,
      },
    ],
  },
  {
    id: 'polo-gegs',
    name: 'STRUCTURED ATELIER POLO',
    code: '03 // EDITION',
    price: '₦75,000',
    description:
      'Refined collar and balanced drape built to transition effortlessly between studio sessions and evening wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    colorways: [
      {
        id: 'primary',
        label: 'PRIMARY',
        swatch: '#059669',
        sideImg: poloSide,
        frontImg: poloFront,
        backImg: poloBack,
      },
    ],
  },
  {
    id: 'senator-gegs',
    name: 'MODERN SENATOR CUT',
    code: '04 // EDITION',
    price: '₦110,000',
    description:
      'Sharp shoulder definition and bespoke tailoring inspired by timeless West African craftsmanship.',
    sizes: ['S', 'M', 'L', 'XL'],
    colorways: [
      {
        id: 'primary',
        label: 'PRIMARY',
        swatch: '#FAF6EE',
        sideImg: senatorSide,
        frontImg: senatorFront,
        backImg: senatorBack,
      },
    ],
  },
];