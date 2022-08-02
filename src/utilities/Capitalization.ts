export default function capitalizeName(str: string) {
  const splitStr = str.trim().toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  const uppercaseText = splitStr.join(' ');
  return uppercaseText;
}
