var PlayerGameInfoSQL = {
    insert: 'INSERT INTO PlayerGameInfo(username,level,P_score) VALUES(?,?,?)', // 插入数据
    drop: 'DROP TABLE PlayerGameInfo', // 删除表中所有的数据
    queryAll: 'SELECT * FROM PlayerGameInfo', // 查找表中所有数据
    getUserByName: 'SELECT * FROM PlayerGameInfo WHERE username LIKE ?', // 查找符合条件的数据
    getScoreByName: 'SELECT SUM(P_score) FROM PlayerGameInfo WHERE username =? '
};
module.exports = PlayerGameInfoSQL;