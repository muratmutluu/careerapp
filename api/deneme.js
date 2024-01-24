// const obj = {
//   "candidateData": {},
//   "scoreData": {
//       "28": "6",
//       "29": "4",
//       "30": "6",
//       "31": "7",
//       "32": "4"
//   }
// }
// const valuesArray = Object.entries(obj.scoreData).map(([key, value]) => {
//   // Yeni değeri ekleyerek döngüyü tamamla
//   return [1,parseInt(key), parseInt(value), ];
// });

// console.log(valuesArray);

const criteria = [
  { id: 28, position_id: 3, criterion: 'Bilişim / Teknik' },
  { id: 29, position_id: 3, criterion: 'İş tecrübesi' },
  { id: 30, position_id: 3, criterion: 'Eğitim düzeyi' },
  { id: 31, position_id: 3, criterion: 'Yetenek / Kişilik' },
  { id: 32, position_id: 3, criterion: 'Performans' }
];

// Tüm kriter ikili karşılaştırmalarını yapacak fonksiyon
const compareCriteria = (criteria) => {
  const comparisons = [];

  for (let i = 0; i < criteria.length - 1; i++) {
    for (let j = i + 1; j < criteria.length; j++) {
      const comparison = {
        criterion1: criteria[i].criterion,
        criterion2: criteria[j].criterion,
        // Burada karşılaştırma sonucunu belirleyeceğiniz bir değer olmalı
      };

      comparisons.push(comparison);
    }
  }

  return comparisons;
};

const comparisons = compareCriteria(criteria);
console.log(comparisons);
