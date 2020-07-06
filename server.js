const menu = [
    {dish_id: "bbq000", dish_type: "烧烤", dish_name: "黑胡椒小牛", dish_price: 20, dish_total_amount:0},
    {dish_id: "bbq001", dish_type: "烧烤", dish_name: "经典牛小串", dish_price: 20, dish_total_amount:0},
    {dish_id: "bbq002", dish_type: "烧烤", dish_name: "肉筋", dish_price: 20, dish_total_amount:0},
    {dish_id: "bbq003", dish_type: "烧烤", dish_name: "鸡肉串", dish_price: 10, dish_total_amount:0},
    {dish_id: "bbq004", dish_type: "烧烤", dish_name: "明筋", dish_price: 10, dish_total_amount:0},
    {dish_id: "bbq005", dish_type: "烧烤", dish_name: "小牛腰子", dish_price: 15, dish_total_amount:0},
    {dish_id: "bbq006", dish_type: "烧烤", dish_name: "羊心管", dish_price: 20, dish_total_amount:0},
    {dish_id: "bbq007", dish_type: "烧烤", dish_name: "排骨串", dish_price: 2, dish_total_amount:0},
    {dish_id: "bbq008", dish_type: "烧烤", dish_name: "筋皮", dish_price: 2, dish_total_amount: 0},
    {dish_id: "bbq009", dish_type: "烧烤", dish_name: "鸡心", dish_price: 1, dish_total_amount: 0},
    {dish_id: "bbq010", dish_type: "烧烤", dish_name: "鸡脆骨", dish_price: 3, dish_total_amount: 0},
    {dish_id: "bbq011", dish_type: "烧烤", dish_name: "盐焗鸡胗", dish_price: 8, dish_total_amount:0},
    {dish_id: "bbq012", dish_type: "烧烤", dish_name: "鸡脖子", dish_price: 4, dish_total_amount: 0},
    {dish_id: "bbq013", dish_type: "烧烤", dish_name: "生烤鸡头", dish_price: 5, dish_total_amount:0},
    {dish_id: "coldDish000", dish_type: "凉菜", dish_name: "拍黄瓜", dish_price: 12, dish_total_amount: 0},
    { dish_id: "mainFood000", dish_type: "主食", dish_name: "麻辣烫加面", dish_price: 18, dish_total_amount: 0},
    { dish_id: "drink000", dish_type: "酒水", dish_name: "匠心营造", dish_price: 12, dish_total_amount:0}
];
const menu_selection = [
    { selection_name: "烧烤", selection_color: '#2196F3', selection_text_color: 'black' },
    { selection_name: "凉菜", selection_color: 'white', selection_text_color: 'grey' },
    { selection_name: "主食", selection_color: 'white', selection_text_color: 'grey' },
    { selection_name: "酒水", selection_color: 'white', selection_text_color: 'grey' }
];
const taste_option = [
    [
        { option_id: "bbq301", option_feature: "烧烤", option_type: "辣度", option_name: "不辣", isChosen: 1, option_color: '#2196F3' },
        { option_id: "bbq302", option_feature: "烧烤", option_type: "辣度", option_name: "微辣", isChosen: 0, option_color: 'grey' },
        { option_id: "bbq303", option_feature: "烧烤", option_type: "辣度", option_name: "中辣", isChosen: 0, option_color: 'grey' },
        { option_id: "bbq304", option_feature: "烧烤", option_type: "辣度", option_name: "巨辣", isChosen: 0, option_color: 'grey' }
    ],
    [
        { option_id: "bbq401", option_feature: "烧烤", option_type: "油度", option_name: "正常", isChosen: 1, option_color: '#2196F3' },
        { option_id: "bbq402", option_feature: "烧烤", option_type: "油度", option_name: "无油", isChosen: 0, option_color: 'grey' }
    ],
    [
        { option_id: "drink301", option_feature: "酒水", option_type: "冰度", option_name: "加冰", isChosen: 1, option_color: '#2196F3' },
        { option_id: "drink302", option_feature: "酒水", option_type: "冰度", option_name: "无冰", isChosen: 0, option_color: 'grey' }
    ]
];
const tables = [
    { table_id: '001', table_status: '未开台', dine_in_id: '', total_order_content:[], total_order_price: 0, linked_table_id: '' },
    { table_id: '002', table_status: '未开台', dine_in_id: '', total_order_content:[], total_order_price: 0, linked_table_id: '' },
    { table_id: '003', table_status: '未开台', dine_in_id: '', total_order_content:[], total_order_price: 0, linked_table_id: '' },
    { table_id: '004', table_status: '未开台', dine_in_id: '', total_order_content:[], total_order_price: 0, linked_table_id: '' },
    { table_id: '005', table_status: '未开台', dine_in_id: '', total_order_content:[], total_order_price: 0, linked_table_id: '' },
    { table_id: '006', table_status: '未开台', dine_in_id: '', total_order_content:[], total_order_price: 0, linked_table_id: '' },
    { table_id: '007', table_status: '未开台', dine_in_id: '', total_order_content:[], total_order_price: 0, linked_table_id: '' },
    { table_id: '008', table_status: '未开台', dine_in_id: '', total_order_content:[], total_order_price: 0, linked_table_id: '' },
    { table_id: '009', table_status: '未开台', dine_in_id: '', total_order_content:[], total_order_price: 0, linked_table_id: '' },
    { table_id: '010', table_status: '未开台', dine_in_id: '', total_order_content:[], total_order_price: 0, linked_table_id: '' },
    { table_id: '011', table_status: '未开台', dine_in_id: '', total_order_content:[], total_order_price: 0, linked_table_id: '' },
    { table_id: '012', table_status: '未开台', dine_in_id: '', total_order_content:[], total_order_price: 0, linked_table_id: '' }
];

