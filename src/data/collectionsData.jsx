import colorSide from '../assets/Cloth Rack/shirt side/Color gegs side.png';
import colorFront from '../assets/Cloth Rack/shirt front/color gegs front.png';
import colorBack from '../assets/Cloth Rack/shirt back/Color gegs back.png';

import jesusSide from '../assets/Cloth Rack/shirt side/jesus gegs side.png';
import jesusFront from '../assets/Cloth Rack/shirt front/jesus gegs front.png';
import jesusBack from '../assets/Cloth Rack/shirt back/jesus gegs back.png';

import poloSide from '../assets/Cloth Rack/shirt side/polo gegs side.png';
import poloFront from '../assets/Cloth Rack/shirt front/polo gegs front.png';
import poloBack from '../assets/Cloth Rack/shirt back/polo gegs back.png';

import senatorSide from '../assets/Cloth Rack/shirt side/senator gegs side.png';
import senatorFront from '../assets/Cloth Rack/shirt front/senator gegs front.png';
import senatorBack from '../assets/Cloth Rack/shirt back/senator gegs back.png';

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