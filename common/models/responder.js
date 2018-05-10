'use strict';

module.exports = function(Responder) {
  Responder.disableRemoteMethodByName('patchOrCreate');
  Responder.disableRemoteMethodByName('replaceOrCreate');
  Responder.disableRemoteMethodByName('upsertWithWhere');
  Responder.disableRemoteMethodByName('findOne');
  Responder.disableRemoteMethodByName('updateAll');
  Responder.disableRemoteMethodByName('replaceById');
  Responder.disableRemoteMethodByName('prototype.patchAttributes');
  Responder.disableRemoteMethodByName('createChangeStream');

  Responder.disableRemoteMethodByName('find');
  Responder.disableRemoteMethodByName('exists');

  Responder.disableRemoteMethodByName('prototype.__findById__subscriptions');
  Responder.disableRemoteMethodByName('prototype.__updateById__subscriptions');
  Responder.disableRemoteMethodByName('prototype.__destroyById__subscriptions');
  Responder.disableRemoteMethodByName('prototype.__create__subscriptions');
  Responder.disableRemoteMethodByName('prototype.__delete__subscriptions');

  Responder.disableRemoteMethodByName('prototype.__get__accessTokens');
  Responder.disableRemoteMethodByName('prototype.__findById__accessTokens');
  Responder.disableRemoteMethodByName('prototype.__updateById__accessTokens');
  Responder.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
  Responder.disableRemoteMethodByName('prototype.__count__accessTokens');
  Responder.disableRemoteMethodByName('prototype.__create__accessTokens');
  Responder.disableRemoteMethodByName('prototype.__delete__accessTokens');

  Responder.disableRemoteMethodByName('prototype.__findById__adminOf');
  Responder.disableRemoteMethodByName('prototype.__updateById__adminOf');
  Responder.disableRemoteMethodByName('prototype.__destroyById__adminOf');
  Responder.disableRemoteMethodByName('prototype.__count__adminOf');
  Responder.disableRemoteMethodByName('prototype.__delete__adminOf');
  Responder.disableRemoteMethodByName('prototype.__get__adminOf');
  Responder.disableRemoteMethodByName('prototype.__create__adminOf');
  Responder.disableRemoteMethodByName('prototype.__get__adminOf');
  Responder.disableRemoteMethodByName('prototype.__exists__adminOf');
  Responder.disableRemoteMethodByName('prototype.__link__adminOf');
  Responder.disableRemoteMethodByName('prototype.__unlink__adminOf');
};
