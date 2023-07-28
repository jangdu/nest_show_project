import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// @User 커스텀
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
