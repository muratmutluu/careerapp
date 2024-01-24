import e from 'express';
import { db } from '../db/connect.js';
import AHP from 'ahp';

export const calculateAhp = (req, res) => {
  const ahpContext = new AHP();

  const positionId = req.params.id;

  const q =
    'SELECT criteria.criterion FROM criteria JOIN positions ON positions.id = criteria.position_id WHERE positions.id = ?';

  db.query(q, [positionId], (err, data) => {
    if (err) return res.status(500).json(err);

    const criteria = data.map((item) => item.criterion);

    ahpContext.addCriteria(criteria);

    const q =
      'SELECT candidates.id AS candidate FROM candidates JOIN positions ON positions.id = candidates.position_id WHERE positions.id = ?';

    db.query(q, [positionId], (err, data) => {
      if (err) return res.status(500).json(err);

      const candidates = data.map((item) => item.candidate);

      ahpContext.addItems(candidates);

      const q =
        'SELECT cf.criterion AS kriter1, ct.criterion AS kriter2, criteria_ranks.rank FROM criteria_ranks JOIN criteria AS cf ON criteria_ranks.criterion_from_id = cf.id JOIN criteria AS ct ON criteria_ranks.criterion_to_id = ct.id WHERE cf.position_id = ?';

      db.query(q, [positionId], (err, data) => {
        if (err) return res.status(500).json(err);

        const criteriaRank = data.map((item) => [item.kriter1, item.kriter2, item.rank]);

        ahpContext.rankCriteria(criteriaRank);

        const q =
          'SELECT candidates.id AS candidateInfo,scores.score, criteria.criterion FROM candidates JOIN scores ON candidates.id = scores.candidate_id JOIN criteria ON criteria.id = scores.criterion_id WHERE candidates.position_id = ? ';

        db.query(q, [positionId], (err, data) => {
          if (err) return res.status(500).json(err);

          const matrix = {};

          for (let i = 0; i < data.length - 1; i++) {
            for (let j = i + 1; j < data.length; j++) {
              let { candidateInfo: adayId1, score: adayPuan1, criterion: criterion1 } = data[i];
              let { candidateInfo: adayId2, score: adayPuan2, criterion: criterion2 } = data[j];

              if (criterion1 !== criterion2) {
                continue; // Skip if criteria are different
              }

              let oran = adayPuan1 / adayPuan2;
              if (oran < 1) {
                [adayId1, adayId2] = [adayId2, adayId1];
                oran = 1 / oran;
              }

              let rank;

              if (oran === 1) {
                rank = 1;
              } else if (oran > 1 && oran < 2) {
                rank = 2;
              } else if (oran >= 2 && oran < 3) {
                rank = 3;
              } else if (oran >= 3 && oran < 4) {
                rank = 4;
              } else if (oran >= 4 && oran < 5) {
                rank = 5;
              } else if (oran >= 5 && oran < 6) {
                rank = 6;
              } else if (oran >= 6 && oran < 7) {
                rank = 7;
              } else if (oran >= 7 && oran < 8) {
                rank = 8;
              } else if (oran >= 8) {
                rank = 9;
              }

              if (!matrix[criterion1]) {
                matrix[criterion1] = [];
              }

              matrix[criterion1].push([adayId1, adayId2, rank]);
            }
          }

          // Convert the object to an array
          const resultArray = Object.entries(matrix);

          resultArray.forEach((item) => {
            ahpContext.rankCriteriaItem(item[0], item[1]);
          });

          const output = ahpContext.run();
          console.log(output);
          if (output.error) {
            return res.status(500).json(output.error);
          } else {
            const sortedMap = Object.entries(output.rankedScoreMap).sort((a, b) => b[1] - a[1]);
            const transformedMap = sortedMap.map(([id, score]) => ({ id, score }));

            const q =
              'SELECT positions.position, candidates.id,candidates.name,candidates.sur_name,candidates.email,candidates.phone_number,positions.position,cities.city,departments.department,candidates.apply_time FROM candidates JOIN positions ON positions.id = candidates.position_id JOIN cities ON cities.id = positions.city_id JOIN departments ON departments.id = positions.department_id WHERE positions.id = ?';

            db.query(q, [positionId], (err, data) => {
              if (err) return res.status(500).json(err);
              return res.status(200).json({ candidatesData: data, transformedMap });
            });
          }
        });
      });
    });
  });
};
