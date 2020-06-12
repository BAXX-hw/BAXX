var FeedbackSQL = {
    insert: 'INSERT INTO Feedback(FeedbackID, F_detail, username, F_addtime, F_isRead) VALUES(NULL,?,?,now(),0)', // 插入数据
    drop: 'DROP TABLE Feedback', // 删除表中所有的数据
    queryAll: 'SELECT * FROM Feedback', // 查找表中所有数据
    queryAllByTime: 'SELECT * FROM Feedback ORDER BY F_addtime DESC', //按时间倒序查找表中所有数据
    deleteFeedback: 'DELETE FROM Feedback WHERE FeedbackID =?', //删除对应数据
    updateFeedback: 'UPDATE Feedback SET F_isRead =? WHERE FeedbackID =?'//更新对应数据
};
module.exports = FeedbackSQL;