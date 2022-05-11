import { Admin } from '../admins/admin.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Admin)
export class AdminsRepository extends Repository<Admin> {}
