var express = require('express');
var nodeExcel = require('excel-export');
var app = express();

app.get('/Wayne', function(req, res){
    var conf ={};
    conf.stylesXmlFile = "styles.xml";
    conf.cols = [{
        caption:'項目',
        type:'string',
        // beforeCellWrite:function(row, cellData){
        //      return cellData.toUpperCase();
        // },
        width:28.7109375
    },{
        caption:'內容',
        type:'string',
        // beforeCellWrite:function(){
        //     var originDate = new Date(Date.UTC(1899,11,30));
        //     return function(row, cellData, eOpt){
        //         if (eOpt.rowNum%2){
        //             eOpt.styleIndex = 1;
        //         }
        //         else{
        //             eOpt.styleIndex = 2;
        //         }
        //         if (cellData === null){
        //           eOpt.cellType = 'string';
        //           return 'N/A';
        //         } else
        //           return (cellData - originDate) / (24 * 60 * 60 * 1000);
        //     }
        // }()
    }
    // ,{
    //     caption:'bool',
    //     type:'bool'
    // },{
    //     caption:'number',
    //      type:'number'
    // }
    ];
    conf.rows = [
        ['姓名', 'Wayne Lin'],
        ["手機號碼", 0975538861],
        ["身分證字號", 'a12345678'],
        ["地址", '瑞光路550號'],
        ["email", 'wayne1025.tw@hotmail.com']
    ];
    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    res.end(result, 'binary');
});

app.listen(3000);
console.log('Listening on port 3000');
