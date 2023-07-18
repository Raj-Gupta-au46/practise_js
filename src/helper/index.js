function generateUniqueNumber() {
  const usedNumbers = new Set();

  while (true) {
    // 6-digit number
    const number = Math.floor(Math.random() * 900000) + 100000;
    // Random alphabet A to Z
    const alphabet = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const uniqueNumber = number.toString() + alphabet;

    if (!usedNumbers.has(uniqueNumber)) {
      usedNumbers.add(uniqueNumber);
      return uniqueNumber;
    }
  }
}

const generateTambulaTickets = () => {
  const tickets = {};
  let numTickets = 6;
  for (let ticketNum = 1; ticketNum <= numTickets; ticketNum++) {
    const ticket = [];

    // Generate a blank ticket grid
    for (let i = 0; i < 3; i++) {
      const row = new Array(9).fill(0);
      ticket.push(row);
    }

    // Generate an array of numbers from 1 to 90
    const numbers = Array.from({ length: 90 }, (_, index) => index + 1);

    // Fill the ticket array with 5 unique values in random order
    for (let row = 0; row < 3; row++) {
      const availableColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      const filledColumns = [];

      for (let i = 0; i < 5; i++) {
        const columnIndex = Math.floor(Math.random() * availableColumns.length);
        const col = availableColumns[columnIndex];
        filledColumns.push(col);
        availableColumns.splice(columnIndex, 1);

        const startNumber = col * 10;
        let endNumber;
        if (col !== 8) {
          endNumber = col * 10 + 9;
        } else {
          endNumber = col * 10 + 10;
        }
        const columnNumbers = numbers.filter(
          (number) => number >= startNumber && number <= endNumber
        );

        const numberIndex = Math.floor(Math.random() * columnNumbers.length);
        const number = columnNumbers[numberIndex];
        ticket[row][col] = number;
        numbers.splice(numbers.indexOf(number), 1);
      }

      filledColumns.sort((a, b) => a - b);

      // Fill remaining empty spaces with '0' or 'X'
      for (let col = 0; col < 9; col++) {
        if (!filledColumns.includes(col)) {
          ticket[row][col] = Math.random() < 0.5 ? "X" : "X";
        }
      }
    }
    const randomTicketId = generateUniqueNumber();
    tickets[`ticketId : ${randomTicketId}`] = ticket;
  }
  console.log(tickets);
  return { tickets };
};

module.exports = generateTambulaTickets;
