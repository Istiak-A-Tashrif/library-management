import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../dto/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Check for single role (backward compatibility)
    const requiredRole = this.reflector.getAllAndOverride<Role>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    // Check for multiple roles (new functionality)
    const requiredOrganizerRoles = this.reflector.getAllAndOverride<Role[]>('organizerRoles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, allow access
    if (!requiredRole && !requiredOrganizerRoles) {
      return true;
    }

    // Get the user from the request
    const { user } = context.switchToHttp().getRequest();

    // console.log('insiodee', user)

    // Check for single role
    if (requiredRole && user?.role === requiredRole) {
      return true;
    }

    // Check for multiple roles
    if (requiredOrganizerRoles && requiredOrganizerRoles.some((role) => user?.role === role)) {
      return true;
    }

    // Deny access if no conditions are met
    return false;
  }
}