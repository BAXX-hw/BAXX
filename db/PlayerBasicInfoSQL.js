var PlayerBasicInfoSQL = {
    insert: 'INSERT INTO PlayerBasicInfo(username,P_nickname,P_gender,P_signature) VALUES(?,?,?,?)', // 插入数据
    drop: 'DROP TABLE PlayerBasicInfo', // 删除表中所有的数据
    queryAll: 'SELECT * FROM PlayerBasicInfo', // 查找表中所有数据
    getUserByName: 'SELECT * FROM PlayerBasicInfo WHERE username LIKE ?', // 查找符合条件的数据
};
module.exports = PlayerBasicInfoSQL;