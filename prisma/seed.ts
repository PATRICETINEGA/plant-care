import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('demo123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@plants.app' },
    update: {},
    create: { email: 'demo@plants.app', password },
  })

  await prisma.plant.upsert({
    where: { id: 'seed-plant' },
    update: {},
    create: { id: 'seed-plant', name: 'Monstera', species: 'Monstera deliciosa', lastWatered: '2026-11-05', ownerId: user.id },
  })

  console.log('Seed done')
}

main().finally(() => prisma.$disconnect())
