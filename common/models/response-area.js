'use strict';

module.exports = function(ResponseArea) {
  ResponseArea.disableRemoteMethodByName('patchOrCreate');
  ResponseArea.disableRemoteMethodByName('replaceOrCreate');
  ResponseArea.disableRemoteMethodByName('prototype.patchAttributes');
  ResponseArea.disableRemoteMethodByName('upsertWithWhere');
  ResponseArea.disableRemoteMethodByName('updateAll');
  ResponseArea.disableRemoteMethodByName('findOne');
  ResponseArea.disableRemoteMethodByName('createChangeStream');
  ResponseArea.disableRemoteMethodByName('prototype.__destroyById__subscribers');
  ResponseArea.disableRemoteMethodByName('prototype.__updateById__subscribers');
  ResponseArea.disableRemoteMethodByName('prototype.__findById__subscribers');
  ResponseArea.disableRemoteMethodByName('prototype.__delete__subscribers');
  ResponseArea.disableRemoteMethodByName('prototype.__create__subscribers');

  ResponseArea.disableRemoteMethodByName('prototype.__findById__admins');
  ResponseArea.disableRemoteMethodByName('prototype.__updateById__admins');
  ResponseArea.disableRemoteMethodByName('prototype.__destroyById__admins');
  ResponseArea.disableRemoteMethodByName('prototype.__count__admins');
  ResponseArea.disableRemoteMethodByName('prototype.__delete__admins');
  ResponseArea.disableRemoteMethodByName('prototype.__get__admins');
  ResponseArea.disableRemoteMethodByName('prototype.__create__admins');
  ResponseArea.disableRemoteMethodByName('prototype.__get__admins');

  ResponseArea.disableRemoteMethodByName('prototype.__findById__emergencies');
  ResponseArea.disableRemoteMethodByName('prototype.__destroyById__emergencies');
  ResponseArea.disableRemoteMethodByName('prototype.__delete__emergencies');
  ResponseArea.disableRemoteMethodByName('prototype.__count__emergencies');
  ResponseArea.observe('before save', function newResponseAreaInit(ctx, next) {
    console.log(ctx.options.accessToken.userId);
    if (ctx.isNewInstance) {
      console.log('Creating new Response Area By: ' + ctx.options.accessToken.userId);
      ctx.instance.ownerId = ctx.options.accessToken.userId;
    }
    next();
  });

  ResponseArea.observe('after save', function newResponseAreaInit(ctx, next) {
    if (ctx.isNewInstance) {
      ResponseArea.app.models.Subscription.create({
        responderId: ctx.options.accessToken.userId,
        responseAreaId: ctx.instance.id,
      });
    }
    next();
  });
};
