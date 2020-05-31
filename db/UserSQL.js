var UserSQL = {
    insert: 'INSERT INTO Users(username,pwd) VALUES(?,?)', // 插入数据
    drop: 'DROP TABLE Users', // 删除表中所有的数据
    queryAll: 'SELECT * FROM Users', // 查找表中所有数据
    getUserByName: 'SELECT * FROM Users WHERE username =?', // 查找符合条件的数据
};
module.exports = UserSQL;