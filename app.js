function Save(){   
 alert('saving');
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
    myfbRef.child(GetDateString()).once("value", function(snapshot) {
    snapshot.forEach(function(data) {        
      total = total + parseInt( data.val().count);
      document.getElementById('total').innerHTML = total;
    });

});

}


function GetKey()
{    
  key ='https://blinding-fire-6477.firebaseio.com/PressUps/'+GetDateString() ;
  return key;  
}

function GetDateString()
{
 var myDate = (new Date())
  var result = myDate.getFullYear() + '-' + (myDate.getMonth()+1) + '-'+(myDate.getDate()+1);    
  return result;  
}

