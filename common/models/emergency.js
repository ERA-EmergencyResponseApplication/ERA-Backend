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

  Emergency.observe('before save', function newEmergencyInit(ctx, next) {
    console.log(ctx);

    if (ctx.isNewInstance) {
      console.log('Creating new Emergency');
      ctx.instance.creatorId = ctx.options.accessToken.userId;
      ctx.instance.start_datetime = new Date();
    }
    next();
  });

  Emergency.observe('after save', function newEmergency(ctx, next) {
    if (ctx.isNewInstance) {
      console.log('Sending Alert');

      var Sub = Emergency.app.models.Subscription;
      Sub.find({where: {'responseArea': ctx.instance.responseAreaId}},

        function result(err, obj) {
          var Usr = Emergency.app.models.Responder;
          var Sender = Emergency.app.models.Twilio;
          for (var i = 0; i < obj.length; i++) {
            Usr.findOne({where: {'id': obj.responderId}},
              function sendAlert(err, obj) {
                var msg = 'Emergency Event: ' + ctx.instance.type +
                  ' https://era.brandoncodes.com/events/' + ctx.instance.id;
                if (process.env.SEND_ALERTS == 'ACTIVE') {
                  Sender.send({type: 'sms', to: '+1' + obj.cellNumber,
                    from: '+18592872026', body: msg}, function(err, msg) {
                    console.log(msg);
                  });
                } else {
                  console.log('Sending Alert To: ' + obj.cellNumber);
                }
              });
          }
        });
    }
    next();
  });
};