const PORT = 3000;
const CONNECTION_INFO = {
    host:"localhost",
    user: "root",
    password: "MANtL273mY",
    database: "Restaurant"
};
const ADMINISTRATIVE_DEVICES = ['厨房'];

var express = require('express');
var app = express();
var path = require('path')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

http.listen(PORT, function() { console.log('服务器启动。监听在 ' + PORT + ' 端口。'); });

var conn = mysql.createConnection(CONNECTION_INFO);

conn.connect(function (err) {
    if (err) {
        console.log('数据库连接失败。请重启服务。');
        throw err;
    }
});

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', function (socket) {

    if (socket.handshake.query.device_id) {
        deviceOnline(socket, socket.handshake.query.device_id);
    }

    socket.on('disconnect', function() {
        console.log(socket.handshake.query.device_id, 'is disconnected.');
    });

    socket.on('message', function (message) {

        console.log('收到信息: ', message.event);

        switch (message.event) {
            case 'requestTables':
                socket.join('999');
                let msg = {
                    tables: tables
                }
                socket.emit('respondTables', msg);
                break;
            case 'useTable':
                useTable(socket, message.username, message.dine_in_id, message.table_id);
                break;
            case 'joinRequest':
                joinRequest(socket, message.inquirer, message.room_owner, message.table_id);
                joinRequestReceived(socket);
                break;
            case 'joinDecision':
                joinDecision(message.inquirer, message.room_owner, message.table_id, message.result, message.dine_in_id);
                joinDecisionReceived(socket);
                break;
            case 'joinDecisionReceived':
                joinDecisionReceivedFromInquirer(socket, message.table_id, message.inquirer);
                break;
            case 'placeOrder':
                placeOrder(socket, message.table_id, message.dine_in_id, message.order_content, message.username);
                placeOrderReceived(socket);
                break;
            case 'prepareOrderReceived':
                prepareOrderReceived(socket, message.table_id, message.order_id, message.order_content, message.dine_in_id);
                break;
            case 'requestDetailPage':
                requestDetailPage(socket, message.table_id);
                break;
            case 'dishCompleted':
                dishCompleted(message.table_id, message.order_id, message.dish_id, message.dish_preference);
                dishCompletedReceived(message.table_id, message.order_id, message.dish_id, message.dish_preference);
                break;
            // case 'checkout':
            //     checkout(message.table_id, message.dine_in_id);
            //     checkoutReceived(socket);
            //     broadcastCheckout(message.table_id, message.dine_in_id);
            //     break;
            // dev event
            case 'dropTableDEV':
                dropTableDEV(message.table_id);
                break;
        }

    });
});

