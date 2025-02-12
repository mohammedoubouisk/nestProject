import { Injectable } from '@nestjs/common';
import { Client, createClient } from 'ldapjs';


@Injectable()
export class LdapService {
  private client: Client;

  constructor() {
    this.client = createClient({
      url: 'ldap://localhost:389',
      bindDN: 'cn=admin,dc=mycompany,dc=com',
      bindCredentials: 'adminpassword'
    });
  }

  async bind(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.bind('cn=admin,dc=mycompany,dc=com', 'adminpassword', (err) => {
        if (err) {
          console.error('LDAP bind error:', err);
          reject(err);
          return;
        }
        resolve();
        console.log('you code connecte with ldap with successfuly')
      });
    });
  }

async getAllUsers(): Promise<any[]> {
  const baseDn = 'dc=mycompany,dc=com'; // Base DN for searching
  const filter = 'cn=*'; // Filter to find users

  return new Promise((resolve, reject) => {
    const opts = {
      filter: filter,
      scope: 'sub', // Adjust the scope based on your needs
      attributes: ['cn', 'sn', 'givenName', 'mail'], // List the attributes you want to retrieve
    };

    this.client.search(baseDn, opts, (err, res) => {
      if (err) {
        reject(err);
        return;
      }

      const users: any[] = [];

      res.on('searchEntry', (entry) => {
        console.log('Found entry:', entry.object); // Log the found entry for debugging
        users.push(entry.object); // Push each user object into the array
      });

      

      res.on('searchEntry', (entry) => {
        const user = {
         dn: entry.dn.toString(),
         ...entry.attributes.reduce((acc, attr) => {
           acc[attr.type] = attr.values[0];
           return acc;
         }, {})
       };
       users.push(user);
     });

      res.on('end', () => {
        console.log('Search finished, users found:', users); // Log the final result
        resolve(users); // Resolve with the list of users
      });
    });
  });
}

  
}