// export const checkUserLoggedIn = () => {    
//     if(localStorage.getItem('auth_token') != ''){
//         return true;
//     } else {
//         return false;
//     }
// };

export function checkUserLoggedIn(){    
    if(localStorage.getItem('auth_token') != '' && localStorage.getItem('auth_token') != null){
        return true;
    } else {
        return false;
    }
};
