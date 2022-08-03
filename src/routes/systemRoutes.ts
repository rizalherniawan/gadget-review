import express, { Response} from 'express';
import { System } from "../controller/system";
import { authentication } from '../middleware/authentication';
import { validation } from '../middleware/validScheme';
import { scheme } from '../validation/valdiation';
import { registLoginScheme } from '../validation/validation.registlogin';

const api = express()


api.post('/user/regist', validation(registLoginScheme), System.RegistUser)
api.post('/user/login', validation(registLoginScheme), System.LoginUser)
api.post('/todo', authentication() ,validation(scheme), System.postData)
api.get('/todo', authentication(), System.lookTodo)

export { api }