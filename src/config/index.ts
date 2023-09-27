import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from a specific file if available
const envPath = path.join(process.cwd(), '.env');
dotenv.config({ path: envPath });

const config = {
  env: process.env.NODE_ENV,
  ip: process.env.IP || '127.0.0.1',
  port: process.env.PORT || 4000,
  database_url: process.env.DATABASE_URL,
  session_secret: process.env.SESSION_SECRET,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};

export default config;
