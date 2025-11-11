import { connectToDatabase } from '../../../lib/mongodb';
import Users from '../../../lib/schemas/mongoose/users';
import { z } from 'zod';

// Esquema de validación para crear usuario
const CreateUserSchema = z.object({
  username: z.string().min(3, 'Username debe tener al menos 3 caracteres').max(50),
  email: z.string().email('Email inválido'),
  role: z.enum(['user', 'admin', 'moderator']).default('user').optional(),
  isActive: z.boolean().default(true).optional()
});

// Esquema de validación para listar
const ListQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional().default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).optional().default('10'),
  role: z.string().optional()
});

export async function GET(request) {
  try {
    await connectToDatabase();

    // Validar query parameters
    const url = new URL(request.url);
    const queryParams = {
      page: url.searchParams.get('page'),
      limit: url.searchParams.get('limit'),
      role: url.searchParams.get('role')
    };

    const validated = ListQuerySchema.parse(queryParams);
    const { page, limit, role } = validated;

    // Construir filtro
    const filter = role ? { role } : {};

    // Calcular skip
    const skip = (page - 1) * limit;

    // Obtener usuarios
    const users = await Users.find(filter)
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .exec();

    // Contar total
    const total = await Users.countDocuments(filter);

    return new Response(
      JSON.stringify({
        success: true,
        data: users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en GET /api/usuarios:', error);

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
        message: error.message || 'Error al obtener usuarios',
        error: 'INTERNAL_ERROR'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();

    // Obtener body
    const body = await request.json();

    // Validar datos
    const validated = CreateUserSchema.parse(body);

    // Verificar duplicados
    const existingUser = await Users.findOne({
      $or: [{ username: validated.username }, { email: validated.email }]
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'El usuario o email ya existe',
          error: 'DUPLICATE_ERROR'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crear usuario
    const newUser = new Users({
      username: validated.username,
      email: validated.email,
      role: validated.role || 'user',
      isActive: validated.isActive !== false
    });

    await newUser.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Usuario creado exitosamente',
        data: newUser
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en POST /api/usuarios:', error);

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
        message: error.message || 'Error al crear usuario',
        error: 'INTERNAL_ERROR'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
