  
$(function() {
   ReadData();
   ReadHistory();
   document.getElementById('currentdate').innerHTML = GetDateString();
  
   var mytime_ms =(new Date()).getTime();
  var mytime = (new Date())
  var time = mytime.getHours() + ':' + mytime.getMinutes()+ ':' + mytime.getSeconds()
  console.log(time);
  document.getElementById('currenttime').innerHTML = time;  
});



function Save(){   
     var pushupsdone = document.getElementById("pushupsdone").value
     SaveX(pushupsdone);
}

function Save25()
{
  SaveX(25);
}
function Save33()
{
  SaveX(33);
}
//* Save in a key for today, the count, time in ms and the date */ 
function SaveX( x)
{
 var myfbRef = new Firebase(GetKey());  
 var pushupsdone = x;  
 var mytime_ms =(new Date()).getTime();
 var mytime = (new Date())
 var time = mytime.getHours() + ':' + mytime.getMinutes()+ ':' + mytime.getSeconds()
  
 var obj = {
   time:mytime_ms,count:pushupsdone,time:time,type:"value",date: GetDateString()
 }
 
  myfbRef.push(obj);  
  ReadData();
  
  
}


function ReadData()
{
  //Read all children of today's node. Then loop over and get the total.  
   
   var myfbRef = new Firebase('https://blinding-fire-6477.firebaseio.com/PressUps');   
   var total=0;
   var table = document.getElementById("results");
	tabler.innerHTML="";
    myfbRef.child(GetDateString()).once("value", function(snapshot) {
    snapshot.forEach(function(data) {        
      total = total + parseInt( data.val().count);
    
    var row = table.insertRow(-1)                                     ;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = data.val().time;
    cell2.innerHTML = data.val().count;	  
      
      document.getElementById('total').innerHTML = "<H1>Total: " + total + "</H1>";
    });

	          
    
      total= total;
	    
	    
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
  var result = myDate.getFullYear() + '-' + (myDate.getMonth()+1) + '-'+(myDate.getDate());    
  return result;  
}

function ReadHistory()
{
  //Read nodes for the last 30 days. Then loop over and get the total.
  
   var result_table = ""
   var myfbRef = new Firebase('https://blinding-fire-6477.firebaseio.com/PressUps');   
   var total=0;
   
   var daynum=20;
  var table = document.getElementById("history"); 
  while ( daynum<=25)
   {
     
	  datestring ='2020-3-'+daynum;	  
	  myfbRef.child(datestring).once("value", function(snapshot) {
      total=0;
	  snapshot.forEach(function(data) {              
      console.log(data.val());
      total = total + parseInt( data.val().count);                                       
      datadate = data.val().date;
    });
          var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = datadate;
    cell2.innerHTML = total;
      total= total;
});

daynum++;
   }//End while
   

	
	
}

