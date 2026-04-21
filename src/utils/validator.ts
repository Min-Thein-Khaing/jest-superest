export const isValidatorEmail = (input:string) => {
    if(typeof input !== "string"){
        return false;
    }
    const email = input.trim();
    if(email.length === 0){
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