// 0. deviceOnline
function deviceOnline(socket, device_id) {
    if ( ADMINISTRATIVE_DEVICES.includes(device_id) ) {
        socket.join('500');

        // DEV
        console.log('[', device_id, "上线]");

        let message = {
            event: 'administrativeDeviceOnline',
            device_id: device_id
        };
        sendMessage(message, '500');
    }
}

// 1. useTable
function useTable(socket, username, dine_in_id, table_id) {

    // DEV
    console.log('[useTable. username:', username, 'dine_in_id:', dine_in_id, 'table_id:', table_id, ']');

    if (dine_in_id === '') {

        let queryStr = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'Restaurant' AND TABLE_NAME = ?";
        conn.query(queryStr, 'table_' + table_id + '_info', (err, rows) => {
            if (err) {

                // DEV
                console.log('[错误：检查餐台表单是否存在时发生错误（此处不应发生错误）]');
                
                socket.emit('unexpectedError');
            } else {
                if (rows.length === 0) {

                    // DEV
                    console.log('[餐台表单不存在：进行开台]');

                    openTable(socket, username, table_id);
                } else {

                    // DEV
                    console.log('[餐台表单已存在：进行加入]');

                    joinTable(socket, table_id);
                }
            }
        });
    }
}

// 2. - openTable
function openTable(socket, username, table_id) {
    let date = new Date();
    let dateStr = JSON.stringify(date.getFullYear()).slice(2) + JSON.stringify(date.getMonth() + 1).padStart(2, '0') + JSON.stringify(date.getDate()).padStart(2, '0');
    let timeStr = JSON.stringify(date.getHours()).padStart(2, '0') + '' + JSON.stringify(date.getMinutes()).padStart(2, '0');  
    let dine_in_id = table_id + '_' + dateStr + '_' + timeStr;

    let queryStr = "CREATE TABLE ?? (dine_in_id VARCHAR(255), room_owner VARCHAR(255)) DEFAULT CHARACTER SET UTF8MB4";
    conn.query(queryStr, 'table_' + table_id + '_info', (err) => {
        if (err) {

            // DEV
            console.log('[错误：创建餐台信息表单时发生错误；可能原因：餐台表单已经存在；解决方法：询问是否加入]');

            joinTable(socket, table_id);
        } else {
            socket.join(table_id);

            queryStr = "INSERT INTO ?? VALUES (?, ?)";
            conn.query(queryStr, ['table_' + table_id + '_info', dine_in_id, username], (err) => {
                 if (err) {
                    
                    // DEV
                    console.log('[错误：录入餐台表单初始化数据时发生错误（此处不应发生错误）]');

                    socket.emit('unexpectedError');
                } else {
                    queryStr = "CREATE TABLE ?? (order_id VARCHAR(255), order_time VARCHAR(255), order_user VARCHAR(255), dish_id VARCHAR(255), dish_name VARCHAR(255), dish_preference VARCHAR(255), dish_type VARCHAR(255), dish_amount INT, dish_price INT, dish_total_price INT, dish_status VARCHAR(255)) DEFAULT CHARACTER SET UTF8MB4";
                    conn.query(queryStr, 'table_' + table_id, (err) => {
                        if (err) {
                            
                            // DEV
                            console.log('[错误：创建餐台表单时发生错误（此处不应发生错误）]');

                            socket.emit('unexpectedError');
                        } else {
                            let message = {
                                dine_in_id: dine_in_id,
                                menu: menu,
                                menu_selection: menu_selection,
                                taste_option: taste_option
                            };
                            socket.emit('tableOpened', message);
                            let msg = {
                                table_id: table_id,
                                dine_in_id: dine_in_id
                            };
                            console.log(msg);
                            io.to('999').emit('tableOpenedBroadcast', msg);
                        }
                    });
                }
            });
        }
    });
}

