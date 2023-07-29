export class AcessTokenDto {
  readonly accessToken: string;
}

export class SignupResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}
