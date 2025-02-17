import { userSignUpSchema } from '../schemas/authSchema.js';
import { userSignInSchema } from '../schemas/authSchema.js';
import { db } from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signUp(req, res) {
  const { name, email, password, confirmedPassword } = req.body;

  const validation = userSignUpSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(422).send(validation.error.details.map(detail => detail.message));
  }

  if (password !== confirmedPassword) {
    return res.status(400).send('The passwords must be exactly the same.');
  }

  try {
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(409).send('Email already registered.');
    }

    const hash = bcrypt.hashSync(password, 10);
    const { insertedId } = await db.collection('users').insertOne({ name, email, password: hash });

    const token = jwt.sign({ userId: insertedId }, process.env.JWT_SECRET, { expiresIn: '7d' });

    await db.collection('sessions').insertOne({ userId: insertedId, token });

    res.status(201).send({ token });

  } catch (err) {
    res.status(500).send(err.message);
  }
}
 
export async function signIn(req, res) {

  const { email, password } = req.body;
  
  const validation = userSignInSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(422).send(validation.error.details.map(detail => detail.message));
  }

  try {
    const existingUser = await db.collection('users').findOne({ email });
    if (!existingUser) {
      return res.status(401).send('User not found.');
    } 

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).send('The password is wrong.')
    }

    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d' 
    });

    await db.collection('sessions').insertOne({ userId: existingUser._id, token });

    res.status(200).send({ token });

  } catch (error) {
    res.status(500).send(err.message);
  }
}

/*  
Fluxo de sign-up:

1️- Validar os dados recebidos com Joi. Se houver erro, retornar 422 Unprocessable Entity.
2- Verificar se o e-mail já está cadastrado no banco. Se sim, retornar 409 Conflict.
3️- Comparar password e confirmedPassword. Se forem diferentes, retornar 400 Bad Request.
4️- Gerar o hash da senha usando bcrypt.hashSync().
5️- Salvar o novo usuário no banco com o nome, e-mail e senha hash.
6- Gerar um token JWT usando jsonwebtoken.sign().
7- Criar uma sessão no banco com o token e o userId.
8- Retornar o token na resposta com status 201 Created.

Fluxo de sign-in:

1️- Validar os dados recebidos com Joi. Se houver erro, retornar 422 Unprocessable Entity.
2- Buscar o usuário pelo e-mail no banco. Se não existir, retornar 401 Unauthorized.
3- Comparar a senha digitada com a hash armazenada usando bcrypt.compareSync(). Se a senha estiver errada, retornar 401 Unauthorized.
4- Gerar um token JWT usando jsonwebtoken.sign() com um tempo de expiração.
5- Criar uma sessão no banco com o token e o userId.
6- Retornar o token na resposta com status 200 OK.
*/
