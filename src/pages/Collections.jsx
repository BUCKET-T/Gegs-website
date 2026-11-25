import { useState } from 'react';
import { COLLECTIONS } from '../data/collectionsData';
import GarmentRack from '../components/GarmentRack';
import GarmentInspector from '../components/GarmentInspector';
import GarmentDetailDrawer from '../components/GarmentDetailDrawer';


export default function Collections() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [detailGarmentIndex, setDetailGarmentIndex] = useState(null);
  const [detailColorIndex, setDetailColorIndex] = useState(0);

  const handleOpenAvailability = (garmentIdx = 0, colorIdx = 0) => {
    const safeIndex =
      garmentIdx !== null && garmentIdx >= 0 && garmentIdx < COLLECTIONS.length
        ? garmentIdx
        : 0;
    setDetailGarmentIndex(safeIndex);
    setDetailColorIndex(colorIdx || 0);
  };

  const handleCloseAvailability = () => {
    setDetailGarmentIndex(null);
  };

  const activeDetailItem =
    detailGarmentIndex !== null ? COLLECTIONS[detailGarmentIndex] : null;

  return (
    <>
      <main className="flex-1 flex flex-col">
        <GarmentRack
          items={COLLECTIONS}
          selectedIndex={selectedIndex}
          onSelectGarment={(idx) => setSelectedIndex(idx)}
          onOpenAvailability={(idx) => handleOpenAvailability(idx, 0)}
        />
      </main>

      <GarmentInspector
        items={COLLECTIONS}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelectIndex={(idx) => setSelectedIndex(idx)}
        onOpenAvailability={(garmentIdx, colorIdx) =>
          handleOpenAvailability(garmentIdx, colorIdx)
        }
      />

      <GarmentDetailDrawer
        isOpen={activeDetailItem !== null}
        item={activeDetailItem}
        initialColorIndex={detailColorIndex}
        onClose={handleCloseAvailability}
        onBookFitting={(enquiryPayload) => {
          console.log('GEGS Fitting Enquiry:', enquiryPayload);
        }}
      />
    </>
  );
}