export class AccessTokenDto {
  readonly accessToken: string;
}

export class SignupResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

export class SigninResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}
