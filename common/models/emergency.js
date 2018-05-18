'use strict';

module.exports = function(Emergency) {
  Emergency.disableRemoteMethodByName('patchOrCreate');
  Emergency.disableRemoteMethodByName('replaceOrCreate');
  Emergency.disableRemoteMethodByName('upsertWithWhere');
  Emergency.disableRemoteMethodByName('findOne');
  Emergency.disableRemoteMethodByName('updateAll');
  Emergency.disableRemoteMethodByName('replaceById');
  Emergency.disableRemoteMethodByName('prototype.patchAttributes');
  Emergency.disableRemoteMethodByName('createChangeStream');
  Emergency.disableRemoteMethodByName('prototype.__delete__emergencyResponses');
  Emergency.disableRemoteMethodByName('prototype.__findById__emergencyResponses');
  Emergency.disableRemoteMethodByName('prototype.__destroyById__emergencyResponses');
};
