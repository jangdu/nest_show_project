import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// @Token 커스텀
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  // ctx : 실생 컨텍스트
  const response = ctx.switchToHttp().getResponse();
  return response.locals.jwt;
});
// @Token() token
