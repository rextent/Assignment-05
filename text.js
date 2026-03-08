const numbers = [2,4,6];
const result = numbers.map(number=>number*2)
console.log(result);

const levels = ['Bug', 'Need Help', 'easy']
const html = levels.map(level=> `<button>${level}</button>`).join("");
console.log(html);