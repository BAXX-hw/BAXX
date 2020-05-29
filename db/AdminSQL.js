var AdminSQL = {
    insert: 'INSERT INTO Admin(aname,apwd) VALUES(?,?)', // 插入数据
    drop: 'DROP TABLE Admin', // 删除表中所有的数据
    queryAll: 'SELECT * FROM Admin', // 查找表中所有数据
    getUserByName: 'SELECT * FROM Admin WHERE aname =?', // 查找符合条件的数据
};
module.exports = AdminSQL;