// 3. - joinTable
function joinTable(socket, table_id) {
    let queryStr = "SELECT room_owner FROM ??";
    conn.query(queryStr, 'table_' + table_id + '_info', (err, rows) => {
        if (err) {

            // DEV
            console.log('[错误：访问餐台信息表单时发生错误；可能原因：餐台已退');

            error(socket, '加入点单时出现问题。')
        } else if (rows.length === 0) {
            // @TODO: racing condition, try again
        } else {
            let message = {
                table_id: table_id,
                room_owner: rows[0].room_owner
            }
            socket.emit('tableInUse', message);
        }
    });
}

// 4. joinRequest
function joinRequest(socket, inquirer, room_owner, table_id) {

    // DEV
    console.log('[joinRequest. inquirer:', inquirer, 'room_owner:', room_owner, 'table_id:', table_id, ']');

    socket.join(table_id + '-' + room_owner);
    let message = {
        inquirer: inquirer,
        room_owner: room_owner,
        table_id: table_id
    }
    socket.to(table_id).emit('joinRequest', message);
}

// 5. joinRequestReceived
function joinRequestReceived(socket) {
    socket.emit('joinRequestReceived');
}

// 6. joinDecision
function joinDecision(inquirer, room_owner, table_id, result, dine_in_id) {
    
    // DEV
    console.log('[joinDecision. inquirer:', inquirer, 'room_owner:', room_owner, 'table_id:', table_id, 'result:', result, 'dine_in_id:', dine_in_id, ']');

    if (result === 'denied') {
        let message = {
            room_owner: room_owner,
            table_id: table_id,
            result: result
        }
        io.to(table_id + '-' + inquirer).emit('joinDecision', message);
    } else if (result === 'approved') {
        let message = {
            room_owner: room_owner,
            table_id: table_id,
            result: result,
            dine_in_id: dine_in_id,
            menu: menu,
            menu_selection: menu_selection,
            taste_option: taste_option
        }
        io.to(table_id + '-' + inquirer).emit('joinDecision', message);
    }
}

// 7. joinDecisionReceived
function joinDecisionReceived(socket) {
    socket.emit('joinDecisionReceived');
}

// 8. joinDecisionReceivedFromInquirer
function joinDecisionReceivedFromInquirer(socket, table_id, inquirer) {
    // @TODO: 下线处理
    socket.leave(table_id + '-' + inquirer);
    socket.emit('joinDecisionReceived');
}

// 9. placeOrder
function placeOrder(socket, table_id, dine_in_id, order_content, username) {
    let date = new Date();
    let date_str = JSON.stringify(date);
    let timeStr = JSON.stringify(date.getHours()).padStart(2, '0') + '' + JSON.stringify(date.getMinutes()).padStart(2, '0');  
    let order_id = dine_in_id + '_' + timeStr;

    let queryStr = "SELECT dine_in_id FROM ??";
    conn.query(queryStr, 'table_' + table_id + '_info', (err, rows) => {
        if (rows[0].dine_in_id === dine_in_id) {
            for (let i = 0; i < order_content.length; i++) {
                let dish_id = order_content[i].dish_id;
                let dish_name = order_content[i].dish_name;
                let dish_preference = order_content[i].dish_preference;
                let dish_type = order_content[i].dish_type;
                let dish_amount = order_content[i].dish_amount;

                queryStr = "SELECT dish_price FROM menu WHERE dish_id = ?";
                conn.query(queryStr, dish_id, (err, rows) => {
                    let dish_total_price = rows[0].dish_price * dish_amount;
                    queryStr = "INSERT INTO ?? VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '已下单')";
                    conn.query(queryStr, ['table_' + table_id, order_id, date_str, username, dish_id, dish_name, dish_preference, dish_type, dish_amount, rows[0].dish_price, dish_total_price]);
                });
            }

            queryStr = "INSERT INTO ?? VALUES (?, ?, ?)";
            conn.query(queryStr, ['to_be_published_kitchen', table_id, order_id, JSON.stringify(order_content)], (err) => {
                if (err) {

                    // DEV
                    console.log('[错误：录入后厨餐单发布表单时发生错误（此处不应发生错误）');

                    socket.emit('unexpectedError');
                }
            });

            // @TODO：remove dine_in_id field
            let message = {
                event: 'prepareOrder',
                table_id: table_id,
                order_id: order_id,
                order_content: order_content,
                dine_in_id: dine_in_id,
            }
            sendMessage(message, '500');
        } else {

            // DEV
            console.log('[错误：dine_in_id 不合法');

            error(socket, '下单操作不合法。')
        }
    });
}

