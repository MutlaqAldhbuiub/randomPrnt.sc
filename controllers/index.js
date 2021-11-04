  function getToken(){
      ltr_1=getRandomString(1).toLowerCase()
      num_1=Math.floor(Math.random() * 999)
      ltr_2=getRandomString(1).toLowerCase()
      num_2=Math.floor(Math.random() * 10)
//      console.log(`${ltr_1}${num_1}${ltr_2}${num_2}`);
      return `${ltr_1}${num_1}${ltr_2}${num_2}`;
  }

  function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
} 

function generateRandomURL(){
    return `${process.env.URL_DOMAIN}/${getToken()}`   
}


module.exports = {
  getIndexData(req, res) {
    console.log(getToken())
    console.log(generateRandomURL())
    return res.render('index', { title: "Mutlaq"});
  }  
};