var region = document.querySelector("#regionWapper");
var product = document.querySelector("#productWapper");

check(region);
check(product);
function check(Id){
    var child = Id.children;
    //全选框点击作用
    child[4].onclick = function(){
        if(child[4].checked = true){
            for(var i=1;i<child.length-1;i++){
                child[i].checked = true;
            }
        }
        
        getForm();
    }
    //其他框点击对全选框的影响  
    
    for(var i=0;i<child.length-1;i++){
        child[i].onclick = function(){
           
            var sum=0;
            for(var j=0;j<child.length-1;j++){
                if(child[j].checked)                      //判断是否被选中
                {
                    sum+=1;
                } 
            }
          
            if(sum == child.length-2){
                child[4].checked =true;
            }
            else {
                child[4].checked =false;
            }
            console.log(selectDate());
            getForm();
        }
    }
}


