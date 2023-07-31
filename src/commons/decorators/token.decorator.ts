import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';

// @Token 커스텀
export const Token = createParamDecorator((data, ctx: ExecutionContext): UserEntity => {
  // ctx : 실생 컨텍스트
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
// @Token() token
