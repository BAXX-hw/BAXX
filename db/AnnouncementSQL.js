var AnnouncementSQL = {
    insert: 'INSERT INTO Announcement(AnnouncementID, A_title, A_detail, A_addtime) VALUES(NULL,?,?,now())', // 插入数据
    drop: 'DROP TABLE Announcement', // 删除表中所有的数据
    queryAll: 'SELECT * FROM Announcement', // 查找表中所有数据
    queryAllByTime: 'SELECT * FROM Announcement ORDER BY A_addtime DESC', //按时间倒序查找表中所有数据
    getAnnByTitle: 'SELECT * FROM Announcement WHERE A_title LIKE ?', // 查找符合条件的数据
    deleteAnn: 'DELETE FROM Announcement WHERE AnnouncementID =?' //删除对应数据
};
module.exports = AnnouncementSQL;