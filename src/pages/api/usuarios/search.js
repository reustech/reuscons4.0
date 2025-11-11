import { connectToDatabase } from '../../../lib/mongodb';
import Users from '../../../lib/schemas/mongoose/users';
import { z } from 'zod';

// Esquema de validación para búsqueda
const SearchQuerySchema = z.object({
  q: z.string().min(1, 'Query no puede estar vacío'),
  type: z.enum(['username', 'email', 'all']).default('all').optional()
});

export async function GET({ request }) {
  try {
    await connectToDatabase();

    const url = new URL(request.url);
    const queryParams = {
      q: url.searchParams.get('q'),
      type: url.searchParams.get('type')
    };

    // Validar parámetros
    const validated = SearchQuerySchema.parse(queryParams);
    const { q, type } = validated;

    // Construir filtro de búsqueda
    let filter = {};

    if (type === 'username') {
      filter = { username: { $regex: q, $options: 'i' } };
    } else if (type === 'email') {
      filter = { email: { $regex: q, $options: 'i' } };
    } else {
      // Buscar en ambos campos
      filter = {
        $or: [
          { username: { $regex: q, $options: 'i' } },
          { email: { $regex: q, $options: 'i' } }
        ]
      };
    }

    // Buscar usuarios
    const users = await Users.find(filter)
      .select('-__v')
      .limit(20)
      .exec();

    return new Response(
      JSON.stringify({
        success: true,
        query: q,
        type,
        total: users.length,
        data: users
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en GET /api/usuarios/search:', error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Validación fallida',
          error: 'VALIDATION_ERROR',
          details: error.errors
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || 'Error al buscar usuarios',
        error: 'INTERNAL_ERROR'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
