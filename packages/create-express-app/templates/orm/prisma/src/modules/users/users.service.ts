import prisma from '@/libs/prisma';

class UsersService {
  public async listUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

export default UsersService;
