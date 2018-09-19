/*
*取数据的情况（以地区的不同情况区分（商品同样））
1.地区选择多个或一个时，取选择地区的所有数据
2.地区一个，商品多个时，取同时满足这两个的数据，地区在前
3，地区，商品都是多个时，
 */

var flag = 0;
function selectDate(){
    /*
        要按不同情况进行遍历（因为不同情况下的遍历方式不同）
        设置flag在不同情况下渲染表格方式不同
    */
   //用来存储被选择的地区和商品名
    selectRegion = new Array();
   selectProduct = new Array();
  //把被选中的地区，商品名放在数组中
  for(var i = 1 ; i < region.children.length-1;i++){
    if(region.children[i].checked){
       selectRegion.unshift(region.children[i].value);
    }
}
for(var i = 1 ; i < product.children.length-1;i++){
   if(product.children[i].checked){
      selectProduct.unshift(product.children[i].value);
   }
}

   //存储数据表中的被选择的数据
   date = new Array();
    //用于选取数据表中的数据
    //?如果地区选了多个，商品没选
    if(selectRegion.length >= 1&&selectProduct.length == 0){
        flag=0;
        for(i in sourceData){
            for(j in selectRegion){
                if(sourceData[i].region == selectRegion[j]){
                    date.unshift(sourceData[i]);
                }
            }
        }
    }
    //？如果商品多选，地区没选
    if(selectRegion.length == 0&&selectProduct.length >= 1){
        
        flag = 0;
        for(i in sourceData){
            for(j in selectProduct){
                
                if(sourceData[i].product == selectProduct[j]){
                    date.unshift(sourceData[i]);
                }
            }
        }
    
    }
    //地区和商品都只有一个 
    if(selectProduct.length == 1 && selectRegion.length == 1){
        flag = 0;
        for( i in sourceData){
            if(selectProduct[0] == sourceData[i].product && selectRegion[0] == sourceData[i].region){
                date.unshift(sourceData[i]);
            }
        }
    }
    //地区一个，商品多个时
    if(selectRegion.length == 1 && selectProduct.length >1){
        flag = 1;
        for(i in sourceData){
            if(sourceData[i].region == selectRegion[0]){
                for(j in selectProduct){
                    if(sourceData[i].product == selectProduct[j]){
                        date.unshift(sourceData[i]);
                    }
                }
            }
        }
    }

    //商品一个，地区多个时
    if(selectRegion.length > 1 && selectProduct.length == 1){
        flag = 2;
        for(i in sourceData){
            if(sourceData[i].product == selectProduct[0]){
                for(j in selectRegion){
                    if(sourceData[i].region == selectRegion[j]){
                        date.unshift(sourceData[i]);
                    }
                }
            }
        }
    }

    //商品，地区多个
    if(selectProduct.length > 1 && selectRegion.length > 1){
        flag = 0;
        for(i in sourceData){
            for(j in selectProduct){
                for(k in selectRegion){
                    if(sourceData[i].product == selectProduct[j] && sourceData[i].region == selectRegion[k]){
                        date.unshift(sourceData[i]);
                    }
                }
            }
        }
    }
    return date;
}



var tableWrapper = document.querySelector("#tableWapper");
// 渲染新的表格
function getForm(){
    //如果有表格存在就去除
    if(tableWrapper.hasChildNodes()){
        tableWrapper.removeChild(tableWrapper.firstChild);
    }
    //创建table，thead元素
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    //网thead中加入表头元素
    thead.appendChild(formHead());
    table.appendChild(thead);
    //创建表格体元素
    var tbody = document.createElement("tbody");
    tbody.setAttribute('class','thebody');
    table.appendChild(tbody);
    
    //不同情况下合并td
     date = selectDate();
  
    for(k in date){
   
        var bodyTr = document.createElement("tr");
        if(k % selectRegion.length == 0 &&flag == 2){
            var produceTd = document.createElement("td");
            produceTd.innerHTML = date[k].product;
            produceTd.setAttribute("rowspan",selectRegion.length);
            bodyTr.appendChild(produceTd);
        }
        else if(k==0 && flag == 1){
            var regionTd = document.createElement("td");
            regionTd.innerHTML = date[k].region;
            regionTd.setAttribute("rowspan",selectProduct.length);
            bodyTr.appendChild(regionTd);
        }
       
        loopAppend(bodyTr, date[k]);
        tbody.appendChild(bodyTr);
    };
    tableWrapper.appendChild(table);
    

}

//创建表头
function formHead(){
    var headTr = document.createElement("tr");
    var headSp = document.createElement("td");
    headSp.innerHTML = "商品";
    var headRegion = document.createElement("td");
    headRegion.innerHTML = "地区";
    if(flag == 0 && flag == 2){
        headTr.appendChild(headSp);
        headTr.appendChild(headRegion);
    }
    else{
        headTr.appendChild(headRegion);
        headTr.appendChild(headSp);
    }
    for(var i=1;i<=12;i++){
        var td = document.createElement("td");
        td.innerHTML = i+"月";
        headTr.appendChild(td);
    }
    
    return headTr;
}

// 遍历数据
function loopAppend(bodyTr, data) {
    var region = document.createElement('td');
    region.innerHTML = data.region;
    var product = document.createElement('td');
    product.innerHTML = data.product;
    
    if (flag ==2) {
        bodyTr.appendChild(region);
    } else if (flag == 1) {
        bodyTr.appendChild(product);
    } else {
        bodyTr.appendChild(product);
        bodyTr.appendChild(region);
    }


    for (var i = 0; i < 12; i++) {
        var monthContent = document.createElement('td');
        monthContent.innerHTML = data.sale[i];
        bodyTr.appendChild(monthContent);
    }
    return bodyTr;
}
    
    