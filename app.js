  
$(function() {
   ReadData();
});



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
   var result_table = ""
   var myfbRef = new Firebase('https://blinding-fire-6477.firebaseio.com/PressUps');   
   var total=0;
    myfbRef.child(GetDateString()).once("value", function(snapshot) {
    snapshot.forEach(function(data) {        
      total = total + parseInt( data.val().count);
      result_table = result_table + "<TR><TD>" + data.val().time + "</TD><TD>" + data.val().count + "</TD></TR>"
      document.getElementById("results").innerHTML = "<TABLE width=120px><TR><TH>Time</TH><TH>Count</TH>" + result_table + "</TABLE>"
      document.getElementById('total').innerHTML = "<H1>Total: " + total + "</H1>";
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
