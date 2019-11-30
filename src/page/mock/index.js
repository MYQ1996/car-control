export const res = {
    "cars":[
        {
            "id": "9",       // 车牌号【沪A0000X】
            "type": "Bus",   // 类型【Bus，Car，Truck】
            "run": 1,        // 运行、停止
            "speed_sp": 50,  // 速度设置值
            "speed_now": 0,  // 当前速度
            "status": "Waitting Traffic Light",  // 状态
            "money": 12      // 钱包金额
        },
        {
            "id": "3",       // 车牌号【沪A0000X】
            "type": "Bus",   // 类型【Bus，Car，Truck】
            "run": 0,        // 运行、停止
            "speed_sp": 50,  // 速度设置值
            "speed_now": 0,  // 当前速度
            "status": "Waitting Traffic Light",  // 状态
            "money": 12      // 钱包金额
        }
    ],
        "light" : 1,    // 路灯的状态，开启/关闭
        "light_sencor" : 78,  // 路灯的光线传感器检测到的亮度 按百分比的形式显示
        "noise" : 110,  // 噪声 显示
        "PM10" : 32,    // PM10 显示
        "PM2.5": 45,    // PM2.5 显示
        "PM1.0": 36     // PM1.0 显示
}