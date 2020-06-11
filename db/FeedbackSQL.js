var FeedbackSQL = {
    insert: 'INSERT INTO Feedback(FeedbackID, F_detail, username, F_addtime) VALUES(NULL,?,?,now())', // 插入数据
    drop: 'DROP TABLE Feedback', // 删除表中所有的数据
    queryAll: 'SELECT * FROM Feedback', // 查找表中所有数据
    queryAllByTime: 'SELECT * FROM Feedback ORDER BY A_addtime DESC', //按时间倒序查找表中所有数据
    getFeedbackByTitle: 'SELECT * FROM Feedback WHERE A_title LIKE ?', // 查找符合条件的数据
    deleteFeedback: 'DELETE FROM Feedback WHERE FeedbackID =?' //删除对应数据
};
module.exports = FeedbackSQL;