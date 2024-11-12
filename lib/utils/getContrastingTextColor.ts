const getContrastingTextColor = (hexColor: string) => {
  // HEX 색상에서 "#"을 제거
  const hex = hexColor.replace("#", "");

  // R, G, B 값을 16진수에서 10진수로 변환
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // 색상의 밝기 계산 (ITU-R BT.709의 Luminance 공식을 사용)
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

  // 밝기가 128 이상이면 어두운 텍스트(검은색), 미만이면 밝은 텍스트(흰색) 반환
  return brightness >= 128 ? "#000000" : "#FFFFFF";
};

export default getContrastingTextColor;
