document.addEventListener('DOMContentLoaded', function () {
    const seatsContainer = document.querySelector('.seats-container');
    const alphabet = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
    let list = [];
    const occuppiedList = [[1, 2], [1, 3], [2, 3], [2, 5]]; // 차지된 좌석 목록

    // 좌석 생성
    createSeats();

    function createSeats() {
        for (let row = 1; row <= 15; row++) {
            for (let col = 1; col <= 20; col++) {
                const seat = document.createElement('div');
                seat.classList.add('seat');
                seat.dataset.row = row;
                seat.dataset.col = col;

                if (occuppiedList.some(([r, c]) => r === row && c === col)) {
                    seat.classList.add('occupied');
                }

                if (col === 1) {
                    // 첫 번째 열일 때 알파벳 추가
                    const y_value = alphabet[row];
                    seat.innerHTML = y_value;
                    seat.dataset.yValue = y_value;
                    seat.dataset.xValue = col - 1;
                } else if (row === 15 && col >= 2 && col <= 20) {
                    // 15번째 행일 때 2번째 열부터 20번째 열까지 숫자 추가
                    const x_value = col - 1;
                    seat.innerHTML = x_value;
                    seat.dataset.yValue = alphabet[row];
                    seat.dataset.xValue = x_value;
                }

                seatsContainer.appendChild(seat);
            }
        }
    }

    // 좌석 클릭 이벤트
    seatsContainer.addEventListener('click', function (event) {
        const targetSeat = event.target.closest('.seat');
        if (!targetSeat) return; // 좌석 요소가 아닌 경우, 이벤트 처리 중단

        const row = targetSeat.dataset.row;
        const col = targetSeat.dataset.col;
        const resultDisplay = document.querySelector('.result');

        const y_value = alphabet[row];
        const x_value = col - 1;
        const value = `${y_value}${x_value}`;

        // 이미 선택된 좌석인 경우 클릭 이벤트를 무시합니다.
    if (targetSeat.classList.contains('occupied')) return;

        if (list.includes(value)) {
            list = list.filter(item => item !== value);
        } else {
            list.push(value);
        }

        resultDisplay.textContent = `선택한 좌석: ${list}`;
        event.target.classList.toggle('selected');
    });
});
