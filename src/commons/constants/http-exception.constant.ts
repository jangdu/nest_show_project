export const CustomHttpException = {
  UNAUTHORIZATION_ACCOUNT: {
    statusCode: 401,
    code: 'UNAUTHORIZATION_ACCOUNT',
    message: '아이디 혹은 패스워드를 확인해주세요.',
  },
  BAD_REQUEST_PASSWORD: {
    statusCode: 400,
    code: 'BAD_REQUEST_PASSWORD',
    message: '패스워드와 패스워드확인을 확인해주세요.',
  },
  UNAUTHORIZED_EXCEPTION: {
    statusCode: 403,
    code: 'UNAUTHORIZED_EXCEPTION',
    message: '해당 API에 접근 권한이 없습니다.',
  },
  NOTFOUNDED_EXCEPTION: {
    statusCode: 404,
    code: 'NOTFOUNDED_EXCEPTION',
    message: '해당하는 데이터를 찾을 수 없습니다.',
  },
  CONFLICT_EMAIL: {
    statusCode: 409,
    code: 'CONFLICT_EMAIL',
    message: '이미 존재하는 이메일 입니다.',
  },
  DB_SERVER_ERROR: {
    statusCode: 401,
    code: 'DB_SERVER_ERROR',
    message: 'DB 서버 에러',
  },
};
