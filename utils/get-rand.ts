// 랜덤하게 max와 min 사이에서 양수 하나를 꺼내는 함수
export function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
