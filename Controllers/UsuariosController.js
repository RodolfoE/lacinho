const UsuariosService = require('./../Services/UsuariosServices')

exports.execLogin = async (knex, user, email, password) => {
  let dbUser = await UsuariosService.ObterUsuario(knex, user, email);
  let frontEndHashedPassword = hashPassword(password);
  if(frontEndHashedPassword === dbUser.HashedPassword)
    return dbUser; 
}

function hashPassword(password){
    /** TODO: fzr função de hash */
    return 'asdfsad';
}