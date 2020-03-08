function Save(){   
 //* Save in a key for today, the count, time in ms and the date */ 
var myfbRef = new Firebase(GetKey());  
 
   var pushupsdone = document.getElementById("pushupsdone").value
  
 var mytime_ms =(new Date()).getTime();
  var mytime = (new Date())
  var time = mytime.getHours() + ':' + mytime.getMinutes()+ ':' + mytime.getSeconds()
  
  
 var obj = {
   time:mytime_ms,count:pushupsdone,time:time,type:"value"
 } 
  myfbRef.push(obj);  
  ReadData();
}



function ReadData()
{
  //Read all children of today's node. Then loop over and get the total.
  console.log('reading');
   var myfbRef = new Firebase('https://blinding-fire-6477.firebaseio.com/PressUps');   
   var total=0;
    myfbRef.child('2020-3-7').once("value", function(snapshot) {
    snapshot.forEach(function(data) {        
      total = total + parseInt( data.val().count);
      document.getElementById('total').innerHTML = total;
    });

});

}


function GetKey()
{
  var myDate = (new Date())
  var key = myDate.getFullYear() + '-' + (myDate.getMonth()+1) + '-'+(myDate.getDay()+1);
  
  key ='https://blinding-fire-6477.firebaseio.com/PressUps/'+key ;
  
  return key;
  
  
}

