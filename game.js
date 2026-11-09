// 테스트용 샘플 게임: 방향키로 사각형을 움직입니다.
// 사이트가 정상 동작하는지 확인한 뒤, 이 파일을 내 게임 코드로 바꾸세요.

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const player = { x: 300, y: 160, size: 40, speed: 240 }; // speed: 초당 픽셀
const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
  // 방향키·스페이스가 페이지를 스크롤하지 않도록 막기
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }
});
window.addEventListener("keyup", (e) => { keys[e.key.toLowerCase()] = false; });

canvas.addEventListener("click", () => canvas.focus());

let last = performance.now();

function loop(now) {
  const dt = (now - last) / 1000; // 시간 기반 이동: 기기 속도와 상관없이 동일하게 움직임
  last = now;

  if (keys["arrowleft"] || keys["a"]) player.x -= player.speed * dt;
  if (keys["arrowright"] || keys["d"]) player.x += player.speed * dt;
  if (keys["arrowup"] || keys["w"]) player.y -= player.speed * dt;
  if (keys["arrowdown"] || keys["s"]) player.y += player.speed * dt;

  player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));

  ctx.fillStyle = "#0b0d12";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#5b8cff";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
