import Validator from'validator';
import isEmpty from 'is-empty';

module.exports=function validateRegisterInput(data){
    let errors={};

     // Convert empty fields to an empty string so we can use validator functions
    data.name=!isEmpty(data.username)?data.name:'';
    data.email=!isEmpty(data.email)?data.email:'';
    data.password=!isEmpty(data.password)?data.password:'';
    data.gameId=!isEmpty(data.gameId)?data.gameId:'';
    data.level=!isEmpty(data.level)?data.level:'';

    //Name checks
    if(Validator.isEmpty(data.username)){
        errors.username="Username is required";
    };

    //Email checks
    if(Validator.email.isEmpty(data.email)){
        errors.email="Email is required";
    };


    //Password checks
    if(Validator.password.isEmpty(data.password)){
        errors.password="Password is required";
    };


    //GameId checks
    if(Validator.gameId.isEmpty(data.gameId)){
        errors.gameId="GameId is required";
    };

    //Level checks
    if(Validator.level.isEmpty(data.level)){
        errors.level="Level is required";
    };
    return{
        errors,
        isValid:isEmpty(errors)
    };

};