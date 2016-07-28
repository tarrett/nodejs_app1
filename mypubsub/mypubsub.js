var pubsub={};

(function (mps){
    var topics = {};
    var subUid = -1;

    mps.publish = function (topic, args){
        if (!topics[topic])
        {
            return false;
        }

        var subscribes = topics[topic];
        var len = subscribes ? subscribes.length : 0;
        while (len--){
            subscribes[len].func (topic, args);
        }

        return this;
    };

    mps.subscribe = function (topic, func){
        if (!topics[topic])
        {
            topics[topic] = [];
        }

        var token = (++ subUid).toString();
        topics[topic].push ({
            token: token,
            func: func
        });
        return token;
    };

    mps.unsubscribe = function (token){
        for (var m in topics){
            if (topics[m]){
                for (var i = 0, j = topics[m].length; i < j; ++i){
                    if (topics[m][i].token === token){
                        topics[m].splice (i, 1);
                        return token;
                    }
                }
            }
        }
        return this;
    }

}(pubsub));

module.exports = pubsub;