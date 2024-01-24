import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import positionsRouter from './routes/position.route.js';
import dashboardRouter from './routes/dashboard.route.js';
import candidateRouter from './routes/candidate.route.js';
import ahpRouter from './routes/ahp.route.js';
import multer from 'multer';

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../admin/public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use('/api/dashboard', dashboardRouter);
app.use('/api/positions', positionsRouter);
app.use('/api/candidates', candidateRouter);
app.use('/api/ahp', ahpRouter);

app.listen(process.env.PORT_NUMBER || 3000, () => {
  console.log('Server listening on port 3000');
});
