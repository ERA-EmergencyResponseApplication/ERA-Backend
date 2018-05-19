'use strict';

module.exports = function(Emergencyresponse) {
  Emergencyresponse.observe('before save', function newResponseAreaInit(ctx, next) {
    if (ctx.isNewInstance) {
      console.log('Creating new Response Area');
      if (ctx.options.accessToken) ctx.instance.responderId = ctx.options.accessToken.userId;
    }
    next();
  });
};
