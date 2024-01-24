import { db } from '../db/connect.js';

export const createCandidate = (req, res) => {
  const q = 'SELECT candidates.email FROM candidates WHERE email = ?';
  const value = req.body.candidateData.email;
  db.query(q, [value], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(400).json({ message: 'Bu email adresi zaten kayıtlı.' });

    // create new candidate
    const q =
      'INSERT INTO candidates (name,sur_name,email,phone_number,last_company,last_position,linkedin,cv_url,position_id) VALUES (?)';
    const { name, surname, email, phone, lastCompany, lastPosition, linkedin, cv } =
      req.body.candidateData;
    const positionId = req.params.id;
    const values = [
      name,
      surname,
      email,
      phone,
      lastCompany,
      lastPosition,
      linkedin,
      cv,
      positionId,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).send({ err: err, message: 'Aday oluşturulamadı.' });
      const candidate_id = data.insertId;
      const q = 'INSERT INTO scores (candidate_id,criterion_id,score) VALUES ?';

      const values = Object.entries(req.body.scoreData).map(([key, value]) => {
        return [candidate_id, parseInt(key), parseInt(value)];
      });

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).send(err);
        res.send(data);
      });
    });
  });
};

export const getCandidates = (req, res) => {
  const q =
    'SELECT candidates.id,candidates.name,candidates.sur_name,candidates.email,candidates.phone_number,positions.position,cities.city,departments.department,candidates.apply_time FROM candidates JOIN positions ON positions.id = candidates.position_id JOIN cities ON cities.id = positions.city_id JOIN departments ON departments.id = positions.department_id';

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getCandidate = (req, res) => {
  const candidateId = req.params.id;
  const q =
    'SELECT candidates.id, candidates.name, candidates.sur_name, candidates.email, candidates.phone_number, positions.position, cities.city, departments.department, candidates.apply_time, criteria.criterion,candidates.last_company,candidates.last_position,candidates.linkedin,candidates.cv_url, scores.score FROM candidates JOIN positions ON positions.id = candidates.position_id JOIN cities ON cities.id = positions.city_id JOIN departments ON departments.id = positions.department_id JOIN scores ON scores.candidate_id = candidates.id JOIN criteria ON scores.criterion_id = criteria.id WHERE candidates.id = ?';

  db.query(q, [candidateId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
