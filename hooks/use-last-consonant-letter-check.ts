//NOTE - MOD 28 했을 때 true면 받침 O, false면 받침 X
const useLastConsonantLetterCheck = (text: string) => {
  return (text.charCodeAt(text.length - 1) - "가".charCodeAt(0)) % 28 !== 0;
};

export default useLastConsonantLetterCheck;
