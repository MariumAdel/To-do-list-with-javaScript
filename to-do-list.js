var addBtn = document.getElementById("add-task");
var list = document.getElementById("tdl-list");
var doneList=document.getElementById("doneTasks")
var inputTask= document.getElementById("new-task");
var newTask;
var element;
var xRemove;
var spanAtt;
var done;
var currentKey;
var elemObj;
var doneFlag=false;
var searchInput=document.getElementById("search");

addBtn.addEventListener("click", addNewTask);


var storageKeys=Object.keys(localStorage);

for (var i=0; i<storageKeys.length; i++)
{

    if (storageKeys.length!=0 && storageKeys[i]!="current")
    {
       var chkFlag= JSON.parse(localStorage.getItem(storageKeys[i])).doneFlag;
        element=document.createElement("li");
        var node= document.createTextNode( JSON.parse(localStorage.getItem(storageKeys[i])).text);
        element.appendChild(node);
      //  list.appendChild(element);
        xRemove =document.createElement("span");
        xRemove.setAttribute("id",storageKeys[i])
        xRemove.textContent="X";
        current=localStorage.getItem("current");
        xRemove.setAttribute("class", "remove");
        element.appendChild(xRemove);
        xRemove.addEventListener("click", removeTask);
        done =document.createElement("span");
        done.textContent="done";
        currentKey=localStorage.getItem("current");
        var doneId= parseInt(storageKeys[i]);
        done.setAttribute("id",doneId+100);
        done.setAttribute("class","done");
        done.addEventListener('click', doneTasks);
        element.appendChild(done);
        var chkFlag= JSON.parse(localStorage.getItem(storageKeys[i])).doneFlag;
        if(chkFlag == true)
        {
            doneList.appendChild(element); 
        }
        else
        {
            list.appendChild(element);
        }
    }

}



function addNewTask(){
    storageKeys=Object.keys(localStorage);
    if (storageKeys.length<=0)
    {
        currentKey=0;
        localStorage.setItem("current",currentKey);
        console.log("here  "+currentKey);
    }
    newTask=inputTask.value;
    element=document.createElement("li");
    var node=document.createTextNode(newTask);
    element.appendChild(node);
    list.appendChild(element);
    elemObj={text: newTask, doneFlag:false}
    xRemove =document.createElement("span");
    xRemove.textContent="X";
    currentKey=localStorage.getItem("current");
    console.log(currentKey);
    xRemove.setAttribute("id", currentKey);
    xRemove.setAttribute("class", "remove");
    element.appendChild(xRemove);
    xRemove.addEventListener("click", removeTask);
    //doneList.addEventListener("click", removeTask);
    done =document.createElement("span");
    done.textContent="Done";
    currentKey=localStorage.getItem("current");
    var curr=parseInt(currentKey);
    console.log(curr+100);
    done.setAttribute("id",curr+100);
    done.setAttribute("class","done");
    element.appendChild(done);
    done.addEventListener("click", doneTasks);
    inputTask.value="";
    var elementObj =JSON.stringify(elemObj);
    localStorage.setItem(currentKey,elementObj);
    currentKey++;
    localStorage.setItem("current",currentKey);
   

}

function removeTask(e)
{
   var clk= e.target.getAttribute("id");
   var s=e.target;
   console.log(clk);
   var li= s.parentNode;
   var getObj=localStorage.getItem(clk);
   getObj=JSON.parse(getObj);
   if(getObj.doneFlag==false)
   {
   localStorage.removeItem(clk);
   list.removeChild(li);
   }
   else
   {
    localStorage.removeItem(clk);
    doneList.removeChild(li);
   }
   
}

function doneTasks(e)
{
    var doneTarget=e.target;
    var doneClk=e.target.getAttribute("id");
    var curr=parseInt(doneClk);
    doneClk= curr-100;
    console.log(doneClk);
    
    var li=doneTarget.parentNode;
    // var doneElement= document.createElement("li");
    // var doneNode=doneTarget.doneElement.value;
    var obj =  localStorage.getItem(doneClk);
    obj=JSON.parse(obj);
    obj.doneFlag= !(obj.doneFlag);
    console.log(obj.doneFlag);
    
    if(obj.doneFlag == true)
    {
        doneList.appendChild(li); 
    }
    else
    {
        list.appendChild(li);
    }
    obj=JSON.stringify(obj);
    localStorage.setItem(doneClk,obj);
}

searchInput.addEventListener("keyup", function(){

var li= document.getElementsByTagName("li");
var inputFilter= searchInput.value.toUpperCase();
var txtContent;
for(var i=0; i<li.length; i++)
{
    txtContent=li[i].textContent;
    if(txtContent.toUpperCase().indexOf(inputFilter)>-1)
    {
        li[i].style.display="";

    }
    else
    {
        li[i].style.display="none";
    }
}


})