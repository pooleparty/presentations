import { hostname } from 'os';
import app from './app';

const HOSTNAME = hostname();
const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Server listening at: http://${HOSTNAME}:${PORT}`);
});
