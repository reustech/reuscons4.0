import { connectToDatabase } from '../../../lib/mongodb';
import Users from '../../../lib/schemas/mongoose/users';
import { z } from 'zod';
import mongoose from 'mongoose';

// Esquema de validación para actualizar
const UpdateUserSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  email: z.string().email().optional(),
  role: z.enum(['user', 'admin', 'moderator']).optional(),
  isActive: z.boolean().optional()
}).strict();

export async function GET({ params }) {
  try {
    await connectToDatabase();

    const { id } = params;

    // Validar que sea un ID válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'ID inválido',
          error: 'INVALID_ID'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Buscar usuario
    const user = await Users.findById(id).select('-__v').exec();

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Usuario no encontrado',
          error: 'NOT_FOUND'
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: user
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en GET /api/usuarios/[id]:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || 'Error al obtener usuario',
        error: 'INTERNAL_ERROR'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT({ params, request }) {
  try {
    await connectToDatabase();

    const { id } = params;

    // Validar que sea un ID válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'ID inválido',
          error: 'INVALID_ID'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();

    // Validar datos
    const validated = UpdateUserSchema.parse(body);

    // Verificar si el usuario existe
    const existingUser = await Users.findById(id);

    if (!existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Usuario no encontrado',
          error: 'NOT_FOUND'
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Si se actualiza username o email, verificar duplicados
    if (validated.username || validated.email) {
      const query = [];
      if (validated.username && validated.username !== existingUser.username) {
        query.push({ username: validated.username });
      }
      if (validated.email && validated.email !== existingUser.email) {
        query.push({ email: validated.email });
      }

      if (query.length > 0) {
        const duplicate = await Users.findOne({ $or: query });
        if (duplicate) {
          return new Response(
            JSON.stringify({
              success: false,
              message: 'El username o email ya existe',
              error: 'DUPLICATE_ERROR'
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
    }

    // Actualizar usuario
    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { $set: validated },
      { new: true, runValidators: true }
    ).select('-__v').exec();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: updatedUser
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en PUT /api/usuarios/[id]:', error);

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
        message: error.message || 'Error al actualizar usuario',
        error: 'INTERNAL_ERROR'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE({ params }) {
  try {
    await connectToDatabase();

    const { id } = params;

    // Validar que sea un ID válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'ID inválido',
          error: 'INVALID_ID'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Eliminar usuario
    const deletedUser = await Users.findByIdAndDelete(id).select('-__v').exec();

    if (!deletedUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Usuario no encontrado',
          error: 'NOT_FOUND'
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Usuario eliminado exitosamente',
        data: deletedUser
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en DELETE /api/usuarios/[id]:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || 'Error al eliminar usuario',
        error: 'INTERNAL_ERROR'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