// 9. placeOrder
function placeOrderReceived(socket) {
    socket.emit('placeOrderReceived');
}

// 10. prepareOrderReceived
function prepareOrderReceived(socket, table_id, order_id, order_content, dine_in_id) {
    let queryStr = "DELETE FROM ?? WHERE table_id = ? AND order_id = ?";
    conn.query(queryStr, ['to_be_published_kitchen', table_id, order_id], (err) => {
        if (err) {
            // DEV
            console.log('[错误：试图在 prepareOrderReceived 删除后厨待发布项时发生错误');
        }
    });
}

// 11. requestDetailPage
function requestDetailPage(socket, table_id) {
    let queryStr = "SELECT * FROM ??";
    conn.query(queryStr, 'table_' + table_id, (err, total_order_content) => {
        queryStr = "SELECT sum(dish_total_price) FROM ??";
        conn.query(queryStr, 'table_' + table_id, (err, total_order_price) => {
            let message = {
                total_order_content: total_order_content,
                total_order_price: total_order_price[0]['sum(dish_total_price)']
            }
            socket.emit('respondDetailPage', message);
        });
    });
}

// 12. dishCompleted
function dishCompleted(table_id, order_id, dish_id, dish_preference) {
    let message = {
        event: 'dishCompleted',
        table_id: table_id,
        order_id: order_id,
        dish_id: dish_id,
        dish_preference: dish_preference
    }
    io.in(table_id).emit('dishCompleted', message);

    var queryStr = "UPDATE ?? SET dish_status = '已完成' WHERE order_id = ? AND dish_id = ? AND dish_preference = ?";
    conn.query(queryStr, ['table_' + table_id, order_id, dish_id, dish_preference], (err) => {
        if (err) {
            // DEV
            console.log('[错误：试图在 dishCompleted 更新菜品信息时发生错误');
        }
    });
}

// 13. dishCompletedReceived
function dishCompletedReceived(table_id, order_id, dish_id, dish_preference) {
    let message = {
        event: 'dishCompletedReceived',
        table_id: table_id,
        order_id: order_id,
        dish_id: dish_id,
        dish_preference: dish_preference
    }
    sendMessage(message, '500');
}

// helper
function sendMessage(message, table_id) {
    console.log('[向房间',table_id + ' 发送：' + message.event + ']');
    io.in(table_id).emit('message', message);
}

function error(socket, errorMessage) {
    socket.emit('error', errorMessage);
}

// dev helper
function dropTableDEV(table_id) {
    let queryStr = "DROP TABLE ??";
    conn.query(queryStr, 'table_' + table_id + '_info', (err) => {
        console.log(err);
    });
    conn.query(queryStr, 'table_' + table_id, (err) => {
        console.log(err);
    });
}


// function checkout(table_id, dine_in_id) {
//     let queryStr = "SELECT dine_in_id FROM ??";
//     conn.query(queryStr, 'table_' + table_id + '_info', (err, rows) => {
//         if (rows[0].dine_in_id === dine_in_id) {
//             queryStr = "SELECT * FROM ??";
//             conn.query(queryStr, 'table_' + table_id, (err, rows) => {
//                 queryStr = "INSERT INTO ?? VALUES (?, ?)";
//                 conn.query(queryStr, ['achieve', dine_in_id, JSON.stringify(rows)]);

//                 queryStr = "DROP TABLE ??";
//                 conn.query(queryStr, 'table_' + table_id + '_info');

//                 queryStr = "DROP TABLE ??";
//                 conn.query(queryStr, 'table_' + table_id);
//             });
//         }
//     });
// }

// function checkoutReceived(socket) {
//     socket.emit('checkoutReceived');
// }

// function broadcastCheckout(table_id, dine_in_id) {
//     let message = {
//         dine_in_id: dine_in_id
//     };
//     io.in(table_id).emit('broadcastCheckout', message);
// }
