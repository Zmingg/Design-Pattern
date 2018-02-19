var Subs = [];
var SubId = 8800;
var Observers = [];
var ObsId = 10001;
class Subject {
    constructor() {
        this.id = ++SubId;
        this.obsIds = [];
        Subs.push(this);
    }

    get _obss() {
        var _tmp = [];
        for (var i in this.obsIds) {
            for (var j in Observers) {
                if( Observers[j].id === this.obsIds[i] ) {
                    _tmp.push(Observers[j]);
                }
            }
        }
        return _tmp;
    }

    set mes(value) {
        this.message = value;
        this.notify();
    }

    // 添加订阅者
    attach(observer) {
        var _tmp = {};
        // 去重
        for (var i in this.obsIds) {
            _tmp[i] = this.obsIds[i];
        }    
        if (!_tmp[observer]) {
            this.obsIds.push(observer);
        }
    }
    // 移除订阅者
    dettach(observer) {
        for (var i in this.obsIds) {
            if (this.obsIds[i] === observer) {
                this.obsIds.splice(i, 1);  
            }
        }
    }
    // 发送消息给所有订阅者
    notify() {
        for (var i in this._obss) {
            this._obss[i].update(this.id);
        }
    }
}

class ConcreteSubject extends Subject {
    constructor(name) {
        super();
        this.name = name;
    }

    // 发布消息
    publish(message) {
        this.mes = message;    
    }
}

var slc = new ConcreteSubject('售楼处');
var fcj = new ConcreteSubject('房产局');

class Observer {
    constructor() {
        this.id = ObsId++;
        this.subIds = [];
        Observers.push(this);
    }

    // 订阅更新
    update(subid) {
        for (var i in Subs) {
            if( Subs[i].id === subid ) {
                console.log('(' + subid + ')' + Subs[i].name + ': ' + this.name + ',' + Subs[i].message);
            }
        } 
    }

    // 添加新订阅主题
    addSub(subid) {
        for (var i in Subs) {
            if( Subs[i].id===subid ) {
                Subs[i].attach(this.id);         
            }
        }
        this.subIds.push(subid);        
    }

    // 取消订阅主题
    removeSub(subid) {
        for (var i in Subs) {
            if( Subs[i].id===subid ) {
                Subs[i].dettach(this.id);         
            }
        }
        for (var i in this.subIds) {
            this.subIds.splice(i, 1);
        }
        
    }
}

class User extends Observer {
    constructor(name, id) {
        super();
        this.name = name;
    }
}
var ming = new User('小明');
ming.addSub(8802);
var hong = new User('小红');
hong.addSub(8802);
ming.removeSub(8803);
ming.addSub(8801);
slc.publish('降价啦');
slc.publish('快买');
fcj.publish('来缴费吧!');
slc.publish('又有新盘开啦');
console.log(fcj)

