const wordBank = [
  ["ハンサム","Tampan"],
  ["きれい","Cantik / Bersih"],
  ["しずか","Tenang"],
  ["にぎやか","Ramai"],
  ["ゆうめい","Terkenal"],
  ["しんせつ","Baik hati"],
  ["げんき","Sehat"],
  ["ひま","Luang"],
  ["べんり","Praktis"],
  ["すてき","Bagus / Indah"],
  ["おおきい","Besar"],
  ["ちいさい","Kecil"],
  ["あたらしい","Baru"],
  ["ふるい","Lama"],
  ["いい","Baik"],
  ["わるい","Buruk"],
  ["あつい","Panas"],
  ["さむい","Dingin"],
  ["むずかしい","Sulit"],
  ["やさしい","Mudah"],
  ["たかい","Mahal"],
  ["やすい","Murah"],
  ["おもしろい","Menarik"],
  ["いそがしい","Sibuk"],
  ["たのしい","Menyenangkan"]
];

// buat 100 soal
let questions = [];
for (let i = 0; i < 4; i++) {
  wordBank.forEach(w => {
    if (Math.random() < 0.5) {
      questions.push({ question: w[0], answer: w[1], type: "JP-ID" });
    } else {
      questions.push({ question: w[1], answer: w[0], type: "ID-JP" });
    }
  });
}
questions = questions.slice(0, 100);
questions.sort(() => Math.random() - 0.5);

let current = 0;
let score = 0;

function loadQuestion() {
  let q = questions[current];
  document.getElementById("question").innerHTML =
    "Soal " + (current + 1) + " / 100<br><br><b>" + q.question + "</b> = ?";

  let options = [q.answer];

  while (options.length < 4) {
    let rand = wordBank[Math.floor(Math.random() * wordBank.length)];
    let wrong = (q.type === "JP-ID") ? rand[1] : rand[0];
    if (!options.includes(wrong)) options.push(wrong);
  }

  options.sort(() => Math.random() - 0.5);

  let letters = ["A", "B", "C", "D"];
  let html = "";
  options.forEach((opt, i) => {
    html += `<button onclick="checkAnswer(this,'${q.answer}')">
      ${letters[i]}. ${opt}
    </button>`;
  });

  document.getElementById("options").innerHTML = html;
}

function checkAnswer(btn, correct) {
  let buttons = document.querySelectorAll("#options button");
  buttons.forEach(b => b.disabled = true);

  if (btn.innerText.includes(correct)) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    buttons.forEach(b => {
      if (b.innerText.includes(correct)) {
        b.classList.add("correct");
      }
    });
  }
}

function nextQuestion() {
  current++;
  if (current >= questions.length) {
    let nilai = Math.round((score / 100) * 100);
    let status = nilai >= 85 ? "LULUS ✅" : "TIDAK LULUS ❌";
    document.getElementById("question").innerHTML = "UJIAN SELESAI";
    document.getElementById("options").innerHTML = "";
    document.getElementById("score").innerHTML =
      "Nilai: " + nilai + "<br>Status: " + status;
    return;
  }
  loadQuestion();
}

function goFull() {
  document.documentElement.requestFullscreen();
}

loadQuestion();
