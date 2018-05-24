'use strict';

module.exports = function(Emergency) {
  Emergency.disableRemoteMethodByName('patchOrCreate');
  Emergency.disableRemoteMethodByName('replaceOrCreate');
  Emergency.disableRemoteMethodByName('upsertWithWhere');
  Emergency.disableRemoteMethodByName('findOne');
  Emergency.disableRemoteMethodByName('updateAll');
  Emergency.disableRemoteMethodByName('prototype.patchAttributes');
  Emergency.disableRemoteMethodByName('createChangeStream');
  Emergency.disableRemoteMethodByName('prototype.__delete__emergencyResponses');
  Emergency.disableRemoteMethodByName('prototype.__findById__emergencyResponses');
  Emergency.disableRemoteMethodByName('prototype.__destroyById__emergencyResponses');

  Emergency.observe('before save', function newEmergencyInit(ctx, next) {
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
      console.log('Finding Subscriptions: ' + ctx.instance.responseAreaId);

      Sub.find({where: {responseAreaId: ctx.instance.responseAreaId}},
        function result(err, subscriptions) {
          console.log(subscriptions);
          var Usr = Emergency.app.models.Responder;
          var Sender = Emergency.app.models.Twilio;

          for (var i = 0; i < subscriptions.length; i++) {
            Usr.findOne({where: {id: subscriptions[i].responderId}},
              function sendAlert(err, usr) {
                var msg = 'Emergency Event: ' + ctx.instance.type +
                  ' https://era.brandoncodes.com/#/events/' + ctx.instance.id;
                var Response = Emergency.app.models.EmergencyResponse;

                if (err) {
                  Response.create(
                    {responderId: usr.id,
                      emergencyId: ctx.instance.id,
                      status: 'Failed'});
                } else {
                  if (process.env.SEND_ALERTS === 'ACTIVE') {
                    console.log(usr);
                    Sender.send({type: 'sms', to: '+1' + usr.cellNumber,
                      from: '+18592872026', body: msg}, function(err, msg) {
                      if (err) {
                        console.log(err);
                        Response.create(
                          {responderId: usr.id,
                            emergencyId: ctx.instance.id,
                            status: 'Failed'},
                          function(err, msg) {
                            if (err) {
                              console.log(err);
                            } else {
                              console.log(msg);
                            }
                          });
                      } else {
                        Response.create(
                          {responderId: usr.id,
                            emergencyId: ctx.instance.id,
                            status: 'No Response'},
                          function(err, msg) {
                            if (err) {
                              console.log(err);
                            } else {
                              console.log(msg);
                            }
                          });
                        console.log(msg);
                      }
                    });
                  } else {
                    console.log('Test Sending Alert To: ' + usr.cellNumber);
                  }
                }
              });
          }
        });
    }
    next();
  });
};
