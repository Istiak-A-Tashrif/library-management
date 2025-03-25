// src/auth/organizer-role.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const OrganizerRole = (...roles: string[]) => SetMetadata('organizerRoles', roles);