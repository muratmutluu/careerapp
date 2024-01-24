import { db } from '../db/connect.js';

export const getPositions = async (req, res) => {
  const q =
    'SELECT positions.id,positions.position,cities.city,departments.department,positions.img   FROM positions JOIN cities ON cities.id = positions.city_id JOIN departments ON departments.id = positions.department_id';

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    res.status(200).json(data);
  });
};

export const getPosition = async (req, res) => {
  const positionId = req.params.id;
  const q =
    'SELECT positions.id, positions.position, cities.city, departments.department FROM positions JOIN cities ON cities.id = positions.city_id JOIN departments ON departments.id = positions.department_id WHERE positions.id = ?';

  db.query(q, [positionId], (err, data) => {
    if (err) return res.status(404).json(err);
    return res.status(200).json(data[0]);
  });
};

export const getPositionCriteria = async (req, res) => {
  const positionId = req.params.id;
  const q =
    'SELECT criteria.id, criteria.position_id, criteria.criterion FROM criteria WHERE criteria.position_id = ?';

  db.query(q, [positionId], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data);
    return res.status(200).json(data);
  });
};

// Create a new position

export const createPosition = (req, res) => {
  const values = [
    req.body.positionData.position,
    req.body.positionData.city,
    req.body.positionData.department,
    req.body.positionData.img,
  ];
  const q =
    'INSERT INTO positions (position, city_id, department_id,img) VALUES (?, (SELECT id FROM cities WHERE city = ?), (SELECT id FROM departments WHERE department = ?),?)';

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);

    const values = Object.values(req.body.criteriaData).map((value) => {
      return [data.insertId, value];
    });

    const q = 'INSERT INTO criteria (position_id, criterion) VALUES  ?';
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ id: values[0][0] });
    });
  });
};

export const compareCriteriaGet = (req, res) => {
  const positionId = req.params.id;
  const q = 'SELECT criteria.id, criteria.criterion FROM criteria WHERE criteria.position_id = ?';

  db.query(q, [positionId], (err, data) => {
    if (err) return res.status(500).json(err);

    const compareCriteria = (criteria) => {
      const comparisons = [];

      for (let i = 0; i < criteria.length - 1; i++) {
        for (let j = i + 1; j < criteria.length; j++) {
          const comparison = {
            id1: criteria[i].id,
            criterion1: criteria[i].criterion,
            id2: criteria[j].id,
            criterion2: criteria[j].criterion,
          };

          comparisons.push(comparison);
        }
      }

      return comparisons;
    };

    const comparisons = compareCriteria(data);
    return res.status(200).json(comparisons);
  });
};

export const compareCriteriaPost = (req, res) => {
  const positionId = req.params.id;
  const q = 'SELECT criteria.position_id FROM criteria WHERE criteria.position_id = ? LIMIT 1';
  db.query(q, [positionId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      const values = Object.values(req.body).map((value) => {
        return [value.id1, value.id2, value.rank];
      });

      const q =
        'SELECT criteria_ranks.criterion_from_id, criteria_ranks.criterion_to_id FROM criteria_ranks WHERE criteria_ranks.criterion_from_id = ? AND criteria_ranks.criterion_to_id = ?';

      db.query(q, [values[0][0], values[0][1]], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length)
          return res
            .status(200)
            .json({ success: false, message: 'Bu kriterler zaten karşılaştırılmış' });
        const q =
          'INSERT INTO criteria_ranks (criterion_from_id, criterion_to_id, criteria_ranks.rank) VALUES ?';

        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);

          return res.status(200).json('Kriterler başarıyla kaydedildi.');
        });
      });
    }
  });
};


export const deletePosition = (req, res) => {
  const positionId = req.params.id;
  const q = 'DELETE FROM positions WHERE positions.id = ?';
  db.query(q, [positionId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json('Pozisyon başarıyla silindi.');
  });
}