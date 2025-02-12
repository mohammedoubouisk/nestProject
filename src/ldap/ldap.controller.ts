
// ldap.controller.ts
import { Controller, Get } from '@nestjs/common';
import { LdapService } from './ldap.service';

@Controller('ldap')
export class LdapController {
  constructor(private readonly ldapService: LdapService) {}

  @Get('users')
  async getAllUsers() {
    try {
      await this.ldapService.bind();
      const users = await this.ldapService.getAllUsers();
      return users;
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  }
}