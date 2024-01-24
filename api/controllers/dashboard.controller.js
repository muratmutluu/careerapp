// import { db } from '../db/connect.js';

// export const dashboard = (req, res) => {
//   const q = 'SELECT COUNT(positions.id) AS pozisyon_sayisi FROM positions ';

//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json(err);

//     const q = 'SELECT COUNT(candidates.id) AS aday_sayisi FROM candidates ';

//     db.query(q, (err, data2) => {
//       if (err) return res.status(500).json(err);

//       //   pozisyonlara göre aday sayısı
//       const q =
//         'SELECT positions.position, COUNT(candidates.id) AS aday_sayisi FROM candidates JOIN positions ON positions.id = candidates.position_id GROUP BY positions.position';

//       db.query(q, (err, data3) => {
//         if (err) return res.status(500).json(err);
//         const q = 'SELECT COUNT(departments.id) AS departman_sayisi FROM departments';

//         db.query(q, (err, data4) => {
//           if (err) return res.status(500).json(err);

//           res.json({ data, data2, data3, data4 });
//         });
//       });
//     });
//   });
// };

// import { db } from '../db/connect.js';

// export const dashboard = async (req, res) => {
//   try {
//     const pozisyonQuery = 'SELECT COUNT(positions.id) AS pozisyon_sayisi FROM positions';
//     const adayQuery = 'SELECT COUNT(candidates.id) AS aday_sayisi FROM candidates';
//     const adayPozisyonQuery =
//       'SELECT positions.position, COUNT(candidates.id) AS aday_sayisi FROM candidates JOIN positions ON positions.id = candidates.position_id GROUP BY positions.position';
//     const departmanQuery = 'SELECT COUNT(departments.id) AS departman_sayisi FROM departments';
//     const criteriaQuery = 'SELECT COUNT(criteria.id) AS kriter_sayisi FROM criteria';
//     const monthCandidates =
//       'CALL `aylara_gore_aday_sayisi`();';

//     const [data, data2, data3, data4, data5, data6] = await Promise.all([
//       executeQuery(pozisyonQuery),
//       executeQuery(adayQuery),
//       executeQuery(adayPozisyonQuery),
//       executeQuery(departmanQuery),
//       executeQuery(criteriaQuery),
//       executeQuery(monthCandidates),
//     ]);

//     res.json({ data, data2, data3, data4, data5, data6: data6[0] });
//   } catch (error) {
//     console.error('Hata oluştu:', error);
//     res.status(500).json(error);
//   }
// };

// const executeQuery = (query) => {
//   return new Promise((resolve, reject) => {
//     db.query(query, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

import { db } from '../db/connect.js';

export const dashboard = async (req, res) => {
  try {
    const sayiQuery = 'CALL `dashboard_sayi`()';
    const adayPozisyonQuery =
      'SELECT positions.position, COUNT(candidates.id) AS aday_sayisi FROM candidates JOIN positions ON positions.id = candidates.position_id GROUP BY positions.position';
    const monthCandidates = 'CALL `aylara_gore_aday_sayisi`();';
    const adayDepartmanQuery = 'CALL `aday_departman_sayisi`();';
    const [data, data2, data3, data4] = await Promise.all([
      executeQuery(sayiQuery),
      executeQuery(adayPozisyonQuery),
      executeQuery(monthCandidates),
      executeQuery(adayDepartmanQuery),
    ]);

    res.json({ data: data[0], data2, data3: data3[0], data4: data4[0] });
  } catch (error) {
    console.error('Hata oluştu:', error);
    res.status(500).json(error);
  }
};

const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
