// Unit conversion utilities
export interface UnitConversion {
  unit: string;
  quantity: number;
  display: string;
}

export const getUnitDisplay = (quantity: number, productName?: string, category?: string): UnitConversion[] => {
  const conversions: UnitConversion[] = [];
  
<<<<<<< HEAD
  // For paper category
=======
  // For paper category, use rim as base unit
>>>>>>> sumber/main
  if (category === 'Kertas') {
    conversions.push({
      unit: 'rim',
      quantity,
      display: `${quantity} rim (${quantity * 500} lembar)`
    });

<<<<<<< HEAD
=======
    // Karton conversion for paper (5 rim = 1 karton)
>>>>>>> sumber/main
    if (quantity >= 5) {
      const karton = Math.floor(quantity / 5);
      const remainder = quantity % 5;
      if (karton >= 1) {
        conversions.push({
          unit: 'karton',
          quantity: karton,
          display: remainder > 0 ? `${karton} karton + ${remainder} rim` : `${karton} karton`
        });
      }
    }
  } else {
<<<<<<< HEAD
    // Standard display for all other categories
=======
    // Always show the base quantity for non-paper items
>>>>>>> sumber/main
    conversions.push({
      unit: 'pcs',
      quantity,
      display: `${quantity} pcs`
    });

    // Standard conversions
    if (quantity >= 10) {
      const pax = Math.floor(quantity / 10);
      const remainder = quantity % 10;
      if (pax >= 1) {
        conversions.push({
          unit: 'pax',
          quantity: pax,
          display: remainder > 0 ? `${pax} pax + ${remainder} pcs` : `${pax} pax`
        });
      }
    }

    if (quantity >= 12) {
      const dozens = Math.floor(quantity / 12);
      const remainder = quantity % 12;
      if (dozens >= 1) {
        conversions.push({
          unit: 'lusin',
          quantity: dozens,
          display: remainder > 0 ? `${dozens} lusin + ${remainder} pcs` : `${dozens} lusin`
        });
      }
    }

    if (quantity >= 20) {
      const kodi = Math.floor(quantity / 20);
      const remainder = quantity % 20;
      if (kodi >= 1) {
        conversions.push({
          unit: 'kodi',
          quantity: kodi,
          display: remainder > 0 ? `${kodi} kodi + ${remainder} pcs` : `${kodi} kodi`
        });
      }
    }

    if (quantity >= 144) {
      const gross = Math.floor(quantity / 144);
      const remainder = quantity % 144;
      if (gross >= 1) {
        conversions.push({
          unit: 'gros',
          quantity: gross,
          display: remainder > 0 ? `${gross} gros + ${remainder} pcs` : `${gross} gros`
        });
      }
    }
  }

  return conversions;
};

export const getUnitMultiplier = (unit: string, category?: string): number => {
  switch (unit) {
    case 'pax':
      return 10;
    case 'lusin':
      return 12;
    case 'kodi':
      return 20;
    case 'gros':
      return 144;
    case 'karton':
<<<<<<< HEAD
      return category === 'Kertas' ? 5 : 1;
    case 'rim':
      return 1;
=======
      return category === 'Kertas' ? 5 : 1; // For paper, 5 rim = 1 karton
    case 'rim':
      return 1; // Base unit for paper
>>>>>>> sumber/main
    default:
      return 1;
  }
};

export const getUnitOptions = (productName?: string, category?: string) => {
<<<<<<< HEAD
  // For paper category
=======
  // For paper category, only show rim and karton
>>>>>>> sumber/main
  if (category === 'Kertas') {
    return [
      { value: 'rim', label: 'Rim (500 lembar)', multiplier: 1 },
      { value: 'karton', label: 'Karton (5 rim)', multiplier: 5 }
    ];
  }

<<<<<<< HEAD
  // Default units
=======
  // Standard units for other products
>>>>>>> sumber/main
  return [
    { value: 'pcs', label: 'Pcs', multiplier: 1 },
    { value: 'pax', label: 'Pax (10 pcs)', multiplier: 10 },
    { value: 'lusin', label: 'Lusin (12 pcs)', multiplier: 12 },
    { value: 'kodi', label: 'Kodi (20 pcs)', multiplier: 20 },
    { value: 'gros', label: 'Gros (144 pcs)', multiplier: 144 }
  ];
<<<<<<< HEAD
};
=======
};
>>>>>>> sumber/main
