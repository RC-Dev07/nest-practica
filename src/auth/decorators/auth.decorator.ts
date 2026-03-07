
import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { Role } from "../enums/rol.enum";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "./role.decorator";

export function Auth(role: Role) {
    return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
