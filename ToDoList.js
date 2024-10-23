let btn=document.querySelector(".button");
let input=document.querySelector("input");
let ul=document.querySelector(".section");
let ul1=document.querySelector(".section1");
let p=document.querySelector(".time");
let start=document.querySelector("#start");
let lap=document.querySelector("#lap");
let reset=document.querySelector("#reset");
let para=document.querySelector("#counter");
let content=document.querySelector(".content");
let count=0,count1=0;
let click=1;
const showTime=()=>{
    let date=new Date();
    p.innerHTML=date.toLocaleTimeString();
}
let IntervalId=setInterval(showTime,1000);
setTimeout(()=>{clearInterval(IntervalId)},5000);
let intervalid,min,second,lapid=1;
const start_timer=()=>{
    if(click==1)
    {
     start.innerHTML="||";
    intervalid=setInterval(()=>{count=count+1;min=count/60;
        min=Math.trunc(min);
        second=count%60;
        para.innerHTML=min+":"+second;
    },1000);
    click=0;
    }
    else if(click==0)
    {
        start.innerHTML="&#9654;";
        clearInterval(intervalid);
        click=1;
    }
}
const reset_timer=()=>{
    count=0;
    para.innerHTML=count;
    clearInterval(intervalid);
    start.innerHTML="&#9654;";
    content.innerHTML="";
}
const showdetails=()=>{
let li=document.createElement("li");
li.innerText=min+":"+second;
content.append(li);
}
start.addEventListener("click",start_timer);
reset.addEventListener("click",reset_timer);
lap.addEventListener("click",showdetails);
ul1.style.display="none";
let visit=0,visit1=0;
showTime();
const display=(list)=>{
    let div=document.createElement("div");
    div.classList.add("task");
    let li=document.createElement("li");
    li.appendChild(document.createTextNode(list));
    div.appendChild(li);
    let button=document.createElement("button");
    button.setAttribute("id",arr.indexOf(list));
    button.classList.add("btn");
    div.append(button);
    console.log(button.id);
    button.innerHTML="&#x1F5D1;";
    let button1=document.createElement("button");
    button1.setAttribute("id",arr.indexOf(list));
    button1.classList.add("btntask");
    console.log(button1.id);
    button1.innerHTML="&#x2705;";
    div.append(button1);
    ul.append(div);
        button.addEventListener("click",()=>{ 
            arr.splice(button.id,1);
            let parent=button.parentNode.parentNode;
            button.parentNode.remove();
            for(let i=0;i<arr.length;i++)
            {
                parent.children[i].children[1].id=i;
                parent.children[i].children[2].id=i;
                console.log("hi"+parent.children[i].children[2].id);
            }
            localStorage.setItem("todo1",JSON.stringify(arr));
            visit1=1;
        });
        button1.addEventListener("click",()=>{ 
            let parent=button1.parentNode.parentNode;
            let msg=button1.parentNode.children[0].textContent;
            let taskmsg=`task ${msg} completed`;
            let con=confirm(taskmsg);
            if(con)
            {
            arr.splice(button1.id,1);
            button1.parentNode.remove();
            for(let i=0;i<arr.length;i++)
            {
                parent.children[i].children[1].id=i;
                parent.children[i].children[2].id=i;
            }
            localStorage.setItem("todo1",JSON.stringify(arr));
            visit1=1;
        }
        });
    }
    const showlist=()=>{
        let child=ul.lastElementChild;
        while(child){
            ul.removeChild(child);
            child=ul.lastElementChild;
        }
        for(let list=0;list<arr.length;list++){
            display(arr[list]);
        }
    }
 const getlist=()=>{
    return JSON.parse(localStorage.getItem("todo1"));
}
let arr=getlist()||[];
if(visit1==1)
{
    visit1=0;
    showlist();
}
if(arr!="" && visit==0)
{
    visit=1;
    showlist();
}
const addtodolist=()=>{
    let text=input.value.toLowerCase();
    text=text.trim();
    input.value="";
    if(text!="" && !arr.includes(text))
    {
    arr.push(text);
    arr=[... new Set(arr)];
    localStorage.setItem("todo1",JSON.stringify(arr));
    }
    else{
        if(text=="")
            alert("please enter a  valid task");
        else
        alert("task already added");
    }
    showlist();
}
 btn.addEventListener("click",()=>{addtodolist()});
