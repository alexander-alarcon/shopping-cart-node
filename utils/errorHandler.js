handleError = error => {
  const handlers = [handle400, handle401, handle404, handle500]
  for (const handler of handlers) {
    const err = handler(error)
    
    if (err != null) {
      return err;
    }
  }
}

handle400 = error => {
  if(error.name === 'ValidationError') {
    const errors = Object.keys(error.errors).reduce( (errs, next) => {
        errs[next] = error.errors[next].message;
        return errs;
      }, {});
    
    const err = {
      status: 400,
      message: errors
    };
    
    return err;
  }
  
  if (error.statusCode === 400) {
    const err = {
      status: 400,
      message: 'Syntax Error!'
    };
    
    return err;
  } 
  return null;
}

handle401 = error => {
  if(error.name === 'JsonWebTokenError') {
    const err = {
      status: 401,
      message: 'Authentication Failed'          
    };
    return err;
  }
  
  return null;
}

handle404 = error => { 
  if(error.message === 'Not Found!' || error.name === 'CastError') {
    const err = {
      status: 404,
      message: 'Not Found!'          
    };
    return err;
  }
  
  return null;
}

handle500 = error => {
  console.log('Paso al 500', error)
  return null;
}

module.exports = handleError;