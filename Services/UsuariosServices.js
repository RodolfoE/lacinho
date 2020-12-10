exports.ObterUsuario = async (knex, login, email, id) => {
    let user = await knex.raw(`select * from users
        ${login ? `where Login='${login}'`: ''}
        ${email ? `where Email='${email}'`: ''}
        ${id ? `where UserId='${id}'`: ''}        
    `);
    if (user.length){
        return user[0];
    }

    throw new Error('Usuário não encontrado');
}