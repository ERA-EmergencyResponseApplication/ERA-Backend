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
};
