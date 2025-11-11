import { connectToDatabase } from '../../../lib/mongodb';
import Users from '../../../lib/schemas/mongoose/users';

export async function GET() {
  try {
    await connectToDatabase();

    // Total de usuarios
    const totalUsers = await Users.countDocuments();

    // Usuarios por rol
    const usersByRole = await Users.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    // Usuarios activos
    const activeUsers = await Users.countDocuments({ isActive: true });

    // Usuarios inactivos
    const inactiveUsers = await Users.countDocuments({ isActive: false });

    // Usuario más reciente
    const latestUser = await Users.findOne()
      .sort({ createdAt: -1 })
      .select('username email role createdAt')
      .exec();

    // Convertir usersByRole a objeto más legible
    const roleStats = {};
    usersByRole.forEach(item => {
      roleStats[item._id || 'unknown'] = item.count;
    });

    return new Response(
      JSON.stringify({
        success: true,
        stats: {
          total: totalUsers,
          active: activeUsers,
          inactive: inactiveUsers,
          byRole: roleStats,
          latestUser
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en GET /api/usuarios/stats:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || 'Error al obtener estadísticas',
        error: 'INTERNAL_ERROR'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
