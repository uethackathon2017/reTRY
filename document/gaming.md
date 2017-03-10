1. Kết nối random người chơi
Tìm người chơi
Kết nối
Client tải dữ liệu: Tải hết 6 câu

Đợi bắt đầu chơi: Server emit cho cả 2 thằng

2. Chơi:

LOOP:
    IF: Server: Nếu chưa hết id thì
    THEN:
        Server: 'question' Emit id câu hỏi cho cả 2 client
        Client: Render kiểu câu hỏi theo index
        Client: 'answer' Chơi, emit đáp án lên server 
        Server: 'result' Emit đúng hay sai (broadcast cho cả 2) và điểm tại thời điểm đó, lưu bộ nhớ log (user[word])
        Client: Render đáp án
        Server: 'question' Khi server nhận đủ 2 đáp án hoặc hết duration thì continue;
    ELSE:
        Server: 'finish' Emit kết thúc trận đấu, ghi log user[word] của cả 2 thằng, close connection
    FINALY:
        Server: 'error' emit lỗi, close connection
END
