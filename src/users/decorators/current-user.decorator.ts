import { CURRENT_USER_KEY } from './../../utils/constant';

import { createParamDecorator,ExecutionContext } from "@nestjs/common";
import { JWTPayloadType } from 'src/utils/types';

export const CurrentUser = createParamDecorator(
    (data, context: ExecutionContext)=>{
        const request = context.switchToHttp().getRequest();
        const payload: JWTPayloadType = request[CURRENT_USER_KEY];
        return payload
    }
) 