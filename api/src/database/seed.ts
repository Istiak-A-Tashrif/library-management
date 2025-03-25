/* eslint-disable */
import { PrismaClient } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const hash = bcryptjs.hashSync('123456', 10);

  await prisma.adminUser.deleteMany({ where: {} });
  await prisma.adminUser.create({
    data: {
      email: 'admin@email.com',
      first_name: 'Admin',
      last_name: '',
      password: hash,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
