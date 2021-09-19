
export const validateEmail = (string = '') => {
  const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regex = new RegExp(regEmail);
  return regex.test(string);
}

export const validatePassword = (password = '') => {
  const regPass = /(?=.*\d)(?=.*[A-Z])(?=.*\W)/
  const regex = new RegExp(regPass);
  /* (?=.*\d): Lookahead 
  . : matches any character (except for line terminators)
  * : matches the previous token between zero and unlimited times
  \d : matches a digit (equivalent to [0-9])
  */
  return regex.test(password);
}

export const checkStringEmpty = (string) => {
  return (!string || string.length === 0);
}

export const upperFirstChar = (string) => {
  return (!string || string.charAt(0).toUpperCase() + string.slice(1))
}