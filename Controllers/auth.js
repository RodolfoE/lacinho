const jwt = require('jsonwebtoken');

exports.ensureLoggedIn = (req, res, next) => {
    let token = req.cookies['token'];

    if (!token) return res.redirect('/user/login');
    
    jwt.verify(token, process.env.SECRET, async function(err, decoded) {
      if (err) return res.redirect('/user/login');
      
      // se tudo estiver ok, salva no request para uso posterior
      req.user = await require('./../Services/UsuariosServices').ObterUsuario(req.knex, null, null, decoded.id);
      next();
    });
}


exports.ensureLogout = (req, res, next) => {
  let token = req.cookies['token'];
  if (!token){
    next();
    return;
  }
      
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err){
      next();
      return;
    }
    res.redirect('/lacinho/home');
  });
}