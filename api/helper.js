
const E = require('./messages.js');

const C = {
    error: 'error',
    success: 'success'
};



function _result(){
    return {status: 0, messages:[]};
}

function _message(){
    return {type:'', message:''};
}


module.exports = {

    unexpectedError: function(){
        return this.error(E.unexpected);
        //return {status:0, messages:[{type:'error',message:'Unexpected Error'}]};
    },

    notAuthorized: function(){
        return this.error(E.notAuthorized);
    },

    success: function(...msgs){
        let r = _result();
        r.status = 1;
        for(let m of msgs){
            if(typeof m == 'object')
                r.data = m;
            else
                r.messages.push(this.successMessage(m));
        }
        return r;
    },

    error: function(...msgs){
        let r = _result();
        r.status = 0;
        for(let m of msgs){
            if(typeof m == 'object')
                r.data = m;
            else
                r.messages.push(this.errorMessage(m));
        }
        return r;
    },

    errorMessage: (message)=>{
        let m = _message();
        m.type = C.error;
        m.message = message;
        return m;
    },

    successMessage: (message)=>{
        let m = _message();
        m.type = C.success;
        m.message = message;
        return m;
    }

};
