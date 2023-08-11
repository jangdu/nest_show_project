import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost', // Redis 호스트
      port: 6379, // Redis 포트
    });
  }

  async setToken(email: string, refreshToken: string): Promise<void> {
    // 7일 유효 기간 설정
    await this.redisClient.set(email, refreshToken, 'EX', 60 * 60 * 24 * 7);
  }

  async getRefreshToken(email: string): Promise<string | null> {
    return await this.redisClient.get(email);
  }

  async removeRefreshToken(email: string): Promise<void> {
    await this.redisClient.del(email);
  }
}
