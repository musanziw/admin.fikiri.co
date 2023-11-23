import { DataSource, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UsersSubscriber implements EntitySubscriberInterface<User> {
    constructor(dataSource: DataSource);
    listenTo(): typeof User;
    beforeUpdate(event: UpdateEvent<User>): Promise<void>;
    beforeInsert(event: InsertEvent<User>): Promise<void>;
}
